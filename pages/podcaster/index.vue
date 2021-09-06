<template>
  <section class="section">
    <loading :active="loading"></loading>
    <div v-if="!loading" class="container">
      <!-- no podcasts -->
      <div
        v-if="podcasts.length === 0"
        class="has-text-centered margin-bottom-20"
      >
        <p class="margin-bottom-10">
          No tienes ningún pódcast aún, puedes añadir uno.
        </p>
        <b-button
          type="is-primary"
          icon-left="plus"
          size="is-medium"
          @click="$router.replace('/podcaster/add')"
        >
          Añadir pódcast
        </b-button>
      </div>
      <!-- end no podcasts -->

      <!-- podcasts list -->
      <div class="columns is-centered is-multiline">
        <div v-for="podcast in podcasts" :key="podcast.id" class="column is-3">
          <PodcastCard :podcast="podcast" />
        </div>
      </div>
      <!-- end podcasts list -->

      <!-- podcast requests -->
      <div v-if="podcastRequests.length > 0" class="card">
        <div class="card-content">
          <h2 class="subtitle">Solicitudes de inclusión</h2>
          <b-table
            :data="podcastRequests"
            detailed
            detail-key="id"
            show-detail-icon
            narrowed
          >
            <template slot-scope="props">
              <b-table-column field="title" label="Título">
                {{ props.row.title }}
              </b-table-column>
              <b-table-column field="state" label="Estado">
                <span v-if="props.row.state === 'PENDING'">Pendiente</span>
                <span v-if="props.row.state === 'REVIEWING'">En revisión</span>
              </b-table-column>
            </template>
            <template slot="detail" slot-scope="props">
              <p>
                <b>Feed:</b> {{ props.row.feedUrl }}<br />
                <b>Twitter:</b> @{{ props.row.twitterHandler }}<br />
                <b>Telegram:</b> @{{ props.row.telegramHandler }}<br />
              </p>
            </template>
          </b-table>
        </div>
      </div>
      <!-- podcast requests -->
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import PodcastCard from '~/components/PodcastCard'
import telemetry from '~/services/telemetry'

export default {
  auth: true,
  layout: 'podcaster',
  components: { PodcastCard },

  data() {
    return {
      loading: true,
      podcasts: [],
      podcastRequests: []
    }
  },

  computed: {
    user() {
      return this.$store.getters['user/get']
    }
  },

  async mounted() {
    // Telemetry
    telemetry.reportAction(this, 'podcaster_index', this.$route.path)

    // Load viewer user
    this.loading = true
    const { data } = await this.$apollo.query({
      query: gql`
        query viewerUser {
          viewerUser {
            podcasts {
              slug
              title
              image
              populated
              episodesCount
            }
            podcastRequests {
              id
              title
              feedUrl
              telegramHandler
              twitterHandler
              state
            }
          }
        }
      `,
      fetchPolicy: 'network-only'
    })
    this.podcasts = data.viewerUser.podcasts
    this.podcastRequests = data.viewerUser.podcastRequests
    this.loading = false
  }
}
</script>

<style scoped></style>
