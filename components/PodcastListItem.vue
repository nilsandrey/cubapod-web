<template>
  <div @click="$router.replace(`/${podcast.slug}`)">
    <div class="media margin-bottom-10">
      <div class="media-left">
        <img :src="podcast.image" width="100pt" style="border-radius: 10pt" />
      </div>
      <div class="media-content">
        <h2>
          <b>{{ podcast.title }}</b>
        </h2>
        <p>{{ podcast.episodesCount }} episodios</p>
      </div>
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

<style scoped></style>
