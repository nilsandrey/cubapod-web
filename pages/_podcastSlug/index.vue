<template>
  <div>
    <component :is="'style'" v-if="podcast" scoped>
      .tabs .is-active a { color: {{ podcast.secondaryColor }} !important;
      border-bottom-color: {{ podcast.secondaryColor }} !important; }
    </component>
    <loading :active="loading" is-full-page />
    <client-only>
      <not-found
        v-if="notFound"
        label="El pódcast que buscabas no existe en nuestro directorio"
      />

      <div v-if="podcast" class="podcast">
        <PodcastCover :podcast="podcast" />

        <div class="container">
          <b-tabs v-model="tab" position="is-centered" :animated="false">
            <!-- episodes -->
            <b-tab-item label="Episodios">
              <div class="columns is-centered">
                <div class="column is-6-desktop is-12-mobile">
                  <Episode
                    v-for="episode in episodes.objects"
                    :key="episode.guid"
                    :episode="episode"
                    :twitter-user="podcast.twitterHandler"
                    :color="podcast.secondaryColor"
                  />
                  <div class="has-text-centered">
                    <b-button
                      v-if="episodes.hasNext"
                      size="is-large"
                      rounded
                      :style="
                        `background: ${podcast.primaryColor}; color: ${podcast.textColor};`
                      "
                      @click="loadNextEpisodes()"
                    >
                      Ver más episodios
                    </b-button>
                  </div>
                </div>
              </div>
            </b-tab-item>
            <!-- end episodes -->

            <!-- donations -->
            <b-tab-item
              v-if="
                podcast.kofiUrl ||
                  podcast.paypalUrl ||
                  podcast.qvapayUrl ||
                  podcast.transfermovilCucCode ||
                  podcast.transfermovilCupCode
              "
              label="Donaciones"
            >
              <p class="has-text-centered margin-bottom-20">
                Puedes apoyar a este pódcast con una donación.
              </p>
              <div
                v-if="podcast.kofiUrl || podcast.paypalUrl || podcast.qvapayUrl"
                class="has-text-centered margin-bottom-20"
              >
                <a
                  v-if="podcast.qvapayUrl"
                  :href="podcast.qvapayUrl"
                  target="_blank"
                >
                  <b-button size="is-medium">
                    Donar con
                    <img src="/img/qvapay.png" width="70pt" />
                  </b-button>
                </a>
                <a
                  v-if="podcast.kofiUrl"
                  :href="podcast.kofiUrl"
                  target="_blank"
                >
                  <b-button size="is-medium">
                    Comprar un café
                    <img src="/img/ko-fi-rounded.png" width="15pt" />
                  </b-button>
                </a>
                <a
                  v-if="podcast.paypalUrl"
                  :href="podcast.paypalUrl"
                  target="_blank"
                >
                  <b-button size="is-medium">
                    Donar con
                    <img src="/img/paypal.svg" width="45pt" />
                  </b-button>
                </a>
              </div>
              <div class="columns is-centered">
                <div
                  v-if="podcast.transfermovilCupCode"
                  class="column is-3-desktop"
                >
                  <div class="card">
                    <div class="card-content">
                      <p class="has-text-centered">Transfermóvil CUP</p>
                      <div class="has-text-centered">
                        <vue-qr :text="podcast.transfermovilCupCode"></vue-qr>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab-item>
            <!-- end donations -->
          </b-tabs>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import gql from 'graphql-tag'
import PodcastCover from '~/components/PodcastCover'
import Episode from '~/components/Episode'

export default {
  auth: false,

  components: { PodcastCover, Episode, VueQr },

  async fetch({ app, store, params }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query podcast($slug: String!) {
          podcast(slug: $slug) {
            title
            image
            summary
          }
        }
      `,
      variables: {
        slug: params.podcastSlug
      }
    })
    if (data.podcast) {
      store.commit('podcast/set', data.podcast)
    }
  },

  data() {
    return {
      color: null,
      apple: null,
      podcast: null,
      loading: true,
      notFound: false,
      dropdownActive: false,
      tab: 0,
      episodes: {
        page: 1,
        pages: null,
        hasNext: null,
        hasPrev: null,
        episodes: []
      }
    }
  },

  async mounted() {
    await this.loadPodcast()
    await this.reportVisit()
  },

  methods: {
    /**
     * Load podcast
     * @returns {Promise<*>}
     */
    async loadPodcast() {
      this.loading = true
      const { data } = await this.$apollo.query({
        query: gql`
          query podcast($slug: String!, $page: Int!) {
            podcast(slug: $slug) {
              title
              author
              image
              summary
              link
              url
              twitterHandler
              twitterUrl
              telegramHandler
              telegramUrl
              applePodcastsUrl
              facebookUrl
              instagramUrl
              youtubeUrl
              discordUrl
              transfermovilCucCode
              transfermovilCupCode
              paypalUrl
              kofiUrl
              qvapayUrl
              episodesCount
              episodes(page: $page) {
                page
                pages
                hasNext
                hasPrev
                objects {
                  slug
                  guid
                  title
                  summary
                  enclosure
                  link
                  image
                  itunesDuration
                  botDirectLink
                  publishedAt
                }
              }
              category {
                name
                slug
              }
              primaryColor
              secondaryColor
              textColor
            }
          }
        `,
        variables: {
          slug: this.$route.params.podcastSlug,
          page: this.episodes.page
        }
      })

      if (!data.podcast) {
        this.notFound = true
      } else {
        this.podcast = data.podcast
        this.episodes = { ...data.podcast.episodes }
      }

      this.loading = false

      return data.podcast
    },

    /**
     * Load next episodes
     * @returns {Promise<void>}
     */
    async loadNextEpisodes() {
      this.episodes.page += 1
      const { data } = await this.$apollo.query({
        query: gql`
          query podcast($slug: String!, $page: Int!) {
            podcast(slug: $slug) {
              episodes(page: $page) {
                page
                pages
                hasNext
                hasPrev
                objects {
                  slug
                  guid
                  title
                  summary
                  enclosure
                  link
                  image
                  itunesDuration
                }
              }
            }
          }
        `,
        variables: {
          slug: this.$route.params.podcastSlug,
          page: this.episodes.page
        }
      })
      const episodes = data.podcast.episodes
      this.episodes.pages = episodes.pages
      this.episodes.hasNext = episodes.hasNext
      this.episodes.hasPrev = episodes.hasPrev
      episodes.objects.forEach((i) => {
        this.episodes.objects.push(i)
      })
    },

    /**
     * Report podcast visit, validating with reCaptcha
     * @returns {Promise<void>}
     */
    async reportVisit() {
      const token = await this.$recaptcha.getResponse()
      this.$apollo.mutate({
        mutation: gql`
          mutation reportPodcastVisit($token: String!, $slug: String!) {
            reportPodcastVisit(token: $token, slug: $slug) {
              status
            }
          }
        `,
        variables: {
          slug: this.$route.params.podcastSlug,
          token
        }
      })
    }
  },

  head() {
    const podcast = this.$store.getters['podcast/get']
    if (podcast) {
      const title = `${podcast.title} | CubaPod`
      const description = podcast.summary
      const seoImage = podcast.image
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
      const title = `Pódcast no encontrado | CubaPod`
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
