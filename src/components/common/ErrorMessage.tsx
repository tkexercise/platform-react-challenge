import React from 'react';
import { IconAlertCircle } from '@tabler/icons-react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'Failed to load data. Please refresh the page.',
  className,
}) => {
  return (
    <div
      className={`flex items-center gap-2 text-red-600 border-red border 
        bg-red-600/10 mt-2 bg-red-50 p-4 rounded-md w-1/2 mx-auto my-6  
        ${className || ''}`}
    >
      <IconAlertCircle size={24} />
      <span>{message}</span>
    </div>
  );
};
