module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Wheel of Life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Wheel of Life is a simple yet powerful visual representation of all areas of your life. It gives you a quick snapshot of the areas that are flourishing and the areas that may need more focus and attention.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#9561e2' },

  env: {
    APIKEY: 'AIzaSyDRN8MAXaQvnhjaCJ8ZBe7_Xuj16bqEFuk',
    AUTHDOMAIN: 'wheel-of-life-fbfad.firebaseapp.com',
    DATABASEURL: 'https://wheel-of-life-fbfad.firebaseio.com',
    PROJECTID: 'wheel-of-life-fbfad',
    STORAGEBUCKET: 'wheel-of-life-fbfad.appspot.com',
    MESSAGINGSENDERID: '1093881950003'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['d3', 'firebase']
  },
  css: ['~/assets/css/tailwind.css']
}
