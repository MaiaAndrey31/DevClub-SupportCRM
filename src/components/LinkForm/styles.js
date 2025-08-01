import styled from 'styled-components';
import theme from '../../styles/theme';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: ${theme.colors.primaryDark};
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border: 1px solid ${theme.colors.accent};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
  
  h3 {
    margin: 0;
    color: ${theme.colors.text};
    font-size: 1.25rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  
  .error-message {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${theme.colors.textLight};
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
  
  &::placeholder {
    color: ${theme.colors.textLight};
    opacity: 0.6;
  }
  
  &[type="url"] {
    font-family: monospace;
  }
  
  &.error {
    border-color: #ff6b6b;
  }
  
  &[readonly] {
    background: ${theme.colors.primaryLight};
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.colors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:hover {
    background: ${theme.colors.accentDark};
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: ${theme.colors.border};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: ${theme.colors.textLight};
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${theme.colors.primaryLight};
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.textLight};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    color: ${theme.colors.accent};
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`;

// Additional styles for form elements
export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
  
  option {
    padding: 0.5rem;
    background: ${theme.colors.primaryDark};
  }
`;

export const TextArea = styled.textarea`
  ${Input.styles}
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
`;
