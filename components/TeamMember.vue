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
      <p class="member-role">{{ member.role }}</p>
      <p class="member-bio">
        {{ member.description }}
      </p>
      <div class="socials">
        <a v-if="member.web" :href="member.web" class="social">
          <b-icon icon="web" size="is-small"></b-icon>
        </a>
        <a v-if="member.twitter" :href="member.twitter" class="social">
          <b-icon icon="twitter" size="is-small"></b-icon>
        </a>
        <a v-if="member.linkedin" :href="member.linkedin" class="social">
          <b-icon icon="linkedin" size="is-small"></b-icon>
        </a>
        <a v-if="member.instagram" :href="member.instagram" class="social">
          <b-icon icon="instagram" size="is-small"></b-icon>
        </a>
        <a v-if="member.github" :href="member.github" class="social">
          <b-icon icon="github" size="is-small"></b-icon>
        </a>
      </div>
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

<style scoped></style>
