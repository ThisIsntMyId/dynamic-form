import React from 'react';

interface TextInputProps {
  name: string;
  code: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  required?: boolean;
  max?: number;
  min?: number;
  pattern?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
  label?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  code,
  value,
  onChange,
  placeholder,
  required = false,
  max,
  min,
  pattern,
  prefix,
  suffix,
  error,
  label
}) => {
  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {prefix}
          </div>
        )}
        <input
          type="text"
          name={name}
          id={code}
          value={value || ''}
          onChange={(e) => onChange(e.target.value || null)}
          placeholder={placeholder}
          required={required}
          maxLength={max}
          minLength={min}
          pattern={pattern}
          className={`w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400 ${
            prefix ? 'pl-16' : ''
          } ${suffix ? 'pr-16' : ''}`}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput; 