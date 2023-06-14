import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
}: ButtonProps) => {
  return (
    <div className={`font-medium border-2 tracking-wider border-t-neutral-700 border-x-neutral-700 border-b-neutral-900 bg-neutral-600 py-2 px-4 ${className ? className : ''} rounded-md`}>{children}</div>
  );
};

export default Button;
