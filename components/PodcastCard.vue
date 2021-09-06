<template>
  <div class="card" style="height: 100% !important;">
    <div v-if="podcast.image" class="card-image">
      <img :src="podcast.image" :alt="podcast.title" />
    </div>
    <div class="card-content">
      <p class="margin-bottom-10">{{ podcast.title }}</p>
      <div v-if="podcast.populated">
        <p>{{ podcast.episodesCount }} episodios</p>
      </div>
      <div v-if="!podcast.populated">
        <div class="margin-bottom-10">
          <b-tag type="is-warning" rounded>
            <b-icon icon="clock" size="is-small" />
            <span class="margin-left-5">Procesando...</span>
          </b-tag>
        </div>
        <small>
          El pódcast se está procesando, el proceso puede demorar unos minutos.
        </small>
      </div>
      <div class="margin-top-10">
        <b-button
          type="is-primary"
          expanded
          @click="$router.replace(`/podcaster/${podcast.slug}`)"
        >
          Ver detalles
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    podcast: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
img {
  border-radius: 10pt 10pt 0 0;
}
</style>
