<template>
  <div class="navbar-padding">
    <Topbar />

    <nuxt />

    <Footer />

    <transition name="fade">
      <AudioVisualizer
        v-if="episode"
        av-height="60pt"
        :episode="episode"
        :canvas="true"
      ></AudioVisualizer>
    </transition>
    <recaptcha />
  </div>
</template>

<script>
import Topbar from '~/components/Topbar'
import Footer from '~/components/Footer'
import AudioVisualizer from '~/components/AudioVisualizer'

export default {
  auth: false,
  components: { Topbar, Footer, AudioVisualizer },
  computed: {
    episode() {
      if (this.$store.getters['episode/getPlay']) {
        return this.$store.getters['episode/get']
      }
      return null
    }
  }
}
</script>

<style scoped></style>
