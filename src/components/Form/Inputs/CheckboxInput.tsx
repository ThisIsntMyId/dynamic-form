import React from 'react';

interface CheckboxInputProps {
  name: string;
  code: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  required?: boolean;
  error?: string;
  label?: string;
  hint?: string;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  code,
  value,
  onChange,
  options,
  required = false,
  error,
  label,
  hint
}) => {
  const handleChange = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-4">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const checked = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleChange(option)}
              className={`w-full flex items-center px-6 py-4 text-lg border transition-all
                ${checked ? 'border-black bg-white' : 'border-gray-300 bg-white hover:border-teal-400'}
                rounded-xl focus:outline-none`}
              style={{ fontWeight: checked ? 500 : 400 }}
            >
              <span className={`mr-4 flex items-center justify-center w-6 h-6 border-2 rounded-md
                ${checked ? 'border-teal-700 bg-teal-700' : 'border-gray-400 bg-white'}`}
              >
                {checked && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CheckboxInput; 