import { useState } from 'react';
import { BonusList } from '../../components/bonus/BonusList';
import { updateBonusStatus } from '../../services/bonusService';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import {
  PageContainer,
  ContentContainer,
  Card,
  SectionHeader,
  SectionTitleLarge,
  SearchContainer,
  SearchInput,
  SearchIcon
} from './styles';
import Header from '../../components/Header';

const ManageBonus = () => {
  
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await updateBonusStatus(id, newStatus);
      if (result.success) {
        toast.success(`Status atualizado para ${newStatus} com sucesso!`);
        setRefreshKey(prev => prev + 1); // Trigger a refresh of the list
      } else {
        throw new Error('Falha ao atualizar status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    }
  };

  const status = "connected";

  return (
    <>
    <Header page="Gerenciamento de Bônus" status={status}/>
    <PageContainer>
      <ContentContainer>
        <Card>
          <SectionHeader>
            <SectionTitleLarge>Lista de Bônus</SectionTitleLarge>
            <SearchContainer>
              <SearchIcon>
                <FiSearch size={20} color="#666" />
              </SearchIcon>
              <SearchInput 
                type="text" 
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
          </SectionHeader>
          
          <BonusList 
            isEditable={true} 
            onStatusChange={handleStatusChange}
            searchTerm={searchTerm}
            key={refreshKey}
          />
        </Card>
      </ContentContainer>
    </PageContainer>
    </>
  );
};

export default ManageBonus;
