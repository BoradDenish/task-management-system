export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/apollo'
  ],
  plugins: ['~/plugins/deviceDetector.js'],
  apollo: {
    autoImports: true,
    clients: {
      default: {
        httpEndpoint: 'http://localhost:0529/graphql',
      }
    },
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  }
})