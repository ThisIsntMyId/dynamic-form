import React from 'react';
import type { ReactNode, FormEvent } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form 
      className="w-full max-w-xl flex flex-col gap-7"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form; 