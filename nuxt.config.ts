import { NuxtConfig } from "@nuxt/types";

interface NuxtConfigExt extends NuxtConfig {
  components: boolean | {dirs: string[]; loader: any} | undefined
}

const config: NuxtConfigExt = {
  target: 'server',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#fff'},
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/main.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/http',
    '@nuxtjs/universal-storage',
    '@nuxtjs/toast',
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // },
  },

  components: {
    dirs: [
      '~/components',
      '~/components/base'
    ],
    loader: []
  },

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/date-fns',
    'nuxt-typed-vuex',
  ],

  serverMiddleware: [
    {path: '/api/isAuthenticated', handler: '~/server-middleware/isAuthenticated.ts'},
    {path: '/api/saveVkToken', handler: '~/server-middleware/saveVkToken.ts'},
    {path: '/api/getSignedUrl', handler: '~/server-middleware/getSignedUrl.ts'},
    {path: '/api/queuePost', handler: '~/server-middleware/queuePost.ts'},
    {path: '/api/listPosts', handler: '~/server-middleware/listPosts.ts'},
    {path: '/action/processQueue', handler: '~/server-middleware/processQueue.ts'},
  ],

  env: {},

  http: {
    // HTTP options here
    baseUrl: process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  },

  publicRuntimeConfig: {
    vkAuthorizeUrl: `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&display=page&redirect_uri=${process.env.VK_AUTHORIZATION_CALLBACK}&scope=${process.env.VK_SCOPE}&response_type=token&v=${process.env.VK_API_V}`
  },

  privateRuntimeConfig: {
    http: {
      // HTTP options here
      baseUrl: process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    },
  },

  toast: {
    duration: 2000,
    closeOnSwipe: true,
    position: 'bottom-center',
  },

  tailwindcss: {
    jit: true
  }
}

export default config;
