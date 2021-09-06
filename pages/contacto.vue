<template>
  <div class="section">
    <b-loading is-full-page :active="loading" :can-cancel="false">
      <b-icon icon="podcast" size="is-large" custom-class="fa-spin"></b-icon>
    </b-loading>

    <div class="container">
      <h2 class="subtitle has-text-centered">
        Contacta con CubaPod
      </h2>
      <div class="columns is-centered">
        <div class="column is-6 is-12-mobile">
          <div class="box">
            <client-only>
              <form name="contact" method="POST" @submit.prevent="submitForm">
                <!-- name -->
                <label for="" class="label">Tu nombre</label>
                <b-field>
                  <b-input
                    v-model="$v.form.name.$model"
                    icon="account"
                    placeholder="¿Quién nos contacta?"
                    @blur="$v.form.name.$touch()"
                  ></b-input>
                </b-field>
                <p
                  v-if="$v.form.name.$invalid && $v.form.name.$anyError"
                  class="has-text-danger margin-bottom-10"
                >
                  <small>
                    <b-icon icon="alert-box" size="is-small"></b-icon>
                    Especifica tu nombre.
                  </small>
                </p>
                <!-- end name -->

                <!-- email -->
                <label for="" class="label">Correo para contactarte</label>
                <b-field>
                  <b-input
                    v-model="$v.form.email.$model"
                    native-type="email"
                    icon="email"
                    placeholder="alguien@ejemplo.com"
                    @blur="$v.form.email.$touch()"
                  ></b-input>
                </b-field>
                <p
                  v-if="$v.form.email.$invalid && $v.form.email.$anyError"
                  class="has-text-danger margin-bottom-10"
                >
                  <small>
                    <b-icon icon="alert-box" size="is-small"></b-icon>
                    Especifica tu correo y verifica que sea correcto.
                  </small>
                </p>
                <!-- end email -->

                <!-- message -->
                <label for="" class="label">Mensaje</label>
                <b-field>
                  <b-input
                    v-model="$v.form.message.$model"
                    type="textarea"
                    placeholder="Expón tu idea, sugerencia, queja o felicitación..."
                    @blur="$v.form.message.$touch()"
                  ></b-input>
                </b-field>
                <p
                  v-if="$v.form.message.$invalid && $v.form.message.$anyError"
                  class="has-text-danger margin-bottom-10"
                >
                  <small>
                    <b-icon icon="alert-box" size="is-small"></b-icon>
                    Escribe tu opinión.
                  </small>
                </p>
                <!-- end message -->

                <info class="margin-bottom-10">
                  Su mensaje será entregado al equipo de CubaPod, si desea
                  enviar una opinión a un podcáster, puede hacerlo por otras
                  vías. También puede escribirnos directamente a nuestro correo
                  <a href="mailto:contacto@cubapod.net">
                    contacto@cubapod.net</a
                  >
                  o por el chat en vivo que está abajo a la derecha.
                </info>

                <b-button
                  type="is-black"
                  native-type="submit"
                  icon-left="email-send"
                  expanded
                  :disabled="$v.form.$invalid"
                >
                  Enviar
                </b-button>
              </form>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  auth: false,
  data() {
    return {
      form: {
        name: null,
        email: null,
        message: null
      },
      loading: false
    }
  },

  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&')
    },

    submitForm() {
      this.loading = true
      const axiosConfig = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      this.$axios
        .$post(
          'https://formspree.io/mwkrpknl',
          this.encode({
            ...this.form
          }),
          axiosConfig
        )
        .then(() => {
          this.loading = false
          this.$router.replace('/')
        })
    }
  },

  head() {
    const title = 'Contacto | CubaPod'
    return {
      title,
      meta: [
        { name: 'og:title', content: title },
        { name: 'twitter:title', content: title }
      ]
    }
  },

  validations: {
    form: {
      name: { required },
      email: { required, email },
      message: { required }
    }
  }
}
</script>

<style scoped></style>
