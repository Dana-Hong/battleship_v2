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
    <div className={`inline-block border py-2 px-4 ${className}`}>{children}</div>
  );
};

export default Button;
