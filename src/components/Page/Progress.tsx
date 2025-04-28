import React from 'react';

interface ProgressProps {
  progress?: number;
}

const Progress: React.FC<ProgressProps> = ({ progress = 0 }) => {
  return (
    <div className="w-full max-w-xl mb-12 flex flex-col items-center">
      <div className="w-full">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-teal-600 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Progress; 