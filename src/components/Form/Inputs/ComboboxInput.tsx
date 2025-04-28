import React from 'react';
import { Combobox as HeadlessCombobox, ComboboxInput as HeadlessComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';

interface ComboboxInputProps {
  name: string;
  code: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
  hint?: string;
}

const ComboboxInput: React.FC<ComboboxInputProps> = ({
  name,
  code,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  error,
  label,
  hint
}) => {
  const [query, setQuery] = React.useState('');

  const filteredOptions = query === ''
    ? options
    : options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="relative">
      <HeadlessCombobox 
        value={value} 
        onChange={onChange} 
        name={name}
        onClose={() => setQuery('')}
      >
        {label && (
          <label className="block text-base font-medium text-gray-600 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <HeadlessComboboxInput
            id={code}
            aria-label={label || placeholder}
            className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            displayValue={(option: string) => option}
            placeholder={placeholder}
            required={required}
          />
          <ComboboxButton className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </ComboboxButton>
          <ComboboxOptions 
            anchor="bottom"
            className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
          >
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="px-5 py-3 text-lg text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <ComboboxOption
                  key={option}
                  value={option}
                  className="group flex items-center gap-2 px-5 py-3 text-lg cursor-pointer data-focus:bg-gray-50 data-selected:bg-teal-50 data-selected:text-teal-700"
                >
                  {({ selected }) => (
                    <>
                      <span className="block truncate">{option}</span>
                      {selected && (
                        <svg 
                          className="w-5 h-5 text-teal-600 invisible group-data-selected:visible" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </HeadlessCombobox>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ComboboxInput; 