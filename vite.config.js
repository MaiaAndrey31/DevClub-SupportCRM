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
        target: 'https://n8n.rodolfomori.com.br',
        changeOrigin: true,
        rewrite: (path) => '/webhook/181f9533-4319-4603-b713-97c42031efad',
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
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
