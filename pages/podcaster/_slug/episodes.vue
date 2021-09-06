<template>
  <div>
    <div v-if="podcast" class="container">
      <!-- analytics by episodes -->
      <div v-if="episodes.objects.length > 0" class="card margin-bottom-10">
        <div class="card-content">
          <b-table :data="episodes.objects" narrowed>
            <template slot-scope="props">
              <b-table-column
                :label="
                  episodes.objects.length > 0
                    ? `${episodes.objects.length} episodios`
                    : '1 episodio'
                "
              >
                <div class="media">
                  <div class="media-left">
                    <img
                      :src="props.row.image"
                      :alt="props.row.title"
                      width="75pt"
                      style="border-radius: 5pt"
                    />
                  </div>
                  <div class="media-content">
                    <p>
                      <b>{{ props.row.title }}</b>
                    </p>
                    <p>
                      <small>
                        Publicado:
                        {{
                          $moment(props.row.publishedAt).format(
                            'MM/DD/YYYY - h:mm:ss a'
                          )
                        }}
                      </small>
                    </p>
                    <b-button
                      icon-left="earth"
                      type="is-primary"
                      size="is-small"
                      rounded
                      outlined
                      @click="
                        $router.replace(`/${podcast.slug}/${props.row.slug}`)
                      "
                    >
                      Página pública
                    </b-button>
                  </div>
                </div>
              </b-table-column>
              <b-table-column label="Enlace directo en el bot">
                <copy-button :value="props.row.botDirectLink" />
                <small>
                  <a :href="props.row.botDirectLink">
                    {{ props.row.botDirectLink }}
                  </a>
                </small>
              </b-table-column>
              <b-table-column label="Publicado">
                <boolean-widget
                  :value="props.row.posted"
                  icon="telegram"
                  :label="
                    props.row.posted
                      ? 'Se notificó a los suscriptores en Telegram'
                      : 'No se notificó a los suscriptores en Telegram'
                  "
                />
              </b-table-column>
            </template>
          </b-table>
          <Paginator
            :pagination="episodes"
            @prev="loadPrev()"
            @next="loadNext()"
          />
        </div>
      </div>
      <!-- end analytics by episodes -->

      <div class="card">
        <div class="card-content">
          <info>
            Los episodios y sus metadatos se sincronizan automáticamente a
            partir del feed RSS.
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

  async mounted() {
    // Telemetry
    telemetry.reportAction(this, 'podcaster_podcast_episodes', this.$route.path)

    const { data } = await this.$apollo.query({
      query: gql`
        query podcast($slug: String!) {
          podcast(slug: $slug) {
            slug
            image
            episodes {
              page
              pages
              hasNext
              hasPrev
              objects {
                slug
                title
                image
                tweeted
                posted
                publishedAt
                botDirectLink
              }
            }
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
    this.episodes = data.podcast.episodes
    this.page = data.podcast.episodes.page
  },

  methods: {
    /**
     * Load episodes
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
                  slug
                  title
                  image
                  tweeted
                  posted
                  publishedAt
                  botDirectLink
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
