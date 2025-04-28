import React, { useState } from 'react';

interface DocumentInputProps {
  name: string;
  code: string;
  onChange: (file: File | null) => void;
  required?: boolean;
  error?: string;
  label?: string;
  filetype?: string[];
  hint?: string;
}

const DocumentInput: React.FC<DocumentInputProps> = ({
  name,
  code,
  onChange,
  required = false,
  error,
  label,
  filetype,
  hint
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange(file);
      setFileName(file.name);
    } else {
      onChange(null);
      setFileName('');
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-600 mb-2">
          {label}
        </label>
      )}
      <input
        type="file"
        name={name}
        id={code}
        onChange={handleFileChange}
        required={required}
        accept={filetype?.join(',')}
        className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-base file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 placeholder-gray-400"
      />
      {fileName && (
        <div className="mt-2 text-sm text-gray-600">
          Selected: {fileName}
        </div>
      )}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default DocumentInput; 