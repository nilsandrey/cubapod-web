<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h4 class="has-text-centered">
          {{ title }}
          <b-tooltip
            v-if="help"
            :label="help"
            size="is-small"
            type="is-light"
            multilined
            animated
          >
            <b-icon icon="help-circle" size="is-small" class="has-text-grey" />
          </b-tooltip>
        </h4>
        <p class="has-text-centered">
          {{ value }}
          <b-icon :icon="icon" size="is-small" :class="`has-text-${color}`" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    help: {
      type: String,
      default: null
    },
    value: {
      type: Number,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
}
</script>
