import React from 'react';

interface EmailInputProps {
  name: string;
  code: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  label?: string;
  hint?: string;
  error?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  name,
  code,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
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
      <input
        type="email"
        name={name}
        id={code}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
      />
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default EmailInput; 