import 'styled-components';
import { ThemeTokens } from '../themes/tokens';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTokens {}
} 