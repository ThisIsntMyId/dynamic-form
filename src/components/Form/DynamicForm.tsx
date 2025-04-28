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

  // Navigation Helpers
  const getCurrentStep = () => {
    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get('page');
    const isValidPage = pageParam && formConfig.pages.some(page => page.code === pageParam);
    return isValidPage ? pageParam : currentStep;
  };

  const currentPage = formConfig.pages.find(page => page.code === getCurrentStep());
  
  const getNextPage = () => {
    const currentIndex = formConfig.pages.findIndex(page => page.code === getCurrentStep());
    return formConfig.pages[currentIndex + 1];
  };

  const hasNextPage = () => !!getNextPage();
  const isLastPage = () => {
    const currentIndex = formConfig.pages.findIndex(page => page.code === getCurrentStep());
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
      if (pageParam && formConfig.pages.some(page => page.code === pageParam)) {
        onStepChange?.(pageParam, localUserResponse);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onStepChange, localUserResponse, formConfig.pages]);

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
      
      // Initialize error structure for this page if not exists
      if (!errors[pageCode]) {
        errors[pageCode] = {};
      }
      
      // Required validation
      if (question.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors[pageCode][question.code] = question.requiredError || `${question.text} is required`;
        isValid = false;
        return;
      }

      // Pattern validation
      if (question.pattern && value && !new RegExp(question.pattern).test(value)) {
        errors[pageCode][question.code] = question.patternError || `${question.text} is invalid`;
        isValid = false;
        return;
      }

      // Min/Max validation for numbers
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

      // Min/Max validation for text length
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
      }
    }
  };

  const handleSubmit = () => {
    if (validatePage()) {
      onSubmit(localUserResponse);
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
            <button 
              onClick={handleSubmit}
              className="btn-submit"
            >
              Submit
            </button>
          )}
        </div>
        {currentPage.footer && <p>{currentPage.footer}</p>}
      </footer>
    </div>
  );
};
