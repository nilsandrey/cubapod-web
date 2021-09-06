<template>
  <div>
    <div v-if="podcast" class="container">
      <!-- weekly digest -->
      <div class="card margin-bottom-10">
        <div class="card-content">
          <h2 class="subtitle margin-bottom-10">Apariencia</h2>
          <div class="columns">
            <div class="column is-4-desktop">
              <div class="card">
                <div class="card-header">
                  <p class="card-header-title">
                    Colores
                  </p>
                </div>
                <div class="card-content">
                  <ColorSelector
                    v-model="colors.primaryColor"
                    label="Color primario"
                  />
                  <ColorSelector
                    v-model="colors.secondaryColor"
                    label="Color secundario"
                  />
                  <ColorSelector v-model="colors.textColor" label="Texto" />
                  <info class="margin-bottom-10">
                    Puedes decidir cómo se verá la página pública de tu pódcast,
                    ajustando estos colores a tu gusto.
                  </info>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <div class="card-header">
                  <div class="card-header-title">
                    Previsualización
                  </div>
                </div>
                <div class="card-content">
                  <PodcastCover :podcast="podcast" :colors="colors" />
                </div>
              </div>
            </div>
          </div>
          <form @submit.prevent="updateColors()">
            <div class="columns">
              <div class="column"></div>
              <div class="column is-narrow">
                <b-button
                  type="is-primary"
                  native-type="submit"
                  icon-left="content-save"
                  :loading="loading"
                >
                  Guardar cambios
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- end weekly digest -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import PodcastCover from '~/components/PodcastCover'
import telemetry from '~/services/telemetry'
import ColorSelector from '~/components/ColorSelector'

export default {
  auth: true,
  layout: 'podcaster-podcast',
  components: { ColorSelector, PodcastCover },

  data() {
    return {
      podcast: null,
      colors: {
        primaryColor: '#2c4bff',
        secondaryColor: '#929dff',
        textColor: '#ffffff'
      },
      loading: false
    }
  },

  async mounted() {
    // Telemetry
    telemetry.reportAction(
      this,
      'podcaster_podcast_appreareance',
      this.$route.path
    )

    // Load podcast
    const { data } = await this.$apollo.query({
      query: gql`
        query podcast($slug: String!) {
          podcast(slug: $slug) {
            slug
            url
            title
            image
            email
            sendWeeklyDigest
            primaryColor
            secondaryColor
            textColor
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
    this.podcast.primaryColor = data.podcast.primaryColor
    this.podcast.secondaryColor = data.podcast.secondaryColor
    this.podcast.textColor = data.podcast.textColor
    this.colors.primaryColor = data.podcast.primaryColor
    this.colors.secondaryColor = data.podcast.secondaryColor
    this.colors.textColor = data.podcast.textColor
  },

  methods: {
    async updateColors() {
      this.loading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updatePodcastColors(
            $podcastSlug: String!
            $primaryColor: String!
            $secondaryColor: String!
            $textColor: String!
          ) {
            updatePodcastColors(
              podcastSlug: $podcastSlug
              primaryColor: $primaryColor
              secondaryColor: $secondaryColor
              textColor: $textColor
            ) {
              status
            }
          }
        `,
        variables: {
          podcastSlug: this.$route.params.slug,
          primaryColor: this.colors.primaryColor,
          secondaryColor: this.colors.secondaryColor,
          textColor: this.colors.textColor
        }
      })
      if (data.updatePodcastColors.status === 'ok') {
        this.$buefy.toast.open('Se guardaron los cambios')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
