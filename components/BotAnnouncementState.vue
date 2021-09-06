<template>
  <span>
    <span v-if="value === 'READY'">
      <b-tag type="is-info">Listo</b-tag>
    </span>
    <span v-if="value === 'COMPLETED'">
      <b-tag type="is-success">Completado</b-tag>
    </span>
    <span v-if="value === 'SENDING'">
      <b-tag type="is-warning">Enviando</b-tag>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  }
}
</script>
