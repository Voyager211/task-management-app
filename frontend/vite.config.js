import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  console.log('🔍 BUILD MODE:', mode)
  console.log('🔍 VITE_API_URL:', env.VITE_API_URL)
  console.log('🔍 BUILD MODE:', mode)
  console.log('🔍 VITE_API_URL:', env.VITE_API_URL)
  
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        env.VITE_API_URL
      )
    }
  }
})
