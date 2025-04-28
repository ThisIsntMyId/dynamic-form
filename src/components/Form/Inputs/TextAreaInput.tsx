import React from 'react';

interface TextAreaInputProps {
  name: string;
  code: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  max?: number;
  min?: number;
  rows?: number;
  label?: string;
  hint?: string;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  name,
  code,
  value,
  onChange,
  placeholder,
  required = false,
  max,
  min,
  rows = 4,
  label,
  hint,
  error
}) => {
  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-2">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={code}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={max}
        minLength={min}
        rows={rows}
        className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400 resize-none"
      />
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextAreaInput; 