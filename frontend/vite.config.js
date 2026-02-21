import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  
  //add proxy
  server:{
    proxy : {
      '/home' : 'https://localhost:3000'
    }
  },

  plugins: [react()],
})
