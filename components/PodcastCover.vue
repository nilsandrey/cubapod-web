<template>
  <div v-if="podcast">
    <!-- cover image -->
    <img
      :src="podcast.image"
      alt=""
      width="100%"
      class="is-hidden-tablet"
      style="margin-bottom: 0"
    />
    <!-- end cover image -->

    <div
      class="hero"
      :style="
        `margin-top: 0; background-color: ${primaryColor}; color: ${textColor} !important;`
      "
    >
      <div class="hero-body">
        <div class="columns is-centered">
          <div class="column is-narrow is-hidden-mobile">
            <img
              :src="podcast.image"
              alt=""
              width="200pt"
              style="border-radius: 10pt"
            />
          </div>

          <!-- header -->
          <div class="column is-5-tablet has-text-centered-mobile">
            <h2 class="title" :style="`color: ${textColor} !important;`">
              {{ podcast.title }}
            </h2>
            <b
              class="margin-bottom-10"
              :style="`color: ${textColor} !important;`"
            >
              Por {{ podcast.author }} · {{ podcast.episodesCount }} episodios
            </b>
            <p>
              <small v-html="podcast.summary"></small>
            </p>

            <!-- podcast links -->
            <div class="margin-top-10">
              <b-tooltip
                label="Sitio web"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.link">
                  <b-icon
                    icon="earth"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                label="@CubaPodBot en Telegram"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a
                  :href="
                    `https://t.me/CubaPodBot?start=podcast_${$route.params.podcastSlug}`
                  "
                >
                  <b-icon
                    icon="robot"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.twitterUrl"
                label="Twitter"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.twitterUrl">
                  <b-icon
                    icon="twitter"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.telegramUrl"
                label="Telegram"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.telegramUrl">
                  <b-icon
                    icon="telegram"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.facebookUrl"
                label="Facebook"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.facebookUrl">
                  <b-icon
                    icon="facebook"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.instagramUrl"
                label="Instagram"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.instagramUrl">
                  <b-icon
                    icon="instagram"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.youtubeUrl"
                label="Youtube"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.youtubeUrl">
                  <b-icon
                    icon="youtube"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.discordUrl"
                label="Discord"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.discordUrl">
                  <b-icon
                    icon="discord"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                v-show="podcast.applePodcastsUrl"
                label="Apple Podcasts"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.applePodcastsUrl">
                  <b-icon
                    icon="apple"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <b-tooltip
                label="Feed RSS"
                type="is-white"
                position="is-bottom"
                animated
              >
                <a :href="podcast.url">
                  <b-icon
                    icon="rss"
                    :style="`color: ${textColor} !important;`"
                  ></b-icon>
                </a>
              </b-tooltip>
              <div :class="dropdownActive ? 'dropdown is-active' : 'dropdown'">
                <div class="dropdown-trigger">
                  <span
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    class="clickable"
                    @click="dropdownActive = !dropdownActive"
                  >
                    Compartir
                  </span>
                </div>
                <div id="dropdown-menu" class="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <TwitterShare :podcast="podcast" />
                    <TelegramShare :podcast="podcast" />
                    <a
                      class="dropdown-item"
                      :href="
                        `https://www.linkedin.com/sharing/share-offsite/?url=https://cubapod.net${$route.fullPath}`
                      "
                      target="_blank"
                    >
                      <b-icon icon="linkedin" size="is-small"></b-icon>
                      <span>LinkedIn</span>
                    </a>
                    <a
                      class="dropdown-item"
                      :href="
                        `https://www.facebook.com/sharer.php?u=https://cubapod.net${$route.fullPath}`
                      "
                      target="_blank"
                    >
                      <b-icon icon="facebook" size="is-small"></b-icon>
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <!-- end podcast links -->
          </div>
          <!-- end header -->
        </div>
      </div>
    </div>
    <div class="wave-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150">
        <path
          :fill="primaryColor"
          fill-opacity="1"
          d="M0,224L120,197.3C240,171,480,117,720,112C960,107,1200,149,1320,170.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import TwitterShare from '~/components/TwitterShare'
import TelegramShare from '~/components/TelegramShare'
export default {
  components: { TwitterShare, TelegramShare },
  props: {
    podcast: {
      type: Object,
      default: null
    },
    colors: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      dropdownActive: false
    }
  },

  computed: {
    primaryColor() {
      if (this.colors) {
        if (this.colors.primaryColor) {
          return this.colors.primaryColor
        }
      } else {
        return this.podcast.primaryColor
      }
      return null
    },

    textColor() {
      if (this.colors) {
        if (this.colors.textColor) {
          return this.colors.textColor
        }
      } else {
        return this.podcast.textColor
      }
      return null
    }
  }
}
</script>

<style scoped>
.b-tooltip {
  margin-right: 10pt !important;
}
</style>
