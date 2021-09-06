<template>
  <div v-if="rendered">
    <div v-html="rendered.html" style=""></div>
  </div>
</template>

<script>
import Markdown from '@nuxt/markdown'

export default {
  props: {
    content: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      rendered: null
    }
  },

  async mounted() {
    const md = new Markdown()
    this.rendered = await md.toMarkup(this.content)
  }
}
</script>

<style scoped>
img {
  border-radius: 10pt;
  box-shadow: 0 0 1pt 0 gray;
  border: solid 3pt red;
}
</style>
