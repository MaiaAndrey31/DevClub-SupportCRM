import styled from 'styled-components';
import theme from '../../styles/theme';

export const statusColors = {
  'novo pedido': `${theme.colors.primaryDark}`,
  'em produção': `${theme.colors.purple}`,
  'enviado': `${theme.colors.accent}`,
  'entregue': `${theme.colors.diamante}`,
  'cancelado': `${theme.colors.danger}`,
  'na fila para produção': `${theme.colors.ouro}`,
  'etiqueta gerada': `${theme.colors.abacatão}`,
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: ${({ color }) => color || '#6c757d'};
  color: #fff;
  @media (max-width: 500px) {
    font-size: 0.67rem;
    padding: 0.3rem 0.6rem;
  }
`;