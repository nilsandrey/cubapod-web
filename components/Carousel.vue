<template>
  <b-carousel v-if="items.length > 0" :indicator="false" :pause-info="false">
    <b-carousel-item v-for="item in items" :key="item.id">
      <section :class="`hero is-small is-${item.bgColor}`">
        <div class="hero-body">
          <div class="columns is-centered">
            <div class="column is-6 is-10-mobile">
              <div class="media">
                <div v-if="item.image" class="media-left">
                  <img
                    :src="`/media/${item.image}`"
                    alt=""
                    width="200pt"
                    style="border-radius: 10pt"
                  />
                </div>
                <div class="media-content">
                  <h2 class="subtitle">
                    {{ item.title }}
                  </h2>
                  <p>
                    {{ item.text }}
                  </p>
                  <div v-if="item.ctaExternal">
                    <a
                      :href="item.ctaUrl"
                      target="_blank"
                      class="button is-primary is-rounded margin-top-10 is-fullwidth"
                    >
                      {{ item.cta }}
                    </a>
                  </div>
                  <nuxt-link
                    v-else
                    :to="item.ctaUrl"
                    class="button is-primary is-rounded margin-top-10 is-fullwidth"
                  >
                    {{ item.cta }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
import gql from 'graphql-tag'
export default {
  data() {
    return {
      items: []
    }
  },

  async mounted() {
    const { data } = await this.$apollo.query({
      query: gql`
        query carouselitems {
          carouselItems {
            id
            title
            text
            cta
            ctaUrl
            ctaExternal
            image
            bgColor
          }
        }
      `
    })
    this.items = data.carouselItems
  }
}
</script>
