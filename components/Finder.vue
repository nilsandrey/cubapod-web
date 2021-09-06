<template>
  <b-field>
    <b-autocomplete
      v-model.lazy="criteria"
      placeholder="Buscar pódcasts..."
      icon="magnify"
      clearable
      rounded
      :data="results"
      :loading="loading"
      :expanded="expanded"
      :size="size"
      @input="search()"
      @select="(option) => $router.replace(option.fullPath)"
    >
      <template slot="empty">No se encontraron resultados</template>
      <template slot-scope="props">
        <div class="media">
          <div class="media-left">
            <img
              width="32pt"
              height="32pt"
              :src="`${props.option.image}`"
              style="border-radius: 5pt"
            />
          </div>
          <div class="media-content">
            {{ props.option.title }}
          </div>
        </div>
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      criteria: null,
      loading: false,
      results: []
    }
  },

  methods: {
    async search() {
      if (this.criteria) {
        this.loading = true
        this.results = []
        const { data } = await this.$apollo.query({
          query: gql`
            query search($criteria: String!) {
              search(criteria: $criteria) {
                title
                image
                fullPath
              }
            }
          `,
          variables: {
            criteria: this.criteria
          }
        })
        this.results = data.search
        this.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
