module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'FAN Co. IoT Platform',
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
  ** Nuxt modules configuration
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Plugin configuration
  */
  plugins: [
    '~plugins/vuetify.js',
    '~plugins/moment.js',
    '~plugins/chart.js',
    { src: '~plugins/toast.js', ssr: false }
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ],
  toast: {
    position: 'top-center'
  },
  axios: {
    proxy: true // enable axios proxy module
  },

  proxy: {
    '/dm/': { target: process.env.DM_URL || 'http://127.0.0.1:1373', pathRewrite: {'^/dm/': ''} }, // sends requests with /dm/ to dm component
    '/pm/': { target: process.env.PM_URL || 'http://127.0.0.1:1375', pathRewrite: {'^/pm/': ''} }, // sends requests with /pm/ to pm component
    '/trap/': { target: process.env.TRAP_URL || 'http://127.0.0.1:8085', pathRewrite: {'^/trap/': ''} } // sends requests with /trap/ to trap component
  }
}
