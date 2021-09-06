<template>
  <b-loading :active="active" is-full-page>
    <img src="/img/cubapod.jpg" alt="" width="200pt" />
  </b-loading>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>
