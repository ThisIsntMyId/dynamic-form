import React from 'react';

interface PhoneInputProps {
  name: string;
  code: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  error?: string;
  label?: string;
  hint?: string;
  mask?: string;
  prefix?: string;
}

// Utility function to convert unmasked value to masked format
const getMaskedValue = (value: string, mask: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  let formatted = '';
  let maskIndex = 0;
  let cleanedIndex = 0;

  while (maskIndex < mask.length && cleanedIndex < cleaned.length) {
    if (mask[maskIndex] === 'x') {
      formatted += cleaned[cleanedIndex];
      cleanedIndex++;
    } else {
      formatted += mask[maskIndex];
    }
    maskIndex++;
  }
  
  return formatted;
};

// Utility function to convert masked value to unmasked format
const getUnmaskedValue = (value: string): string => {
  return value.replace(/\D/g, '');
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  code,
  value,
  onChange,
  placeholder = 'Enter phone number',
  required = false,
  pattern,
  error,
  label,
  hint,
  mask = '(xxx) xxx-xxxx',
  prefix = '1'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmaskedValue = getUnmaskedValue(e.target.value);
    const e164Value = unmaskedValue ? `+${prefix}${unmaskedValue}` : null;
    onChange(e164Value);
  };

  // Convert E.164 format to display format
  const getDisplayValue = (e164Value: string | null): string => {
    if (!e164Value) return '';
    // Remove prefix and any non-digit characters
    const cleaned = e164Value.replace(`+${prefix}`, '').replace(/\D/g, '');
    return getMaskedValue(cleaned, mask);
  };

  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">
          +{prefix}
        </div>
        <input
          type="tel"
          name={name}
          id={code}
          value={getDisplayValue(value)}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className="w-full bg-white border border-gray-300 rounded-xl pl-12 pr-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
        />
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default PhoneInput; 