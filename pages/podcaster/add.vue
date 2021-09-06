<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content">
          <h2 class="subtitle has-text-centered">
            Añadir pódcast a CubaPod
          </h2>
          <div class="columns is-centered">
            <div class="column is-6 is-12-mobile">
              <client-only>
                <form @submit.prevent="createPodcastRequest()">
                  <!-- feed url -->
                  <div>
                    <label for="" class="label">Enlace del feed RSS</label>
                    <b-field>
                      <b-input
                        v-model="$v.form.feed.$model"
                        native-type="url"
                        icon="rss"
                        :loading="searchingRss"
                        @blur="
                          $v.form.feed.$touch()
                          findRss()
                          parseFeed()
                        "
                      ></b-input>
                    </b-field>
                    <p
                      v-if="$v.form.feed.$invalid && $v.form.feed.$anyError"
                      class="has-text-danger margin-bottom-10"
                    >
                      <small>
                        <b-icon icon="alert-box" size="is-small"></b-icon>
                        Especifica la URL del feed RSS del pódcast.
                      </small>
                    </p>
                    <info v-if="!preview" class="margin-bottom-10">
                      <a
                        href="https://medium.com/cubapod/qu%C3%A9-es-un-feed-rss-y-c%C3%B3mo-saber-el-de-mi-podcast-876edc0b833f"
                      >
                        ¿Qué es un feed RSS y cómo saber el de mi pódcast?
                      </a>
                    </info>
                  </div>
                  <!-- end feed url -->

                  <!-- podcast preview -->
                  <div
                    v-if="preview"
                    class="card margin-top-10 margin-bottom-10"
                  >
                    <div class="card-content">
                      <div class="media">
                        <div class="media-left">
                          <p class="image is-64x64">
                            <img
                              :src="preview.image"
                              alt=""
                              style="border-radius: 5pt"
                            />
                          </p>
                        </div>
                        <div class="media-content">
                          <div class="content">
                            <p>{{ preview.title }}</p>
                            <p>
                              Por {{ preview.creator }} ·
                              {{ preview.episodesCount }} episodios
                            </p>
                            <p>{{ preview.description }}</p>
                            <p>
                              <small>{{ preview.email }}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                      <info
                        v-if="
                          preview.email !== $store.getters['user/get'].email
                        "
                      >
                        El correo que aparece en el feed RSS del pódcast no
                        coincide con el correo de su cuenta. Es importante que
                        coloque el correo adecuado en el feed RSS para
                        asegurarnos de que el pódcast quedará anclado a su
                        cuenta en CubaPod.
                        <a
                          href="https://medium.com/cubapod/c%C3%B3mo-y-por-qu%C3%A9-poner-tu-correo-en-el-rss-de-tu-podcast-b388f6ee5245"
                          target="_blank"
                        >
                          Leer un artículo sobre el tema.
                        </a>
                      </info>
                      <error v-if="preview.episodesCount === 0">
                        Requerimos al menos un episodio para añadir el pódcast,
                        inténtelo de nuevo cuando lo publique.
                      </error>
                    </div>
                  </div>
                  <!-- end podcast preview -->

                  <!-- twitter handlers -->
                  <label for="" class="label">
                    Usuario en Twitter
                    <small class="has-text-info">opcional</small>
                  </label>
                  <b-field>
                    <p class="control">
                      <span class="button is-static">
                        <b-icon
                          icon="twitter"
                          size="is-small"
                          class="margin-right-10"
                        ></b-icon>
                        <span>https://twitter.com/</span>
                      </span>
                    </p>
                    <b-input v-model="form.twitter" expanded></b-input>
                  </b-field>
                  <!-- end twitter handlers -->

                  <!-- telegram channels -->
                  <label for="" class="label">
                    Usuario del canal de Telegram
                    <small class="has-text-info">opcional</small>
                  </label>
                  <b-field>
                    <p class="control">
                      <span class="button is-static">
                        <b-icon
                          icon="telegram"
                          size="is-small"
                          class="margin-right-10"
                        ></b-icon>
                        <span>https://t.me/</span>
                      </span>
                    </p>
                    <b-input v-model="form.telegram" expanded></b-input>
                  </b-field>
                  <!-- end telegram channels -->

                  <p class="margin-bottom-10">
                    <small>Al enviar esta información, declaro que:</small>
                  </p>
                  <div>
                    <b-checkbox v-model="$v.form.condition1.$model">
                      Soy cubano/-a o mi pódcast es producido por al menos una
                      una persona cubana.
                    </b-checkbox>
                  </div>
                  <div>
                    <b-checkbox v-model="$v.form.condition2.$model">
                      Poseo los derechos sobre el pódcast.
                    </b-checkbox>
                  </div>
                  <p class="margin-bottom-10">
                    <small>
                      Se revisará su podcast y, si cumple con estos requisitos,
                      lo añadiremos a la plataforma y le notificaremos.
                    </small>
                  </p>

                  <b-button
                    type="is-primary"
                    native-type="submit"
                    size="is-medium"
                    expanded
                    :disabled="invalid"
                  >
                    Añadir pódcast y solicitar revisión
                  </b-button>
                </form>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { required, url } from 'vuelidate/lib/validators'
