import styled from 'styled-components';
import theme from '../../styles/theme';

// Criando o componente Card localmente já que não existe no projeto
const BaseCard = styled.div`
  background: ${theme.colors.primaryDark};
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const PageContainer = styled.div`
  min-height: 100%;
  background-color: linear-gradient(135deg, #000c24 0%, #3e5c9e 100%);
  padding: 1rem .5rem;
  
  @media (min-width: 640px) {
    padding: 2rem;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  img {
    width: 50px;
    height: 50px;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-family: "Lucida Console", Monaco, monospace;
  font-weight: 700;
  color: ${theme.colors.text};
  
`;

export const Subtitle = styled.p`
  color: ${theme.colors.accent};
  font-size: 1rem;
  font-weight: 600;
`;

export const Card = styled(BaseCard)`
  overflow: hidden;
`;

export const TabsContainer = styled.div`
  border-bottom: 1px groove ${theme.colors.purple};
`;

export const TabsList = styled.nav`
  display: flex;
  gap: 1rem;
`;

export const TabButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  color: ${({ $isActive }) => 
    $isActive 
      ? (theme.colors.accent ) 
      : (theme.colors.white)};
  border-bottom: 1px groove ${({ $isActive }) => 
    $isActive 
      ? (theme.colors.accent) 
      : 'none'};
  background: none;
  
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.dark || '#2c3e50'};
  }
`;

export const TabContent = styled.div`
  padding: 1rem;
  
  @media (min-width: 640px) {
    padding: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
  color: ${theme.colors.accent};
  margin-bottom: 1rem;
`;

export const SectionDescription = styled.p`
  color: ${ theme.colors.dark};
  font-size: 0.75rem;
  margin-bottom: 1rem;
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.dark || '#2c3e50'};
  margin-bottom: 0.5rem;
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors?.dark || '#2c3e50'};
  font-size: 0.875rem;
`;

export const SectionHeader = styled.div`
text-align: center;
  margin-bottom: 1rem;
  border-radius: 6px;
`;

export const SectionTitleLarge = styled.h2` 
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  margin: 0;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 20px;
  width: 100%;
  max-width: 300px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 1rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 0.375rem;
  border: 1px groove ${theme.colors.abacatão};
  background-color: ${theme.colors.primaryDark};
  color: ${theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 1px ${theme.colors.accent};
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.accent};
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SectionDescriptionSmall = styled.p`
  color: ${theme.colors.accent};
  font-size: 0.875rem;`