<template>
  <div v-if="$store.getters['user/get']">
    <!-- state -->
    <div class="card has-background-black has-text-centered margin-bottom-10">
      <div class="card-content">
        <h2 class="subtitle has-text-white">{{ state.state }}</h2>
        <div v-if="$store.getters['user/get'].isSuperuser">
          <!-- control -->
          <b-button
            v-if="state.control === 'PAUSE_REQUEST'"
            type="is-success"
            icon-left="play"
            :loading="state.controlLoading"
            @click="start()"
          >
            Iniciar
          </b-button>
          <b-button
            v-else
            type="is-danger"
            icon-left="pause"
            :loading="state.controlLoading"
            @click="pause()"
          >
            Pausar
          </b-button>
          <!-- end control -->

          <!-- publish to telegram -->
          <b-button
            v-if="state.uploadToTelegram"
            type="is-danger"
            icon-left="upload"
            :loading="state.uploadToTelegramLoading"
            @click="deactivateTelegramUploading()"
          >
            Desactivar
          </b-button>
          <b-button
            v-else
            type="is-success"
            icon-left="upload"
            :loading="state.uploadToTelegramLoading"
            @click="activateTelegramUploading()"
          >
            Activar
          </b-button>
          <!-- end publish to telegram -->
        </div>
      </div>
    </div>
    <!-- end state -->

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
</template>

<script>
import gql from 'graphql-tag'
import CompressorEpisode from '~/components/CompressorEpisode'
// import Paginator from '~/components/Paginator'

export default {
  components: { CompressorEpisode },
  layout: 'admin',

  auth: true,

  data() {
    return {
      state: {
        state: null,
        control: null,
        controlLoading: false,
        uploadToTelegram: null,
        uploadToTelegramLoading: false,
        interval: null,
        iterations: null
      },
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

  async mounted() {
    this.state.controlLoading = true
    this.state.uploadToTelegramLoading = true

    const { data } = await this.$apollo.query({
      query: gql`
        query distributorState {
          distributorState {
            state
            control
            uploadToTelegram
            interval
            iterations
          }
        }
      `
    })

    this.state = data.distributorState
    this.state.controlLoading = false
    this.state.uploadToTelegramLoading = false

    // Load compressor episodes
    this.loadCompressor(this.$route.query.page || 1)
  },

  methods: {
    /**
     * Start distributor
     */
    async start() {
      this.state.controlLoading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation startDistributor {
            startDistributor {
              status
            }
          }
        `
      })
      if (data.startDistributor.status === 'ok') {
        this.state.control = 'CONTINUE'
        this.state.controlLoading = false
      }
    },

    /**
     * Pause distributor
     */
    async pause() {
      this.state.controlLoading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation pauseDistributor {
            pauseDistributor {
              status
            }
          }
        `
      })
      if (data.pauseDistributor.status === 'ok') {
        this.state.control = 'PAUSE_REQUEST'
        this.state.controlLoading = false
      }
    },

    /**
     * Activate Telegram uploading
     */
    async activateTelegramUploading() {
      this.state.uploadToTelegramLoading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation activateTelegramUploading {
            activateTelegramUploading {
              status
            }
          }
        `
      })
      if (data.activateTelegramUploading.status === 'ok') {
        this.state.uploadToTelegram = true
        this.state.uploadToTelegramLoading = false
      }
    },

    /**
     * Deactivate Telegram uploading
     */
    async deactivateTelegramUploading() {
      this.state.uploadToTelegramLoading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation deactivateTelegramUploading {
            deactivateTelegramUploading {
              status
            }
          }
        `
      })
      if (data.deactivateTelegramUploading.status === 'ok') {
        this.state.uploadToTelegram = false
        this.state.uploadToTelegramLoading = false
      }
    },

    /**
     * Load compressor episodes
     */
    async loadCompressor(page) {
      this.loading = true

      if (page) {
        this.compressor.page = page
        this.$router.replace(`/admin/distributor?page=${this.compressor.page}`)
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
    },

    /**
     * Load previus episodes
     */
    loadPrevEpisode() {
      this.compressor.page -= 1
      this.$router.replace(`/admin/distributor?page=${this.compressor.page}`)
      this.loadCompressor()
    },

    /**
     * Load next episodes
     */
    loadNextEpisode() {
      this.compressor.page += 1
      this.$router.replace(`/admin/distributor?page=${this.compressor.page}`)
      this.loadCompressor()
    }
  }
}
</script>
