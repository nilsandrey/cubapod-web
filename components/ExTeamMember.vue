<template>
  <div v-if="member" class="member">
    <div class="member-image">
      <img
        :src="`/media/${member.avatar}`"
        :alt="member.name"
        height="200pt"
        width="100%"
      />
    </div>
    <div class="member-content">
      <p class="member-name">{{ member.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.socials .social {
  margin-right: 10pt;
}
</style>
