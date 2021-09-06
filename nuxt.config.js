const title = 'CubaPod | Plataforma cubana de podcasting'
const description =
  'Descubre pódcasts cubanos, descarga episodios, suscríbete y apoya a tus podcásters favoritos.'
const image = 'https://cubapod.net/img/opengraph.jpg?v1'

export default {
  target: 'server',

  /*
   ** Headers of the page
   */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'og:locale', content: 'es_ES' },
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: title
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: image
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'CubaPod'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@CubaPod' },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: image
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@CubaPod'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v2' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3E83FF' },

  /*
   ** Global CSS
   */
  css: [
    // '~/assets/custom-bulma.scss',
    '~/assets/style.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vuex', ssr: true },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/components' },
    { src: '~/plugins/vue-ellipse-progress.js', ssr: false }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-rfg-icon',

    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',

    '@nuxtjs/auth',

    '@nuxtjs/axios',

    '@nuxtjs/apollo',

    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',

    '@nuxtjs/moment',

    '@nuxtjs/robots',

    '@nuxtjs/redirect-module',

    // Google reCaptcha
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
        siteKey: '6LdStrwZAAAAAO8sjeOF3qKrTCRJLcvg79WtjqsF',
        version: 2,
        size: 'invisible' // Size: 'compact', 'normal', 'invisible' (v2)
      }
    ],

    'cookie-universal-nuxt',

    'nuxt-clipboard2'
  ],

  'rfg-icon': {
    static: true,
    staticPath: 'static',
    masterPicture: 'static/favicon.jpg',
    rfg: {
      masterPicture: 'static/favicon.jpg',
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#3E83FF',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#3E83FF',
          manifest: {
            name: 'CubaPod',
            startUrl: 'https://cubapod.net',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          },
          assets: {
            legacyIcon: true,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 66.40625,
          themeColor: '#3E83FF'
        }
      },
      settings: {
        compression: 3,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: true,
        htmlCodeFile: true,
        usePathAsIs: false
      }
    }
  },

  auth: {
    redirect: {
      login: '/podcaster/login',
      logout: '/',
      home: false,
      user: '/podcaster/profile'
    },
    strategies: {
      local: {
        endpoints: {
          logout: true,
          user: false
        },
        tokenRequired: true,
        tokenType: 'JWT'
      }
    },
    // User will be redirected on login/logouts.
    watchLoggedIn: true
  },

  apollo: {
    tokenExpires: 7,
    includeNodeModules: true,
    // Note: Setting JWT would repeat the prefix defined in Apollo `tokenType` in `local` strategy
    authenticationType: '',
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network'
      }
    },
    clientConfigs: {
      default: '~/apollo/client.js',
      compressor: '~/apollo/compressor.js'
    }
  },

  sitemap: {
    hostname: 'https://cubapod.net',
    gzip: true,
    routes: [
      '/',
      '/acerca-de',
      '/contacto',
      '/datos',
      '/donaciones',
      '/equipo',
      '/prensa',
      '/podcaster',
      '/academia'
    ]
  },

  robots: {
    UserAgent: '*',
    Disallow: ['/go', '/addme', '/verify']
  },

  moment: {
    defaultLocale: 'es',
    locales: ['es']
  },

  router: {
    middleware: ['auth']
  },

  redirect: [
    { from: '^/press', to: '/prensa', statusCode: 301 },
    { from: '^/about', to: '/acerca-de', statusCode: 301 },
    { from: '^/contact', to: '/contacto', statusCode: 301 },
    { from: '^/data', to: '/datos', statusCode: 301 },
    { from: '^/donations', to: '/donaciones', statusCode: 301 },
    { from: '^/go', to: '/ir', statusCode: 301 },
    { from: '^/team', to: '/equipo', statusCode: 301 },
    { from: '^/addme', to: '/podcaster/add', statusCode: 301 },

    // _categorySlug/_podcastSlug ==> _podcastSlug
    { from: 'ficcion/(.*)', to: '/$1' },
    { from: 'gobierno/(.*)', to: '/$1' },
    { from: 'ocio/(.*)', to: '/$1' },
    { from: 'ciencia/(.*)', to: '/$1' },
    { from: 'musica/(.*)', to: '/$1' },
    { from: 'salud-y-bienestar/(.*)', to: '/$1' },
    { from: 'arte/(.*)', to: '/$1' },
    { from: 'tecnologia/(.*)', to: '/$1' },
    { from: 'cine-y-television/(.*)', to: '/$1' },
    { from: 'religion-y-espiritualidad/(.*)', to: '/$1' },
    { from: 'noticias/(.*)', to: '/$1' },
    { from: 'educacion/(.*)', to: '/$1' },
    { from: 'sociedad-y-cultura/(.*)', to: '/$1' },
    { from: 'negocios/(.*)', to: '/$1' },
    { from: 'historia/(.*)', to: '/$1' },
    { from: 'deportes/(.*)', to: '/$1' },
    { from: 'comedia/(.*)', to: '/$1' },
    { from: 'crimen-real/(.*)', to: '/$1' }
  ],

  // Sentry
  sentry: {
    dsn:
      'https://b39e8256096b4be1a5898aa0bbae28f5@o474473.ingest.sentry.io/5608621', // Enter your project's DSN here
    config: {} // Additional config
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
