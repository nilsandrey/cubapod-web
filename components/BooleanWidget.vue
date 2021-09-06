<template>
  <span>
    <b-tooltip
      type="is-light"
      :label="label"
      size="is-small"
      multilined
      animated
    >
      <b-icon
        v-if="value"
        :icon="icon"
        size="is-small"
        class="has-text-success"
      />
      <b-icon v-else :icon="icon" size="is-small" class="has-text-gray" />
    </b-tooltip>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    label: {
      type: Boolean,
      default: null
    }
  }
}
</script>

<style scoped>
span:hover {
  cursor: pointer;
}
</style>
