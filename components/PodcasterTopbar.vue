<template>
  <b-navbar fixed-top style="box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);">
    <template slot="brand">
      <b-navbar-item
        id="v-step-0"
        tag="router-link"
        :to="{ path: '/podcaster' }"
      >
        <img src="/img/cubapod.jpg" alt="CubaPod Logo" />
        Podcáster
        <span
          class="margin-left-5 has-text-info"
          style="font-size: 8pt; border-radius: 5pt; border: solid 1pt #3E83FF; padding: 0 5pt 0 5pt"
        >
          beta
        </span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item v-if="user" id="v-step-1" tag="div">
        <b-navbar-dropdown :label="`${user.firstName}`">
          <b-navbar-item tag="router-link" :to="{ path: '/podcaster/profile' }">
            Tu perfil
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/podcaster' }">
            Tus pódcasts
          </b-navbar-item>
          <b-navbar-item href="#" @click="logout()">
            Cerrar sesión
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
      <b-navbar-item id="v-step-2" tag="div">
        <div class="buttons">
          <nuxt-link class="button is-primary" to="/podcaster/add">
            <b-icon icon="plus" />
            <span>Añadir pódcast</span>
          </nuxt-link>
        </div>
      </b-navbar-item>
      <!--v-tour
        name="tour"
        :steps="steps"
        :options="tourOptions"
        :callbacks="{
          onSkip: onFinish,
          onFinish: onFinish
        }"
      ></v-tour-->
    </template>
  </b-navbar>
</template>

<script>
import telemetry from '~/services/telemetry'
export default {
  data() {
    return {
      tourOptions: {
        useKeyboardNavigation: false,
        highlight: true,
        labels: {
          buttonSkip: 'Saltar introducción',
          buttonPrevious: 'Anterior',
          buttonNext: 'Siguiente',
          buttonStop: 'Finalizar'
        }
      },
      steps: [
        {
          target: '#v-step-0', // We're using document.querySelector() under the hood
          content: `Bienvenido a Podcáster, la nueva administración de CubaPod para creadores de pódcasts. Este producto ha sido lanzado bajo pruebas beta y te agradeceremos nos ayudes a mejorarlo.`
        },
        {
          target: '#v-step-1',
          content:
            'Aquí puedes acceder a tu perfil, tus pódcasts o cerrar la sesión.'
        },
        {
          target: '#v-step-2',
          content:
            'Si deseas añadir un pódcast a la plataforma, presiona este botón. ¡Eso es todo!',
          params: {
            placement: 'left'
          }
        }
      ]
    }
  },

  computed: {
    user() {
      return this.$store.getters['user/get']
    }
  },

  mounted() {
    /* const cookie = this.$cookies.get('cubapod-podcaster-tour')
    if (cookie !== 'done') {
      const that = this
      setTimeout(() => {
        // eslint-disable-next-line
        that.$tours['tour'].start()
      }, 1000)
    } */
  },

  methods: {
    logout() {
      // Telemetry
      telemetry.reportAction(this, 'podcaster_logout', this.$route.path)

      // Logout
      this.$auth.logout().then(() => {
        this.$store.commit('user/set', null)
        this.$auth.setToken('local', null)
        this.$router.replace(`/podcaster/login`)
      })
    }
  }
}
</script>

<style scoped>
.v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4);
}
</style>
