import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://guy.dev',
  trailingSlash: 'never',
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ],
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
})
