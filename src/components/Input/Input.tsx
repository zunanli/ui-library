import React from 'react';
import styled, { css } from 'styled-components';

type BaseInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends BaseInputProps {
  error?: boolean;
  success?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

interface StyledInputWrapperProps {
  $hasIcon: boolean;
  $iconPosition?: 'left' | 'right';
  $fullWidth?: boolean;
}

interface StyledInputProps {
  $error?: boolean;
  $success?: boolean;
  $size?: InputProps['size'];
  $variant?: InputProps['variant'];
  $hasIcon?: boolean;
  $iconPosition?: 'left' | 'right';
}

const getInputSize = (size: InputProps['size'] = 'md') => {
  const sizes = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
    `,
    md: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.typography.fontSize.md};
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    `,
  };
  return sizes[size];
};

const getInputVariant = (variant: InputProps['variant'] = 'outline') => {
  const variants = {
    outline: css`
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colors.secondary};
      &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}33`};
      }
    `,
    filled: css`
      background-color: ${({ theme }) => theme.colors.surface};
      border: 1px solid transparent;
      &:focus {
        background-color: ${({ theme }) => `${theme.colors.surface}cc`};
        border-color: ${({ theme }) => theme.colors.primary};
      }
    `,
  };
  return variants[variant];
};

const InputWrapper = styled.div<StyledInputWrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => ($position === 'left' ? 'left: 12px;' : 'right: 12px;')}
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.surface};
  }

  ${({ $size }) => getInputSize($size)}
  ${({ $variant }) => getInputVariant($variant)}
  
  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.error} !important;
      &:focus {
        box-shadow: 0 0 0 2px ${theme.colors.error}33;
      }
    `}
  
  ${({ $success, theme }) =>
    $success &&
    css`
      border-color: ${theme.colors.success} !important;
      &:focus {
        box-shadow: 0 0 0 2px ${theme.colors.success}33;
      }
    `}

  ${({ $hasIcon, $iconPosition, theme }) =>
    $hasIcon &&
    css`
      padding-${$iconPosition || 'left'}: ${theme.spacing.xl};
    `}
`;

export const Input: React.FC<InputProps> = ({
  icon,
  iconPosition = 'left',
  fullWidth,
  error,
  success,
  size,
  variant,
  ...props
}) => {
  // Remove custom props from being passed to the DOM element
  const inputProps = {
    ...props,
  };

  return (
    <InputWrapper $hasIcon={!!icon} $iconPosition={iconPosition} $fullWidth={fullWidth}>
      {icon && <IconWrapper $position={iconPosition}>{icon}</IconWrapper>}
      <StyledInput
        $error={error}
        $success={success}
        $size={size}
        $variant={variant}
        $hasIcon={!!icon}
        $iconPosition={iconPosition}
        {...inputProps}
      />
    </InputWrapper>
  );
}; 