import { ReactNode } from 'react';

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
}

// Input Types
export type InputVariant = 'outline' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  success?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

// Select Types
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  size?: InputSize;
  fullWidth?: boolean;
}

// Card Types
export type CardElevation = 'none' | 'sm' | 'md' | 'lg';
export type CardPadding = 'sm' | 'md' | 'lg';
export type CardBorderRadius = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: ReactNode;
  elevation?: CardElevation;
  padding?: CardPadding;
  borderRadius?: CardBorderRadius;
}

// Modal Types
export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Toast Types
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: () => void;
  isVisible: boolean;
} 