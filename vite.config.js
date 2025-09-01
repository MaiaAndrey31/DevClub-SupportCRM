import { defineConfig } from 'vite'
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

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    copyFilesPlugin()
  ],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api/webhook': {
        target: 'https://primary-production-21a63.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => '/webhook/181f9533-4319-4603-b713-97c42031efad',
        secure: true,
        headers: {
          'Access-Control-Allow-Origin': 'https://suporte.devclub.com.br',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', {
              error: err.message,
              url: req?.url,
              method: req?.method
            });
            if (!res.headersSent) {
              res.writeHead(500, {
                'Content-Type': 'application/json'
              });
            }
            res.end(JSON.stringify({ error: 'Erro no proxy' }));
          });
          
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Enviando requisição para o webhook:', {
              method: req.method,
              url: req.url,
              headers: req.headers
            });
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            // Adiciona cabeçalhos CORS nas respostas
            proxyRes.headers['Access-Control-Allow-Origin'] = 'https://suporte.devclub.com.br';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
          });
        }
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    historyApiFallback: true,
  },
})
