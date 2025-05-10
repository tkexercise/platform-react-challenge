import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'action' | 'outline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, ...props }, ref) => {
    let buttonClass = 'flex items-center gap-2 px-6 py-4 rounded-md font-medium cursor-pointer ';

    switch (variant) {
      case 'outline':
        buttonClass += 'border border-action text-gray-700 hover:bg-action/10';
        break;
      default:
        buttonClass += 'bg-action text-white hover:bg-action/80';
        break;
    }

    if (className) {
      buttonClass += ' ' + className;
    }

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

export default Button;
