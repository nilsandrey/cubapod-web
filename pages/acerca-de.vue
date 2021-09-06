<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">
          CubaPod
        </h1>

        <div class="columns is-centered">
          <div class="column is-8 is-12-mobile">
            <p class="margin-bottom-20 has-text-centered">
              CubaPod es la plataforma cubana de podcasting. Nuestra misión es
              potenciar y difundir el podcasting cubano.
            </p>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column">
            <div class="card" style="height: 250pt">
              <div
                class="card-header has-background-primary wrap-center"
                style="padding: 10pt"
              >
                <b-icon
                  icon="bullhorn"
                  size="is-large"
                  class="has-text-white"
                ></b-icon>
              </div>
              <div class="card-content">
                <h4 class="has-text-centered margin-bottom-10">
                  Escucha episodios
                </h4>
                <p class="margin-bottom-20">
                  Disfruta los episodios de los pódcasts cubanos en un mismo
                  lugar.
                </p>
                <div class="card-button">
                  <nuxt-link
                    to="/"
                    class="button is-primary is-rounded is-fullwidth"
                  >
                    <b-icon icon="bullhorn" style="margin-right: 5pt"></b-icon>
                    Descubre los pódcasts
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card" style="height: 250pt">
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
                  Suscríbete con el bot de Telegram
                </h4>
                <p class="margin-bottom-20">
                  Te avisamos en Telegram cuando se publique un nuevo episodio,
                  puedes suscribirte a tus pódcasts favoritos, descargar los
                  audios en diferentes calidades y más.
                </p>
                <div class="card-button">
                  <a
                    href="https://t.me/CubaPodBot"
                    class="button is-primary has-text-white is-rounded is-fullwidth"
                  >
                    <b-icon icon="telegram" style="margin-right: 5pt"></b-icon>
                    Bot de Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card" style="height: 250pt">
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
                  Publicamos los enlaces de los episodios también en Twitter y
                  te actualizamos de las novedades.
                </p>
                <div class="card-button">
                  <a
                    href="https://twitter.com/intent/follow?screen_name=CubaPod"
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

        <h2 class="subtitle has-text-centered margin-top-20">
          La comunidad de podcásters cubanos
        </h2>

        <div class="columns is-centered">
          <div class="column is-8">
            <p class="">
              En marzo del 2020 surge de forma espontánea una iniciativa que
              pretende visibilizar abiertamente, así como ayudar a difundir los
              pódcasts y podcásters cubanos. Comenzó con una cuenta en Twitter y
              un canal de Telegram en las cuales se intentaba crear algo como un
              feed principal donde se publicaran los episodios de todos los
              pódcasts producidos por cubanos.
            </p>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-8">
            <p class="">
              Esta iniciativa levantó de forma inmediata el interés de decenas
              de personas que mostraron abiertamente su apoyo, al paso que se
              sumaron a la iniciativa, haciéndole cobrar vida e importancia.
            </p>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-8">
            <p class="">
              Se comenzó a conformar un listado de pódcasts que poco a poco se
              fue convirtiendo en esta plataforma. Esto permitió que muchas
              personas que en ese medio no se conocían, se vieran las caras por
              primera vez y descubrieran lo que se está produciendo en materia
              de podcasting en la isla o fuera de ella, pero siempre por
              cubanos.
            </p>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-8">
            <p class="">
              Además, creamos un bot en Telegram que se dedica a distribuir los
              episodios de los pódcasts en la plataforma, en tiempo real. Si
              eres un podcáster cubano, y tu pódcast aún no está en CubaPod,
              puedes <nuxt-link to="/podcaster/register">registrarte</nuxt-link>
              para añadirlo.
            </p>
          </div>
        </div>

        <div class="has-text-centered">
          <b-button
            type="is-primary"
            size="is-large"
            icon-left="chart-bar"
            rounded
            @click="$router.replace('/datos')"
          >
            Ver datos y cifras
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    const title = 'Acerca de | CubaPod'
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

<style scoped>
.card-button {
  position: absolute;
  bottom: 10pt;
  width: 100%;
  left: 0;
  padding: 0 10pt 0 10pt;
}
</style>
