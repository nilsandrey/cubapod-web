<template>
  <section class="hero is-info is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img
          src="/img/cubapod.jpg"
          alt=""
          width="100pt"
          style="border-radius: 10pt"
        />
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'

export default {
  auth: false,
  layout: 'hero',

  data() {
    return {
      loading: false
    }
  },

  async mounted() {
    this.loading = true
    const hash = this.$route.query.hash
    const action = this.$route.query.action
    const { data } = await this.$apollo.mutate({
      mutation: gql`
        mutation verifyEmail($hash: String!, $action: String!) {
          verifyEmail(hash: $hash, action: $action) {
            status
          }
        }
      `,
      variables: {
        hash,
        action
      }
    })
    if (data.verifyEmail.status === 'ok') {
      this.loading = false
      this.$buefy.toast.open('Se verificó el correo')
    }
    switch (action) {
      case 'register': {
        this.$router.replace('/podcaster/login')
        break
      }
      case 'profile': {
        this.$router.replace('/podcaster/profile')
        break
      }
    }
  }
}
</script>

<style scoped></style>
