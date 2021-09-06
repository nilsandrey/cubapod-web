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
    <nuxt />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import PodcasterTopbar from '~/components/PodcasterTopbar'

export default {
  auth: true,
  components: { PodcasterTopbar },
  async mounted() {
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
  }
}
</script>

<style scoped></style>
