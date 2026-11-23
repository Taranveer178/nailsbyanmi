import process from 'node:process'
import { Buffer } from 'node:buffer'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { onRequestPost } from './functions/api/booking.js'

function bookingApiDevPlugin(env) {
  return {
    name: 'booking-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/booking', async (request, response, next) => {
        if (request.method !== 'POST') {
          next()
          return
        }

        try {
          const chunks = []
          for await (const chunk of request) chunks.push(chunk)

          const result = await onRequestPost({
            request: new Request('http://localhost/api/booking', {
              method: 'POST',
              headers: {
                'Content-Type': String(
                  request.headers['content-type'] || 'application/json'
                ),
              },
              body: Buffer.concat(chunks),
            }),
            env: { RESEND_API_KEY: env.RESEND_API_KEY },
          })

          response.statusCode = result.status
          result.headers.forEach((value, name) => response.setHeader(name, value))
          response.end(await result.text())
        } catch (error) {
          console.error('Local booking API failed.', error)
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(
            JSON.stringify({
              ok: false,
              message:
                'The booking service could not process this request. Please try again or call the studio.',
            })
          )
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), bookingApiDevPlugin(env)],
    build: {
      sourcemap: true,
    },
  }
})