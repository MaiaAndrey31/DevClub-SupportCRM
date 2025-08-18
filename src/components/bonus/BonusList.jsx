import { useEffect, useState } from 'react';
import { getBonusList } from '../../services/bonusService';
import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  StatusBadge,
  ActionButton
} from './styles';

export const BonusList = ({ isEditable = false, onStatusChange, searchTerm = '' }) => {
  const [bonusList, setBonusList] = useState([]);
  const [filteredBonusList, setFilteredBonusList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBonusList = async () => {
    try {
      const data = await getBonusList();
      setBonusList(data);
      filterBonusList(data, searchTerm);
    } catch (error) {
      console.error('Error loading bonus list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBonusList = (list, term) => {
    if (!term.trim()) {
      setFilteredBonusList(list);
      return;
    }

    const searchLower = term.toLowerCase();
    const filtered = list.filter(item => 
      item.nome?.toLowerCase().includes(searchLower) || 
      item.email?.toLowerCase().includes(searchLower)
    );
    setFilteredBonusList(filtered);
  };

  useEffect(() => {
    filterBonusList(bonusList, searchTerm);
  }, [searchTerm, bonusList]);

  useEffect(() => {
    loadBonusList();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    if (onStatusChange) {
      await onStatusChange(id, newStatus);
      await loadBonusList(); // Refresh the list after status update
    }
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '1rem 0' }}>Carregando...</div>;
  }

  const displayList = searchTerm ? filteredBonusList : bonusList;

  if (bonusList.length === 0) {
    return <div style={{ textAlign: 'center', padding: '1rem 0', color: '#6b7280' }}>Nenhum bônus cadastrado.</div>;
  }

  return (
    <TableContainer>
      <StyledTable>
        <TableHeader>
          <tr>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>E-mail</TableHeaderCell>
            <TableHeaderCell>Bônus</TableHeaderCell>
            <TableHeaderCell>Atendente</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            {isEditable && <TableHeaderCell>Ações</TableHeaderCell>}
          </tr>
        </TableHeader>
        <tbody>
          {displayList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.bonus}</TableCell>
              <TableCell>{item.atendente}</TableCell>
              <TableCell>
                <StatusBadge $status={item.status}>
                  {item.status}
                </StatusBadge>
              </TableCell>
              {isEditable && (
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActionButton
                      $variant="approve"
                      onClick={() => handleStatusChange(item.id, 'Aprovado')}
                      disabled={item.status === 'Aprovado'}
                    >
                      Aprovar
                    </ActionButton>
                    
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default BonusList;
