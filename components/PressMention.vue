<template>
  <div v-if="mention">
    <a :href="mention.url" target="_blank">
      <div class="card">
        <div class="card-image">
          <figure
            class="image"
            style="height: 500pt !important; border-bottom-left-radius: 0 !important; border-bottom-right-radius: 0 !important;"
          >
            <img
              :src="`/media/${mention.image}`"
              :alt="mention.title"
              width="100%"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ mention.title }}</p>
              <p>{{ mention.date }} ・ {{ mention.source }}</p>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    mention: {
      type: Object,
      default: null
    }
  }
}
</script>
