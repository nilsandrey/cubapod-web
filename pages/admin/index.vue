<template>
  <div>
    <p class="subtitle has-text-centered">General</p>
    <div v-if="home" class="columns is-multiline">
      <div class="column is-3">
        <AnalyticsMetricCard
          title="Usuarios"
          :value="home.usersCount"
          icon="account-group"
          color="info"
        />
      </div>
      <div class="column is-3">
        <AnalyticsMetricCard
          title="Pódcasts"
          :value="home.podcastsCount"
          icon="rss"
          color="info"
        />
      </div>
      <div class="column is-3">
        <AnalyticsMetricCard
          title="Episodios"
          :value="home.episodesCount"
          icon="play"
          color="info"
        />
      </div>
      <div class="column is-3">
        <AnalyticsMetricCard
          title="Categorías"
          :value="home.categoriesCount"
          icon="shape"
          color="info"
        />
      </div>
      <div class="column is-6">
        <AnalyticsMetricCard
          title="Audios comprimidos"
          :value="home.telegramAudioFilesCount"
          icon="music-note"
          color="info"
        />
      </div>
      <div class="column is-6">
        <AnalyticsMetricCard
          title="Correos enviados"
          :value="home.emailsCount"
          icon="email-check"
          color="info"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <client-only>
              <vue-ellipse-progress
                :data="[1]"
                :progress="
                  home ? Math.trunc(home.podcastsCount * (100 / 1000)) : null
                "
                :angle="-90"
                color="#2c4bff"
                font-size="20pt"
                :color-fill="colorFillGradient"
                empty-color="#8ec5fc"
                :empty-color-fill="emptyColorFillGradient"
                :size="200"
                :thickness="10"
                empty-thickness="3%"
                line-mode="normal"
                :legend="true"
                :legend-value="home ? home.podcastsCount : null"
                legend-class="legend-custom-style"
                animation="reverse 700 400"
                :no-data="false"
                :loading="loading"
                font-color="black"
                :half="false"
                :gap="10"
                dot="10 blue"
                :reverse="false"
              >
                <span slot="legend-value">/1K</span>
                <p slot="legend-caption">Pódcasts</p>
              </vue-ellipse-progress>
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <p class="subtitle has-text-centered">Sobre el bot</p>
    <div v-if="home" class="columns is-multiline">
      <div class="column">
        <AnalyticsMetricCard
          title="Usuarios"
          :value="home.botUsersCount"
          icon="robot"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Activos"
          :value="home.botActiveUsersCount"
          icon="robot"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Descargas"
          :value="home.botEpisodeDownloadCount"
          icon="download"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Suscripciones"
          :value="home.botSubscribersCount"
          icon="bell"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Favoritos"
          :value="home.botFavoritesCount"
          icon="heart"
          color="info"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <client-only>
              <vue-ellipse-progress
                :data="[1]"
                :progress="
                  home ? Math.trunc(home.botUsersCount * (100 / 5000)) : null
                "
                :angle="-90"
                color="#2c4bff"
                font-size="20pt"
                :color-fill="colorFillGradient"
                empty-color="#8ec5fc"
                :empty-color-fill="emptyColorFillGradient"
                :size="200"
                :thickness="10"
                empty-thickness="3%"
                line-mode="normal"
                :legend="true"
                :legend-value="home ? home.botUsersCount : null"
                legend-class="legend-custom-style"
                animation="reverse 700 400"
                :no-data="false"
                :loading="loading"
                font-color="black"
                :half="false"
                :gap="10"
                dot="10 blue"
                :reverse="false"
              >
                <span slot="legend-value">/5K</span>
                <p slot="legend-caption">Usuarios</p>
              </vue-ellipse-progress>
            </client-only>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <client-only>
              <vue-ellipse-progress
                :data="[1]"
                :progress="
                  home
                    ? Math.trunc(home.botEpisodeDownloadCount * (100 / 30000))
                    : null
                "
                :angle="-90"
                color="#2c4bff"
                font-size="20pt"
                :color-fill="colorFillGradient"
                empty-color="#8ec5fc"
                :empty-color-fill="emptyColorFillGradient"
                :size="200"
                :thickness="10"
                empty-thickness="3%"
                line-mode="normal"
                :legend="true"
                :legend-value="home ? home.botEpisodeDownloadCount : null"
                legend-class="legend-custom-style"
                animation="reverse 700 400"
                :no-data="false"
                :loading="loading"
                font-color="black"
                :half="false"
                :gap="10"
                dot="10 blue"
                :reverse="false"
              >
                <span slot="legend-value">/30K</span>
                <p slot="legend-caption">Descargas</p>
              </vue-ellipse-progress>
            </client-only>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <client-only>
              <vue-ellipse-progress
                :data="[1]"
                :progress="
                  home
                    ? Math.trunc(home.botSubscribersCount * (100 / 3000))
                    : null
                "
                :angle="-90"
                color="#2c4bff"
                font-size="20pt"
                :color-fill="colorFillGradient"
                empty-color="#8ec5fc"
                :empty-color-fill="emptyColorFillGradient"
                :size="200"
                :thickness="10"
                empty-thickness="3%"
                line-mode="normal"
                :legend="true"
                :legend-value="home ? home.botSubscribersCount : null"
                legend-class="legend-custom-style"
                animation="reverse 700 400"
                :no-data="false"
                :loading="loading"
                font-color="black"
                :half="false"
                :gap="10"
                dot="10 blue"
                :reverse="false"
              >
                <span slot="legend-value">/3K</span>
                <p slot="legend-caption">Suscripciones</p>
              </vue-ellipse-progress>
            </client-only>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content has-text-centered">
            <client-only>
              <vue-ellipse-progress
                :data="[1]"
                :progress="
                  home
                    ? Math.trunc(home.botFavoritesCount * (100 / 2000))
                    : null
                "
                :angle="-90"
                color="#2c4bff"
                font-size="20pt"
                :color-fill="colorFillGradient"
                empty-color="#8ec5fc"
                :empty-color-fill="emptyColorFillGradient"
                :size="200"
                :thickness="10"
                empty-thickness="3%"
                line-mode="normal"
                :legend="true"
                :legend-value="home ? home.botFavoritesCount : null"
                legend-class="legend-custom-style"
                animation="reverse 700 400"
                :no-data="false"
                :loading="loading"
                font-color="black"
                :half="false"
                :gap="10"
                dot="10 blue"
                :reverse="false"
              >
                <span slot="legend-value">/2K</span>
                <p slot="legend-caption">Favoritos</p>
              </vue-ellipse-progress>
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <AdminChartBotEpisodeDownloadHistory />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AnalyticsMetricCard from '~/components/AnalyticsMetricCard'
import AdminChartBotEpisodeDownloadHistory from '~/components/AdminChartBotEpisodeDownloadHistory'

export default {
  layout: 'admin',
  auth: true,
  components: {
    AnalyticsMetricCard,
    AdminChartBotEpisodeDownloadHistory
  },

  data() {
    return {
      home: null,
      loading: true
    }
  },

  async mounted() {
    this.loading = true
    const { data } = await this.$apollo.query({
      query: gql`
        query home {
          usersCount
          podcastsCount
          episodesCount
          categoriesCount
          emailsCount
          telegramAudioFilesCount
          botUsersCount
          botActiveUsersCount
          botEpisodeDownloadCount
          botSubscribersCount
          botFavoritesCount
        }
      `
    })
    this.home = data
    this.loading = false
  }
}
</script>

<style scoped></style>
