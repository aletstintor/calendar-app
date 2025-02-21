import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	mode: "development",
	server: {
		proxy: {
			'/api': {
				target: process.env.VITE_GOOGLE_CALENDAR_URL,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
});