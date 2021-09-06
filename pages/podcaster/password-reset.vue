<template>
  <div class="container">
    <!-- step 1 -->
    <div v-show="formStep1.visible" class="columns is-centered">
      <div class="column is-narrow">
        <div class="card">
          <div class="card-content">
            <p class="subtitle has-text-centered">
              Recupera tu cuenta
            </p>
            <form @submit.stop.prevent="step1()">
              <label for="" class="label">
                Correo electrónico
              </label>
              <b-field>
                <b-input
                  v-model="$v.formStep1.email.$model"
                  native-type="email"
                  icon="email"
                  :blur="$v.formStep1.email.$touch()"
                ></b-input>
              </b-field>
              <info class="margin-bottom-10">
                Enviaremos un enlace a tu correo para reestablecer la
                contraseña.
              </info>
              <b-field>
                <b-button
                  type="is-primary"
                  native-type="submit"
                  size="is-medium"
                  expanded
                  :disabled="$v.formStep1.$invalid"
                >
                  Continuar
                </b-button>
              </b-field>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- end step 1 -->

    <!-- step 2 -->
    <div v-show="formStep2.visible" class="columns is-centered">
      <div class="column is-narrow">
        <div class="card">
          <div class="card-content">
            <p class="subtitle has-text-centered">
              Reestablecer contraseña
            </p>
            <form @submit.stop.prevent="step2()">
              <label for="" class="label">
                Nueva contraseña
              </label>
              <b-field>
                <b-input
                  v-model="$v.formStep2.password.$model"
                  type="password"
                  icon="lock"
                  placeholder="Tu nueva contraseña"
                  password-reveal
                >
                </b-input>
              </b-field>
              <b-field>
                <b-button
                  type="is-primary"
                  native-type="submit"
                  size="is-medium"
                  expanded
                  :disabled="$v.formStep2.$invalid"
                >
                  Continuar
                </b-button>
              </b-field>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- end step 2 -->
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
      hash: this.$route.query.hash,
      formStep1: {
        visible: false,
        email: null
      },
      formStep2: {
        visible: false,
        password: null
      },
      isLoading: false
    }
  },

  validations: {
    formStep1: {
      email: { required, email }
    },
    formStep2: {
      password: { required }
    }
  },

  mounted() {
    if (this.hash) {
      this.formStep1.visible = false
      this.formStep2.visible = true
    } else {
      this.formStep1.visible = true
      this.formStep2.visible = false
    }
  },

  methods: {
    async step1() {
      this.$v.formStep1.$touch()
      if (!this.$v.formStep1.$invalid) {
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation passwordResetRequest($email: String!) {
              passwordResetRequest(email: $email) {
                status
              }
            }
          `,
          variables: {
            email: this.formStep1.email
          }
        })
        switch (data.passwordResetRequest.status) {
          case 'pending': {
            this.$buefy.dialog.alert({
              message:
                'Te enviamos un mensaje. Revisa tu bandeja de entrada y sigue las instrucciones.'
            })
            break
          }
          case 'not-existing-account': {
            this.$buefy.dialog.alert({
              message: 'No encontramos una cuenta asociada a ese correo.'
            })
            break
          }
        }
      }
    },

    step2() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation passwordReset($hash: String!, $password: String!) {
              passwordReset(hash: $hash, password: $password) {
                status
              }
            }
          `,
          variables: { hash: this.hash, password: this.formStep2.password }
        })
        .then(({ data }) => {
          const { status } = data.passwordReset
          switch (status) {
            case 'changed': {
              this.$buefy.dialog.alert({
                message: 'Se cambió tu contraseña'
              })
              this.$router.replace('/podcaster/login')
              break
            }
            case 'expired': {
              this.$buefy.dialog.alert({
                message: 'Tu solicitud para cambiar la contraseña expiró',
                type: 'is-black'
              })
              this.$router.replace('/podcaster/login')
              break
            }
            default: {
              this.$buefy.dialog.alert({
                message: 'No puedes cambiar esta contraseña',
                type: 'is-black'
              })
              this.$router.replace('/podcaster/login')
              break
            }
          }
        })
    }
  }
}
</script>
