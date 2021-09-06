<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">
          <b-icon icon="school" style="color: #3E83FF; margin-right: 5pt" />
          Academia de CubaPod
        </h1>

        <div class="columns is-centered margin-bottom-20">
          <div class="column is-6 is-12-mobile">
            <p>
              Nuestra academia es un espacio virtual de difusión de contenido
              para nutrir a los podcásters cubanos. Nuestro objetivo es
              acompañarte en el proceso de creación de tu pódcast, darte
              herramientas, tips, sugerencias y mantenerte informado respecto a
              las novedades que tenemos para podcásters.
            </p>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column">
            <div class="card">
              <div
                class="card-header has-background-primary wrap-center"
                style="padding: 10pt"
              >
                <b-icon
                  icon="email-newsletter"
                  size="is-large"
                  class="has-text-white"
                ></b-icon>
              </div>
              <div class="card-content">
                <h4 class="has-text-centered margin-bottom-10">
                  Suscríbete al boletín
                </h4>
                <p class="margin-bottom-20">
                  Tenemos un boletín exclusivo para podcásters. Recibe las
                  novedades directamente en tu bandeja de entrada.
                </p>
                <div class="card-button">
                  <a
                    href="https://rebrand.ly/BoletinAcademiaCubaPod"
                    target="_blank"
                    class="button is-primary is-rounded is-fullwidth"
                  >
                    <b-icon
                      icon="email-newsletter"
                      style="margin-right: 5pt"
                    ></b-icon>
                    Suscríbete
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <div
                class="card-header has-background-primary wrap-center"
                style="padding: 10pt"
              >
                <b-icon
                  icon="telegram"
                  size="is-large"
                  class="has-text-white"
                ></b-icon>
              </div>
              <div class="card-content">
                <h4 class="has-text-centered margin-bottom-10">
                  Únete en Telegram
                </h4>
                <p class="margin-bottom-20">
                  Si prefieres recibir contenido en Telegram, puedes unirte al
                  canal de la academia.
                </p>
                <div class="card-button">
                  <a
                    href="https://t.me/AcademiaCubaPod"
                    class="button is-primary has-text-white is-rounded is-fullwidth"
                  >
                    <b-icon icon="telegram" style="margin-right: 5pt"></b-icon>
                    Únete en Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card">
              <div
                class="card-header has-background-primary wrap-center"
                style="padding: 10pt"
              >
                <b-icon
                  icon="twitter"
                  size="is-large"
                  class="has-text-white"
                ></b-icon>
              </div>
              <div class="card-content">
                <h4 class="has-text-centered margin-bottom-10">
                  Únete en Twitter
                </h4>
                <p class="margin-bottom-20">
                  También te mantenemos al tanto en Twitter sobre las novedades
                  y contenidos de la academia.
                </p>
                <div class="card-button">
                  <a
                    href="https://twitter.com/intent/follow?screen_name=AcademiaCubaPod"
                    class="button is-primary has-text-white is-rounded is-fullwidth"
                  >
                    <b-icon icon="twitter" style="margin-right: 5pt"></b-icon>
                    Síguenos en Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    const title = 'Academia | CubaPod'
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
