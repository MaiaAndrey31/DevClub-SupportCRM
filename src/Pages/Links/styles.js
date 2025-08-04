import styled, { keyframes } from 'styled-components';
import theme from "../../styles/theme";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Layout = styled.div`
  background: linear-gradient(135deg, #000c24 0%, #3e5c9e 100%);
  min-height: 100vh;
  padding: 2rem;
  color: ${theme.colors.text};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${theme.colors.primaryDark};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  color: ${theme.colors.accent};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

export const LinkCard = styled.div`
  background: ${theme.colors.purple};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  transition: all 0.2s ease;
  border: 1px solid ${theme.colors.ac};
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.accent};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LinkIcon = styled.div`
  font-size: 1.5rem;
  color: ${theme.colors.accent};
`;

export const LinkContent = styled.div`
  flex: 1;
`;

export const LinkTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${theme.colors.accent};
  font-size: 1rem;
`;

export const LinkDescription = styled.p`
  margin: 0;
  color: ${theme.colors.textLight};
  font-size: 0.7rem;
  word-break: break-all;
`;

export const CopiedMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${theme.colors.accent};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  font-weight: 500;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: auto;
  padding-left: 1rem;
`;

export const ActionButton = styled.button`
  background: ${theme.colors.primaryDark};
  border: none;
  color: ${({ $danger }) => $danger ? '#ff6b6b' : theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 0.6rem;
  font-weight: 600;

  &:hover {
    background: ${({ $danger }) => $danger ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
    opacity: 1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none !important;
  }

  svg {
    display: block;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${theme.colors.accent};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${theme.colors.accentDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  svg {
    display: block;
  }
`;