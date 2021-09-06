<template>
  <div>
    <div class="card margin-bottom-10">
      <div class="card-content">
        <p class="subtitle">Uso del bot</p>
        <BarChart
          v-if="loaded"
          :data="botTelemetryChartdata"
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
      botTelemetryMetrics: [],
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
    botTelemetryChartdata() {
      const labels = []
      const data = []
      this.botTelemetryMetrics.forEach((i) => {
        labels.push(i.event)
        data.push(i.times)
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
          botTelemetryMetrics {
            id
            event
            times
          }
        }
      `
    })
    this.botTelemetryMetrics = data.botTelemetryMetrics
    this.loaded = true
  }
}
</script>
