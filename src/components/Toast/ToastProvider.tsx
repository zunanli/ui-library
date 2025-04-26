import React, { createContext, useContext } from 'react';
import { Toast } from './Toast';
import { useToast } from '../../hooks/useToast';

interface ToastContextValue {
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, hideToast, success, error, warning, info } = useToast();

  return (
    <ToastContext.Provider value={{ success, error, warning, info }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          onClose={() => hideToast(toast.id)}
          isVisible={toast.isVisible}
        />
      ))}
    </ToastContext.Provider>
  );
}; 