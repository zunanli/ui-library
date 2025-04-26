import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeTokens, defaultTheme } from './tokens';

interface ThemeProviderProps {
  theme?: ThemeTokens;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children,
}) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}; 