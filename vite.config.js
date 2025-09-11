import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync, existsSync } from 'fs'

// Vite plugin to copy _redirects and _headers files
const copyFilesPlugin = () => ({
  name: 'copy-files',
  closeBundle() {
    const filesToCopy = ['_redirects', '_headers']
    const publicDir = resolve(__dirname, 'public')
    const outDir = resolve(__dirname, 'dist')
    
    filesToCopy.forEach(file => {
      const srcPath = resolve(publicDir, file)
      if (existsSync(srcPath)) {
        const content = readFileSync(srcPath, 'utf-8')
        this.emitFile({
          type: 'asset',
          fileName: file,
          source: content
        })
      }
    })
  }
})

export default defineConfig(({ command, mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [
      react(),
      copyFilesPlugin()
    ],
    define: {
      'process.env': env
    },
    server: {
      historyApiFallback: true,
      proxy: {
        '/api/webhook': {
          target: 'https://n8n-webhook.sako8u.easypanel.host/webhook/181f9533-4319-4603-b713-97c42031efad',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/webhook/, ''),
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
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    preview: {
      historyApiFallback: true
    }
  };
});
