# Headless UI Component Library

A modern, themeable UI component library built with React, TypeScript, and styled-components. This library provides a set of customizable components with token-driven styling.

## Features

- 🎨 Fully themeable components using design tokens
- 🚀 Built with React and TypeScript
- 💅 Styled with styled-components
- 📦 Modern build setup with Vite
- 🎯 Focused on accessibility and usability
- 🔄 Smooth animations and transitions

## Components

The library includes the following components:

### Button
- Multiple variants (primary, secondary, outline)
- Different sizes (sm, md, lg)
- Loading state
- Full width option

### Card
- Compound component with Header, Body, and Footer
- Customizable elevation
- Flexible padding options
- Border radius variants

### Input
- Multiple variants (outline, filled)
- Different sizes
- Error and success states
- Icon support (left/right)
- Full width option

### Select
- Custom dropdown implementation
- Multiple sizes
- Keyboard navigation
- Customizable options

### Modal
- Portal-based implementation
- Multiple sizes
- Customizable animations
- Close on overlay/escape
- Accessible focus management

### Toast
- Multiple variants (info, success, warning, error)
- Auto-dismiss functionality
- Custom duration
- Smooth animations
- Global toast management

## Installation

```bash
npm install @your-org/ui-library
```

## Usage

1. Wrap your application with the ThemeProvider:

```tsx
import { ThemeProvider, defaultTheme } from '@your-org/ui-library';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

2. Import and use components:

```tsx
import { Button, Card, Input, Select, Modal, Toast } from '@your-org/ui-library';

function YourComponent() {
  return (
    <div>
      <Button variant="primary" size="md">
        Click me
      </Button>
      
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>Content</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
      
      <Input 
        placeholder="Enter text"
        variant="outline"
        size="md"
      />
    </div>
  );
}
```

## Theming

The library uses a token-based theming system. You can customize the theme by extending or modifying the default theme:

```tsx
import { ThemeTokens, defaultTheme } from '@your-org/ui-library';

const customTheme: ThemeTokens = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
  },
};
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build: `npm run build`

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## License

MIT © [Your Name]
