import React from 'react';

interface NumberInputProps {
  name: string;
  code: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  required?: boolean;
  max?: number;
  min?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  hint?: string;
  error?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  name,
  code,
  value,
  onChange,
  placeholder,
  required = false,
  max,
  min,
  step = 0.01,
  prefix,
  suffix,
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
      <div className="relative">
        {prefix && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </div>
        )}
        <input
          type="number"
          name={name}
          id={code}
          value={value || ''}
          onChange={(e) => onChange(e.target.value || null)}
          placeholder={placeholder}
          required={required}
          max={max}
          min={min}
          step={step}
          className={`w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400 ${
            prefix ? 'pl-12' : ''
          } ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            {suffix}
          </div>
        )}
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default NumberInput; 