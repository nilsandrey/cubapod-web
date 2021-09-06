<template>
  <b-navbar fixed-top style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="/img/cubapod.jpg" alt="CubaPod Logo" />
      </b-navbar-item>
      <b-navbar-item class="is-hidden-desktop">
        <Finder :expanded="true" size="is-small" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-dropdown label="Sobre CubaPod">
        <b-navbar-item tag="router-link" :to="{ path: '/acerca-de' }">
          Acerca de CubaPod
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/datos' }">
          Datos y cifras
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/donaciones' }">
          Donaciones
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/academia' }">
          Academia
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/prensa' }">
          Prensa
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/equipo' }">
          Equipo
        </b-navbar-item>
        <b-navbar-item
          tag="a"
          href="https://developers.cubapod.net"
          target="_blank"
        >
          API
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item class="is-hidden-touch">
        <Finder />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            href="https://t.me/CubaPodBot"
            class="button is-info is-rounded is-outlined"
            target="_blank"
          >
            <strong>Bot en Telegram</strong>
            <b-icon icon="telegram" style="margin-left: 5pt"></b-icon>
          </a>
          <nuxt-link class="button is-primary is-rounded" to="/podcaster/add">
            <strong>Añadir mi pódcast</strong>
            <b-icon icon="rss" style="margin-left: 5pt"></b-icon>
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Finder from '~/components/Finder'
export default {
  components: { Finder }
}
</script>

<style scoped></style>
