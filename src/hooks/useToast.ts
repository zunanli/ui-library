import { useState, useCallback } from 'react';
import { ToastVariant } from '../components/Toast/Toast';

interface ToastState {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  isVisible: boolean;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback(
    (message: string, options?: { variant?: ToastVariant; duration?: number }) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastState = {
        id,
        message,
        variant: options?.variant || 'info',
        duration: options?.duration || 5000,
        isVisible: true,
      };

      setToasts(currentToasts => [...currentToasts, newToast]);

      return id;
    },
    []
  );

  const hideToast = useCallback((id: string) => {
    setToasts(currentToasts =>
      currentToasts.map(toast =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    // Remove the toast from the array after animation
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  const success = useCallback(
    (message: string, duration?: number) =>
      showToast(message, { variant: 'success', duration }),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) =>
      showToast(message, { variant: 'error', duration }),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) =>
      showToast(message, { variant: 'warning', duration }),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) =>
      showToast(message, { variant: 'info', duration }),
    [showToast]
  );

  return {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info,
  };
}; 