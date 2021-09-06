<template>
  <b-menu>
    <b-menu-list label="General">
      <b-menu-item
        icon="home"
        label="Inicio"
        :active="$route.path === `/admin`"
        @click="navigateTo(`/admin`)"
      ></b-menu-item>
      <b-menu-item
        icon="sync"
        label="Distribución"
        :active="checkIfActive(`/admin/distributor`)"
        @click="navigateTo(`/admin/distributor`)"
      ></b-menu-item>
      <b-menu-item
        v-if="checkPerm('core.view_user')"
        icon="account"
        label="Usuarios"
        :active="checkIfActive(`/admin/users`)"
        @click="navigateTo(`/admin/users`)"
      ></b-menu-item>
      <b-menu-item
        v-if="checkPerm('links.view_link')"
        icon="link"
        label="Enlaces"
        :active="checkIfActive(`/admin/links`)"
        @click="navigateTo(`/admin/links`)"
      ></b-menu-item>
      <b-menu-item
        v-if="checkPerm('auth.view_group')"
        icon="lock"
        label="Permisos"
        :active="checkIfActive(`/admin/permissions`)"
        @click="navigateTo(`/admin/permissions`)"
      ></b-menu-item>
      <b-menu-item
        icon="chart-bar"
        label="Telemetría"
        :active="checkIfActive(`/admin/telemetry/podcaster`)"
        @click="navigateTo(`/admin/telemetry/podcaster`)"
      ></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Bot">
      <b-menu-item
        v-if="checkPerm('core.view_botuser')"
        icon="account"
        label="Usuarios"
        :active="checkIfActive(`/admin/botusers`)"
        @click="navigateTo(`/admin/botusers`)"
      ></b-menu-item>
      <b-menu-item
        v-if="checkPerm('core.view_botannouncement')"
        icon="bullhorn"
        label="Anuncios"
        :active="checkIfActive(`/admin/bot-announcements`)"
        @click="navigateTo(`/admin/bot-announcements`)"
      ></b-menu-item>
      <b-menu-item
        icon="chart-bar"
        label="Telemetría"
        :active="checkIfActive(`/admin/telemetry/bot`)"
        @click="navigateTo(`/admin/telemetry/bot`)"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  methods: {
    navigateTo(path) {
      if (this.$router.path !== path) {
        this.$router.replace(path)
      }
    },

    checkIfActive(to) {
      return this.$route.fullPath.search(to) !== -1
    },

    checkPerm(perm) {
      if (this.$store.getters['user/get']) {
        return this.$store.getters['user/get'].permissions.find(
          (i) => i === perm
        )
      }
      return false
    }
  }
}
</script>
