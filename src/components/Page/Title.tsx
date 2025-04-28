import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h2 className="text-4xl font-bold mb-3 text-left max-w-xl w-full">
      {children}
    </h2>
  );
};

export default Title; 