import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testPayload = {
  nome: "Teste Webhook",
  email: "teste@devclub.com.br",
  trophyType: "ouro",
  status: "teste",
  rastreio: "BR000000000BR"
};

const options = {
  hostname: 'n8n-webhook.sako8u.easypanel.host',
  path: '/webhook/181f9533-4319-4603-b713-97c42031efad',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Request-ID': 'test-' + Date.now(),
    'X-Origin': 'devclub-crm-cli-tester'
  }
};

console.log('Enviando requisição para o webhook...');
console.log('URL:', `https://${options.hostname}${options.path}`);
console.log('Payload:', JSON.stringify(testPayload, null, 2));

const req = https.request(options, (res) => {
  console.log('\n=== RESPOSTA DO SERVIDOR ===');
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\n=== CORPO DA RESPOSTA ===');
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
      console.log(data);
    }
    
    if (res.statusCode >= 400) {
      console.error('\n❌ Erro na requisição:', res.statusMessage);
      process.exit(1);
    } else {
      console.log('\n✅ Webhook testado com sucesso!');
      process.exit(0);
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Erro na requisição:', error.message);
  process.exit(1);
});

req.write(JSON.stringify(testPayload));
req.end();
