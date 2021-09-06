<template>
  <div class="podcast">
    <nuxt-link :to="`/${podcast.slug}`" :title="podcast.name">
      <img :src="podcast.image" width="100%" style="border-radius: 5pt" />
    </nuxt-link>
    <div class="podcast-name has-text-centered">
      {{ podcast.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podcast',
  props: {
    podcast: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style scoped>
.podcast {
  border-radius: 10pt;
  padding: 10pt;
}
.podcast .podcast-name {
  height: 50pt;
  text-wrap: none;
  text-overflow: ellipsis;
}
</style>
