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
  ** Plugin configuration
  */
  plugins: ['~plugins/vuetify.js'],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ],
  modules: [
    ['@nuxtjs/axios']
  ]
}
