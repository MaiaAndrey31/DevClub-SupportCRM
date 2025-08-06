import styled from 'styled-components';
import theme from '../../styles/theme';

export const statusColors = {
  'sócio de prata': `${theme.colors.prata}`,
  'sócio de ouro': `${theme.colors.ouro}`,
  'sócio diamante': `${theme.colors.diamante}`,
  'freelancer 10k': `${theme.colors.freelancer}`,
  'abacatão': `${theme.colors.abacatão}`,
  'baby dev': `${theme.colors.babyDev}`,
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: ${({ color }) => color || '#6c757d'};
  color:${theme.colors.primaryDark};
  @media (max-width: 500px) {
    font-size: 0.67rem;
    padding: 0.3rem 0.6rem;
  }
`;