import Parser from 'rss-parser'
import telemetry from '~/services/telemetry'

export default {
  auth: true,
  layout: 'podcaster',

  data() {
    return {
      form: {
        title: null,
        url: null,
        feed: null,
        twitter: null,
        telegram: null,
        condition1: false,
        condition2: false
      },
      searchingRss: false,
      rssFound: false,
      preview: null,
      loading: false
    }
  },

  computed: {
    invalid() {
      if (this.preview) {
        return this.$v.form.$invalid || this.preview.episodesCount === 0
      } else {
        return this.$v.form.$invalid
      }
    }
  },

  mounted() {
    telemetry.reportAction(this, 'podcaster_add', this.$route.path)
  },

  methods: {
    findRss() {
      const that = this
      this.preview = null
      this.rssFound = false
      this.searchingRss = true
      this.$axios
        .$get('https://cubapod-cors-anywhere.herokuapp.com/' + this.form.feed)
        .then((response) => {
          const htmlparser2 = require('htmlparser2')
          const parser = new htmlparser2.Parser(
            {
              onopentag(name, attribs) {
                if (name === 'link' && attribs.type === 'application/rss+xml') {
                  that.form.feed = attribs.href
                  that.rssFound = true
                  that.parseFeed()
                }
              }
            },
            { decodeEntities: true }
          )
          parser.write(response)
          parser.end()
          this.searchingRss = false
        })
    },

    async parseFeed() {
      const parser = new Parser({
        customFields: {
          item: [['slash:comments', 'comments_count']]
        }
      })
      const podcast = await parser.parseURL(
        'https://cubapod-cors-anywhere.herokuapp.com/' + this.form.feed
      )

      let email = null
      try {
        const author = podcast.itunes.owner || podcast.itunes.author
        email = author.email
      } catch (e) {
        email = null
      }

      this.preview = {
        image: podcast.image.url,
        title: podcast.title,
        creator: podcast.creator,
        episodesCount: podcast.items.length,
        description: podcast.description,
        email
      }
      this.form.title = podcast.title
      this.searchingRss = false
    },

    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },

    async createPodcastRequest() {
      this.loading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation createPodcastRequest(
            $title: String!
            $feedUrl: String!
            $twitterHandler: String
            $telegramHandler: String
          ) {
            createPodcastRequest(
              title: $title
              feedUrl: $feedUrl
              twitterHandler: $twitterHandler
              telegramHandler: $telegramHandler
            ) {
              status
            }
          }
        `,
        variables: {
          title: this.form.title,
          feedUrl: this.form.feed,
          twitterHandler: this.form.twitter,
          telegramHandler: this.form.telegram
        }
      })
      if (data.createPodcastRequest.status === 'ok') {
        this.loading = false
        this.$router.replace('/podcaster')
        this.$buefy.dialog.alert({
          message:
            'El pódcast se revisará y se añadirá a la plataforma si cumple los requisitos. Le avisaremos por correo electrónico cuando esto ocurra.'
        })
      }
    }
  },

  validations: {
    form: {
      feed: { required, url },
      condition1: { condition_accepted: (value) => value === true },
      condition2: { condition_accepted: (value) => value === true }
    }
  }
}
</script>

<style scoped></style>
