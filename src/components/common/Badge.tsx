import React from 'react';

export type BadgeVariant = 'pink' | 'blue' | 'green';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'pink', className, ...props }) => {
  let badgeClass = 'px-2 py-1 text-xs font-medium rounded ';

  switch (variant) {
    case 'blue':
      badgeClass += 'bg-blue-100 text-blue-800';
      break;
    case 'green':
      badgeClass += 'bg-green-100 text-green-800';
      break;
    default:
      badgeClass += 'bg-pink-100 text-pink-800';
      break;
  }

  if (className) {
    badgeClass += ' ' + className;
  }

  return (
    <span className={badgeClass} {...props}>
      {children}
    </span>
  );
};

export default Badge;
