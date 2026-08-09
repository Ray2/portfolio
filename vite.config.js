import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function unityWebGlHeaders() {
  const configureUnityHeaders = (server) => {
    server.middlewares.use((request, response, next) => {
      const pathname = request.url?.split('?')[0] || ''

      if (pathname.startsWith('/virtualvenue/Build/')) {
        if (pathname.endsWith('.data.gz')) {
          response.setHeader('Content-Encoding', 'gzip')
          response.setHeader('Content-Type', 'application/octet-stream')
        } else if (pathname.endsWith('.framework.js.gz')) {
          response.setHeader('Content-Encoding', 'gzip')
          response.setHeader('Content-Type', 'application/javascript')
        } else if (pathname.endsWith('.wasm.gz')) {
          response.setHeader('Content-Encoding', 'gzip')
          response.setHeader('Content-Type', 'application/wasm')
        }
      }

      next()
    })
  }

  return {
    name: 'unity-webgl-headers',
    configureServer: configureUnityHeaders,
    configurePreviewServer: configureUnityHeaders,
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), unityWebGlHeaders()],
})
