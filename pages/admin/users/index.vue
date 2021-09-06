<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-dropdown
              position="is-bottom-left"
              append-to-body
              aria-role="menu"
              trap-focus
            >
              <p
                slot="trigger"
                class="button is-small margin-right-5"
                role="button"
              >
                <b-icon icon="filter" size="is-small"></b-icon>
                <span>Filtros</span>
              </p>
              <b-dropdown-item
                aria-role="menu-item"
                :focusable="false"
                custom
                paddingless
              >
                <div class="modal-card" style="width:300px;">
                  <section class="modal-card-body">
                    <div class="level">
                      <div class="level-left">
                        Filtros
                      </div>
                      <div class="level-right">
                        <button
                          class="button is-primary is-small"
                          @click="loadUsers()"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>

                    <b-field>
                      <b-input v-model="filters.criteria"></b-input>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.isActive" size="is-small">
                        Activo
                      </b-switch>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.isStaff" size="is-small">
                        Staff
                      </b-switch>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.isSuperuser" size="is-small">
                        Superusuario
                      </b-switch>
                    </b-field>
                  </section>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <b-table :data="users.objects" narrowed class="margin-bottom-10">
          <template slot-scope="props">
            <b-table-column field="firstName" label="Nombre">
              {{ props.row.firstName }}
            </b-table-column>
            <b-table-column field="lastName" label="Apellidos">
              {{ props.row.lastName }}
            </b-table-column>
            <b-table-column field="email" label="Correo">
              {{ props.row.email }}
            </b-table-column>
            <b-table-column field="podcastCount" label="Pódcasts">
              {{ props.row.podcastCount }}
            </b-table-column>
            <b-table-column field="lastLogin" label="Último login">
              <span v-if="props.row.lastLogin">
                {{
                  $moment(props.row.lastLogin).format('MM/DD/YYYY - h:mm:ss a')
                }}
              </span>
              <span v-else>-</span>
            </b-table-column>
            <b-table-column field="isActive" label="Activo">
              <boolean-widget
                :value="props.row.isActive"
                icon="checkbox-blank-circle"
              />
            </b-table-column>
            <b-table-column>
              <b-button
                size="is-small"
                icon-left="eye"
                @click="$router.replace(`/admin/users/${props.row.id}`)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
        <paginator
          :pagination="users"
          :loading="loading"
          @prev="prev()"
          @next="next()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  layout: 'admin',
  auth: true,

  data() {
    return {
      loading: false,
      page: 1,
      users: {
        pages: null,
        hasNext: false,
        hasPrev: false,
        objects: []
      },
      filters: {
        criteria: null,
        isActive: true,
        isStaff: false,
        isSuperuser: false
      }
    }
  },

  async mounted() {
    await this.loadUsers()
  },

  methods: {
    async loadUsers() {
      this.loading = true
      const { data } = await this.$apollo.query({
        query: gql`
          query users($page: Int!, $filters: UserFiltersInputType!) {
            users(page: $page, filters: $filters) {
              page
              pages
              hasNext
              hasPrev
              objects {
                id
                email
                firstName
                lastName
                podcastCount
                lastLogin
                isActive
              }
            }
          }
        `,
        variables: {
          page: this.page,
          filters: this.filters
        },
        fetchPolicy: 'network-only'
      })
      this.users = data.users
      this.page = data.users.page
      this.loading = false
    },

    async prev() {
      this.page -= 1
      await this.loadUsers()
    },

    async next() {
      this.page += 1
      await this.loadUsers()
    }
  }
}
</script>
