<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5 is-10-mobile">
        <div class="card">
          <div v-if="success" class="card-content">
            <div class="media">
              <div class="media-left">
                <b-icon icon="email" size="is-large" class="has-text-success" />
              </div>
              <div class="media-content">
                <p class="margin-bottom-10">
                  Te hemos enviado un mensaje de confirmación. Revisa tu buzón
                  de correo electrónico.
                </p>
                <info>
                  Si no lo encuentras dentro de unos minutos, revisa en la
                  carpeta de spam.
                </info>
              </div>
            </div>
          </div>
          <div v-if="!success" class="card-content">
            <h1 class="title has-text-centered margin-bottom-10">
              ¡Hola, podcáster cubano!
            </h1>
            <h2 class="subtitle has-text-centered">
              Regístrate en CubaPod para tomar control de tu pódcast.
            </h2>
            <form @submit.stop.prevent="register()">
              <!-- first name -->
              <label for="" class="label">Nombre</label>
              <b-field>
                <b-input
                  v-model="$v.form.firstName.$model"
                  :disabled="form.loading"
                  @blur="$v.form.firstName.$touch()"
                ></b-input>
              </b-field>
              <error
                v-if="$v.form.firstName.$invalid && $v.form.firstName.$anyError"
              >
                Especifica tu nombre.
              </error>
              <!-- end first name -->

              <!-- last name -->
              <label for="" class="label">Apellidos</label>
              <b-field>
                <b-input
                  v-model="$v.form.lastName.$model"
                  :disabled="form.loading"
                  @blur="$v.form.lastName.$touch()"
                ></b-input>
              </b-field>
              <error
                v-if="$v.form.lastName.$invalid && $v.form.lastName.$anyError"
              >
                Especifica tus apellidos.
              </error>
              <!-- end last name -->

              <!-- email -->
              <label for="" class="label">Correo electrónico</label>
              <b-field>
                <b-input
                  v-model="$v.form.email.$model"
                  :disabled="form.loading"
                  native-type="email"
                  icon="email"
                  @blur="$v.form.email.$touch()"
                ></b-input>
              </b-field>
              <error v-if="$v.form.email.$invalid && $v.form.email.$anyError">
                Especifica tu correo y verifica que sea correcto.
              </error>
              <info class="margin-bottom-10">
                Regístrate usando el correo que está en el feed RSS de tu
                pódcast, de esta manera te asignaremos el pódcast
                automáticamente. Para confirmar, enviaremos un mensaje a esta
                dirección.
              </info>
              <!-- end email -->

              <!-- password -->
              <label for="" class="label">Contraseña</label>
              <b-field>
                <b-input
                  v-model="$v.form.password.$model"
                  :disabled="form.loading"
                  icon="lock"
                  type="password"
                  password-reveal
                  @blur="$v.form.password.$touch()"
                ></b-input>
              </b-field>
              <error
                v-if="$v.form.password.$invalid && $v.form.password.$anyError"
              >
                Especifica tu contraseña.
              </error>
              <!-- end password -->

              <b-button
                type="is-primary"
                size="is-medium"
                native-type="submit"
                :loading="form.loading"
                :disabled="$v.form.$invalid"
                expanded
              >
                Registrarme
              </b-button>
            </form>
            <p class="has-text-centered margin-top-10">
              <nuxt-link to="/podcaster/login" class="margin-top-10">
                ¿Ya tienes una cuenta? Entrar
                <b-icon icon="arrow-right" size="is-small"></b-icon>
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <recaptcha @error="onError" @expired="onExpired" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required, email } from 'vuelidate/lib/validators'

export default {
  auth: false,
  layout: 'hero',

  data() {
    return {
      success: false,
      form: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        loading: false
      }
    }
  },

  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    // eslint-disable-next-line handle-callback-err
    onError(error) {
      this.$buefy.toast.open('No fue posible crear la cuenta')
    },

    onExpired() {
      this.$buefy.toast.open('No fue posible crear la cuenta')
    },

    async register() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        const token = await this.$recaptcha.getResponse()
        this.form.loading = true
        this.$apollo
          .mutate({
            mutation: gql`
              mutation register(
                $firstName: String!
                $lastName: String!
                $email: String!
                $password: String!
                $token: String!
              ) {
                register(
                  firstName: $firstName
                  lastName: $lastName
                  email: $email
                  password: $password
                  token: $token
                ) {
                  status
                }
              }
            `,
            variables: {
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              email: this.form.email.toLowerCase(),
              password: this.form.password,
              token
            }
          })
          .then(({ data }) => {
            switch (data.register.status) {
              case 'ok': {
                this.form.loading = false
                this.success = true
                break
              }
              case 'already-registered': {
                this.form.loading = false
                this.$buefy.dialog.alert({
                  message: 'Ya existe una cuenta asociada a ese correo'
                })
                break
              }
              case 'error': {
                this.form.loading = false
                this.$buefy.dialog.alert({
                  message: 'No fue posible crear la cuenta'
                })
                break
              }
            }
          })
        await this.$recaptcha.reset()
      }
    }
  }
}
</script>

<style scoped></style>
