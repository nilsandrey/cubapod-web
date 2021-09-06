<template>
  <div>
    <div class="card">
      <div class="card-content">
        <p class="subtitle">Uso de podcáster</p>
        <BarChart
          v-if="loaded"
          :data="podcasterTelemetryChartdata"
          height="150pt"
        ></BarChart>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import BarChart from '~/components/BarChart'
export default {
  layout: 'admin',
  auth: true,
  components: { BarChart },

  data() {
    return {
      loaded: false,
      podcasterTelemetryMetrics: [],
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      }
      /* options: {
        responsive: true,
        maintainAspectRatio: false
      } */
    }
  },

  computed: {
    podcasterTelemetryChartdata() {
      const labels = []
      const data = []
      this.podcasterTelemetryMetrics.forEach((i) => {
        const s = {
          podcaster_add: 'Add',
          podcaster_login: 'Login',
          podcaster_logout: 'Logout',
          podcaster_index: 'Podcaster',
          podcaster_profile: 'Profile',
          podcaster_podcast_episodes: 'Episodes',
          podcaster_podcast_preferences: 'Preferences',
          podcaster_podcast_preferences_updated: 'Preferences updated',
          podcaster_podcast_donations_updated: 'Donations updated',
          podcaster_podcast_socials_updated: 'Socials updated',
          podcaster_profile_password_updated: 'Password updated',
          podcaster_podcast_index: 'Podcast',
          podcaster_podcast_insights: 'Insights',
          podcaster_podcast_analytics: 'Analytics'
        }
        labels.push(s[i.action])
        data.push(i.count)
      })
      return {
        labels,
        datasets: [
          {
            label: 'Cantidad de acciones',
            backgroundColor: '#2c4bff',
            data
          }
        ]
      }
    }
  },

  async mounted() {
    this.loaded = false
    const { data } = await this.$apollo.query({
      query: gql`
        query metrics {
          podcasterTelemetryMetrics {
            action
            count
          }
        }
      `
    })
    this.podcasterTelemetryMetrics = data.podcasterTelemetryMetrics
    this.loaded = true
  }
}
</script>
