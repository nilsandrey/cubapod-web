<template>
  <b-navbar fixed-top style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/admin' }">
        <img src="/img/cubapod.jpg" alt="CubaPod Logo" />
        Admin
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="user" tag="div">
        <b-navbar-dropdown :label="`${user.firstName}`">
          <b-navbar-item tag="router-link" :to="{ path: '/podcaster/profile' }">
            Tu perfil
          </b-navbar-item>
          <b-navbar-item href="#" @click="logout()">
            Cerrar sesión
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/get']
    }
  },

  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$store.commit('user/set', null)
        this.$auth.setToken('local', null)
        this.$router.replace(`/podcaster/login`)
      })
    }
  }
}
</script>

<style scoped></style>
