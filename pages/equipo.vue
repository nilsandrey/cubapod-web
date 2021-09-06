<template>
  <div>
    <section class="section">
      <h1 class="title has-text-centered">Equipo de CubaPod</h1>

      <div class="container is-widescreen">
        <p class="has-text-centered margin-bottom-20">
          Somos el equipo de CubaPod. Tenemos la misión de potenciar y difundir
          el podcasting cubano.
        </p>
        <div id="team" class="columns is-centered is-multiline">
          <div
            v-for="member in members.filter((i) => i.former === false)"
            :key="member.name"
            class="column is-2-desktop is-4-tablet is-12-mobile"
          >
            <TeamMember :member="member" />
          </div>
        </div>
      </div>

      <h2 class="subtitle has-text-centered margin-top-30">
        También formaron parte
      </h2>
      <div class="container is-widescreen">
        <div class="columns is-centered is-multiline">
          <div
            v-for="member in members.filter((i) => i.former === true)"
            :key="member.name"
            class="column is-1-desktop is-4-tablet is-12-mobile"
          >
            <ExTeamMember :member="member" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TeamMember from '~/components/TeamMember'
import ExTeamMember from '~/components/ExTeamMember'

export default {
  auth: false,

  components: { TeamMember, ExTeamMember },

  data() {
    return {
      members: []
    }
  },

  async mounted() {
    const { data } = await this.$apollo.query({
      query: gql`
        query teamMembers {
          teamMembers(ambassador: false) {
            avatar
            name
            role
            description
            web
            twitter
            linkedin
            github
            instagram
            former
          }
        }
      `
    })
    this.members = data.teamMembers
  },

  head() {
    const title = 'Equipo | CubaPod'
    return {
      title,
      meta: [
        { name: 'og:title', content: title },
        { name: 'twitter:title', content: title }
      ]
    }
  }
}
</script>

<style scoped>
.is-active .al img {
  filter: grayscale(0%);
}

.al img {
  filter: grayscale(100%);
}

.social {
  margin-right: 10pt;
}
</style>
