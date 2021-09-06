<template>
  <a v-if="podcast" :href="text" class="dropdown-item" target="__blank">
    <b-icon icon="twitter" size="is-small"></b-icon>
    <span>Twitter</span>
  </a>
</template>

<script>
export default {
  name: 'TwitterShare',

  props: {
    podcast: {
      type: Object,
      default: null
    }
  },

  data() {
    let twitterHandler = null
    let header = ''
    if (this.podcast) {
      twitterHandler = this.podcast.twitterHandler
      header += `"${this.podcast.title}"`
      if (twitterHandler) {
        header += ` @${twitterHandler}`
      }
    }

    return {
      text: `http://twitter.com/intent/tweet?text=Escucha ${header} en @CubaPod&url=https://cubapod.net${this.$route.path}`
    }
  }
}
</script>
