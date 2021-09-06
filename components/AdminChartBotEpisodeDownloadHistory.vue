<template>
  <div v-if="loaded" class="card margin-bottom-10">
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <p class="subtitle">Descargas en los últimos {{ days }} días</p>
        </div>
        <div class="level-right">
          <b-field>
            <b-select
              v-model="days"
              size="is-small"
              placeholder="Días"
              :loading="loading"
              @input="loadHistory"
            >
              <option
                v-for="option in [180, 90, 30, 15, 7]"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <LineChart :data="chartData" height="150pt"></LineChart>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import LineChart from '~/components/LineChart'

export default {
  components: { LineChart },

  data() {
    return {
      loaded: false,
      loading: false,
      history: null,
      days: 30
    }
  },

  computed: {
    chartData() {
      if (this.history) {
        const labels = []
        const data = []

        this.history.forEach((i) => {
          labels.push(i.date)
          data.push(i.count)
        })

        return {
          labels,
          datasets: [
            {
              label: 'Cantidad de descargas',
              backgroundColor: '#2c4bff',
              data
            }
          ]
        }
      }
      return null
    }
  },

  async mounted() {
    this.loaded = false
    await this.loadHistory()
    this.loaded = true
  },

  methods: {
    async loadHistory() {
      this.loading = true
      const { data } = await this.$apollo.query({
        query: gql`
          query history($days: Int!) {
            botEpisodeDownloadHistory(days: $days) {
              date
              count
            }
          }
        `,
        variables: {
          days: this.days
        }
      })
      this.history = data.botEpisodeDownloadHistory
      this.loading = false
    }
  }
}
</script>
