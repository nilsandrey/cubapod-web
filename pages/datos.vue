<template>
  <div>
    <loading :active="loading" />
    <div v-if="analytics">
      <section class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-6 is-12-mobile margin-bottom-20">
              <h1 class="title has-text-centered">
                Datos y cifras del podcasting cubano
              </h1>
            </div>
          </div>
        </div>

        <div class="columns is-multiline is-centered">
          <div class="column is-3 is-12-mobile">
            <AnalyticsMetricCard
              title="Pódcasts"
              :value="analytics.metrics.podcasts_count"
              icon="rss"
              color="info"
            />
          </div>
          <div class="column is-3 is-12-mobile">
            <AnalyticsMetricCard
              title="Episodios"
              :value="analytics.metrics.episodes_count"
              icon="play"
              color="info"
            />
          </div>
          <div class="column is-3 is-12-mobile">
            <AnalyticsMetricCard
              title="Audios comprimidos"
              :value="analytics.metrics.telegram_audio_files_count"
              icon="music-note"
              color="info"
            />
          </div>
          <div class="column is-3 is-12-mobile">
            <AnalyticsMetricCard
              title="Usuarios en el bot"
              :value="analytics.metrics.bot_users_count"
              icon="robot"
              color="info"
            />
          </div>
          <div class="column is-4 is-12-mobile">
            <AnalyticsMetricCard
              title="Suscripciones"
              :value="analytics.metrics.bot_subscribers_count"
              icon="bell"
              color="info"
            />
          </div>
          <div class="column is-4 is-12-mobile">
            <AnalyticsMetricCard
              title="Descargas"
              :value="analytics.metrics.bot_episode_download_count"
              icon="download"
              color="info"
            />
          </div>
          <div class="column is-4 is-12-mobile">
            <AnalyticsMetricCard
              title="Favoritos a pódcasts"
              :value="analytics.metrics.bot_favorites_count"
              icon="heart"
              color="info"
            />
          </div>
          <!-- div class="column is-3 is-12-mobile">
            <AnalyticsMetricCard
              title="Favoritos a episodios"
              :value="0"
              icon="heart"
              color="info"
            />
          </div -->
        </div>

        <div class="card margin-bottom-20">
          <div class="card-content has-text-centered">
            <p class="margin-bottom-10">Progreso para los 1000 pódcasts</p>
            <div>
              <client-only>
                <vue-ellipse-progress
                  :data="[1]"
                  :progress="
                    Math.trunc(analytics.metrics.podcasts_count * (100 / 1000))
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
                  :legend-value="analytics.metrics.podcasts_count"
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
            <p class="has-text-centered">
              Estamos a un <b>{{ Math.trunc(goalPercent) }}%</b> de llegar a
              <b>1000</b> pódcasts cubanos
            </p>
          </div>
        </div>

        <div class="card margin-bottom-20">
          <div class="card-content">
            <p class="margin-bottom-10 has-text-centered">
              Distribución de pódcasts según categoría
            </p>
            <div class="columns is-centered">
              <div class="column is-5 is-12-mobile">
                <!-- distribution by category -->
                <Chart
                  :data="{
                    datasets: [
                      {
                        data: analytics.metrics.categories_series,
                        backgroundColor: categoriesColors
                      }
                    ],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: analytics.metrics.categories_labels
                  }"
                  :options="{
                    legend: {
                      position: 'bottom'
                    }
                  }"
                ></Chart>
                <!-- distribution by category -->
              </div>
            </div>
          </div>
        </div>
        <AdminChartBotEpisodeDownloadHistory />
        <BotRevenueChart />
      </section>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Chart from '~/components/Chart'
import AnalyticsMetricCard from '~/components/AnalyticsMetricCard'
import AdminChartBotEpisodeDownloadHistory from '~/components/AdminChartBotEpisodeDownloadHistory'
import BotRevenueChart from '~/components/BotRevenueChart'

export default {
  auth: false,
  components: {
    Chart,
    AnalyticsMetricCard,
    AdminChartBotEpisodeDownloadHistory,
    BotRevenueChart
  },

  data() {
    return {
      loading: true,
      analytics: null,
      categories: [],
      categoriesColors: [
        '#00429d',
        '#2b57a7',
        '#426cb0',
        '#5681b9',
        '#6997c2',
        '#7daeca',
        '#93c4d2',
        '#abdad9',
        '#caefdf',
        '#ffe2ca',
        '#ffc4b4',
        '#ffa59e',
        '#f98689',
        '#ed6976',
        '#dd4c65',
        '#ca2f55',
        '#b11346',
        '#93003a'
      ]
    }
  },

  computed: {
    goalPercent() {
      if (this.analytics) {
        return this.analytics.metrics.podcasts_count * (100 / 1000)
      }
      return 0
    }
  },

  async mounted() {
    this.loading = true
    const { data } = await this.$apollo.query({
      query: gql`
        query analytics {
          analytics
        }
      `
    })
    this.analytics = JSON.parse(data.analytics)
    this.loading = false
  },

  head() {
    const title = 'Datos y cifras del podcasting cubano | CubaPod'
    return {
      title,
      meta: [
        { name: 'og:title', content: title },
        { name: 'twitter:title', content: title }
      ]
    }
  }
}
</script>

<style scoped></style>
