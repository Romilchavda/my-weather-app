import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-weather-app/',  // <--- DHAYAN SE: Apne repo ka naam '/' ke beech mein likhein
})
