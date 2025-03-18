import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		allowedHosts: ['vps-32f8344e.vps.ovh.net']
	}
})
