<template>
  <div>
    <b-loading is-full-page :active="loading" :can-cancel="false">
      <b-icon icon="podcast" size="is-large" custom-class="fa-spin"></b-icon>
    </b-loading>

    <not-found
      v-if="notFound"
      label="La categoría que buscabas no existe en CubaPod"
    />

    <div v-if="category">
      <!-- podcasts -->
      <div v-if="podcasts" :style="`background: ${category.color}`">
        <div class="container">
          <h1
            class="title has-text-white has-text-centered"
            style="padding: 20pt"
          >
            {{ category.name }}
          </h1>
        </div>
      </div>
      <div class="wave-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150">
          <path
            :fill="category.color"
            fill-opacity="1"
            d="M0,224L120,197.3C240,171,480,117,720,112C960,107,1200,149,1320,170.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div v-if="podcasts" class="container">
        <div
          class="columns is-centered is-multiline margin-top-20 is-hidden-mobile"
          style="padding-left: 20pt; padding-right: 20pt"
        >
          <Podcast
            v-for="podcast in podcasts"
            :key="podcast.slug"
            :podcast="podcast"
            class="column is-2-desktop is-3-tablet is-12-mobile"
          />
        </div>

        <div
          class="is-hidden-tablet margin-top-20"
          style="padding-left: 20pt; padding-right: 20pt"
        >
          <PodcastListItem
            v-for="podcast in podcasts"
            :key="podcast.slug"
            :podcast="podcast"
          />
        </div>

        <div v-if="podcasts.length === 0">
          <div class="hero is-medium">
            <div class="hero-body has-text-centered">
              <b-icon icon="rss" size="is-large"></b-icon>
              <p>Aún no tenemos pódcasts cubanos en esa categoría.</p>
              <p>
                ¿Conoces uno? <nuxt-link to="/contact">Contáctanos</nuxt-link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- end podcasts -->

      <!-- ads -->
      <p class="has-text-centered">
        <a href="https://crecexdiez.com/s/l/400/728x90">
          <img
            src="https://crecexdiez.com/s/i/400/728x90"
            style="width: 728px; height:90px;"
          />
        </a>
      </p>
      <p class="has-text-centered">
        <a href="https://lugodev.link/cx10">
          <small>
            Promocionado por CreceXDiez
          </small>
        </a>
      </p>
      <!-- end ads -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Podcast from '~/components/Podcast'
import PodcastListItem from '~/components/PodcastListItem'

export default {
  auth: false,
  components: { Podcast, PodcastListItem },

  async fetch({ app, store, params }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query category($slug: String!) {
          category(slug: $slug) {
            slug
            name
            img
            icon
            color
            description
          }
        }
      `,
      variables: {
        slug: params.categorySlug
      }
    })
    if (data.category) {
      store.commit('category/set', data.category)
    }
  },

  data() {
    return {
      podcasts: null,
      category: null,
      notFound: false,
      loading: false
    }
  },

  computed: {},

  async mounted() {
    await this.loadCategory()
    await this.loadPodcasts()
  },

  methods: {
    async loadCategory() {
      const { data } = await this.$apollo.query({
        query: gql`
          query category($slug: String!) {
            category(slug: $slug) {
              slug
              name
              img
              icon
              color
              description
            }
          }
        `,
        variables: {
          slug: this.$route.params.categorySlug
        }
      })
      this.category = data.category
      if (!data.category) {
        this.notFound = true
      }
      this.$store.commit('category/set', data.category)
    },

    async loadPodcasts() {
      const { data } = await this.$apollo.query({
        query: gql`
          query podcasts($categorySlug: String!) {
            podcasts(categorySlug: $categorySlug) {
              slug
              title
              image
              summary
              episodesCount
            }
          }
        `,
        variables: {
          categorySlug: this.$route.params.categorySlug
        }
      })
      this.podcasts = data.podcasts
    }
  },

  head() {
    const category = this.$store.getters['category/get']
    if (this.category) {
      const title = `${category.name} | CubaPod`
      const description = category.description
      const seoimage = category.img
      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'image', name: 'image', content: seoimage },
          { hid: 'og:title', name: 'og:title', content: title },
          {
            hid: 'og:description',
            name: 'og:description',
            content: description
          },
          { hid: 'og:image', name: 'og:image', content: seoimage },
          { hid: 'og:locale', name: 'og:locale', content: 'es_ES' },
          { hid: 'twitter:title', name: 'twitter:title', content: title },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description
          },
          { hid: 'twitter:image', name: 'twitter:image', content: seoimage },
          {
            hid: 'twitter:card',
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            hid: 'twitter:creator',
            name: 'twitter:creator',
            content: '@CubaPod'
          }
        ]
      }
    } else {
      const title = `Categoría no existente | CubaPod`
      return {
        title,
        meta: [
          { hid: 'og:title', name: 'og:title', content: title },
          { hid: 'twitter:title', name: 'twitter:title', content: title }
        ]
      }
    }
  }
}
</script>

<style scoped></style>
