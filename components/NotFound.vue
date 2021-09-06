<template>
  <div class="hero is-danger is-bold">
    <div class="hero-content">
      <section class="section">
        <h1 class="not-found has-text-centered">404</h1>
        <h2 class="subtitle has-text-centered">
          {{ label }}
        </h2>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    }
  }
}
</script>
