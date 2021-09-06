<template>
  <span>
    <b-tooltip type="is-light" label="Copiar" size="is-small" animated>
      <div @click="$copyText(value)">
        <b-icon icon="content-copy" size="is-small" />
      </div>
    </b-tooltip>
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

<style scoped>
span:hover {
  cursor: pointer;
}
</style>
