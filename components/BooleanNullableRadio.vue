<template>
  <div>
    <label v-if="label" for="" class="label">
      {{ label }}
    </label>
    <b-field>
      <b-radio-button
        v-model="value"
        :native-value="true"
        type="is-success"
        @input="($value) => $emit('input', $value)"
      >
        <b-icon icon="check" size="is-small"></b-icon>
        <span>Sí</span>
      </b-radio-button>

      <b-radio-button
        v-model="value"
        :native-value="false"
        type="is-danger"
        @input="($value) => $emit('input', $value)"
      >
        <b-icon icon="close" size="is-small"></b-icon>
        <span>No</span>
      </b-radio-button>

      <b-radio-button
        v-model="value"
        :native-value="null"
        type="is-primary"
        @input="($value) => $emit('input', $value)"
      >
        Ninguno
      </b-radio-button>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  }
}
</script>
