import bodyParser from 'body-parser'
import connectBusboy from 'connect-busboy'

const config = {
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
    '@nuxtjs/date-fns'
  ],

  serverMiddleware: [
    { path: '/api', handler: bodyParser.json() },
    { path: '/api', handler: connectBusboy({ immediate: true }) },
    { path: '/api/vk-save-doc', handler: '~/server-middleware/vkSaveDoc.ts' },
    { path: '/api/vk-download-doc', handler: '~/server-middleware/vkDownloadDoc.ts' },
    { path: '/api/subscribe', handler: '~/server-middleware/subscribeToPush.js' }
  ],

  env: {},

  http: {
    // HTTP options here
    baseUrl: process.env.VERCEL ? process.env.VERCEL_PROD_URL : 'http://localhost:3000'
  },

  publicRuntimeConfig: {
    checkPostIntervalMin: process.env.CHECK_POST_INTERVAL_MIN,
    checkPostQueue: process.env.CHECK_POST_QUEUE_ACTION,
    publicVapidKey: process.env.PUBLIC_VAPID_KEY,
    groupId: process.env.VK_GROUP_OWNER_ID,
    vkAuthorizeUrl: `https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&display=page&redirect_uri=${process.env.VK_AUTHORIZATION_CALLBACK}&scope=${process.env.VK_SCOPE}&response_type=token&v=${process.env.VK_API_V}`
  },

  privateRuntimeConfig: {
    privateVapidKey: process.env.PRIVATE_VAPID_KEY,
    http: {
      // HTTP options here
      baseUrl: process.env.VERCEL ? process.env.VERCEL_PROD_URL : 'http://localhost:3000'
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
