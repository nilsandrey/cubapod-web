<template>
  <div>
    <modal :active="messageModal.active" @close="messageModal.active = false">
      <h3 class="has-text-centered">Enviar mensaje</h3>
      <label for="" class="label">Mensaje</label>
      <b-field>
        <b-input v-model="messageModal.text" type="textarea"></b-input>
      </b-field>
      <b-button
        type="is-primary"
        icon-left="send"
        expanded
        :loading="messageModal.sending"
        @click="sendMessage()"
      >
        Enviar
      </b-button>
    </modal>
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
                          @click="loadBotUsers()"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>

                    <b-field>
                      <b-input v-model="filters.criteria"></b-input>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.isPremium" size="is-small">
                        Premium
                      </b-switch>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.isTeam" size="is-small">
                        Team
                      </b-switch>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.isAdmin" size="is-small">
                        Admin
                      </b-switch>
                    </b-field>
                    <b-field>
                      <b-switch v-model="filters.hasBlockedBot" size="is-small">
                        Bloqueó el bot
                      </b-switch>
                    </b-field>
                  </section>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <b-table :data="botUsers.objects" narrowed class="margin-bottom-10">
          <template slot-scope="props">
            <b-table-column field="chatId" label="Chat id">
              <code>{{ props.row.chatId }}</code>
            </b-table-column>
            <b-table-column field="username" label="Username">
              <span v-if="props.row.username">
                <a :href="`https://t.me/${props.row.username}`">
                  @{{ props.row.username }}
                </a>
              </span>
              <span v-else>-</span>
            </b-table-column>
            <b-table-column field="firstName" label="Nombre">
              {{ props.row.firstName || '-' }}
            </b-table-column>
            <b-table-column field="lastName" label="Apellidos">
              {{ props.row.lastName || '-' }}
            </b-table-column>
            <b-table-column field="lastActionDatetime" label="Última acción">
              <span v-if="props.row.lastActionDatetime">
                {{
                  $moment(props.row.lastActionDatetime).format(
                    'MM/DD/YYYY - h:mm:ss a'
                  )
                }}
              </span>
              <span v-else>-</span>
            </b-table-column>
            <b-table-column field="isPremium" label="Premium">
              <boolean-widget
                :value="props.row.isPremiumActive"
                icon="checkbox-blank-circle"
              />
            </b-table-column>
            <b-table-column>
              <b-button
                size="is-small"
                icon-left="eye"
                @click="$router.replace(`/admin/botusers/${props.row.id}`)"
              ></b-button>
              <b-button
                size="is-small"
                icon-left="send"
                @click="showMessageModal(props.row.id)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
        <paginator
          :pagination="botUsers"
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
      page: 1,
      botUsers: {
        page: 1,
        pages: null,
        hasNext: null,
        hasPrev: null,
        objects: []
      },
      filters: {
        criteria: '',
        isPremium: null,
        isTeam: null,
        isAdmin: null,
        hasBlockedBot: null
      },
      messageModal: {
        active: false,
        text: null,
        id: null,
        sending: false
      },
      loading: false
    }
  },

  async mounted() {
    await this.loadBotUsers()
  },

  methods: {
    async loadBotUsers() {
      this.loading = true
      const { data } = await this.$apollo.query({
        query: gql`
          query botUsers($page: Int!, $filters: BotUserFiltersInputType!) {
            botUsers(page: $page, filters: $filters) {
              page
              pages
              hasNext
              hasPrev
              objects {
                id
                chatId
                username
                firstName
                lastName
                isPremiumActive
                createdAt
                updatedAt
                lastActionDatetime
              }
            }
          }
        `,
        variables: {
          page: this.page,
          filters: this.filters
        }
      })
      this.botUsers = data.botUsers
      this.page = data.botUsers.page
      this.loading = false
    },

    prev() {
      this.page -= 1
      this.loadBotUsers()
    },

    next() {
      this.page += 1
      this.loadBotUsers()
    },

    showMessageModal(id) {
      this.messageModal.id = id
      this.messageModal.text = null
      this.messageModal.active = true
    },

    async sendMessage() {
      this.messageModal.sending = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation sendBotMessage($botUserId: String!, $text: String!) {
            sendBotMessage(botUserId: $botUserId, text: $text) {
              status
            }
          }
        `,
        variables: {
          botUserId: this.messageModal.id,
          text: this.messageModal.text
        }
      })
      if (data.sendBotMessage.status === 'ok') {
        this.messageModal.active = false
        this.$buefy.toast.open('Se envió el mensaje.')
      } else {
        this.$buefy.toast.open('No fue posible enviar el mensaje.')
      }
      this.messageModal.sending = false
    }
  }
}
</script>
