<template>
  <div>
    <section class="section">
      <h1 class="title has-text-centered">CubaPod en la prensa</h1>
      <div class="container is-widescreen">
        <p class="has-text-centered margin-bottom-20">
          ¿Qué cuentan los medios digitales acerca de CubaPod?
        </p>

        <!-- press mentions -->
        <div class="columns is-centered is-multiline">
          <div
            v-for="mention in pressMentions"
            :key="mention.title"
            class="column is-4 is-12-mobile"
          >
            <PressMention :mention="mention" />
          </div>
        </div>
        <!-- end press mentions -->

        <!-- podcasts -->
        <p class="title has-text-centered margin-top-20">
          Pódcasts
        </p>
        <div class="columns is-centered is-multiline">
          <div
            v-for="mention in podcastMentions"
            :key="mention.url"
            class="column is-8-tablet is-12-mobile"
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <a :href="mention.url" target="_blank">
                      <img
                        :src="`/media/${mention.image}`"
                        :alt="mention.source"
                        width="100pt"
                        style="border-radius: 10pt"
                      />
                    </a>
                  </div>
                  <div class="media-content">
                    <p>
                      <b>{{ mention.source }}</b>
                    </p>
                    <p>{{ mention.title }}</p>
                    <p>
                      <small>{{ mention.date }}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end podcasts -->

        <!-- newsletter mentions -->
        <p class="title has-text-centered margin-top-20">
          Boletines de noticias
        </p>
        <div class="columns is-centered is-multiline">
          <div
            v-for="mention in newsletterMentions"
            :key="mention.url"
            class="column is-8-tablet is-12-mobile"
          >
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <a :href="mention.url" target="_blank">
                      <img
                        :src="`/media/${mention.image}`"
                        :alt="mention.source"
                        width="100pt"
                        style="border-radius: 10pt"
                      />
                    </a>
                  </div>
                  <div class="media-content">
                    <p>
                      <b>{{ mention.source }}</b> • {{ mention.title }}
                    </p>
                    <p>
                      <small>{{ mention.description }}</small>
                    </p>
                    <p>
                      <small>{{ mention.date }}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- newsletter mentions -->

        <div class="columns is-centered">
          <div class="column is-8-tablet is-12-mobile">
            <div class="card">
              <div class="card-content">
                <info>
                  Para preguntas y peticiones de entrevistas, contáctenos en
                  <a href="mailto:contacto@cubapod.net">contacto@cubapod.net</a
                  >.
                </info>
              </div>
            </div>
          </div>
        </div>

        <!-- assets -->
        <div class="container" style="padding: 20pt">
          <p class="subtitle has-text-centered" style="margin: 40pt 0 40pt 0">
            Logos
          </p>
          <div class="columns">
            <div class="column">
              <PressAsset>
                <img
                  src="/img/brand/color-horizontal.svg"
                  alt=""
                  width="200pt"
                />
              </PressAsset>
            </div>
            <div class="column">
              <PressAsset>
                <img
                  src="/img/brand/negro-horizontal.svg"
                  alt=""
                  width="200pt"
                />
              </PressAsset>
            </div>
            <div class="column">
              <PressAsset style="background: black">
                <img
                  src="/img/brand/blanco-horizontal.svg"
                  alt=""
                  width="200pt"
                />
              </PressAsset>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <PressAsset>
                <img src="/img/brand/color-vertical.svg" alt="" width="200pt" />
              </PressAsset>
            </div>
            <div class="column">
              <PressAsset>
                <img src="/img/brand/negro-vertical.svg" alt="" width="200pt" />
              </PressAsset>
            </div>
            <div class="column">
              <PressAsset style="background: black">
                <img
                  src="/img/brand/blanco-vertical.svg"
                  alt=""
                  width="200pt"
                />
              </PressAsset>
            </div>
          </div>
        </div>
        <!-- end assets -->
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import PressMention from '~/components/PressMention'
import PressAsset from '~/components/PressAsset'

export default {
  auth: false,

  components: { PressMention, PressAsset },

  data() {
    return {
      pressMentions: [],
      podcastMentions: [],
      newsletterMentions: []
    }
  },

  async mounted() {
    const { data } = await this.$apollo.query({
      query: gql`
        query press {
          newsletterMentions {
            title
            url
            source
            date
            image
            description
          }
          podcastMentions {
            title
            url
            source
            date
            image
          }
          pressMentions {
            title
            url
            source
            date
            image
          }
        }
      `
    })
    this.pressMentions = data.pressMentions
    this.podcastMentions = data.podcastMentions
    this.newsletterMentions = data.newsletterMentions
  },

  head() {
    const title = 'Prensa | CubaPod'
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

<style></style>
