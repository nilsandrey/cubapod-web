<template>
  <div class="category">
    <nuxt-link
      :to="`/explorar/${category.slug}`"
      :title="category.name"
      class="primary-link"
    >
      <img :src="`/media/${category.img}`" :alt="category.name" width="100%" />
      <h2>
        {{ category.name }}
      </h2>
    </nuxt-link>
  </div>
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
img {
  border-radius: 10pt;
}
.category {
  border-radius: 10pt;
  padding: 10pt;
}
h2 {
  text-align: center;
}
</style>
