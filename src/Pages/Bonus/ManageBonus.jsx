import { useState, useEffect } from 'react';
import { BonusList } from '../../components/bonus/BonusList';
import { updateBonusStatus } from '../../services/bonusService';
import { toast } from 'react-toastify';
import { db } from '../../services/firebaseConnection';
import { collection, query, onSnapshot } from 'firebase/firestore';
import {
  PageContainer,
  ContentContainer,
  Card,
  SectionHeader,
  SectionTitleLarge,
} from './styles';
import Header from '../../components/Header';

const ManageBonus = () => {
  
  const [refreshKey, setRefreshKey] = useState(0);

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
            </SectionHeader>
          
          <BonusList 
            isEditable={true} 
            onStatusChange={handleStatusChange}
            key={refreshKey} // This will force a re-render when refreshKey changes
          />
        </Card>
      </ContentContainer>
    </PageContainer>
    </>
  );
};

export default ManageBonus;
