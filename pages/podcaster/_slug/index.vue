<template>
  <div>
    <div v-if="podcast" class="container">
      <div class="card margin-bottom-10">
        <div class="card-content">
          <h2 class="subtitle">{{ podcast.title }}</h2>
          <p>
            Por {{ podcast.author }} · {{ podcast.episodesCount }} episodios
          </p>
          <p class="margin-bottom-10">
            <small>{{ podcast.subtitle }}</small>
          </p>
          <p class="margin-bottom-10">
            <b-icon icon="rss" size="is-small"></b-icon>
            <span>Feed RSS:</span>
            <br />
            <small>
              <a :href="podcast.url" target="_blank">{{ podcast.url }}</a>
            </small>
            <copy-button :value="podcast.url" />
          </p>
          <p class="margin-bottom-10">
            <b-icon icon="robot" size="is-small"></b-icon>
            <span>Enlace directo en el bot:</span>
            <br />
            <small>
              <a :href="botDirectLink" target="_blank">
                {{ botDirectLink }}
              </a>
            </small>
            <copy-button :value="botDirectLink" />
          </p>
          <b-tooltip
            v-if="podcast.public"
            type="is-light"
            label="El pódcast está público en el sitio web y el bot de Telegram"
            size="is-small"
            multilined
            animated
          >
            <b-tag type="is-success" size="is-medium">
              <b-icon icon="earth" size="is-small" />
              <span class="margin-left-5">Público</span>
            </b-tag>
          </b-tooltip>
          <b-tooltip
            v-else
            type="is-light"
            label="El pódcast está oculto en el sitio web y el bot de Telegram"
            size="is-small"
            multilined
            animated
          >
            <b-tag type="is-gray" size="is-medium">
              <b-icon icon="eye-off" size="is-small" />
              <span class="margin-left-5">Oculto</span>
            </b-tag>
          </b-tooltip>
          <b-tooltip
            v-if="podcast.enabled && !podcast.archived"
            type="is-light"
            label="El pódcast se sincroniza automáticamente cada cierto tiempo"
            size="is-small"
            multilined
            animated
          >
            <b-tag type="is-success" size="is-medium">
              <b-icon icon="sync" size="is-small" />
              <span class="margin-left-5">Sincronización activada</span>
            </b-tag>
          </b-tooltip>
          <b-tooltip
            v-if="!podcast.enabled && !podcast.archived"
            type="is-light"
            label="El pódcast no se está sincronizando por el momento"
            size="is-small"
            multilined
            animated
          >
            <b-tag type="is-gray" size="is-medium">
              <b-icon icon="sync" size="is-small" />
              <span class="margin-left-5">
                Sincronización desactivada
              </span>
            </b-tag>
          </b-tooltip>
          <b-tooltip
            v-if="podcast.archived"
            type="is-light"
            label="El pódcast está archivado"
            size="is-small"
            multilined
            animated
          >
            <b-tag type="is-danger" size="is-medium">
              <b-icon icon="archive" size="is-small" />
              <span class="margin-left-5">Archivado</span>
            </b-tag>
          </b-tooltip>
        </div>
      </div>

      <!-- socials -->
      <div class="card margin-bottom-10">
        <div class="card-content">
          <h2 class="subtitle margin-bottom-10">Redes sociales</h2>
          <form @submit.prevent="updateSocials()">
            <!-- twitter -->
            <label for="" class="label">Usuario de Twitter</label>
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
              <b-input
                v-model="socialsForm.twitter"
                expanded
                :disabled="socialsForm.loading"
              ></b-input>
              <p class="control" @click="socialsForm.twitter = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end twitter -->

            <!-- telegram -->
            <label for="" class="label">Usuario de Telegram</label>
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
              <b-input
                v-model="socialsForm.telegram"
                expanded
                :disabled="socialsForm.loading"
              ></b-input>
              <p class="control" @click="socialsForm.telegram = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end telegram -->

            <!-- facebook -->
            <label for="" class="label">Usuario de Facebook</label>
            <b-field>
              <p class="control">
                <span class="button is-static">
                  <b-icon
                    icon="facebook"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                  <span>https://facebook.com/</span>
                </span>
              </p>
              <b-input
                v-model="socialsForm.facebook"
                expanded
                :disabled="socialsForm.loading"
              ></b-input>
              <p class="control" @click="socialsForm.facebook = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end facebook -->

            <!-- instagram -->
            <label for="" class="label">Usuario de Instagram</label>
            <b-field>
              <p class="control">
                <span class="button is-static">
                  <b-icon
                    icon="instagram"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                  <span>https://instagram.com/</span>
                </span>
              </p>
              <b-input
                v-model="socialsForm.instagram"
                expanded
                :disabled="socialsForm.loading"
              ></b-input>
              <p class="control" @click="socialsForm.instagram = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end instagram -->

            <!-- instagram -->
            <label for="" class="label">Usuario o slug de Youtube</label>
            <b-field>
              <p class="control">
                <span class="button is-static">
                  <b-icon
                    icon="youtube"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                  <span>https://youtube.com/</span>
                </span>
              </p>
              <b-input
                v-model="socialsForm.youtube"
                expanded
                :disabled="socialsForm.loading"
              ></b-input>
              <p class="control" @click="socialsForm.youtube = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end instagram -->

            <!-- discord -->
            <label for="" class="label">Enlace de Discord</label>
            <b-field>
              <p class="control">
                <span class="button is-static">
                  <b-icon
                    icon="discord"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                  <span>https://discord.gg/</span>
                </span>
              </p>
              <b-input
                v-model="socialsForm.discord"
                expanded
                :disabled="socialsForm.loading"
              ></b-input>
              <p class="control" @click="socialsForm.discord = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end discord -->

            <div class="columns margin-top-10">
              <div class="column"></div>
              <div class="column is-narrow">
                <b-button
                  type="is-primary"
                  native-type="submit"
                  icon-left="content-save"
                  :loading="socialsForm.loading"
                >
                  Guardar cambios
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- end socials -->

      <!-- donations -->
      <div class="card">
        <div class="card-content">
          <h2 class="subtitle margin-bottom-10">Donaciones</h2>
          <form @submit.prevent="updateDonations()">
            <!-- qvapay -->
            <label for="" class="label">QvaPay</label>
            <b-field>
              <b-input
                v-model="$v.donationsForm.qvaPay.$model"
                placeholder="https://qvapay.com/payme/..."
                :disabled="donationsForm.loading"
                expanded
              ></b-input>
              <p class="control" @click="donationsForm.qvaPay = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <p
              v-if="
                $v.donationsForm.qvaPay.$invalid &&
                  $v.donationsForm.qvaPay.$anyError
              "
              class="has-text-danger margin-bottom-10"
            >
              <small>
                <b-icon icon="alert-box" size="is-small"></b-icon>
                La URL no es válida.
              </small>
            </p>
            <!-- end qvapay -->

            <!-- paypal -->
            <label for="" class="label">PayPal</label>
            <b-field>
              <b-input
                v-model="$v.donationsForm.paypal.$model"
                placeholder="https://paypal.me/..."
                :disabled="donationsForm.loading"
                expanded
              ></b-input>
              <p class="control" @click="donationsForm.paypal = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <p
              v-if="
                $v.donationsForm.paypal.$invalid &&
                  $v.donationsForm.paypal.$anyError
              "
              class="has-text-danger margin-bottom-10"
            >
              <small>
                <b-icon icon="alert-box" size="is-small"></b-icon>
                La URL no es válida.
              </small>
            </p>
            <!-- end paypal -->

            <!-- ko-fi -->
            <label for="" class="label">Ko-Fi</label>
            <b-field>
              <b-input
                v-model="$v.donationsForm.kofi.$model"
                placeholder="https://ko-fi.com/..."
                :disabled="donationsForm.loading"
                expanded
              ></b-input>
              <p class="control" @click="donationsForm.kofi = null">
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <p
              v-if="
                $v.donationsForm.kofi.$invalid &&
                  $v.donationsForm.kofi.$anyError
              "
              class="has-text-danger margin-bottom-10"
            >
              <small>
                <b-icon icon="alert-box" size="is-small"></b-icon>
                La URL no es válida.
              </small>
            </p>
            <!-- end ko-fi -->

            <!-- transfermovil cup -->
            <label for="" class="label">Transfermóvil (CUP)</label>
            <b-field>
              <b-input
                v-model="donationsForm.transfermovilCup.accountNumber"
                placeholder="Número de tarjeta"
                expanded
                :disabled="donationsForm.loading"
              ></b-input>
              <b-input
                v-model="donationsForm.transfermovilCup.phone"
                placeholder="Teléfono (sin +53 delante)"
                expanded
                :disabled="donationsForm.loading"
              ></b-input>
              <p
                class="control"
                @click="
                  donationsForm.transfermovilCup.accountNumber = null
                  donationsForm.transfermovilCup.phone = null
                "
              >
                <span class="button">
                  <b-icon
                    icon="delete"
                    size="is-small"
                    class="margin-right-10"
                  ></b-icon>
                </span>
              </p>
            </b-field>
            <!-- end transfermovil cup -->

            <div class="columns margin-top-10">
              <div class="column"></div>
              <div class="column is-narrow">
                <b-button
                  type="is-primary"
                  native-type="submit"
                  icon-left="content-save"
                  :loading="donationsForm.loading"
                  :disabled="$v.donationsForm.$invalid"
                >
                  Guardar cambios
                </b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- end donations -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { url } from 'vuelidate/lib/validators'
