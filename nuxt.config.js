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
    '/api/putPostToS3': '~/server-middleware/putPostToS3.ts'
  },

  env: {
  },

  http: {
    // HTTP options here
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  publicRuntimeConfig: {
    vkGroupOwnerId: process.env.VK_GROUP_OWNER_ID,
  },

  privateRuntimeConfig: {
  }
};
