import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  borderRadius?: 'sm' | 'md' | 'lg';
}

interface StyledCardProps {
  $elevation?: CardProps['elevation'];
  $padding?: CardProps['padding'];
  $borderRadius?: CardProps['borderRadius'];
}

const StyledCard = styled.div<StyledCardProps>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme, $borderRadius = 'md' }) => theme.borderRadius[$borderRadius]};
  box-shadow: ${({ theme, $elevation = 'md' }) =>
    $elevation === 'none' ? 'none' : theme.shadows[$elevation]};
  padding: ${({ theme, $padding = 'md' }) => theme.spacing[$padding]};
  overflow: hidden;
`;

const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardBody = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export interface CompoundCard extends React.FC<CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

export const Card = Object.assign(
  ({ children, elevation, padding, borderRadius }: CardProps) => (
    <StyledCard
      $elevation={elevation}
      $padding={padding}
      $borderRadius={borderRadius}
    >
      {children}
    </StyledCard>
  ),
  {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter,
  }
) as CompoundCard; 