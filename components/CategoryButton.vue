<template>
  <nuxt-link :to="`/explorar/${category.slug}`" :title="category.name">
    <b-button
      :icon-left="category.icon"
      rounded
      expanded
      class="category-button"
      :style="`background: ${category.color};`"
    >
      {{ category.name }}
    </b-button>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Category',
  props: {
    category: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style scoped>
.category-button {
  color: #ffffff;
  border: none !important;
}
</style>
