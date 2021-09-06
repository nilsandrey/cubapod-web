<template>
  <div>
    <!-- not found -->
    <not-found v-if="notFound" label="La página que buscabas no existe" />
    <!-- end not found -->

    <div v-if="page">
      <!-- draft notice -->
      <section v-if="!page.public" class="section">
        <div class="container">
          <div class="card">
            <div class="card-content">
              <info>
                Puedes ver esta página porque estás autenticado como
                administrador. La página no es pública.
              </info>
            </div>
          </div>
        </div>
      </section>
      <!-- end draft notice -->

      <div class="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-10-desktop is-12-mobile">
              <markdown-block :content="page.content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  auth: false,

  async fetch({ app, store, params }) {
    const { data } = await app.apolloProvider.defaultClient.query({
      query: gql`
        query helpPage($slug: String!) {
          helpPage(slug: $slug) {
            name
            slug
            description
            content
            public
          }
        }
      `,
      variables: {
        slug: params.slug
      }
    })
    if (data.helpPage) {
      store.commit('page/set', data.helpPage)
    }
  },

  data() {
    return {
      page: null,
      notFound: false
    }
  },

  mounted() {
    this.page = this.$store.getters['page/get']
    if (!this.page) {
      this.notFound = true
    }
  },

  head() {
    const page = this.$store.getters['page/get']

    let title, description, image

    if (page) {
      title = page.name
      description = page.description
      image = null
    } else {
      title = '404'
      description = null
      image = null
    }

    return {
      title: `${title} | CubaPod`,
      meta: [
        { hid: 'description', name: 'description', content: description },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `https://cubapod.net/ayuda/${this.$route.params.slug}`
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${title} | CubaPod`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: image
        },
        {
          hid: 'og:image:alt',
          name: 'og:image:alt',
          content: title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${title} | CubaPod`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: description
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: title
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
p
  margin 20pt

li
  margin 10pt 40pt 10pt 40pt
  list-style disc

.contents a
  display block
</style>
