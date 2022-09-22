import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import cordovaDevServer from './vite-plugins/cordova-dev-server';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, "src"),
  build: {
    outDir: path.join(__dirname, "www"),
  },
  plugins: [
    cordovaDevServer({
      start_delay: 1500,
      update_delay: 100
    }),
    vue()
  ]
})
