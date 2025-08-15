import styled from 'styled-components';
import theme from '../../styles/theme';

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  background: ${theme.colors.primaryDark};
  border: 2px groove ${theme.colors.purple};
  border-radius: 8px;
  box-shadow: 0 0 15px ${theme.colors.primaryLight};
`;
  


export const FormGroup = styled.div`
  margin-bottom: .5rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.87rem;
  font-weight: 500;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  color: ${theme.colors.text};
  background: rgba(255, 255, 255, 0.35) ;
  border: 2px groove ${theme.colors.accent};
  border-radius: 6px;
  font-size: 0.87rem;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${theme.colors.primaryDark};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.purple};
    box-shadow: 0 0  20px ${theme.colors.purple};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  color: ${theme.colors.text};
  border: 1px groove ${theme.colors.accent};
  border-radius: 6px;
  font-size: 0.87rem;
  background: rgba(255, 255, 255, 0.35) ;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.purple};
    box-shadow: 0 0 15px ${theme.colors.purple};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.accent};
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${theme.colors.abacatão};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.primaryDark};
`;

export const TableHeader = styled.thead`
  background-color: ${theme.colors.purple};
  
`;

export const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableRow = styled.tr`
  border-bottom: 1px groove ${theme.colors.accent};
  text-align: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: ${theme.colors.text};
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  
  ${({ $status }) => {
    switch ($status) {
      case 'Aprovado':
        return `
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text};
        `;
      case 'Pendente':
        return `
          background-color: ${theme.colors.ouro};
          color: ${theme.colors.primaryDark};
        `;
    }
  }}
`;

export const ActionButton = styled.button`
  padding: 0.375rem 0.75rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'approve':
        return `
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text};
          
          &:hover {
            background-color: ${theme.colors.abacatão};
          }
          
          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `;
      case 'reject':
        return `
          background-color: ${theme.colors.warning};
          color: ${theme.colors.dark};
          
          &:hover {
            background-color: ${theme.colors.abacatão};
          }
          
          &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `;
      default:
        return '';
    }
  }}
`;