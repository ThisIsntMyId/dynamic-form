import React from 'react';
import type { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <div className="text-lg font-normal text-gray-800 mt-4 mb-12 text-left max-w-xl w-full">
      {children}
    </div>
  );
};

export default Footer; 