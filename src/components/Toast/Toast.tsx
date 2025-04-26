import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const getVariantStyles = (variant: ToastVariant = 'info') => {
  const variants = {
    info: css`
      background-color: ${({ theme }) => theme.colors.info};
      color: white;
    `,
    success: css`
      background-color: ${({ theme }) => theme.colors.success};
      color: white;
    `,
    warning: css`
      background-color: ${({ theme }) => theme.colors.warning};
      color: white;
    `,
    error: css`
      background-color: ${({ theme }) => theme.colors.error};
      color: white;
    `,
  };
  return variants[variant];
};

const ToastContainer = styled.div<{ variant: ToastVariant; $isVisible: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  min-width: 300px;
  max-width: 400px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${({ $isVisible }) => ($isVisible ? slideIn : slideOut)} 
    ${({ theme }) => theme.transitions.normal} ease-in-out;
  ${({ variant }) => getVariantStyles(variant)}
  z-index: 1100;
`;

const Message = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  margin-left: ${({ theme }) => theme.spacing.md};
  opacity: 0.8;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: 1;
  
  &:hover {
    opacity: 1;
  }
`;

const getIcon = (variant: ToastVariant) => {
  switch (variant) {
    case 'info':
      return 'ℹ️';
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'error':
      return '❌';
    default:
      return '';
  }
};

const Icon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 5000,
  onClose,
  isVisible,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <ToastContainer variant={variant} $isVisible={isVisible}>
      <Icon>{getIcon(variant)}</Icon>
      <Message>{message}</Message>
      <CloseButton onClick={onClose} aria-label="Close toast">
        ×
      </CloseButton>
    </ToastContainer>
  );
}; 