import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from './themes/ThemeProvider';
import { defaultTheme } from './themes/tokens';
import {
  Button,
  Card,
  Input,
  Select,
  Modal,
  ToastProvider,
  useToastContext,
} from './components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DemoContent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const toast = useToastContext();

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Container>
      <h1>UI Component Library Demo</h1>

      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <ComponentGrid>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button isLoading>Loading Button</Button>
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Cards</SectionTitle>
        <ComponentGrid>
          <Card>
            <Card.Header>Card Title</Card.Header>
            <Card.Body>
              This is a simple card component with header, body, and footer sections.
            </Card.Body>
            <Card.Footer>Card Footer</Card.Footer>
          </Card>
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Inputs</SectionTitle>
        <ComponentGrid>
          <Input placeholder="Default Input" />
          <Input variant="filled" placeholder="Filled Input" />
          <Input error placeholder="Error Input" />
          <Input success placeholder="Success Input" />
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Select</SectionTitle>
        <ComponentGrid>
          <Select
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Choose an option"
          />
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>Modal</SectionTitle>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
        >
          <p>This is a modal dialog with customizable content.</p>
        </Modal>
      </Section>

      <Section>
        <SectionTitle>Toasts</SectionTitle>
        <ComponentGrid>
          <Button onClick={() => toast.info('This is an info message')}>
            Show Info Toast
          </Button>
          <Button onClick={() => toast.success('This is a success message')}>
            Show Success Toast
          </Button>
          <Button onClick={() => toast.warning('This is a warning message')}>
            Show Warning Toast
          </Button>
          <Button onClick={() => toast.error('This is an error message')}>
            Show Error Toast
          </Button>
        </ComponentGrid>
      </Section>
    </Container>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastProvider>
        <DemoContent />
      </ToastProvider>
    </ThemeProvider>
  );
};
