<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-narrow">
        <div class="card">
          <div class="card-content">
            <h2 class="subtitle has-text-centered">
              Acceder a CubaPod
            </h2>
            <form @submit.stop.prevent="login()">
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

              <error v-if="form.error">
                Usuario o contraseña incorrectos.
              </error>

              <p class="has-text-centered margin-top-10 margin-bottom-10">
                <nuxt-link to="/podcaster/password-reset">
                  ¿Olvidaste tu contraseña?
                </nuxt-link>
              </p>

              <b-button
                type="is-primary"
                size="is-medium"
                native-type="submit"
                :loading="form.loading"
                :disabled="$v.form.$invalid"
                expanded
              >
                Entrar
              </b-button>
            </form>
            <p class="has-text-centered margin-top-10">
              <nuxt-link to="/podcaster/register" class="margin-top-10">
                ¿No tienes una cuenta aún? Regístrate
                <b-icon icon="arrow-right" size="is-small"></b-icon>
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required, email } from 'vuelidate/lib/validators'

export default {
  layout: 'hero',

  data() {
    return {
      success: false,
      form: {
        email: null,
        password: null,
        loading: false,
        error: false
      }
    }
  },

  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },

  methods: {
    login() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.form.loading = true
        this.$apollo
          .mutate({
            mutation: gql`
              mutation tokenAuth($email: String!, $password: String!) {
                tokenAuth(email: $email, password: $password) {
                  token
                }
              }
            `,
            variables: {
              email: this.form.email.toLowerCase(),
              password: this.form.password
            }
          })
          .then(({ data }) => {
            const token = data.tokenAuth.token
            this.$auth.setStrategy('local').then(() => {
              this.form.loading = false
              this.$auth.setToken('local', `JWT ${token}`)
              window.location = '/podcaster'
            })
          })
          .catch((error) => {
            if (
              error.message === 'GraphQL error: Please enter valid credentials'
            ) {
              this.form.error = true
            }
            this.form.loading = false
          })
      }
    }
  }
}
</script>

<style scoped></style>