import telemetry from '~/services/telemetry'

export default {
  auth: true,
  layout: 'podcaster-podcast',

  data() {
    return {
      podcast: null,
      socialsForm: {
        twitter: null,
        telegram: null,
        facebook: null,
        instagram: null,
        youtube: null,
        discord: null,
        loading: false
      },
      donationsForm: {
        paypal: null,
        kofi: null,
        qvaPay: null,
        transfermovilCup: {
          accountNumber: null,
          phone: null
        },
        loading: false
      }
    }
  },

  computed: {
    botDirectLink() {
      if (this.podcast) {
        return `https://t.me/CubaPodBot?start=podcast_${this.podcast.slug}`
      }
      return null
    }
  },

  async mounted() {
    // Telemetry
    telemetry.reportAction(this, 'podcaster_podcast_index', this.$route.path)

    const { data } = await this.$apollo.query({
      query: gql`
        query podcast($slug: String!) {
          podcast(slug: $slug) {
            slug
            url
            title
            subtitle
            image
            link
            generator
            author
            email
            rights
            itunesType
            itunesExplicit
            telegramHandler
            twitterHandler
            telegramHandler
            facebookHandler
            instagramHandler
            youtubeHandler
            discordHandler
            applePodcastsUrl
            episodesCount
            kofiUrl
            paypalUrl
            qvapayUrl
            transfermovilCucAccountNumber
            transfermovilCucPhoneNumber
            transfermovilCupAccountNumber
            transfermovilCupPhoneNumber
            public
            enabled
            archived
            category {
              slug
            }
          }
        }
      `,
      variables: {
        slug: this.$route.params.slug
      },
      fetchPolicy: 'network-only'
    })
    this.podcast = data.podcast

    // Initialize socials form
    this.socialsForm.twitter = this.podcast.twitterHandler
    this.socialsForm.telegram = this.podcast.telegramHandler
    this.socialsForm.telegram = this.podcast.telegramHandler
    this.socialsForm.facebook = this.podcast.facebookHandler
    this.socialsForm.instagram = this.podcast.instagramHandler
    this.socialsForm.youtube = this.podcast.youtubeHandler
    this.socialsForm.discord = this.podcast.discordHandler

    // Initialize donations form
    this.donationsForm.paypal = this.podcast.paypalUrl
    this.donationsForm.kofi = this.podcast.kofiUrl
    this.donationsForm.qvaPay = this.podcast.qvapayUrl
    this.donationsForm.transfermovilCup.accountNumber = this.podcast.transfermovilCupAccountNumber
    this.donationsForm.transfermovilCup.phone = this.podcast.transfermovilCupPhoneNumber
  },

  methods: {
    /**
     * Update socials
     */
    async updateSocials() {
      this.socialsForm.loading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updatePodcastSocials(
            $podcastSlug: String!
            $twitterHandler: String
            $telegramHandler: String
            $facebookHandler: String
            $instagramHandler: String
            $youtubeHandler: String
            $discordHandler: String
          ) {
            updatePodcastSocials(
              podcastSlug: $podcastSlug
              twitterHandler: $twitterHandler
              telegramHandler: $telegramHandler
              facebookHandler: $facebookHandler
              instagramHandler: $instagramHandler
              youtubeHandler: $youtubeHandler
              discordHandler: $discordHandler
            ) {
              status
            }
          }
        `,
        variables: {
          podcastSlug: this.podcast.slug,
          twitterHandler: this.socialsForm.twitter,
          telegramHandler: this.socialsForm.telegram,
          facebookHandler: this.socialsForm.facebook,
          instagramHandler: this.socialsForm.instagram,
          youtubeHandler: this.socialsForm.youtube,
          discordHandler: this.socialsForm.discord
        }
      })
      if (data.updatePodcastSocials.status === 'ok') {
        this.$buefy.toast.open('Se guardaron los cambios')
      }
      this.socialsForm.loading = false
    },

    /**
     * Update donations
     */
    async updateDonations() {
      this.donationsForm.loading = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updatePodcastDonations(
            $podcastSlug: String!
            $paypalUrl: String
            $kofiUrl: String
            $qvapayUrl: String
            $transfermovilCupAccountNumber: String
            $transfermovilCupPhoneNumber: String
          ) {
            updatePodcastDonations(
              podcastSlug: $podcastSlug
              paypalUrl: $paypalUrl
              kofiUrl: $kofiUrl
              qvapayUrl: $qvapayUrl
              transfermovilCupAccountNumber: $transfermovilCupAccountNumber
              transfermovilCupPhoneNumber: $transfermovilCupPhoneNumber
            ) {
              status
            }
          }
        `,
        variables: {
          podcastSlug: this.podcast.slug,
          paypalUrl: this.donationsForm.paypal,
          kofiUrl: this.donationsForm.kofi,
          qvapayUrl: this.donationsForm.qvaPay,
          transfermovilCupAccountNumber: this.donationsForm.transfermovilCup
            .accountNumber,
          transfermovilCupPhoneNumber: this.donationsForm.transfermovilCup.phone
        }
      })
      if (data.updatePodcastDonations.status === 'ok') {
        this.$buefy.toast.open('Se guardaron los cambios')
      }
      this.donationsForm.loading = false
    }
  },

  validations: {
    donationsForm: {
      paypal: { url },
      kofi: { url },
      qvaPay: { url }
    }
  }
}
</script>

<style scoped></style>
