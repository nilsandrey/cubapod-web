<template>
  <section class="section">
    <div class="container">
      <div class="has-text-centered">
        <h1 class="title">CubaPod</h1>
        <p class="subtitle margin-bottom-10">Cola de compresión</p>
      </div>

      <div v-if="loading" class="has-text-centered margin-top-10">
        <b-icon icon="loading" size="is-medium" class="spinning"></b-icon>
      </div>

      <div v-else>
        <CompressorEpisode
          v-for="episode in compressor.episodes.objects"
          :key="episode.cubapodId"
          :episode="episode"
          class="margin-top-10"
        />
      </div>

      <b-pagination
        v-if="compressor.episodes.objects"
        v-model="compressor.page"
        :current.sync="compressor.page"
        :total="compressor.episodes.pages"
        :range-before="3"
        :range-after="3"
        order="is-left"
        size="is-small"
        rounded
        :per-page="10"
        aria-next-label="Siguiente"
        aria-previous-label="Anterior"
        aria-page-label="Página"
        aria-current-label="Actual"
        class="margin-top-10"
        @change="($page) => loadCompressor($page)"
      ></b-pagination>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import CompressorEpisode from '~/components/CompressorEpisode'

export default {
  layout: 'blank',
  auth: false,
  components: { CompressorEpisode },

  data() {
    return {
      compressor: {
        page: 1,
        episodes: {
          page: 1,
          pages: null,
          hasNext: null,
          hasPrev: null,
          objects: []
        }
      },
      loading: false
    }
  },

  mounted() {
    // Load compressor episodes
    this.loadCompressor(this.$route.query.page || 1)
  },

  methods: {
    /**
     * Load compressor episodes
     */
    async loadCompressor(page) {
      this.loading = true

      if (page) {
        this.compressor.page = page
        this.$router.replace(`/compressor?page=${this.compressor.page}`)
      }

      const { data } = await this.$apollo.query({
        query: gql`
          query episodes($page: Int) {
            episodes(page: $page) {
              page
              pages
              hasNext
              hasPrev
              objects {
                title
                enclosure
                cubapodId
                state
                foreign
              }
            }
          }
        `,
        variables: {
          page: this.compressor.page
        },
        fetchPolicy: 'network-only',
        client: 'compressor'
      })

      this.compressor.episodes = data.episodes
      this.compressor.page = data.episodes.page

      this.loading = false
    }
  }
}
</script>
