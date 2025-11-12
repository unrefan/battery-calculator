import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version ?? 'dev'),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'PowerCalc',
        short_name: 'PowerCalc',
        description: 'Battery sizing helper for campers and makers.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0ea5e9',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable any' },
        ],
      },
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable.png'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
})
