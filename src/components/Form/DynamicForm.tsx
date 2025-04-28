import React, { useState, useEffect } from 'react';
import type { IntakeFormConfig, Question } from '../../types';
import TextInput from './Inputs/TextInput';
import TextAreaInput from './Inputs/TextAreaInput';
import NumberInput from './Inputs/NumberInput';
import EmailInput from './Inputs/EmailInput';
import PhoneInput from './Inputs/PhoneInput';
import DateInput from './Inputs/DateInput';
import RadioInput from './Inputs/RadioInput';
import CheckboxInput from './Inputs/CheckboxInput';
import DocumentInput from './Inputs/DocumentInput';
import ComboboxInput from './Inputs/ComboboxInput';

interface DynamicFormProps {
  formConfig: IntakeFormConfig;
  userResponse: Record<string, Record<string, any>>;
  currentStep: string;
  onStepChange?: (step: string, data: Record<string, Record<string, any>>) => void;
  onSubmit: (data: Record<string, Record<string, any>>) => void;
}

const PREVIEW_PAGE = '_preview';
const REVIEW_PAGE = '_review';
const COMPLETE_PAGE = '_complete';

export const DynamicForm: React.FC<DynamicFormProps> = ({
  formConfig,
  userResponse,
  currentStep,
  onStepChange,
  onSubmit
}) => {
  // State
  const [localUserResponse, setLocalUserResponse] = useState<Record<string, Record<string, any>>>(userResponse);
  const [formError, setFormError] = useState<Record<string, Record<string, string>>>({});
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState('');

  // Helper function to replace macros in content
  const replaceMacros = (content: string, data: Record<string, Record<string, any>>): string => {
    return content.replace(/\[#([^.]+)\.([^\]]+)\]/g, (match, pageCode, questionCode) => {
      return data[pageCode]?.[questionCode] || '';
    });
  };

  // Navigation Helpers
  const getCurrentStep = () => {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get('page');
    if (pageParam) return pageParam;
    // If no page param, decide where to go
    if (formConfig.showPreview) return PREVIEW_PAGE;
    return formConfig.pages[0].code;
  };

  const currentPageCode = getCurrentStep();
  const currentPage = formConfig.pages.find(page => page.code === currentPageCode);

  const getNextPage = () => {
    if (!currentPage) return undefined;
    const currentIndex = formConfig.pages.findIndex(page => page.code === currentPage.code);
    return formConfig.pages[currentIndex + 1];
  };

  const hasNextPage = () => !!getNextPage();
  const isLastPage = () => {
    if (!currentPage) return false;
    const currentIndex = formConfig.pages.findIndex(page => page.code === currentPage.code);
    return currentIndex === formConfig.pages.length - 1;
  };

  // Navigation Handler
  const navigateToStep = (step: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', step);
    window.history.pushState({}, '', url);
    onStepChange?.(step, localUserResponse);
  };

  // Browser Navigation Handler
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      const pageParam = url.searchParams.get('page');
      if (pageParam) {
        onStepChange?.(pageParam, localUserResponse);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onStepChange, localUserResponse]);

  // Auto-redirect to _preview if showPreview is true and no ?page= param is present
  useEffect(() => {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get('page');
    if (!pageParam && formConfig.showPreview) {
      url.searchParams.set('page', PREVIEW_PAGE);
      window.history.replaceState({}, '', url);
      onStepChange?.(PREVIEW_PAGE, localUserResponse);
    }
  }, [formConfig.showPreview, onStepChange, localUserResponse]);

  // Form State Management
  const updateLocalUserResponse = (questionCode: string, value: any) => {
    setLocalUserResponse(prev => {
      const pageCode = currentPage?.code;
      if (!pageCode) return prev;
      return {
        ...prev,
        [pageCode]: {
          ...prev[pageCode],
          [questionCode]: value
        }
      };
    });
  };

  // Validation
  const validatePage = () => {
    const errors: Record<string, Record<string, string>> = {};
    let isValid = true;
    const pageCode = currentPage?.code;
    if (!pageCode) return false;
    currentPage?.questions.forEach(question => {
      const value = localUserResponse[pageCode]?.[question.code];
      if (!errors[pageCode]) {
        errors[pageCode] = {};
      }
      if (question.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors[pageCode][question.code] = question.requiredError || `${question.text} is required`;
        isValid = false;
        return;
      }
      if (question.pattern && value && !new RegExp(question.pattern).test(value)) {
        errors[pageCode][question.code] = question.patternError || `${question.text} is invalid`;
        isValid = false;
        return;
      }
      if (question.type === 'number' && value !== undefined) {
        if (question.min !== undefined && Number(value) < Number(question.min)) {
          errors[pageCode][question.code] = question.minError || `${question.text} must be at least ${question.min}`;
          isValid = false;
        }
        if (question.max !== undefined && Number(value) > Number(question.max)) {
          errors[pageCode][question.code] = question.maxError || `${question.text} must be at most ${question.max}`;
          isValid = false;
        }
      }
      if ((question.type === 'text' || question.type === 'textarea') && value) {
        if (question.min !== undefined && value.length < Number(question.min)) {
          errors[pageCode][question.code] = question.minError || `${question.text} must be at least ${question.min} characters`;
          isValid = false;
        }
        if (question.max !== undefined && value.length > Number(question.max)) {
          errors[pageCode][question.code] = question.maxError || `${question.text} must be at most ${question.max} characters`;
          isValid = false;
        }
      }
    });
    setFormError(errors);
    return isValid;
  };

  // Event Handlers
  const handleNext = () => {
    if (validatePage()) {
      const nextPage = getNextPage();
      if (nextPage) {
        navigateToStep(nextPage.code);
      } else if (formConfig.showReview) {
        navigateToStep(REVIEW_PAGE);
      } else {
        // Submit and go to complete
        onSubmit(localUserResponse);
        navigateToStep(COMPLETE_PAGE);
      }
    }
  };

  const handleSubmit = () => {
    if (validatePage()) {
      if (formConfig.showReview) {
        navigateToStep(REVIEW_PAGE);
      } else {
        onSubmit(localUserResponse);
        navigateToStep(COMPLETE_PAGE);
      }
    }
  };

  // Question Rendering
  const shouldShowFollowup = (question: Question, value: any): boolean => {
    if (!question.showFollowupWhen || !question.followup_questions) return false;
    
    // Handle array values (for checkbox inputs)
    if (Array.isArray(value)) {
      if (Array.isArray(question.showFollowupWhen)) {
        return question.showFollowupWhen.some(trigger => value.includes(trigger));
      }
      return value.includes(question.showFollowupWhen);
    }
    
    // Handle single values (for radio, text, etc.)
    if (Array.isArray(question.showFollowupWhen)) {
      return question.showFollowupWhen.includes(value);
    }
    return value === question.showFollowupWhen;
  };

  const renderQuestion = (question: Question) => {
    const pageCode = currentPage?.code;
    if (!pageCode) return null;

    const value = localUserResponse[pageCode]?.[question.code];
    const error = formError[pageCode]?.[question.code];

    const commonProps = {
      name: question.code,
      code: question.code,
      value,
      onChange: (value: any) => updateLocalUserResponse(question.code, value),
      error,
      required: question.required,
      label: question.text,
      hint: question.hint,
      placeholder: question.placeholder,
      prefix: question.prefix,
      suffix: question.suffix
    };

    const renderInput = () => {
      switch (question.type) {
        case 'text':
          return <TextInput {...commonProps} />;
        case 'textarea':
          return <TextAreaInput {...commonProps} />;
        case 'number':
          return <NumberInput {...commonProps} />;
        case 'email':
          return <EmailInput {...commonProps} />;
        case 'phone':
          return <PhoneInput {...commonProps} />;
        case 'date':
          return <DateInput {...commonProps} />;
        case 'radio':
          return <RadioInput {...commonProps} options={question.options as string[]} />;
        case 'checkbox':
          return <CheckboxInput {...commonProps} options={question.options as string[]} />;
        case 'document':
          return <DocumentInput {...commonProps} filetype={question.filetype} maxFileSize={question.maxFileSize} />;
        case 'combobox':
          return <ComboboxInput {...commonProps} options={question.options as string[]} />;
        default:
          return null;
      }
    };

    return (
      <div className="question-container">
        {renderInput()}
        {shouldShowFollowup(question, value) && question.followup_questions && (
          <div className="followup-questions ml-4 mt-2">
            {question.followup_questions.map(followup => (
              <div key={followup.code} className="followup-question">
                {renderQuestion(followup)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Preview Screen
  if (currentPageCode === PREVIEW_PAGE) {
    return (
      <div className="preview-screen">
        <div className="preview-content" dangerouslySetInnerHTML={{ __html: formConfig.previewContent || '' }} />
        <button 
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set('page', formConfig.pages[0].code);
            window.history.pushState({}, '', url);
            onStepChange?.(formConfig.pages[0].code, localUserResponse);
          }}
          className="btn-start"
        >
          Start Form
        </button>
      </div>
    );
  }

  // Review Screen
  if (currentPageCode === REVIEW_PAGE) {
    const replacedReviewContent = replaceMacros(formConfig.reviewContent || '', localUserResponse);
    const replacedConsentSignUrl = formConfig.consentSignUrl ? replaceMacros(formConfig.consentSignUrl, localUserResponse) : '';
    return (
      <div className="review-screen">
        <div className="review-content" dangerouslySetInnerHTML={{ __html: replacedReviewContent }} />
        {formConfig.requireConsent && (
          <div className="consent-section">
            <label className="consent-checkbox">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => {
                  setConsentChecked(e.target.checked);
                  setConsentError('');
                }}
              />
              <span dangerouslySetInnerHTML={{ __html: formConfig.consentContent || '' }} />
            </label>
            {replacedConsentSignUrl && (
              <img src={replacedConsentSignUrl} alt="Consent Signature" className="consent-signature" />
            )}
            {consentError && <div className="text-red-500 mt-2">{consentError}</div>}
          </div>
        )}
        <div className="review-actions">
          <button 
            onClick={() => navigateToStep(formConfig.pages[formConfig.pages.length - 1].code)}
            className="btn-back"
          >
            Back
          </button>
          <button 
            onClick={() => {
              if (formConfig.requireConsent && !consentChecked) {
                setConsentError('You must agree to the consent before submitting.');
                return;
              }
              onSubmit(localUserResponse);
              navigateToStep(COMPLETE_PAGE);
            }}
            className="btn-submit"
            disabled={formConfig.requireConsent && !consentChecked}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // Complete/Thank You Screen
  if (currentPageCode === COMPLETE_PAGE) {
    return (
      <div className="submitted-screen">
        <div className="submitted-content" dangerouslySetInnerHTML={{ __html: formConfig.formSubmittedContent || '' }} />
        {formConfig.formSubmitBackLink && (
          <a href={formConfig.formSubmitBackLink} className="btn-back">
            Back
          </a>
        )}
      </div>
    );
  }

  // If not a special page, render the form page
  if (!currentPage) {
    return <div>Invalid step configuration</div>;
  }

  return (
    <div className="dynamic-form">
      <header>
        <h1>{currentPage.title}</h1>
        {currentPage.desc && <p>{currentPage.desc}</p>}
      </header>
      <div className={`grid grid-cols-${currentPage.columns} gap-4`}>
        {currentPage.questions.map(question => (
          <div 
            key={question.code}
            className={`col-span-${question.colspan || 1}`}
          >
            {renderQuestion(question)}
          </div>
        ))}
      </div>
      <footer>
        <div className="form-actions">
          {hasNextPage() && (
            <button 
              onClick={handleNext}
              className="btn-next"
            >
              Next
            </button>
          )}
          {isLastPage() && (
            formConfig.showReview ? (
              <button 
                onClick={() => navigateToStep(REVIEW_PAGE)}
                className="btn-review"
              >
                Review
              </button>
            ) : (
              <button 
                onClick={() => {
                  onSubmit(localUserResponse);
                  navigateToStep(COMPLETE_PAGE);
                }}
                className="btn-submit"
              >
                Submit
              </button>
            )
          )}
        </div>
        {currentPage.footer && <p>{currentPage.footer}</p>}
      </footer>
    </div>
  );
};
