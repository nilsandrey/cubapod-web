<template>
  <div>
    <loading :active="loading" />
    <component :is="'style'" v-if="episode" scoped>
      .episode a { color: {{ episode.secondaryColor }} !important; }
    </component>
    <client-only>
      <not-found
        v-if="notFound"
        label="El episodio buscabas no existe en nuestro directorio"
      />

      <div v-if="episode" class="episode">
        <!-- cover image -->
        <img
          :src="episode.image"
          alt=""
          width="100%"
          class="is-hidden-tablet"
          style="margin-bottom: 0"
        />
        <!-- end cover image -->

        <div
          class="hero"
          :style="
            `margin-top: 0; background: ${episode.primaryColor} !important;`
          "
        >
          <div class="hero-body">
            <div class="columns is-centered">
              <div class="column is-narrow is-hidden-mobile">
                <img
                  :src="episode.image"
                  alt=""
                  width="200pt"
                  style="border-radius: 10pt"
                />
              </div>

              <!-- header -->
              <div class="column is-5-tablet has-text-centered-mobile">
                <p class="title" :style="`color: ${episode.textColor}`">
                  {{ podcast.title }}
                </p>
                <p class="subtitle" :style="`color: ${episode.textColor}`">
                  {{ episode.title }}
                </p>
                <div
                  class="margin-bottom-10"
                  :style="`color: ${episode.textColor}`"
                >
                  <b>Por {{ podcast.author }}</b> •
                  <small>
                    {{
                      $moment(episode.publishedAt).format('MM-DD-YYYY, h:mm a')
                    }}
                  </small>
                </div>
                <b-button size="is-medium" rounded @click="playEpisode()">
                  <b-icon
                    icon="play-circle"
                    size="is-small"
                    style="color: red; margin-right: 2pt"
                  ></b-icon>
                  Reproducir
                </b-button>
                <a :href="episode.botDirectLink" target="_blank">
                  <b-button size="is-medium" icon-left="robot" rounded>
                    Ver en el bot
                  </b-button>
                </a>
              </div>
              <!-- end header -->
            </div>
          </div>
        </div>
        <div class="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150">
            <path
              :fill="episode.primaryColor"
              fill-opacity="1"
              d="M0,224L120,197.3C240,171,480,117,720,112C960,107,1200,149,1320,170.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            ></path>
          </svg>
        </div>

        <section class="section">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-8 is-12-mobile">
                <p v-html="episode.summary"></p>
                <div class="has-text-centered margin-top-20">
                  <b-button
                    size="is-large"
                    rounded
                    :style="
                      `background: ${episode.secondaryColor}; color: ${episode.textColor};`
                    "
                    @click="$router.replace(`/${$route.params.podcastSlug}`)"
                  >
                    Ver más episodios
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </client-only>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  auth: false,

  async fetch({ app, store, params }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query episode($podcastSlug: String!, $episodeSlug: String!) {
          episode(podcastSlug: $podcastSlug, episodeSlug: $episodeSlug) {
            slug
            guid
            title
            summary
            enclosure
            link
            image
            itunesDuration
            publishedAt
            botDirectLink
          }
        }
      `,
      variables: {
        podcastSlug: params.podcastSlug,
        episodeSlug: params.episodeSlug
      }
    })
    if (data.episode) {
      store.commit('episode/set', data.episode)
    }
  },

  data() {
    return {
      episode: null,
      podcast: null,
      notFound: false,
      loading: true
    }
  },

  async mounted() {
    await this.loadPodcast()
    await this.loadEpisode()
    await this.reportVisit()
  },

  methods: {
    /**
     * Load podcast
     */
    async loadPodcast() {
      const { data } = await this.$apollo.query({
        query: gql`
          query podcast($slug: String!) {
            podcast(slug: $slug) {
              title
              author
              summary
              link
            }
          }
        `,
        variables: {
          slug: this.$route.params.podcastSlug
        }
      })
      this.podcast = data.podcast
      if (!data.podcast) {
        this.notFound = true
      }
    },

    /**
     * Load episode
     */
    async loadEpisode() {
      this.loading = true
      const { data } = await this.$apollo.query({
        query: gql`
          query episode($podcastSlug: String!, $episodeSlug: String!) {
            episode(podcastSlug: $podcastSlug, episodeSlug: $episodeSlug) {
              slug
              guid
              title
              summary
              enclosure
              link
              image
              itunesDuration
              publishedAt
              botDirectLink
              primaryColor
              secondaryColor
              textColor
            }
          }
        `,
        variables: {
          podcastSlug: this.$route.params.podcastSlug,
          episodeSlug: this.$route.params.episodeSlug
        }
      })
      this.episode = data.episode
      if (!data.episode) {
        this.notFound = true
      }
      this.loading = false
      return data.episode
    },

    /**
     * Play episode
     */
    playEpisode() {
      this.$store.commit('episode/set', this.episode)
      this.$store.commit('episode/setPlay', true)
    },

    /**
     * Report podcast visit, validating with reCaptcha
     * @returns {Promise<void>}
     */
    async reportVisit() {
      const token = await this.$recaptcha.getResponse()
      this.$apollo.mutate({
        mutation: gql`
          mutation reportEpisodeVisit(
            $token: String!
            $podcastSlug: String!
            $episodeSlug: String!
          ) {
            reportEpisodeVisit(
              token: $token
              podcastSlug: $podcastSlug
              episodeSlug: $episodeSlug
            ) {
              status
            }
          }
        `,
        variables: {
          podcastSlug: this.$route.params.podcastSlug,
          episodeSlug: this.$route.params.episodeSlug,
          token
        }
      })
    }
  },

  head() {
    const episode = this.$store.getters['episode/get']
    if (episode) {
      const title = `${episode.title} | CubaPod`
      const description = `Escucha ${episode.title} en CubaPod`
      const seoImage = episode.image
      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'og:title', name: 'og:title', content: title },
          {
            hid: 'og:description',
            name: 'og:description',
            content: description
          },
          { hid: 'og:image', name: 'og:image', content: seoImage },
          { hid: 'og:locale', name: 'og:locale', content: 'es_ES' },
          { hid: 'twitter:title', name: 'twitter:title', content: title },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description
          },
          { hid: 'twitter:image', name: 'twitter:image', content: seoImage },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            hid: 'twitter:creator',
            name: 'twitter:creator',
            content: '@CubaPod'
          }
        ]
      }
    } else {
      const title = `Episodio no encontrado | CubaPod`
      return {
        title,
        meta: [
          { hid: 'og:title', name: 'og:title', content: title },
          { hid: 'twitter:title', name: 'twitter:title', content: title }
        ]
      }
    }
  }
}
</script>

<style scoped></style>
