<template>
  <div v-if="pagination" class="level">
    <div class="level-left">
      <span>
        Página <b>{{ pagination.page }}</b> de
        <b>{{ pagination.pages }}</b>
      </span>
    </div>
    <div class="level-right">
      <b-button
        v-if="pagination.hasPrev"
        type="is-small"
        icon-left="arrow-left"
        :loading="loading"
        :disabled="loading"
        @click="$emit('prev')"
      >
        Anterior
      </b-button>
      <b-button
        v-if="pagination.hasNext"
        type="is-small"
        icon-right="arrow-right"
        class="margin-left-5"
        :loading="loading"
        :disabled="loading"
        @click="$emit('next')"
      >
        Siguiente
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
