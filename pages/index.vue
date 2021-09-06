<template>
  <div>
    <loading :active="loading" />
    <div class="cover">
      <section class="section">
        <div class="hero is-small">
          <div class="hero-body">
            <div class="columns is-centered">
              <div class="column is-6-desktop is-12-mobile">
                <div class="card">
                  <div class="card-content">
                    <p class="title has-text-centered">
                      Episodio más reciente
                    </p>
                    <Episode
                      v-if="latestEpisodes.length > 0"
                      :episode="latestEpisodes[0]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- latest episodes -->
    <section class="section">
      <p class="title has-text-centered">Últimos episodios</p>
      <div class="columns is-centered margin-top-20">
        <div class="column is-6-desktop is-10-tablet is-12-mobile">
          <Episode
            v-for="episode in latestEpisodes.slice(-4)"
            :key="episode.guid"
            :episode="episode"
          />
        </div>
      </div>
    </section>
    <!-- end latest episodes -->

    <!-- featured podcasts carousel -->
    <section class="section">
      <p class="title has-text-centered">Pódcasts destacados</p>
      <b-carousel :indicator="true" :pause-info="false">
        <b-carousel-item v-for="(chunk, id) in computedPodcasts" :key="id">
          <section :class="`hero is-small`">
            <div class="hero-body">
              <div class="columns is-centered is-multiline">
                <div
                  v-for="podcast in chunk"
                  :key="podcast.id"
                  class="column is-2"
                >
                  <Podcast :podcast="podcast" class="is-hidden-mobile" />
                  <PodcastListItem
                    :podcast="podcast"
                    class="is-hidden-tablet"
                  />
                </div>
              </div>
            </div>
          </section>
        </b-carousel-item>
      </b-carousel>
      <div class="columns is-centered margin-top-10 has-text-centered">
        <div class="column is-narrow is-12-mobile">
          <b-button
            class=""
            type="is-primary"
            size="is-medium"
            icon-left="rss"
            rounded
            @click="$router.replace('/podcaster/add')"
          >
            Añadir mi pódcast
          </b-button>
        </div>
      </div>
    </section>
    <!-- end featured podcasts carousel -->

    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 190">
        <path
          fill="#2c4bff"
          fill-opacity="1"
          d="M0,128L120,138.7C240,149,480,171,720,170.7C960,171,1200,149,1320,138.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </div>
    <section class="section has-background-primary has-text-white">
      <div class="columns is-centered">
        <div class="column is-narrow is-12-mobile has-text-centered">
          <img
            src="/img/cubapod.jpg"
            alt="Directorio de pódcasts cubanos"
            width="150pt"
            style="border-radius: 50%"
          />
        </div>
        <div class="column is-3-desktop is-4-tablet is-12-mobile">
          <h2 class="subtitle has-text-white">
            Directorio de pódcasts cubanos
          </h2>
          <p>
            Nuestro directorio incluye {{ podcastsCount }} pódcasts producidos
            por cubanos dentro y fuera de Cuba, y {{ episodesCount }} episodios.
            Se publican nuevos episodios constantemente.
          </p>
        </div>
      </div>
    </section>
    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150">
        <path
          fill="#2c4bff"
          fill-opacity="1"
          d="M0,224L120,197.3C240,171,480,117,720,112C960,107,1200,149,1320,170.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </div>

    <!-- categories carousel -->
    <section class="section">
      <div class="container margin-bottom-20">
        <p class="title has-text-centered">
          Descubre por categorías
        </p>
        <div class="columns is-multiline is-centered is-hidden-mobile">
          <div
            v-for="category in categories"
            :key="category.id"
            class="column is-3-desktop is-3-tablet is-6-mobile"
          >
            <!-- Category :category="category" class="is-hidden-mobile" /-->
            <CategoryButton :category="category" />
          </div>
        </div>
        <div
          class="columns is-multiline is-centered is-mobile is-hidden-tablet"
        >
          <div
            v-for="category in categories"
            :key="category.id"
            class="column is-12-mobile"
          >
            <!-- Category :category="category" class="is-hidden-mobile" /-->
            <CategoryButton :category="category" />
          </div>
        </div>
      </div>
    </section>
    <!-- end categories carousel -->

    <p class="title has-text-centered">
      Nuestros embajadores
    </p>
    <div class="columns is-centered" style="padding: 20pt">
      <div
        v-for="(ambassador, key) in ambassadors"
        :key="key"
        class="column is-2-desktop is-3-tablet is-12-mobile"
      >
        <TeamMember :member="ambassador" />
      </div>
    </div>
    <p class="has-text-centered margin-bottom-10">
      ¿Quieres ser embajador de CubaPod?
      <nuxt-link to="/contacto">Contáctanos.</nuxt-link>
    </p>

    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 50 1000 150">
        <path
          fill="#008e68"
          fill-opacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,106.7C672,75,768,53,864,53.3C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>

    <section class="section has-text-white" style="background: #008e68">
      <div class="columns is-centered">
        <div class="column is-3-desktop is-4-tablet is-12-mobile">
          <h2 class="title has-text-white">Podcáster</h2>
          <p>
            Podcáster es nuestra herramienta de administración web para la
            comunidad de podcásters cubanos. Brindamos:
          </p>
          <ul class="disc-list margin-top-10">
            <li>acceso fácil al feed RSS;</li>
            <li>integración de redes sociales;</li>
            <li>configuración de donaciones nacionales e internacionales;</li>
            <li>
              estadísticas de suscripciones y descargas de episodios, tomadas de
              nuestro bot en Telegram y disponibles además en un resumen semanal
              por email;
            </li>
            <li>consejos y recomendaciones.</li>
          </ul>
          <b-button
            class="margin-top-10"
            type="is-white"
            rounded
            expanded
            @click="$router.replace('/podcaster')"
          >
            Administrar mis pódcasts
          </b-button>
        </div>
        <div class="column is-narrow is-12-mobile has-text-centered">
          <div class="podcaster-cover"></div>
        </div>
      </div>
    </section>

    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1400 300">
        <path
          fill="#008e68"
          fill-opacity="1"
          d="M0,192L120,197.3C240,203,480,213,720,192C960,171,1200,117,1320,90.7L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </div>

    <!-- press mentions carousel -->
    <section class="section">
      <p class="title has-text-centered margin-bottom-20">
        CubaPod en la prensa
      </p>
      <div class="columns is-centered">
        <div
          v-for="(mention, id) in pressMentions"
          :key="id"
          class="column is-3-desktop is-3-tablet is-12-mobile"
        >
          <PressMention :mention="mention" class="margin-bottom-20" />
        </div>
      </div>
      <p class="has-text-centered">
        <nuxt-link to="/prensa" class="button is-primary is-large is-rounded">
          Ver más
        </nuxt-link>
      </p>
    </section>
    <!-- end press mentions carousel -->

    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 190">
        <path
          fill="#234376"
          fill-opacity="1"
          d="M0,128L120,138.7C240,149,480,171,720,170.7C960,171,1200,149,1320,138.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
    </div>
    <section
      class="section"
      style="background: #234376; padding-bottom: 50pt !important;"
    >
      <div class="container">
        <div class="columns is-centered">
          <!-- blog -->
          <div
            class="column is-5-desktop is-8-tablet is-12-mobile"
            style="height: 100% !important;"
          >
            <div class="card">
              <div class="card-content">
                <div class="columns">
                  <div class="column is-6-desktop is-12-mobile">
                    <p class="subtitle">Nuestro blog</p>
                    <p style="margin-bottom: 10pt">
                      En el blog de CubaPod, nuestro equipo mantiene una base de
                      conocimientos para la comunidad de podcásters cubanos.
                      Publicamos también anuncios oficiales, artículos de
                      opinión, historias y más.
                    </p>
                  </div>
                  <div
                    class="column is-6-desktop is-12-mobile has-text-centered"
                  >
                    <img
                      src="/img/blog.jpg"
                      alt=""
                      width="400pt"
                      style="border-radius: 10pt; box-shadow: 0 0 2pt 0 gray;"
                    />
                  </div>
                </div>
                <a
                  href="https://medium.com/CubaPod"
                  target="_blank"
                  class="button is-secondary is-large is-rounded is-fullwidth"
                >
                  <b-icon
                    icon="post-outline"
                    style="margin-right: 5pt"
                  ></b-icon>
                  Ver el blog
                </a>
              </div>
            </div>
          </div>
          <!-- end blog -->
          <!-- newsletter -->
          <!-- div class="column" style="height: 100% !important;">
            <div class="card">
              <div class="card-content">
                <div class="columns">
                  <div class="column is-6-desktop is-12-mobile">
                    <p class="subtitle">Boletín mensual</p>
                    <p style="margin-bottom: 10pt">
                      Un resumen mensual de lo que sucede en torno al podcasting
                      cubano, para que no te pierdas nada: nuevos pódcasts,
                      novedades de la plataforma, artículos del blog de CubaPod
                      y más.
                    </p>
                  </div>
                  <div
                    class="column is-6-desktop is-12-mobile has-text-centered"
                  >
                    <img
                      src="/img/newsletter.jpg"
                      alt=""
                      width="400pt"
                      style="border-radius: 10pt; box-shadow: 0 0 2pt 0 gray;"
                    />
                  </div>
                </div>
                <a
                  href="https://rebrand.ly/BoletinCubaPod"
                  target="_blank"
                  class="button is-secondary is-large is-rounded is-fullwidth"
                >
                  <b-icon
                    icon="email-newsletter"
                    style="margin-right: 5pt"
                  ></b-icon>
                  Suscribirme al boletín
                </a>
              </div>
            </div>
          </div -->
          <!-- end newsletter -->
        </div>
      </div>
    </section>

    <!-- team -->
    <!-- section class="section team">
      <div
        class="title has-text-centered has-text-white"
        style="margin: 30pt 0 30pt 0"
      >
        Nuestra misión es difundir el podcasting cubano
      </div>
      <div class="container">
        <div
          v-for="(chunk, id) in computedTeam"
          :key="id"
          class="columns is-centered is-multiline margin-top-10 margin-bottom-10 is-hidden-mobile"
        >
          <div
            v-for="member in chunk"
            :key="member.name"
            class="column is-2-desktop is-3-tablet is-5-mobile"
          >
            <div class="member">
              <img :src="member.img" alt="" width="100%" height="100%" />
            </div>
          </div>
        </div>
        <div
          v-for="(chunk, id) in computedTeam"
          :key="id"
          class="columns is-centered is-multiline margin-top-10 margin-bottom-10 is-hidden-tablet is-mobile"
        >
          <div
            v-for="member in chunk"
            :key="member.name"
            class="column is-5-mobile"
          >
            <div class="member">
              <img :src="member.img" alt="" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
      <div class="has-text-centered" style="margin-top: 30pt">
        <b-button
          type="is-white"
          size="is-large"
          rounded
          @click="$router.replace('/equipo')"
        >
          Conoce al equipo
        </b-button>
      </div>
    </section -->
    <!-- end team -->
  </div>
