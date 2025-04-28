import React from 'react';

interface DateInputProps {
  name: string;
  code: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  hint?: string;
  label?: string;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  name,
  code,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  hint,
  label,
  error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      onChange(e.target.value);
    } else {
      onChange(null);
    }
  };

  // Convert min/max values to YYYY-MM-DD format if they're not already
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return undefined;
    if (dateStr === 'today') {
      return new Date().toISOString().split('T')[0];
    }
    if (dateStr.includes('/')) {
      const [month, day, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

  const minDate = formatDate(min);
  const maxDate = formatDate(max);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-2">
          {label}
        </label>
      )}
      <input
        type="date"
        name={name}
        id={code}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        min={minDate}
        max={maxDate}
        className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400"
      />
      {hint && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default DateInput; 