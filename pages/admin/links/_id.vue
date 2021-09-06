<template>
  <div v-if="link">
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">
          <b-icon
            size="is-small"
            icon="cursor-default-click"
            class="margin-right-5"
          ></b-icon>
          <span>{{ link.requestsCount }} peticiones</span>
        </div>
        <div class="card-header-icon">
          <b-icon
            size="is-small"
            icon="calendar"
            class="margin-right-5"
          ></b-icon>
          <span>
            {{ $moment(link.createdAt).format('MM/DD/YYYY - h:mm:ss a') }}
          </span>
        </div>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column is-8">
            <div class="columns">
              <div class="column">
                <label for="" class="label">
                  Acortado
                </label>
                <a
                  :href="`https://link.cubapod.net/${link.hash}`"
                  target="_blank"
                >
                  <b-icon icon="link" size="is-small"></b-icon>
                  https://link.cubapod.net/{{ link.hash }}
                </a>
                <b-button
                  size="is-small"
                  icon-left="clipboard"
                  @click="$copyText(`https://link.cubapod.net/${link.hash}`)"
                ></b-button>
              </div>
              <div class="column">
                <label for="" class="label">
                  Destino
                </label>
                <a :href="link.destiny" target="_blank">
                  <b-icon icon="link" size="is-small"></b-icon>
                  {{ link.destiny }}
                </a>
                <b-button
                  size="is-small"
                  icon-left="clipboard"
                  @click="$copyText(link.destiny)"
                ></b-button>
              </div>
            </div>
            <BarChart :data="hours" :height="200" />
          </div>
          <div class="column is-4">
            <label for="" class="label">
              Previsualización
            </label>
            <div class="card margin-top-10">
              <div class="card-image">
                <figure class="image">
                  <img
                    :src="
                      link.meta.meta.image ||
                        link.meta.meta['og:image'] ||
                        link.meta.meta['twitter:image']
                    "
                    alt=""
                    width="100%"
                  />
                </figure>
              </div>
              <div class="card-content">
                <p>
                  <b>
                    {{
                      link.meta.meta.title ||
                        link.meta.meta['og:title'] ||
                        link.meta.page.title
                    }}
                  </b>
                </p>
                <small>
                  {{ link.meta.meta.description }}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <!-- agents -->
            <div class="card">
              <div class="card-header">
                <div class="card-header-title">
                  Agentes
                </div>
              </div>
              <div class="card-content">
                <Chart
                  v-if="agentData.length > 0"
                  :data="{
                    datasets: [
                      {
                        data: agentData,
                        backgroundColor: agentColors
                      }
                    ],
                    labels: agentLabel
                  }"
                  :options="{
                    legend: {
                      position: 'bottom'
                    }
                  }"
                ></Chart>
              </div>
            </div>
            <!-- end agents -->
          </div>
          <div class="column">
            <!-- oss -->
            <div class="card">
              <div class="card-header">
                <div class="card-header-title">
                  Sistemas operativos
                </div>
              </div>
              <div class="card-content">
                <Chart
                  v-if="osData.length > 0"
                  :data="{
                    datasets: [
                      {
                        data: osData,
                        backgroundColor: osColors
                      }
                    ],
                    labels: osLabel
                  }"
                  :options="{
                    legend: {
                      position: 'bottom'
                    }
                  }"
                ></Chart>
              </div>
            </div>
            <!-- end oss -->
          </div>
        </div>

        <div class="card margin-bottom-10">
          <div class="card-content">
            <BarChart :data="languages" :height="100" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Chart from '~/components/Chart'
import BarChart from '~/components/BarChart'
export default {
  layout: 'admin',
  auth: true,
  components: { Chart, BarChart },

  data() {
    return {
      link: null,
      langs: require('~/data/langs.json')
    }
  },

  computed: {
    agentData() {
      const result = []
      if (this.link) {
        let agent
        for (agent in this.link.metrics.agents) {
          result.push(this.link.metrics.agents[agent])
        }
      }
      return result
    },

    agentLabel() {
      const result = []
      if (this.link) {
        let agent
        for (agent in this.link.metrics.agents) {
          result.push(agent)
        }
      }
      return result
    },

    agentColors() {
      const colors = []
      // eslint-disable-next-line no-unused-vars
      let agent
      for (agent in this.link.metrics.agents) {
        colors.push('#' + (((1 << 24) * Math.random()) | 0).toString(16))
      }
      return colors
    },

    osData() {
      const result = []
      if (this.link) {
        let os
        for (os in this.link.metrics.oss) {
          result.push(this.link.metrics.oss[os])
        }
      }
      return result
    },

    osLabel() {
      const result = []
      if (this.link) {
        let os
        for (os in this.link.metrics.oss) {
          result.push(os)
        }
      }
      return result
    },

    osColors() {
      const colors = []
      // eslint-disable-next-line no-unused-vars
      let os
      for (os in this.link.metrics.oss) {
        colors.push('#' + (((1 << 24) * Math.random()) | 0).toString(16))
      }
      return colors
    },

    languages() {
      const labels = []
      const data = []
      if (this.link) {
        let lang
        for (lang in this.link.metrics.languages) {
          labels.push(this.langs[lang].name)
          data.push(this.link.metrics.languages[lang])
        }
      }
      return {
        labels,
        datasets: [
          {
            label: 'Idiomas',
            backgroundColor: '#2c4bff',
            data
          }
        ]
      }
    },

    hours() {
      const labels = []
      const data = []
      if (this.link) {
        this.link.metrics.hours.forEach((i) => {
          // eslint-disable-next-line no-console
          console.log(i)
          labels.unshift(`${i.hour}h`)
          data.unshift(i.amount)
        })
      }
      return {
        labels,
        datasets: [
          {
            label: 'Peticiones',
            backgroundColor: '#2c4bff',
            data
          }
        ]
      }
    }
  },

  mounted() {
    this.loadLink()
  },

  methods: {
    async loadLink() {
      const { data } = await this.$apollo.query({
        query: gql`
          query link($id: String!) {
            link(id: $id) {
              id
              createdAt
              hash
              destiny
              metrics
              requestsCount
              meta
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        }
      })
      this.link = data.link
      this.link.metrics = JSON.parse(data.link.metrics)
      this.link.meta = JSON.parse(data.link.meta)
    }
  }
}
</script>
