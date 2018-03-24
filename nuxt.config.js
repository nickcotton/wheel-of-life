module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Wheel of Life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor', content: '#603cba' },
      { name: 'theme-color', content: '#ffffff' },
      { hid: 'description', name: 'description', content: 'The Wheel of Life is a simple yet powerful visual representation of all areas of your life. It gives you a quick snapshot of the areas that are flourishing and the areas that may need more focus and attention.' }
    ],
    link: [

      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#603cba' },
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
