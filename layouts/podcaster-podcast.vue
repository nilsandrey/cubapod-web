<template>
  <div>
    <PodcasterTopbar />
    <div class="card is-hidden-tablet" style="margin: 10pt">
      <div class="card-content">
        <info>
          Para una mejor experiencia, recomendamos la versión de escritorio. La
          versión móvil que estás viendo no está optimizada aún y te va a
          resultar incómoda.
        </info>
      </div>
    </div>
    <section class="section">
      <div v-if="podcast" class="container">
        <div class="columns">
          <div class="column is-2">
            <PodcasterMenu :podcast="podcast" />
          </div>
          <div class="column is-10">
            <nuxt />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import PodcasterTopbar from '~/components/PodcasterTopbar'
import PodcasterMenu from '~/components/PodcasterMenu'

export default {
  auth: true,
  components: { PodcasterTopbar, PodcasterMenu },

  data() {
    return {
      podcast: null
    }
  },

  async mounted() {
    await this.loadUser()
    await this.loadPodcast()
  },

  methods: {
    async loadUser() {
      // Load user
      const { data } = await this.$apollo.query({
        query: gql`
          query viewerUser {
            viewerUser {
              firstName
              lastName
              email
              permissions
            }
          }
        `,
        fetchPolicy: 'network-only'
      })
      this.$store.commit('user/set', data.viewerUser)
    },

    async loadPodcast() {
      const { data } = await this.$apollo.query({
        query: gql`
          query podcast($slug: String!) {
            podcast(slug: $slug) {
              slug
              image
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
      this.$store.commit('podcast/set', data.podcast)
    }
  }
}
</script>

<style scoped></style>
