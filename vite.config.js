import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },

  build: {
    // Target modern browsers only (reduces polyfill bundle)
    target: 'es2020',

    // Warn if any chunk exceeds 500kb
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Fine-grained manual chunks — keeps initial load tiny
        manualChunks: (id) => {
          // Core React runtime — must be first load
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-core'
          // Router — loaded on first navigation
          if (id.includes('node_modules/react-router')) return 'router'
          // Animation library — large, load separately
          if (id.includes('node_modules/framer-motion')) return 'motion'
          // Charts — admin only, loaded lazily
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) return 'charts'
          // Forms
          if (id.includes('node_modules/react-hook-form')) return 'forms'
          // Icons
          if (id.includes('node_modules/lucide-react')) return 'icons'
          // Notifications
          if (id.includes('node_modules/react-toastify')) return 'toast'
          // State + HTTP
          if (id.includes('node_modules/zustand') || id.includes('node_modules/axios')) return 'data'
        },

        // Cache-bust on content change only
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },

    // Inline small assets (< 4kb) as base64
    assetsInlineLimit: 4096,

    // Source maps for production error tracking
    sourcemap: true,

    // Minification
    minify: 'esbuild',
  },

  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    port: 4173,
  },

  // Optimize deps pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'axios',
      'zustand',
      'react-hook-form',
      'lucide-react',
    ],
  },
})
