<template>
  <div class="hero is-secondary is-bold">
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <div class="media">
            <div class="media-left">
              <img
                src="/img/cubapod.jpg"
                alt=""
                width="90pt"
                style="border-radius: 10pt"
              />
            </div>
            <div class="media-content">
              <h1 class="title has-text-centered">CubaPod</h1>
              <h2 class="subtitle has-text-centered">
                Plataforma cubana de podcasting
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-4-desktop is-12-mobile">
          <!-- main -->
          <nuxt-link
            to="/"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="earth" style="margin-right: 5pt"></b-icon>
            Visitar el sitio web
          </nuxt-link>
          <a
            href="https://t.me/CubaPodBot"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="robot" style="margin-right: 5pt"></b-icon>
            Bot de Telegram
          </a>
          <a
            href="https://twitter.com/CubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="twitter" style="margin-right: 5pt"></b-icon>
            Síguenos en Twitter
          </a>
          <a
            href="https://t.me/CubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="telegram" style="margin-right: 5pt"></b-icon>
            Suscríbete en Telegram
          </a>
          <a
            href="https://instagram.com/cuba.pod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="instagram" style="margin-right: 5pt"></b-icon>
            Síguenos en Instagram
          </a>
          <a
            href="https://linkedin.com/company/cubapod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="linkedin" style="margin-right: 5pt"></b-icon>
            Síguenos en LinkedIn
          </a>
          <a
            href="https://rebrand.ly/DiscordCubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon
              icon="discord"
              size="is-small"
              style="margin-right: 5pt"
            ></b-icon>
            Únete en Discord
          </a>
          <a
            href="https://medium.com/cubapod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="post-outline" style="margin-right: 5pt"></b-icon>
            Visita nuestro blog
          </a>
          <a
            href="https://medium.com/cubapod/newsletters/bolet%C3%ADn-de-cubapod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-20"
          >
            <b-icon icon="email-newsletter" style="margin-right: 5pt"></b-icon>
            Suscríbete al boletín mensual
          </a>
          <!-- end main -->

          <!-- academia -->
          <h1 class="title has-text-centered">Academia de CubaPod</h1>
          <a
            href="https://twitter.com/AcademiaCubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="twitter" style="margin-right: 5pt"></b-icon>
            Síguenos en Twitter
          </a>
          <a
            href="https://t.me/AcademiaCubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="telegram" style="margin-right: 5pt"></b-icon>
            Suscríbete en Telegram
          </a>
          <a
            href="http://eepurl.com/ha1FHz"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-20"
          >
            <b-icon icon="email-newsletter" style="margin-right: 5pt"></b-icon>
            Suscríbete al boletín
          </a>
          <!-- end academia -->

          <!-- feed -->
          <h1 class="title has-text-centered">Feed de episodios</h1>
          <a
            href="https://twitter.com/FeedCubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="twitter" style="margin-right: 5pt"></b-icon>
            Feed en Twitter
          </a>
          <a
            href="https://t.me/FeedCubaPod"
            class="button is-white is-rounded is-medium is-fullwidth margin-bottom-10"
          >
            <b-icon icon="telegram" style="margin-right: 5pt"></b-icon>
            Feed en Telegram
          </a>
          <!-- end feed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  auth: false,
  head() {
    const title = 'Enlaces | CubaPod'
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
