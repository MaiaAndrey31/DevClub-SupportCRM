import { useState } from 'react';
import BonusForm from '../../components/bonus/BonusForm';
import BonusList from '../../components/bonus/BonusList';
import Logo from '../../assets/logo.jpg';

import {
  PageContainer,
  ContentContainer,
  Header,
  Title,
  Subtitle,
  Card,
  TabsContainer,
  TabsList,
  TabButton,
  TabContent,
  SectionTitle,
  SectionDescription
} from './styles';

const RegisterBonus = () => {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <PageContainer>
      <ContentContainer>
        <Header>
            <img src={Logo} alt="Logo" />
          <Title>Sistema de Bônus</Title>
          <Subtitle>
            Cadastre ou consulte os bônus de acesso concedidos
          </Subtitle>
        </Header>

        <Card>
          <TabsContainer>
            <TabsList>
              <TabButton
                $isActive={activeTab === 'register'}
                onClick={() => setActiveTab('register')}
              >
                Cadastrar Novo Bônus
              </TabButton>
              <TabButton
                $isActive={activeTab === 'list'}
                onClick={() => setActiveTab('list')}
              >
                Lista de Bônus
              </TabButton>
            </TabsList>
          </TabsContainer>

          <TabContent>
            {activeTab === 'register' ? (
              <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
                <SectionTitle>Cadastro de Bônus</SectionTitle>
                <BonusForm />
              </div>
            ) : (
              <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
                <SectionTitle>Bônus Cadastrados</SectionTitle>
                <BonusList />
              </div>
            )}
          </TabContent>
        </Card>
      </ContentContainer>
    </PageContainer>
  );
};

export default RegisterBonus;
