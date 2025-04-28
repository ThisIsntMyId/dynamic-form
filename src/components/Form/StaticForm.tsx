import React, { useState } from 'react';
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

interface UserState {
  [key: string]: any;
}

interface FormErrorMessages {
  [key: string]: string;
}

interface StaticFormProps {
  initialUserState?: UserState;
}

const formRules = {
  'basicInfo.firstName': ['required'],
  'basicInfo.lastName': ['required'],
  'basicInfo.email': ['required', 'pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i'],
  'basicInfo.phone': ['required'],
  'basicInfo.gender': ['required'],
  'basicInfo.age': ['required', 'min:0', 'max:120'],
  'physicalInfo.heightFeet': ['required', 'min:0', 'max:10'],
  'physicalInfo.heightInches': ['required', 'min:0', 'max:11'],
  'documents.tickets': ['required', 'max:5'],
  'preferences.interests': ['required'],
  'preferences.country': ['required']
};

const formErrorMessages: FormErrorMessages = {
  'basicInfo.firstName.required': 'First name is required',
  'basicInfo.lastName.required': 'Last name is required',
  'basicInfo.email.required': 'Email is required',
  'basicInfo.email.pattern': 'Please enter a valid email address',
  'basicInfo.phone.required': 'Phone number is required',
  'basicInfo.gender.required': 'Gender is required',
  'basicInfo.age.required': 'Age is required',
  'basicInfo.age.min': 'Age must be at least 0',
  'basicInfo.age.max': 'Age must be at most 120',
  'physicalInfo.heightFeet.required': 'Height (feet) is required',
  'physicalInfo.heightFeet.min': 'Height (feet) must be at least 0',
  'physicalInfo.heightFeet.max': 'Height (feet) must be at most 10',
  'physicalInfo.heightInches.required': 'Height (inches) is required',
  'physicalInfo.heightInches.min': 'Height (inches) must be at least 0',
  'physicalInfo.heightInches.max': 'Height (inches) must be at most 11',
  'documents.tickets.required': 'Tickets are required',
  'documents.tickets.max': 'Maximum 5mb file is allowed',
  'preferences.interests.required': 'Please select at least one interest',
  'preferences.country.required': 'Please select a country'
};

const genderOptions = ['Male', 'Female', 'Other'];

const interestOptions = [
  'Photography', 'Hiking', 'Jazz Music', 'Italian Cuisine', 'Machine Learning',
  'Yoga', 'Science Fiction', 'Japanese Culture', 'Chess', 'Sustainable Living'
];

const countryOptions = [
  'United States', 'China', 'India', 'Japan', 'Germany', 'United Kingdom',
  'France', 'Brazil', 'Italy', 'Canada', 'Australia', 'South Korea',
  'Spain', 'Mexico', 'Indonesia', 'Russia', 'Turkey', 'Netherlands',
  'Saudi Arabia', 'Switzerland'
];

