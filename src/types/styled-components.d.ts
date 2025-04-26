import 'styled-components';
import { ThemeTokens } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTokens {}
} 