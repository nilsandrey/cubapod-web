<template>
  <div>
    <div v-if="podcast && user" class="container">
      <div class="card margin-bottom-10">
        <div class="card-content">
          <h2 class="subtitle">Consejos para una mejor experiencia</h2>

          <!-- set email -->
          <b-collapse
            animation="slide"
            :open="collapsedActive === 1"
            @open="collapsedActive = 1"
          >
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
            >
              <p class="card-header-title">
                <b-icon
                  v-if="podcast.email === user.email"
                  icon="check-bold"
                  class="has-text-success margin-right-10"
                />
                Establece tu correo en el feed RSS del pódcast
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                <span v-if="podcast.email === user.email">
                  Has completado este consejo.
                </span>
                <div v-else>
                  <p>
                    Colocar tu correo público en el feed RSS de tu pódcast te
                    permite reclamarlo en nuestro bot de Telegram y en otras
                    plataformas de podcasting. El correo que aparece actualmente
                    en tu feed es <i>{{ podcast.email }}</i> y debería ser
                    <i>{{ user.email }}</i
                    >.
                  </p>
                  <a
                    href="https://medium.com/cubapod/c%C3%B3mo-y-por-qu%C3%A9-poner-tu-correo-en-el-rss-de-tu-podcast-b388f6ee5245"
                    target="_blank"
                    class="button is-primary"
                  >
                    <b-icon
                      icon="file-document-outline"
                      size="is-small"
                      class="margin-right-5"
                    />
                    <span>Leer artículo</span>
                  </a>
                </div>
              </div>
            </div>
          </b-collapse>
          <!-- end set email -->

          <!-- claim podcast -->
          <b-collapse
            animation="slide"
            :open="collapsedActive === 2"
            @open="collapsedActive = 2"
          >
            <div
              slot="trigger"
              slot-scope="props"
              class="card-header"
              role="button"
            >
              <p class="card-header-title">
                <b-icon
                  v-if="podcast.isClaimedInBot"
                  icon="check-bold"
                  class="has-text-success margin-right-10"
                />
                Reclamar el pódcast en el bot de Telegram
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                <span v-if="podcast.isClaimedInBot">
                  Has reclamado el pódcast en el bot.
                </span>
                <div v-else>
                  <p>
                    Reclamar el pódcast en el bot es necesario para que los
                    suscriptores puedan enviarte opiniones. Además es necesario
                    para desbloquear algunas funcionalidades como la
                    configuración de donaciones y ver estadísticas.
                  </p>
                  <a
                    :href="
                      `https://t.me/CubaPodBot?start=podcast_${podcast.slug}`
                    "
                    target="_blank"
                    class="button is-primary"
                  >
                    <b-icon
                      icon="robot"
                      size="is-small"
                      class="margin-right-5"
                    />
                    <span>Ir al bot</span>
                  </a>
                </div>
              </div>
            </div>
          </b-collapse>
          <!-- end claim podcast -->
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <h2 class="subtitle">Recomendaciones</h2>

          <info class="margin-bottom-10">
            Además de los consejos anteriores, te recomendamos seguir estas
            directrices para que tu contenido tenga más impacto en la comunidad
            de CubaPod.
          </info>

          <ul style="list-style: disc; margin-left: 10pt">
            <li>
              Pide a tu audiencia suscribirse al pódcast dentro del bot y
              dejarte un
              <b-icon icon="heart" size="is-small" class="has-text-danger" />.
              Las interacciones que generes con tu audiencia influyen en la
              posición del pódcast dentro de nuestro ranking.
            </li>
            <li>
              Comparte el enlace directo del pódcast dentro del bot hacia redes
              sociales. Puedes encontrar el enlace
              <nuxt-link :to="`/podcaster/${podcast.slug}`">aquí</nuxt-link>.
            </li>
            <li>
              Publica los enlaces directos de los episodios dentro del bot para
              que tus oyentes puedan acceder con mayor facilidad.
            </li>
            <li>
              No publiques los audios de tus episodios en canales o grupos de
              Telegram. No es recomendable porque puede afectar las estadísticas
              en el bot.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import telemetry from '~/services/telemetry'

export default {
  auth: true,
  layout: 'podcaster-podcast',

  data() {
    return {
      user: null,
      podcast: null,
      collapsedActive: null
    }
  },

  async mounted() {
    // Telemetry
    telemetry.reportAction(this, 'podcaster_podcast_insights', this.$route.path)

    // Load podcast
    const { data } = await this.$apollo.query({
      query: gql`
        query podcast($slug: String!) {
          podcast(slug: $slug) {
            slug
            url
            title
            image
            email
            isClaimedInBot
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

    // Load user
    const res = await this.$apollo.query({
      query: gql`
        query viewerUser {
          viewerUser {
            email
          }
        }
      `
    })
    this.user = res.data.viewerUser
  }
}
</script>

<style scoped></style>
