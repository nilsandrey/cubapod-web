<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h2 class="subtitle">Información de perfil</h2>
              <form @submit.prevent="updateProfile()">
                <!-- first name -->
                <label for="" class="label">Nombre</label>
                <b-field>
                  <b-input
                    v-model="$v.profileForm.firstName.$model"
                    :disabled="profileForm.loading"
                  ></b-input>
                </b-field>
                <error
                  v-if="
                    $v.profileForm.firstName.$invalid &&
                      $v.profileForm.firstName.$anyError
                  "
                >
                  Especifica tu nombre
                </error>
                <!-- end first name -->

                <!-- last name -->
                <label for="" class="label">Apellidos</label>
                <b-field>
                  <b-input
                    v-model="$v.profileForm.lastName.$model"
                    :disabled="profileForm.loading"
                  ></b-input>
                </b-field>
                <error
                  v-if="
                    $v.profileForm.lastName.$invalid &&
                      $v.profileForm.lastName.$anyError
                  "
                >
                  Especifica tus apellidos
                </error>
                <!-- end last name -->

                <!-- email -->
                <label for="" class="label">Correo electrónico</label>
                <b-field>
                  <b-input
                    v-model="$v.profileForm.email.$model"
                    :disabled="profileForm.loading"
                  ></b-input>
                </b-field>
                <error
                  v-if="
                    $v.profileForm.email.$invalid &&
                      $v.profileForm.email.$anyError
                  "
                >
                  Especifica tu correo
                </error>
                <!-- end email -->

                <b-button
                  type="is-primary"
                  native-type="submit"
                  icon-left="content-save"
                  expanded
                  :loading="profileForm.loading"
                  :disabled="$v.profileForm.$invalid"
                >
                  Guardar cambios
                </b-button>
              </form>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <h2 class="subtitle">Contraseña</h2>
              <form @submit.prevent="updatePassword()">
                <!-- current password -->
                <label for="" class="label">Contraseña actual</label>
                <b-field>
                  <b-input
                    v-model="$v.passwordForm.currentPassword.$model"
                    type="password"
                    password-reveal
                    :disabled="passwordForm.loading"
                  ></b-input>
                </b-field>
                <error
                  v-if="
                    $v.passwordForm.currentPassword.$invalid &&
                      $v.passwordForm.currentPassword.$anyError
                  "
                >
                  Especifica la contraseña actual
                </error>
                <!-- end current password -->

                <!-- new password -->
                <label for="" class="label">Contraseña nueva</label>
                <b-field>
                  <b-input
                    v-model="$v.passwordForm.newPassword.$model"
                    type="password"
                    password-reveal
                    :disabled="passwordForm.loading"
                  ></b-input>
                </b-field>
                <error
                  v-if="
                    $v.passwordForm.newPassword.$invalid &&
                      $v.passwordForm.newPassword.$anyError
                  "
                >
                  Especifica la nueva contraseña
                </error>
                <!-- end new password -->

                <!-- new password -->
                <label for="" class="label">Confirmar contraseña</label>
                <b-field>
                  <b-input
                    v-model="$v.passwordForm.confirmPassword.$model"
                    type="password"
                    password-reveal
                    :disabled="passwordForm.loading"
                  ></b-input>
                </b-field>
                <error
                  v-if="
                    $v.passwordForm.confirmPassword.$invalid &&
                      $v.passwordForm.confirmPassword.$anyError
                  "
                >
                  Las contraseñas deben coincidir
                </error>
                <!-- end new password -->

                <b-button
                  type="is-primary"
                  native-type="submit"
                  icon-left="lock"
                  expanded
                  :loading="passwordForm.loading"
                  :disabled="$v.passwordForm.$invalid"
                >
                  Cambiar contraseña
                </b-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { required, email, not, sameAs } from 'vuelidate/lib/validators'
import telemetry from '~/services/telemetry'

export default {
  auth: true,
  layout: 'podcaster',

  data() {
    return {
      user: null,
      profileForm: {
        firstName: null,
        lastName: null,
        email: null,
        loading: false
      },
      passwordForm: {
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
        loading: false
      },
      passwordLoading: false
    }
  },

  validations: {
    profileForm: {
      firstName: { required },
      lastName: { required },
      email: { required, email }
    },
    passwordForm: {
      currentPassword: { required },
      newPassword: { required, different: not(sameAs('currentPassword')) },
      confirmPassword: { required, sameAs: sameAs('newPassword') }
    }
  },

  async mounted() {
    // Telemetry
    telemetry.reportAction(this, 'podcaster_profile', this.$route.path)

    // Load viewer user
    const { data } = await this.$apollo.query({
      query: gql`
        query viewerUser {
          viewerUser {
            firstName
            lastName
            email
          }
        }
      `,
      fetchPolicy: 'network-only'
    })
    this.profileForm.firstName = data.viewerUser.firstName
    this.profileForm.lastName = data.viewerUser.lastName
    this.profileForm.email = data.viewerUser.email
  },

  methods: {
    async updateProfile() {
      if (!this.$v.profileForm.$invalid) {
        this.profileForm.loading = true
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation updateViewerUser(
              $firstName: String!
              $lastName: String!
              $email: String!
            ) {
              updateViewerUser(
                firstName: $firstName
                lastName: $lastName
                email: $email
              ) {
                status
              }
            }
          `,
          variables: {
            firstName: this.profileForm.firstName,
            lastName: this.profileForm.lastName,
            email: this.profileForm.email
          }
        })
        switch (data.updateViewerUser.status) {
          case 'confirm': {
            this.$buefy.dialog.alert({
              message:
                'Revisa tu bandeja de entrada y confirma el nuevo correo.'
            })
            break
          }
          case 'existing': {
            this.$buefy.dialog.alert({
              message:
                'No es posible establecer esa dirección de correo electrónico.'
            })
            break
          }
        }
        this.profileForm.loading = false
      }
    },

    async updatePassword() {
      if (!this.$v.passwordForm.$invalid) {
        this.passwordForm.loading = true
        const { data } = await this.$apollo.mutate({
          mutation: gql`
            mutation updateViewerUserPassword(
              $currentPassword: String!
              $newPassword: String!
            ) {
              updateViewerUserPassword(
                currentPassword: $currentPassword
                newPassword: $newPassword
              ) {
                status
              }
            }
          `,
          variables: {
            currentPassword: this.passwordForm.currentPassword,
            newPassword: this.passwordForm.newPassword
          }
        })
        switch (data.updateViewerUserPassword.status) {
          case 'ok': {
            this.passwordForm.currentPassword = null
            this.passwordForm.newPassword = null
            this.passwordForm.confirmPassword = null
            this.$buefy.toast.open('Se cambió la contraseña')
            break
          }
          case 'no-match': {
            this.$buefy.dialog.alert({
              message: 'La contraseña actual no es correcta.'
            })
            break
          }
        }
        this.passwordForm.loading = false
      }
    }
  }
}
</script>

<style scoped></style>
