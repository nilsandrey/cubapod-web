<template>
  <div>
    <!-- header -->
    <div id="home" class="overlay">
      <div :class="`hero ${size} banner parallalex`">
        <div class="hero-body">
          <div class="columns is-centered has-text-centered">
            <div class="column is-narrow">
              <nuxt-link to="/">
                <img
                  src="/img/cubapod.jpg"
                  alt=""
                  width="100pt"
                  style="border-radius: 10pt"
                />
              </nuxt-link>
            </div>
            <div class="column is-narrow">
              <h1 class="has-text-centered">CubaPod</h1>
              <p class="has-text-centered">
                Plataforma cubana de podcasting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end header -->
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'is-medium'
    }
  }
}
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  background: url('/img/cover.png');
}
.banner {
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
}
</style>
