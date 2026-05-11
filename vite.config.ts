

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolioV3/',  // ← Add this line
  plugins: [react()],
})
