<template>
  <a v-if="podcast" :href="url" class="dropdown-item" target="__blank">
    <b-icon icon="telegram" size="is-small"></b-icon>
    Telegram
  </a>
</template>

<script>
export default {
  name: 'TelegramShare',

  props: {
    podcast: {
      type: Object,
      default: () => null
    }
  },

  data() {
    const url = `https://cubapod.net${this.$route.fullPath}`
    const title = this.podcast.telegramHandler
      ? this.podcast.telegramHandler
      : this.podcast.title
    return {
      url: `https://t.me/share/?url=${url}&text=Escuchando ${title} en @CubaPod`
    }
  }
}
</script>
