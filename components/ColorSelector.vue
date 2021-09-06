<template>
  <div class="level">
    <div class="level-left">
      <label for="" class="label">
        {{ label }}
      </label>
    </div>
    <div class="level-right">
      <v-swatches
        v-model="internalValue"
        show-fallback
        popover-x="left"
        @input="(payload) => $emit('input', payload)"
      >
        <div
          slot="trigger"
          class="swatch-trigger"
          :style="`background: ${internalValue}`"
        ></div>
      </v-swatches>
    </div>
  </div>
</template>

<script>
import VSwatches from 'vue-swatches'
// Import the styles too, typically in App.vue or main.js
import 'vue-swatches/dist/vue-swatches.css'
export default {
  components: { VSwatches },
  props: {
    value: {
      type: String,
      default: '#000000'
    },
    label: {
      type: String,
      default: 'Color'
    }
  },

  data() {
    return {
      internalValue: null
    }
  },

  mounted() {
    this.internalValue = this.value
  }
}
</script>

<style scoped>
.swatch-trigger {
  width: 30pt;
  height: 30pt;
  border-radius: 50%;
  border: solid 1pt black;
}
</style>
