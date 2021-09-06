<template>
  <div>
    <div v-if="podcast" class="container">
      <!-- weekly digest -->
      <div class="card margin-bottom-10">
        <div class="card-content">
          <h2 class="subtitle margin-bottom-10">Resumen semanal</h2>
          <form @submit.prevent="updatePreferences()">
            <div class="field">
              <b-checkbox v-model="weeklyDigestForm.send">
                Recibir resumen semanal de estadísticas sobre el pódcast a
                <b>{{ podcast.email }}</b>
              </b-checkbox>
            </div>
            <div class="columns">
              <div class="column"></div>
              <div class="column is-narrow">
                <b-button
                  type="is-primary"
                  native-type="submit"
                  icon-left="content-save"
                  :loading="weeklyDigestForm.loading"
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
import telemetry from '~/services/telemetry'

export default {
  auth: true,
  layout: 'podcaster-podcast',

  data() {
    return {
      podcast: null,
      weeklyDigestForm: {
        send: null,
        loading: false
      }
    }
  },

  async mounted() {
    // Telemetry
    telemetry.reportAction(
      this,
      'podcaster_podcast_preferences',
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
    this.weeklyDigestForm.send = data.podcast.sendWeeklyDigest
  },

  methods: {
    async updatePreferences() {
      this.weeklyDigestForm.loading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updatePodcastPreferences(
            $podcastSlug: String!
            $sendWeeklyDigest: Boolean!
          ) {
            updatePodcastPreferences(
              podcastSlug: $podcastSlug
              sendWeeklyDigest: $sendWeeklyDigest
            ) {
              status
            }
          }
        `,
        variables: {
          podcastSlug: this.$route.params.slug,
          sendWeeklyDigest: this.weeklyDigestForm.send
        }
      })
      if (data.updatePodcastPreferences.status === 'ok') {
        this.$buefy.toast.open('Se guardaron los cambios')
      }
      this.weeklyDigestForm.loading = false
    }
  }
}
</script>

<style scoped></style>
