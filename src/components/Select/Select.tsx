import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

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
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

interface StyledSelectProps {
  $disabled?: boolean;
  $error?: boolean;
  $success?: boolean;
  $size?: SelectProps['size'];
  $fullWidth?: boolean;
}

const getSizeStyles = (size: SelectProps['size'] = 'md') => {
  const sizes = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
    `,
    md: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: ${({ theme }) => theme.typography.fontSize.md};
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
    `,
  };
  return sizes[size];
};

const SelectWrapper = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const StyledSelect = styled.div<StyledSelectProps>`
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  transition: all ${({ theme }) => theme.transitions.fast};
  user-select: none;
  
  ${({ $size }) => getSizeStyles($size)}
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${theme.colors.surface};
    `}
    
  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.error};
    `}
    
  ${({ $success, theme }) =>
    $success &&
    css`
      border-color: ${theme.colors.success};
    `}
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  ${({ $isSelected, theme }) =>
    $isSelected &&
    css`
      background-color: ${theme.colors.primary};
      color: white;
    `}
  
  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.primary : theme.colors.surface};
  }
`;

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%) rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &::before {
    content: '▼';
    font-size: 0.8em;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  success = false,
  size = 'md',
  fullWidth = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <SelectWrapper ref={wrapperRef} $fullWidth={fullWidth}>
      <StyledSelect
        onClick={() => !disabled && setIsOpen(!isOpen)}
        $disabled={disabled}
        $error={error}
        $success={success}
        $size={size}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronIcon $isOpen={isOpen} />
      </StyledSelect>
      <Dropdown $isOpen={isOpen}>
        {options.map(option => (
          <Option
            key={option.value}
            onClick={() => handleSelect(option)}
            $isSelected={option.value === value}
          >
            {option.label}
          </Option>
        ))}
      </Dropdown>
    </SelectWrapper>
  );
}; 