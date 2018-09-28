module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'I1820',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'I1820 IoT Platform' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vuetify']
  },
  /*
  ** Server configuration?!
  */
  server: {
    port: 1820,
    host: '0.0.0.0'
  },
  /*
  ** Envs
  */
  env: {
  },
  /*
  ** Plugin configuration
  */
  plugins: [
    '~plugins/vuetify.js',
    '~plugins/moment'
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ],
  modules: [
    ['@nuxtjs/axios']
  ],
  axios: {
    proxy: true // enable axios proxy module
  },

  proxy: {
    '/dm/': { target: process.env.DM_URL || 'http://127.0.0.1:1373', pathRewrite: {'^/dm/': ''} }, // sends requests with /dm/ to dm component
    '/pm/': { target: process.env.PM_URL || 'http://127.0.0.1:1375', pathRewrite: {'^/pm/': ''} }  // sends requests with /pm/ to pm component
  }
}
