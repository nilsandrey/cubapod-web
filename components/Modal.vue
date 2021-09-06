<template>
  <b-modal
    :active.sync="active"
    :can-cancel="false"
    has-modal-card
    @keypress.esc="close()"
  >
    <div class="modal-card">
      <section class="modal-card-body">
        <button
          v-if="cancellable"
          type="button"
          class="modal-close is-large"
          @click="close()"
        >
          <i class="icon icon-times"></i>
        </button>
        <slot></slot>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    cancellable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      if (this.cancellable) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.modal-card-body {
  width: auto; border-radius: 10pt; padding: 20pt;
}
</style>