const StaticForm: React.FC<StaticFormProps> = ({ initialUserState }) => {
  const [userState, setUserState] = useState<UserState | null>(initialUserState || null);
  const [formError, setFormError] = useState<Record<string, string> | null>(null);

  const updateUserState = (path: string, value: any) => {
    const [group, field] = path.split('.');
    setUserState(prev => {
      const newState = prev || {};
      return {
        ...newState,
        [group]: {
          ...(newState[group] || {}),
          [field]: value
        }
      };
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formRules).forEach(([field, rules]) => {
      const [group, fieldName] = field.split('.');
      const value = userState?.[group]?.[fieldName];
      
      for (const rule of rules) {
        if (rule === 'required') {
          // Handle different types of inputs
          if (Array.isArray(value)) {
            // For checkbox inputs (interests)
            if (value.length === 0) {
              errors[field] = formErrorMessages[`${field}.required`] || 'This field is required';
              isValid = false;
              break;
            }
          } else if (value === null || value === '' || value === undefined) {
            // For other inputs including radio
            errors[field] = formErrorMessages[`${field}.required`] || 'This field is required';
            isValid = false;
            break;
          }
        } else if (rule.startsWith('min:')) {
          const min = parseInt(rule.split(':')[1]);
          if (value !== null && Number(value) < min) {
            errors[field] = formErrorMessages[`${field}.min`] || `Value must be at least ${min}`;
            isValid = false;
            break;
          }
        } else if (rule.startsWith('max:')) {
          const max = parseInt(rule.split(':')[1]);
          if (value !== null && Number(value) > max) {
            errors[field] = formErrorMessages[`${field}.max`] || `Value must be at most ${max}`;
            isValid = false;
            break;
          }
        } else if (rule.startsWith('pattern:')) {
          const patternString = rule.substring(8); // Remove 'pattern:' prefix
          
          // Extract the pattern and flags from /pattern/flags format
          const regexParts = patternString.match(/^\/(.*)\/([gimsuy]*)$/);
          
          if (regexParts) {
            const [, pattern, flags] = regexParts;
            const regex = new RegExp(pattern, flags);
            
            if (value !== null && value !== '' && !regex.test(value)) {
              errors[field] = formErrorMessages[`${field}.pattern`] || 'Invalid format';
              isValid = false;
              break;
            }
          } else {
            console.error('Invalid regex pattern format:', patternString);
            errors[field] = 'Invalid pattern format';
            isValid = false;
            break;
          }
        }
      }
    });

    setFormError(errors);
    return isValid;
  };

  const submitForm = () => {
    if (validateForm()) {
      console.log('Form submitted:', userState);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">This is a static form</h1>
      <p className="text-gray-600 mb-8">This is a form description</p>

      <div className="space-y-8">
        {/* Basic Info Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="firstName"
              code="firstName"
              value={userState?.basicInfo?.firstName}
              onChange={(val) => updateUserState('basicInfo.firstName', val)}
              label="First Name"
              required
              error={formError?.['basicInfo.firstName']}
            />
            <TextInput
              name="lastName"
              code="lastName"
              value={userState?.basicInfo?.lastName}
              onChange={(val) => updateUserState('basicInfo.lastName', val)}
              label="Last Name"
              required
              error={formError?.['basicInfo.lastName']}
            />
          </div>

          <EmailInput
            name="email"
            code="email"
            value={userState?.basicInfo?.email}
            onChange={(val) => updateUserState('basicInfo.email', val)}
            label="Email"
            required
            error={formError?.['basicInfo.email']}
          />

          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              name="age"
              code="age"
              value={userState?.basicInfo?.age}
              onChange={(val) => updateUserState('basicInfo.age', val)}
              label="Age"
              required
              error={formError?.['basicInfo.age']}
            />
            <PhoneInput
              name="phone"
              code="phone"
              value={userState?.basicInfo?.phone}
              onChange={(val) => updateUserState('basicInfo.phone', val)}
              label="Phone"
              required
              error={formError?.['basicInfo.phone']}
            />
          </div>

          <DateInput
            name="dateOfBirth"
            code="dateOfBirth"
            value={userState?.basicInfo?.dateOfBirth}
            onChange={(val) => updateUserState('basicInfo.dateOfBirth', val)}
            label="Date of Birth"
            error={formError?.['basicInfo.dateOfBirth']}
          />

          <RadioInput
            name="gender"
            value={userState?.basicInfo?.gender}
            onChange={(val) => updateUserState('basicInfo.gender', val)}
            label="Gender"
            options={genderOptions}
            error={formError?.['basicInfo.gender']}
          />
        </div>

        {/* Physical Info Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Physical Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              name="heightFeet"
              code="heightFeet"
              value={userState?.physicalInfo?.heightFeet}
              onChange={(val) => updateUserState('physicalInfo.heightFeet', val)}
              label="Height (Feet)"
              suffix="ft"
              required
              error={formError?.['physicalInfo.heightFeet']}
            />
            <NumberInput
              name="heightInches"
              code="heightInches"
              value={userState?.physicalInfo?.heightInches}
              onChange={(val) => updateUserState('physicalInfo.heightInches', val)}
              label="Height (Inches)"
              suffix="in"
              required
              error={formError?.['physicalInfo.heightInches']}
            />
          </div>

          <NumberInput
            name="weight"
            code="weight"
            value={userState?.physicalInfo?.weight}
            onChange={(val) => updateUserState('physicalInfo.weight', val)}
            label="Weight"
            suffix="lb"
          />
        </div>

        {/* Professional Info Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Professional Information</h2>
          <TextAreaInput
            name="bio"
            code="bio"
            value={userState?.professionalInfo?.bio}
            onChange={(val) => updateUserState('professionalInfo.bio', val)}
            label="Bio"
          />

          <TextInput
            name="domain"
            code="domain"
            value={userState?.professionalInfo?.domain}
            onChange={(val) => updateUserState('professionalInfo.domain', val)}
            label="Domain"
            prefix="https://"
          />

          <NumberInput
            name="profileRate"
            code="profileRate"
            value={userState?.professionalInfo?.profileRate}
            onChange={(val) => updateUserState('professionalInfo.profileRate', val)}
            label="Profile Rate"
            suffix="$"
          />
        </div>

        {/* Preferences Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Preferences</h2>
          <CheckboxInput
            name="interests"
            code="interests"
            value={userState?.preferences?.interests || []}
            onChange={(val) => updateUserState('preferences.interests', val)}
            label="Interests"
            options={interestOptions}
            error={formError?.['preferences.interests']}
          />

          <ComboboxInput
            name="country"
            code="country"
            value={userState?.preferences?.country}
            onChange={(val) => updateUserState('preferences.country', val)}
            label="Country"
            options={countryOptions}
            error={formError?.['preferences.country']}
          />
        </div>

        {/* Documents Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
          <DocumentInput
            name="tickets"
            code="tickets"
            onChange={(val) => updateUserState('documents.tickets', val)}
            label="Tickets"
            required
            error={formError?.['documents.tickets']}
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={submitForm}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500">This is form notes</p>
    </div>
  );
};

export default StaticForm;
