import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const WebhookTester = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const testWebhook = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const testPayload = {
        id: 'test-' + Date.now(),
        nome: "Teste Webhook",
        email: "teste@devclub.com.br",
        trophyType: "ouro",
        status: "teste",
        rastreio: "BR000000000BR"
      };

      const webhookUrl = '/api/webhook';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': testPayload.id,
          'X-Origin': 'devclub-crm-painel-tester'
        },
        body: JSON.stringify(testPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      const responseData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const error = new Error(`Erro ${response.status}: ${response.statusText}`);
        error.response = { status: response.status, data: responseData };
        throw error;
      }
      
      setResponse({
        status: response.status,
        data: responseData
      });
      
      toast.success('Webhook testado com sucesso!');
    } catch (error) {
      console.error('Erro ao testar webhook:', error);
      setError({
        message: error.message,
        response: error.response,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
      toast.error(`Erro: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h3>Testar Webhook</h3>
      <Button onClick={testWebhook} disabled={isLoading}>
        {isLoading ? 'Testando...' : 'Testar Webhook'}
      </Button>
      
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h4>Resposta:</h4>
          <pre style={{
            background: '#f0f0f0',
            padding: '10px',
            borderRadius: '4px',
            overflowX: 'auto'
          }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
      
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <h4>Erro:</h4>
          <pre style={{
            background: '#fff0f0',
            padding: '10px',
            borderRadius: '4px',
            overflowX: 'auto'
          }}>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </Container>
  );
};

export default WebhookTester;
