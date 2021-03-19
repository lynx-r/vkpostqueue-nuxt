export default {
  target: 'static',
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/http',
    'cookie-universal-nuxt',
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
    },
  },

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
    '@nuxtjs/date-fns'
  ],

  serverMiddleware: {
    '/api/queueNews': '~/server-middleware/queueNews.ts',
    '/api/saveVkToken': '~/server-middleware/saveVkToken.ts',
    // '/api/vkAuthorizationCodeFlowCallback': '~/server-middleware/vkAuthorizationCodeFlowCallback.ts',
    '/action/processQueue': '~/server-middleware/processQueue.ts',
  },

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
  }
};
