<template>
  <div class="episode">
    <!-- desktop -->
    <img
      :src="episode.image"
      :alt="episode.title"
      width="100%"
      style="border-radius: 5pt;"
      class="is-hidden-tablet"
    />
    <div class="media margin-bottom-20">
      <component :is="'style'" v-if="episode && color">
        .episode a { color: {{ color }} !important; }
      </component>
      <div class="media-left is-hidden-mobile">
        <nuxt-link :to="url">
          <img
            :src="episode.image"
            :alt="episode.title"
            width="170pt"
            height="170pt"
            style="border-radius: 5pt;"
          />
        </nuxt-link>
      </div>
      <div class="media-content">
        <!-- url -->
        <nuxt-link :to="url">
          <p>
            <b>{{ episode.title }}</b>
          </p>
        </nuxt-link>
        <!-- end url -->

        <!-- datetime -->
        <p class="margin-bottom-10">
          <small>
            {{ $moment(episode.publishedAt).format('DD-MM-YYYY, h:mm a') }}
          </small>
        </p>
        <!-- end datetime -->

        <div>
          <div class="episode-description" v-html="episode.summary"></div>
        </div>

        <!-- buttons -->
        <b-field>
          <b-button size="is-small" rounded expanded @click="playEpisode()">
            <b-icon
              icon="play-circle"
              size="is-small"
              style="color: red; margin-right: 2pt"
            ></b-icon>
            Reproducir
          </b-button>
          <a :href="episode.botDirectLink" target="_blank">
            <b-button size="is-small" icon-left="robot" rounded>
              Ver en el bot
            </b-button>
          </a>
        </b-field>
        <!-- end buttons -->
      </div>
    </div>
    <!-- end desktop -->
  </div>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      default: () => {}
    },
    color: {
      type: String,
      default: null
    },
    twitterUser: {
      type: String,
      default: () => {}
    }
  },

  computed: {
    url() {
      const params = this.$route.params
      let podcastSlug
      if (params.podcastSlug) {
        podcastSlug = params.podcastSlug
      } else if (this.episode.podcastSlug) {
        podcastSlug = this.episode.podcastSlug
      }
      return `/${podcastSlug}/${this.episode.slug}`
    }
  },

  methods: {
    playEpisode() {
      const episode = this.$store.getters['episode/get']
      const initialize = function() {
        this.$store.commit('episode/set', this.episode)
        this.$store.commit('episode/setPlay', true)
      }.bind(this)

      if (episode) {
        this.$store.commit('episode/set', null)
        this.$store.commit('episode/setPlay', false)
        setTimeout(initialize, 1000)
      } else {
        setTimeout(initialize, 150)
      }
    }
  }
}
</script>

<style scoped>
.episode-description {
  overflow: hidden;
  font-size: 10pt;
  height: 50pt;
  width: 100%;
  margin-bottom: 10pt;
  background-image: linear-gradient(to bottom, #000, #000, #fff);
  color: transparent;
  -webkit-background-clip: text;
}
</style>
