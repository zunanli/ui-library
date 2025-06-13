import React from 'react';
import classNames from 'classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'ui-button',
        `ui-button--${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}; 