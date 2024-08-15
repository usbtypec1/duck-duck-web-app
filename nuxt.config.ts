// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'


export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module', '@nuxt/image', '@pinia/nuxt', '@vueuse/nuxt'],
  ssr: false,

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
        },
      ],
    },
  },

  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  css: [
    '~/assets/css/main.css',
    'primeicons/primeicons.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL?.replace(/\/$/, ''),
    },
  },

  compatibilityDate: '2024-07-16',
});