</template>

<script>
import gql from 'graphql-tag'
import CategoryButton from '~/components/CategoryButton'
import Episode from '~/components/Episode'
import Podcast from '~/components/Podcast'
import PodcastListItem from '~/components/PodcastListItem'
import PressMention from '~/components/PressMention'
import TeamMember from '~/components/TeamMember'

export default {
  auth: false,
  components: {
    CategoryButton,
    Episode,
    Podcast,
    PodcastListItem,
    PressMention,
    TeamMember
  },

  data() {
    return {
      loading: true,
      categories: [],
      podcasts: [],
      latestEpisodes: [],
      podcastsCount: null,
      episodesCount: null,
      pressMentions: [],
      ambassadors: []
    }
  },

  computed: {
    computedPodcasts() {
      const result = []
      if (this.podcasts.length > 0) {
        // eslint-disable-next-line no-unused-vars
        let i
        let j
        let temparray
        const chunk = 4
        for (i = 0, j = this.podcasts.length; i < j; i += chunk) {
          temparray = this.podcasts.slice(i, i + chunk)
          result.push(temparray)
        }
      }
      return result
    },

    computedTeam() {
      const result = []
      if (this.team.current.length > 0) {
        // eslint-disable-next-line no-unused-vars
        let i
        let j
        let temparray
        const chunk = 4
        for (i = 0, j = this.team.current.length; i < j; i += chunk) {
          temparray = this.team.current.slice(i, i + chunk)
          result.push(temparray)
        }
      }
      return result
    }
  },

  async mounted() {
    this.loading = true
    const { data } = await this.$apollo.query({
      query: gql`
        query homepage {
          podcastsCount
          episodesCount
          categories {
            name
            slug
            img
            description
            podcastsCount
            icon
            color
          }
          podcasts(featured: true) {
            slug
            title
            image
            summary
            episodesCount
          }
          latestEpisodes {
            slug
            podcastSlug
            guid
            title
            summary
            enclosure
            link
            image
            itunesDuration
            botDirectLink
            publishedAt
          }
          pressMentions(first: 3) {
            title
            url
            source
            date
            image
          }
          teamMembers(ambassador: true) {
            avatar
            name
            role
            description
            web
            twitter
            linkedin
            github
            instagram
            former
          }
        }
      `
    })

    this.categories = data.categories.filter((i) => i.podcastsCount > 0)
    this.podcasts = data.podcasts
    this.latestEpisodes = data.latestEpisodes
    this.podcastsCount = data.podcastsCount
    this.episodesCount = data.episodesCount
    this.pressMentions = data.pressMentions
    this.ambassadors = data.teamMembers

    this.loading = false
  }
}
</script>

<style scoped>
.brand {
  width: 200pt;
}
.cover {
  background: url('/img/pattern.png');
  background-size: cover;
}
.cover .is-overlay {
  background: rgba(0, 0, 0, 0.5) !important;
}
.supertitle {
  font-size: 45pt;
}
.supertext {
  font-size: 15pt;
}
.team {
  background-size: 800% 800%;
  background-image: linear-gradient(
    to top,
    #7046aa 0%,
    #0c1db8 50%,
    #020f75 100%
  );
  -webkit-animation: animatedbg 10s ease infinite;
  animation: animatedbg 10s ease infinite;
}
@keyframes animatedbg {
  0% {
    background-position: 1% 80%;
  }
  50% {
    background-position: 99% 20%;
  }
  100% {
    background-position: 1% 80%;
  }
}
.member img {
  padding: 2pt;
  border-radius: 50%;
  border: 4pt solid white;
}
.podcaster-cover {
  border-radius: 50%;
  box-shadow: 0 0 10pt 0 gray;
  width: 250pt;
  height: 250pt;
  background: url('/img/podcaster-400x400pt.jpg');
  background-size: cover;
  margin: auto;
}
</style>
