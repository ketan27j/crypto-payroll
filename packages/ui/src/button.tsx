"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick} 
      disabled={disabled} 
      className={`px-4 py-2 rounded-md ${
        disabled
        ? 'text-grey-700 bg-gray-400 cursor-not-allowed'
        : 'text-white bg-gray-800 hover:bg-gray-700'}`}>
      {children}
    </button>
  );
};
