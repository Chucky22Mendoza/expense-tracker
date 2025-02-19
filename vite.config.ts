import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), ["VITE", "VITE_PUBLIC"]);
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',  // Registra el service worker de forma automática
        devOptions: {
          enabled: true,  // Habilitar PWA en modo desarrollo
        },
        manifest: {
          name: "Expense tracker",
          short_name: "Tracker",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#242424",
          theme_color: "#535bf2",
          description: 'Expense Tracker is an intuitive application designed to help you manage your cash receipts efficiently. Whether you receive payments for your work, sales, or any other source of income, MoneyTrack allows you to record each transaction quickly and easily, adding custom tags for easy organization and search.',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/svg'
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60,  // 30 días
                }
              }
            }
          ]
        }
      }),
    ],
    define: envWithProcessPrefix,
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
  }
})
