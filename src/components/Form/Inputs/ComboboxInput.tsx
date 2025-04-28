import React, { useState, useRef, useEffect } from 'react';

interface ComboboxInputProps {
  name: string;
  code: string;
  value: string | null;
  onChange: (value: string | null) => void;
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
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = query === ''
    ? options
    : options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }

  function handleSelect(option: string) {
    onChange(option);
    setQuery(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }

  // Keep input value in sync with selected value
  useEffect(() => {
    if (value && value !== query) {
      setQuery(value);
    }
    if (!value && query !== '') {
      setQuery('');
    }
  }, [value]);

  return (
    <div className="relative">
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-2" htmlFor={code}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          id={code}
          name={name}
          className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
          placeholder={placeholder}
          required={required}
          value={query}
          autoComplete="off"
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-controls={`${code}-listbox`}
          aria-expanded={isOpen}
          aria-activedescendant={highlightedIndex >= 0 ? `${code}-option-${highlightedIndex}` : undefined}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle dropdown"
        >
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
        </button>
        {isOpen && (
          <div
            ref={listRef}
            id={`${code}-listbox`}
            role="listbox"
            className="absolute left-0 right-0 w-full z-10 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-5 py-3 text-lg text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option, idx) => (
                <div
                  id={`${code}-option-${idx}`}
                  key={option}
                  role="option"
                  aria-selected={value === option}
                  className={`group flex items-center gap-2 px-5 py-3 text-lg cursor-pointer ${
                    idx === highlightedIndex ? 'bg-gray-50' : ''
                  } ${value === option ? 'bg-teal-50 text-teal-700' : ''}`}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                >
                  <span className="block truncate">{option}</span>
                  {value === option && (
                    <svg
                      className="w-5 h-5 text-teal-600"
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
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ComboboxInput; 