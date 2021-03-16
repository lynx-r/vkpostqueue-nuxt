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

  http: {
    // HTTP options here
    baseURL: process.env.baseUrl
},

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
    baseUrl: process.env.VERCEL_URL || process.env.BASE_URL || 'http://127.0.0.1:3000',
  },

  publicRuntimeConfig: {
    vkGroupOwnerId: process.env.VK_GROUP_OWNER_ID,
    s3Bucket: process.env.S3_BUCKET,
  },

  privateRuntimeConfig: {
    s3Region: process.env.S3_REGION,
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  }
};
