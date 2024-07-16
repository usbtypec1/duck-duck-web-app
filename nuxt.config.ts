// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'


export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
  ],

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  css: ['~/assets/css/main.css'],
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