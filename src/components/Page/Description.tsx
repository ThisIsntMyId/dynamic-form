import React from 'react';

interface DescriptionProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children }) => {
  return (
    <div className="text-lg font-normal text-gray-800 mb-8 text-left max-w-xl w-full">
      {children}
    </div>
  );
};

export default Description; 