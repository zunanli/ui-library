import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

interface StyledModalProps {
  $size?: ModalProps['size'];
  $isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translate(-50%, -60%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} ${({ theme }) => theme.transitions.normal} ease-out;
`;

const getModalSize = (size: ModalProps['size'] = 'md') => {
  const sizes = {
    sm: css`
      max-width: 400px;
    `,
    md: css`
      max-width: 600px;
    `,
    lg: css`
      max-width: 800px;
    `,
  };
  return sizes[size];
};

const ModalContent = styled.div<StyledModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 90%;
  animation: ${slideIn} ${({ theme }) => theme.transitions.normal} ease-out;
  ${({ $size }) => getModalSize($size)}
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay
      $isOpen={isOpen}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <ModalContent
        $size={size}
        $isOpen={isOpen}
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            ×
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
}; 