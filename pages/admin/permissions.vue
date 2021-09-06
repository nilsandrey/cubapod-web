<template>
  <div>
    <!-- add group modal -->
    <modal
      :active="groupForm.modalActive"
      @close="groupForm.modalActive = false"
    >
      <h3 class="has-text-centered">
        <span v-if="groupForm.mode === 'create'">
          Añadir grupo
        </span>
        <span v-else>
          Editar grupo
        </span>
      </h3>

      <!-- name -->
      <label for="" class="label">
        Nombre
      </label>
      <b-field>
        <b-input v-model="$v.groupForm.name.$model"></b-input>
      </b-field>
      <!-- end name -->

      <div class="columns">
        <!-- available permissions -->
        <div class="column">
          <label for="" class="label">
            Permisos disponibles
          </label>
          <b-field>
            <b-input v-model="groupForm.filter" placeholder="Filtrar"></b-input>
          </b-field>
          <b-field>
            <b-select
              v-model="groupForm.selectedAvailablePermissions"
              size="is-small"
              multiple
              expanded
              native-size="8"
            >
              <option
                v-for="permission in filteredPermissions"
                :key="permission.id"
                :value="permission"
              >
                {{ permission.contentType.appLabel }} |
                {{ permission.contentType.model }} |
                {{ permission.name }}
              </option>
            </b-select>
          </b-field>
          <b-button
            icon-left="arrow-right"
            expanded
            :disabled="groupForm.selectedAvailablePermissions.length === 0"
            @click="choosePermissions()"
          ></b-button>
        </div>
        <!-- end available permissions -->
        <!-- chosen permissions -->
        <div class="column">
          <label for="" class="label">
            Permisos seleccionados
          </label>
          <b-field>
            <b-select
              v-model="groupForm.selectedChosenPermissions"
              size="is-small"
              multiple
              expanded
              native-size="8"
            >
              <option
                v-for="permission in groupForm.chosenPermissions"
                :key="permission.id"
                :value="permission"
              >
                {{ permission.contentType.appLabel }} |
                {{ permission.contentType.model }} |
                {{ permission.name }}
              </option>
            </b-select>
          </b-field>
          <b-button
            icon-left="arrow-left"
            expanded
            :disabled="groupForm.selectedChosenPermissions.length === 0"
            @click="removePermissions()"
          ></b-button>
        </div>
        <!-- end chosen permissions -->
      </div>

      <b-button
        v-if="groupForm.mode === 'create'"
        type="is-primary"
        icon-left="plus"
        expanded
        :loading="groupForm.creating"
        :disabled="invalid"
        @click="createGroup()"
      >
        Añadir grupo
      </b-button>
      <b-button
        v-else
        type="is-primary"
        icon-left="save"
        expanded
        :loading="groupForm.creating"
        :disabled="invalid"
        @click="editGroup()"
      >
        Guardar cambios
      </b-button>
    </modal>
    <!-- end add group modal -->

    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-button
              type="is-primary"
              icon-left="plus"
              @click="showModal('create')"
            >
              Añadir grupo
            </b-button>
          </div>
        </div>
        <b-table :data="groups" narrowed>
          <template slot-scope="props">
            <b-table-column field="name" label="Grupo">
              {{ props.row.name }}
            </b-table-column>
            <b-table-column field="name" label="Opciones">
              <b-button
                size="is-small"
                icon-left="pencil"
                @click="
                  loadGroup(props.row.id)
                  showModal('update')
                "
              ></b-button>
              <b-button
                size="is-small"
                icon-left="delete"
                @click="removeGroup(props.row.id)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
    <!-- b-table :data="permissions" narrowed>
      <template slot-scope="props">
        <b-table-column field="content-type" label="Content type">
          {{ props.row.contentType.appLabel }} -
          {{ props.row.contentType.model }}
        </b-table-column>
        <b-table-column field="codename" label="Codename">
          {{ props.row.codename }}
        </b-table-column>
        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>
      </template>
    </b-table -->
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
      groupForm: {
        filter: '',
        mode: 'create',
        id: null,
        name: null,
        availablePermissions: [],
        chosenPermissions: [],
        selectedAvailablePermissions: [],
        selectedChosenPermissions: [],
        creating: false,
        modalActive: false
      },
      groups: []
    }
  },

  computed: {
    filteredPermissions() {
      return this.groupForm.availablePermissions.filter((i) =>
        i.name.toLowerCase().includes(this.groupForm.filter.toLowerCase())
      )
    },

    invalid() {
      return this.$v.$invalid || this.groupForm.chosenPermissions.length === 0
    }
  },

  async mounted() {
    await this.loadGroups()
    await this.loadPermissions()
  },

  methods: {
    async loadGroup(id) {
      const { data } = await this.$apollo.query({
        query: gql`
          query group($id: String!) {
            group(id: $id) {
              id
              name
              permissions {
                id
                name
                contentType {
                  appLabel
                  model
                }
              }
            }
          }
        `,
        variables: {
          id
        }
      })
      if (data.group) {
        const group = data.group
        this.groupForm.id = group.id
        this.groupForm.name = group.name
        this.groupForm.chosenPermissions = group.permissions
        this.groupForm.chosenPermissions.forEach((i) => {
          const index = this.groupForm.availablePermissions.findIndex(
            (j) => j.id === i.d
          )
          if (index !== -1) {
            this.groupForm.availablePermissions.splice(index, 1)
          }
        })
        this.loadPermissions()
      }
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

    async loadPermissions() {
      const { data } = await this.$apollo.query({
        query: gql`
          query permissions {
            permissions {
              id
              name
              contentType {
                appLabel
                model
              }
            }
          }
        `
      })
      this.groupForm.availablePermissions = data.permissions
    },

    showModal(mode) {
      this.cleanForm()
      this.loadPermissions()
      this.groupForm.mode = mode
      this.groupForm.modalActive = true
    },

    choosePermissions() {
      this.groupForm.selectedAvailablePermissions.forEach((i) => {
        const index = this.groupForm.availablePermissions.findIndex(
          (j) => j.id === i.id
        )
        if (index !== -1) {
          this.groupForm.availablePermissions.splice(index, 1)
        }
        this.groupForm.chosenPermissions.push(i)
      })
    },

    removePermissions() {
      this.groupForm.selectedChosenPermissions.forEach((i) => {
        const index = this.groupForm.chosenPermissions.findIndex(
          (j) => j.id === i.id
        )
        if (index !== -1) {
          this.groupForm.chosenPermissions.splice(index, 1)
        }
        this.groupForm.availablePermissions.push(i)
      })
    },

    async createGroup() {
      this.groupForm.creating = true
      const permissions = []
      this.groupForm.chosenPermissions.forEach((i) => {
        permissions.push(i.id)
      })
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation createGroup($name: String!, $permissions: [String]!) {
            createGroup(name: $name, permissions: $permissions) {
              status
              group {
                id
                name
              }
            }
          }
        `,
        variables: {
          name: this.groupForm.name,
          permissions
        }
      })
      if (data.createGroup.status === 'ok') {
        const group = data.createGroup.group
        this.groups.push(group)
        this.groupForm.creating = false
        this.groupForm.modalActive = false
        this.cleanForm()
      }
    },

    async editGroup() {
      this.groupForm.creating = true
      const permissions = []
      this.groupForm.chosenPermissions.forEach((i) => {
        permissions.push(i.id)
      })
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updateGroup(
            $id: String!
            $name: String!
            $permissions: [String]!
          ) {
            updateGroup(id: $id, name: $name, permissions: $permissions) {
              status
              group {
                id
                name
              }
            }
          }
        `,
        variables: {
          id: this.groupForm.id,
          name: this.groupForm.name,
          permissions
        }
      })
      if (data.updateGroup.status === 'ok') {
        const group = data.updateGroup.group
        const index = this.groups.findIndex((i) => i.id === group.id)
        if (index !== -1) {
          this.groups[index] = group
        }
        this.groupForm.creating = false
        this.groupForm.modalActive = false
        this.cleanForm()
      }
    },

    cleanForm() {
      this.groupForm.name = null
      this.groupForm.availablePermissions = []
      this.groupForm.chosenPermissions = []
      this.groupForm.selectedAvailablePermissions = []
      this.groupForm.selectedChosenPermissions = []
    },

    async removeGroup(id) {
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation removeGroup($id: String!) {
            removeGroup(id: $id) {
              status
            }
          }
        `,
        variables: {
          id
        }
      })
      if (data.removeGroup.status === 'ok') {
        const index = this.groups.findIndex((i) => i.id === id)
        if (index !== -1) {
          this.groups.splice(index, 1)
        }
      }
    }
  },

  validations: {
    groupForm: {
      name: {
        required
      }
    }
  }
}
</script>
