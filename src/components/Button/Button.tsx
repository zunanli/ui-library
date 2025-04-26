import React from 'react';
import styled from 'styled-components';
import { ButtonProps, ButtonVariant, ButtonSize } from '../../types/components';
import { ThemeTokens } from '../../types/theme';

interface StyledButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $isLoading?: boolean;
  $isFullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant, theme: ThemeTokens) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${theme.colors.primary};
        color: white;
        border: none;
        &:hover {
          background-color: ${theme.colors.info};
        }
      `;
    case 'secondary':
      return `
        background-color: ${theme.colors.secondary};
        color: white;
        border: none;
        &:hover {
          opacity: 0.9;
        }
      `;
    case 'outline':
      return `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background-color: ${theme.colors.surface};
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize, theme: ThemeTokens) => {
  switch (size) {
    case 'sm':
      return `
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.fontSize.sm};
      `;
    case 'md':
      return `
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.md};
      `;
    case 'lg':
      return `
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSize.lg};
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $variant = 'primary', theme }) => getVariantStyles($variant, theme)}
  ${({ $size = 'md', theme }) => getSizeStyles($size, theme)}
`;

const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  margin-right: ${({ theme }) => theme.spacing.xs};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isLoading={isLoading}
      $isFullWidth={isFullWidth}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
}; 