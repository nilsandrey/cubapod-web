<template>
  <transition name="fade">
    <p
      class="has-text-danger margin-bottom-10"
      style="transition-duration: 300ms"
    >
      <small>
        <b-icon icon="alert-box" size="is-small"></b-icon>
        <slot />
      </small>
    </p>
  </transition>
</template>

<script>
export default {}
</script>
