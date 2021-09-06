<template>
  <div v-if="user">
    <div class="card">
      <div class="card-content">
        <label for="" class="label">
          Nombre
        </label>
        <b-field>
          <b-input v-model="$v.user.firstName.$model"></b-input>
        </b-field>

        <label for="" class="label">
          Apellidos
        </label>
        <b-field>
          <b-input v-model="$v.user.lastName.$model"></b-input>
        </b-field>

        <label for="" class="label">
          Correo
        </label>
        <b-field>
          <b-input v-model="$v.user.email.$model"></b-input>
        </b-field>

        <div class="columns margin-top-10">
          <div class="column">
            <label for="" class="label">
              Grupos
            </label>
            <b-field>
              <b-select
                v-model="user.groups"
                size="is-small"
                multiple
                expanded
                native-size="8"
              >
                <option v-for="group in groups" :key="group.id" :value="group">
                  {{ group.name }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <label for="" class="label">
              Fecha de registro
            </label>
            <p>
              {{ $moment(user.dateJoined).format('MM/DD/YYYY - h:mm:ss a') }}
            </p>

            <label for="" class="label margin-top-10">
              Último login
            </label>
            <p>
              <span v-if="user.lastLogin">
                {{ $moment(user.lastLogin).format('MM/DD/YYYY - h:mm:ss a') }}
              </span>
              <span v-else>
                -
              </span>
            </p>

            <label for="" class="label margin-top-10">
              Actualizado
            </label>
            <p>
              {{ $moment(user.updatedAt).format('MM/DD/YYYY - h:mm:ss a') }}
            </p>
          </div>
          <div class="column">
            <label for="" class="label">
              Acceso
            </label>
            <b-field>
              <b-switch v-model="user.isActive">
                Activo
              </b-switch>
            </b-field>
            <b-field>
              <b-switch v-model="user.isStaff">
                Staff
              </b-switch>
            </b-field>
            <b-field>
              <b-switch v-model="user.isSuperuser">
                Superusuario
              </b-switch>
            </b-field>
          </div>
        </div>

        <div class="columns">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-button
              type="is-primary"
              icon-left="content-save"
              :loading="updating"
              :disabled="$v.$invalid"
              @click="updateUser()"
            >
              Guardar cambios
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required } from 'vuelidate/lib/validators'
export default {
  layout: 'admin',
  auth: true,

  data() {
    return {
      user: null,
      groups: [],
      updating: false
    }
  },

  async mounted() {
    await this.loadUser()
    await this.loadGroups()
  },

  methods: {
    async loadUser() {
      const { data } = await this.$apollo.query({
        query: gql`
          query user($id: String!) {
            user(id: $id) {
              id
              firstName
              lastName
              email
              dateJoined
              lastLogin
              isSuperuser
              isStaff
              isActive
              updatedAt
              groups {
                id
                name
              }
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        }
      })
      this.user = data.user
    },

    async loadGroups() {
      const { data } = await this.$apollo.query({
        query: gql`
          query groups {
            groups {
              id
              name
            }
          }
        `
      })
      this.groups = data.groups
    },

    async updateUser() {
      this.updating = true
      const groups = []
      this.user.groups.forEach((i) => {
        groups.push(i.id)
      })
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updateUser(
            $id: String!
            $firstName: String!
            $lastName: String!
            $email: String!
            $isSuperuser: Boolean!
            $isStaff: Boolean!
            $isActive: Boolean!
            $groups: [String]!
          ) {
            updateUser(
              id: $id
              firstName: $firstName
              lastName: $lastName
              email: $email
              isSuperuser: $isSuperuser
              isStaff: $isStaff
              isActive: $isActive
              groups: $groups
            ) {
              status
            }
          }
        `,
        variables: {
          id: this.user.id,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          isSuperuser: this.user.isSuperuser,
          isStaff: this.user.isStaff,
          isActive: this.user.isActive,
          groups
        }
      })
      if (data.updateUser.status === 'ok') {
        this.$buefy.toast.open('Usuario actualizado')
      }
      this.updating = false
    }
  },

  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required }
    }
  }
}
</script>
