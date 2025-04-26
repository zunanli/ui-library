import { ThemeTokens } from '../types/theme';

export const defaultTheme: ThemeTokens = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    background: '#FFFFFF',
    surface: '#F3F4F6',
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
}; 