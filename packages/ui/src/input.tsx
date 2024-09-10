"use client";

import { ReactNode } from "react";

interface InputProps {
  children: ReactNode;
  onClick: () => void;
}

export const Input = ({ onClick, children }: InputProps) => {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-gray-700/50 bg-transparent px-2">
      {children}
    </input>
  );
};
