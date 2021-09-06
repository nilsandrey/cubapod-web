<template>
  <div>
    <div v-if="podcast">
      <!-- general analytics -->
      <div class="columns">
        <div class="column is-3 is-12-mobile">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">
                  Suscriptores
                  <b-tooltip
                    label="Cantidad total de suscriptores en el bot de Telegram"
                    size="is-small"
                    type="is-light"
                    multilined
                    animated
                  >
                    <b-icon
                      icon="help-circle"
                      size="is-small"
                      class="has-text-grey"
                    />
                  </b-tooltip>
                </h4>
                <h2 class="has-text-centered">
                  {{ podcast.botSubscribersCount }}
                  <b-icon icon="bell" class="has-text-warning" />
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3 is-12-mobile">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">
                  Favoritos
                  <b-tooltip
                    label="Cantidad total de usuarios que marcaron el pódcast como favorito en el bot de Telegram"
                    size="is-small"
                    type="is-light"
                    multilined
                    animated
                  >
                    <b-icon
                      icon="help-circle"
                      size="is-small"
                      class="has-text-grey"
                    />
                  </b-tooltip>
                </h4>
                <h2 class="has-text-centered">
                  {{ podcast.botFavsCount }}
                  <b-icon icon="heart" class="has-text-danger" />
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3 is-12-mobile">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">
                  Descargas únicas
                  <b-tooltip
                    label="Cantidad total de descargas únicas en el bot de Telegram"
                    size="is-small"
                    type="is-light"
                    multilined
                    animated
                  >
                    <b-icon
                      icon="help-circle"
                      size="is-small"
                      class="has-text-grey"
                    />
                  </b-tooltip>
                </h4>
                <h2 class="has-text-centered">
                  {{ podcast.botDownloadsCount }}
                  <b-icon icon="download" class="has-text-success" />
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-3 is-12-mobile">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4 class="has-text-centered">
                  Conversión
                  <b-tooltip
                    label="Porciento de descargas realizadas por suscriptores."
                    size="is-small"
                    type="is-light"
                    multilined
                    animated
                  >
                    <b-icon
                      icon="help-circle"
                      size="is-small"
                      class="has-text-grey"
                    />
                  </b-tooltip>
                </h4>
                <h2 class="has-text-centered">
                  {{ podcast.conversion }}
                  <b-icon icon="percent" />
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end general analytics -->

      <!-- analytics by episodes -->
      <div v-if="episodes.objects.length > 0" class="card margin-bottom-10">
        <div class="card-content">
          <b-table :data="episodes.objects" narrowed>
            <template slot-scope="props">
              <b-table-column field="title" label="Episodio">
                {{ props.row.title }}
              </b-table-column>
              <b-table-column field="state" label="Descargas únicas">
                <b-icon icon="download" size="is-small" class="has-text-grey" />
                {{ props.row.botDownloadsCount }}
              </b-table-column>
              <b-table-column field="state" label="Favoritos">
                <b-icon icon="heart" size="is-small" class="has-text-grey" />
                {{ props.row.botFavsCount }}
              </b-table-column>
            </template>
          </b-table>
          <Paginator
            :pagination="episodes"
            class="margin-top-10"
            @prev="loadPrev()"
            @next="loadNext()"
          />
        </div>
      </div>
      <!-- end analytics by episodes -->

      <div class="card">
        <div class="card-content">
          <info>
            Las analíticas se generan a partir de la interacción de los usuarios
            con
            <a href="https://t.me/CubaPodBot" target="_blank"
              >nuestro bot de Telegram</a
            >.
          </info>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import telemetry from '~/services/telemetry'
import Paginator from '~/components/Paginator'

export default {
  components: { Paginator },
  auth: true,
  layout: 'podcaster-podcast',

  data() {
    return {
      podcast: null,
      page: 1,
      episodes: {
        page: 1,
        pages: null,
        hasNext: null,
        hasPrev: null,
        objects: []
      }
    }
  },

  mounted() {
    // Telemetry
    telemetry.reportAction(
      this,
      'podcaster_podcast_analytics',
      this.$route.path
    )

    this.loadPodcast()
    this.loadEpisodes()
  },

  methods: {
    /**
     * Load podcast
     * @returns {Promise<void>}
     */
    async loadPodcast() {
      const { data } = await this.$apollo.query({
        query: gql`
          query podcast($slug: String!) {
            podcast(slug: $slug) {
              slug
              image
              botSubscribersCount
              botFavsCount
              botDownloadsCount
              conversion
              category {
                slug
              }
            }
          }
        `,
        variables: {
          slug: this.$route.params.slug
        },
        fetchPolicy: 'network-only'
      })
      this.podcast = data.podcast
    },

    /**
     * Load episodes
     * @returns {Promise<void>}
     */
    async loadEpisodes() {
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
                  title
                  botDownloadsCount
                  botFavsCount
                }
              }
              category {
                slug
              }
            }
          }
        `,
        variables: {
          slug: this.$route.params.slug,
          page: this.page
        },
        fetchPolicy: 'network-only'
      })
      this.episodes = data.podcast.episodes
      this.page = data.podcast.episodes.page
    },

    /**
     * Load previous episodes
     */
    loadPrev() {
      this.page -= 1
      this.loadEpisodes()
    },

    /**
     * Load next episodes
     */
    loadNext() {
      this.page += 1
      this.loadEpisodes()
    }
  }
}
</script>

<style scoped></style>
