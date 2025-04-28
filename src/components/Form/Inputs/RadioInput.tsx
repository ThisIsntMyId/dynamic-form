import React from 'react';

interface RadioInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  label?: string;
  hint?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  value,
  onChange,
  options,
  error,
  label,
  hint
}) => {
  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-4">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`w-full flex items-center px-6 py-4 text-lg border transition-all
              ${value === option ? 'border-black bg-white' : 'border-gray-300 bg-white hover:border-teal-400'}
              rounded-xl focus:outline-none`}
            style={{ fontWeight: value === option ? 500 : 400 }}
          >
            <span className={`mr-4 flex items-center justify-center w-6 h-6 border-2 rounded-full
              ${value === option ? 'border-teal-700 bg-teal-700' : 'border-gray-400 bg-white'}`}
            >
              {value === option && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            {option}
          </button>
        ))}
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RadioInput; 