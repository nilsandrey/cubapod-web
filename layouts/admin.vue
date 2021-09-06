<template>
  <div>
    <AdminTopbar />
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-2">
            <AdminMenu />
          </div>
          <div class="column is-10">
            <nuxt />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AdminMenu from '~/components/AdminMenu'
import AdminTopbar from '~/components/AdminTopbar'

export default {
  components: { AdminMenu, AdminTopbar },
  auth: true,

  async beforeMount() {
    const { data } = await this.$apollo.query({
      query: gql`
        query viewerUser {
          viewerUser {
            firstName
            lastName
            email
            isSuperuser
            isStaff
            permissions
          }
        }
      `,
      fetchPolicy: 'network-only'
    })
    this.$store.commit('user/set', data.viewerUser)
    if (!data.viewerUser.isStaff) {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped></style>
