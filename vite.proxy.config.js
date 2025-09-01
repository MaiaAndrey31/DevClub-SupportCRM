import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://n8n.rodolfomori.com.br',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy Error:', {
              error: err.message,
              url: req?.url,
              method: req?.method
            });
            
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
            }
            
            res.end(JSON.stringify({
              error: 'Erro de conexão com o servidor',
              details: process.env.NODE_ENV === 'development' ? err.message : undefined
            }));
          });
          
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Enviando requisição para o webhook:', {
              method: req.method,
              url: req.url,
              headers: req.headers
            });
          });
          
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Resposta do webhook:', {
              statusCode: proxyRes.statusCode,
              statusMessage: proxyRes.statusMessage,
              url: req.url
            });
          });
        }
      }
    }
  }
});
