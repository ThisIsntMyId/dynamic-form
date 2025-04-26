import React, { useState } from 'react';

const DummyFormComponent = () => {
  // Demo state for radio and checkbox
  const [selectedRadio, setSelectedRadio] = useState('option2');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(['option2']);
  const [selectedCombo, setSelectedCombo] = useState('');
  const [fileName, setFileName] = useState('');

  const radioOptions = [
    { value: 'option1', label: 'Man' },
    { value: 'option2', label: 'Woman' },
    { value: 'option3', label: 'Transgender man' },
    { value: 'option4', label: 'Transgender woman' },
    { value: 'option5', label: 'Non-binary or non-conforming' },
    { value: 'option6', label: 'Another identity' },
    { value: 'option7', label: 'Decline to answer' },
  ];

  const checkboxOptions = [
    { value: 'c1', label: 'Pre-diabetes' },
    { value: 'c2', label: 'Diabetes' },
    { value: 'c3', label: 'Obesity' },
    { value: 'c4', label: 'Overweight' },
    { value: 'c5', label: 'None of the above' },
  ];

  const comboOptions = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
  ];

  const handleRadioChange = (value: string) => setSelectedRadio(value);
  const handleCheckboxChange = (value: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };
  const handleComboChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCombo(e.target.value);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-12 flex flex-col items-center">
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-teal-600 rounded-full transition-all duration-300" style={{ width: '40%' }} />
          </div>
        </div>
      </div>

      {/* Page Title */}
      <h2 className="text-4xl font-bold mb-3 text-left max-w-xl w-full">
        Demo Intake Form
      </h2>
      {/* Page Description */}
      <div className="text-lg font-normal text-gray-800 mb-8 text-left max-w-xl w-full">
        This is a sample page description. It provides context or instructions for this page of the form.
      </div>

      <form className="w-full max-w-xl flex flex-col gap-7">
        {/* Text Field */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2">First Name</label>
          <input type="text" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400" placeholder="Enter your first name" />
        </div>
        {/* Number Field */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2">Age</label>
          <input type="number" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400" placeholder="Enter your age" />
        </div>
        {/* Textarea Field */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2">About Yourself</label>
          <textarea className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400" rows={3} placeholder="Tell us something about yourself..." />
        </div>
        {/* Date Field */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2">Date of Birth</label>
          <input type="date" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400" />
        </div>
        {/* File Input */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2">Upload Document</label>
          <input type="file" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-base file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 placeholder-gray-400" onChange={handleFileChange} />
          {fileName && <div className="mt-2 text-sm text-gray-600">Selected: {fileName}</div>}
        </div>
        {/* Combobox/Select */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-2">Country</label>
          <select value={selectedCombo} onChange={handleComboChange} className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-gray-500 transition-colors placeholder-gray-400">
            {comboOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {/* Radio Group */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-4">Gender Identity</label>
          <div className="flex flex-col gap-3">
            {radioOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleRadioChange(opt.value)}
                className={`w-full text-left px-6 py-4 text-lg border transition-all
                  ${selectedRadio === opt.value
                    ? 'border-black bg-white'
                    : 'border-gray-300 bg-white hover:border-teal-400'}
                  rounded-xl focus:outline-none`}
                style={{ fontWeight: selectedRadio === opt.value ? 500 : 400 }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        {/* Checkbox Group */}
        <div>
          <label className="block text-base font-medium text-gray-600 mb-4">Family Conditions (check all that apply)</label>
          <div className="flex flex-col gap-3">
            {checkboxOptions.map((opt) => {
              const checked = selectedCheckboxes.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleCheckboxChange(opt.value)}
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
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* Next Button */}
        <button className="mt-2 w-full bg-teal-800 text-white py-4 px-4 rounded-full hover:bg-teal-900 transition-colors text-lg font-semibold" type="button">
          Next
        </button>
      </form>

      {/* Page Footer / Footnote */}
      <div className="text-lg font-normal text-gray-800 mt-4 mb-12 text-left max-w-xl w-full">
        This is a page-level note or footnote.
      </div>
    </div>
  );
};

export default DummyFormComponent; 