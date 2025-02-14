import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // ✅ CSS, JS, 이미지 파일이 `dist/assets/`에 저장됨
  },
  plugins: [react(), svgr()],
});
