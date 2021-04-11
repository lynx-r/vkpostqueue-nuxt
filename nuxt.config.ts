import { NuxtConfig } from '@nuxt/types'
import connectBusboy from 'connect-busboy'
import bodyParser from 'body-parser'

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
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/main.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/constants.ts',
    '~/plugins/utils',
    '~/plugins/vee-validate',
    '~/plugins/vue-lodash.ts',
    '~/plugins/vk-wall-post.ts'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/http',
    '@nuxtjs/universal-storage',
    '@nuxtjs/toast'
  ],

  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ]
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // },
  },

  ignoreOptions: {
    ignorecase: true
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
    'nuxt-typed-vuex'
  ],

  serverMiddleware: [
    { path: '/api', handler: bodyParser.json() },
    { path: '/api', handler: connectBusboy({ immediate: true }) as any },
    { path: '/api/vk-save-doc', handler: '~/server-middleware/vkSaveDoc.ts' },
    { path: '/api/vk-download-doc', handler: '~/server-middleware/vkDownloadDoc.ts' }
  ],

  env: {},

  http: {
    // HTTP options here
    baseUrl: process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  },

  publicRuntimeConfig: {
    groupId: process.env.VK_GROUP_OWNER_ID,
    vkAuthorizeUrl: `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&display=page&redirect_uri=${process.env.VK_AUTHORIZATION_CALLBACK}&scope=${process.env.VK_SCOPE}&response_type=token&v=${process.env.VK_API_V}`
  },

  privateRuntimeConfig: {
    http: {
      // HTTP options here
      baseUrl: process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    }
  },

  toast: {
    duration: 2000,
    closeOnSwipe: true,
    position: 'bottom-center'
  },

  tailwindcss: {
    jit: true
  }
}

export default config
