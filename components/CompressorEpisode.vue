<template>
  <div v-if="episode" class="card">
    <div class="card-content">
      <div class="columns">
        <div class="column">
          <p>{{ episode.title }}</p>
        </div>
        <div class="column is-narrow">
          <div v-if="episode.state === 'PENDING'">
            <b-tag type="is-warning">Pendiente</b-tag>
          </div>
          <div v-else-if="episode.state === 'DOWNLOADING'">
            <b-tag type="is-info">Descargando</b-tag>
          </div>
          <div v-else-if="episode.state === 'COMPRESSING'">
            <b-tag type="is-info">Comprimiendo</b-tag>
          </div>
          <div v-else-if="episode.state === 'UPLOADING'">
            <b-tag type="is-info">Subiendo</b-tag>
          </div>
          <div v-else-if="episode.state === 'COMPLETED'">
            <b-tag type="is-success">Completado</b-tag>
          </div>
          <div v-else-if="episode.state === 'CANCELLED'">
            <b-tag type="is-danger">Cancelado</b-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      default: null
    }
  }
}
</script>
