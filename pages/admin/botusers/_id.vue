<template>
  <div v-if="botUser">
    <div class="columns">
      <div class="column">
        <AnalyticsMetricCard
          title="Descargas"
          :value="botUser.downloadsCount"
          icon="download"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Suscripciones"
          :value="botUser.subscriptionsCount"
          icon="bell"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Favoritos"
          :value="botUser.favsCount"
          icon="heart"
          color="info"
        />
      </div>
    </div>
    <div class="card margin-bottom-10">
      <div
        v-if="botUser.hasBlockedBot"
        class="card-header has-background-danger"
      >
        <div class="card-header-icon">
          <b-icon type="is-white" icon="alert"></b-icon>
        </div>
        <div class="card-header-title has-text-white">
          El usuario ha bloqueado el bot
        </div>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <label for="" class="label">
              Chat id
            </label>
            <p>
              <code>{{ botUser.chatId }}</code>
            </p>

            <label for="" class="label margin-top-10">
              Username
            </label>
            <p>
              <span v-if="botUser.username">
                <a :href="`https://t.me/${botUser.username}`">
                  @{{ botUser.username }}
                </a>
              </span>
              <span v-else>-</span>
            </p>

            <label for="" class="label margin-top-10">
              Nombre
            </label>
            <p>{{ botUser.firstName || '-' }}</p>

            <label for="" class="label margin-top-10">
              Apellidos
            </label>
            <p>{{ botUser.lastName || '-' }}</p>
          </div>
          <div class="column">
            <label for="" class="label">
              Fecha de registro
            </label>
            <p>
              {{ $moment(botUser.createdAt).format('MM/DD/YYYY - h:mm:ss a') }}
            </p>

            <label for="" class="label margin-top-10">
              Última acción
            </label>
            <p>
              <span v-if="botUser.lastActionDatetime">
                {{
                  $moment(botUser.lastActionDatetime).format(
                    'MM/DD/YYYY - h:mm:ss a'
                  )
                }}
              </span>
              <span v-else>
                -
              </span>
            </p>

            <label for="" class="label margin-top-10">
              Actualizado
            </label>
            <p>
              {{ $moment(botUser.updatedAt).format('MM/DD/YYYY - h:mm:ss a') }}
            </p>
          </div>
          <div class="column">
            <label for="" class="label">
              Acceso
            </label>
            <b-field>
              <b-switch v-model="botUser.isTeam" @input="updateBotUser()">
                Team
              </b-switch>
            </b-field>
            <b-field>
              <b-switch v-model="botUser.isAdmin" @input="updateBotUser()">
                Admin
              </b-switch>
            </b-field>
            <b-field>
              <b-switch
                v-model="botUser.premiumGranted"
                @input="updateBotUser()"
              >
                Premium de regalo
              </b-switch>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-icon">
          <b-icon icon="credit-card"></b-icon>
        </div>
        <div class="card-header-title">
          Facturación
        </div>
      </div>
      <div class="card-content">
        <div v-if="botUser.planActiveUntil">
          <label for="" class="label">
            Fecha de expiración
          </label>
          <p>
            {{
              $moment(botUser.planActiveUntil).format('MM/DD/YYYY - h:mm:ss a')
            }}
          </p>
        </div>
        <div v-else>
          No ha adquirido el plan Premium.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AnalyticsMetricCard from '~/components/AnalyticsMetricCard'
export default {
  layout: 'admin',
  auth: true,
  components: { AnalyticsMetricCard },

  data() {
    return {
      botUser: null
    }
  },

  async mounted() {
    await this.loadUser()
  },

  methods: {
    async loadUser() {
      const { data } = await this.$apollo.query({
        query: gql`
          query botUser($id: String!) {
            botUser(id: $id) {
              id
              chatId
              username
              firstName
              lastName
              isAdmin
              isTeam
              isPremium
              premiumGranted
              hasBlockedBot
              planActiveUntil
              lastActionDatetime
              createdAt
              updatedAt
              downloadsCount
              subscriptionsCount
              favsCount
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        }
      })
      this.botUser = data.botUser
    },

    async updateBotUser() {
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation updateBotUser(
            $id: Int!
            $isAdmin: Boolean!
            $isTeam: Boolean!
            $premiumGranted: Boolean!
          ) {
            updateBotUser(
              id: $id
              isAdmin: $isAdmin
              isTeam: $isTeam
              premiumGranted: $premiumGranted
            ) {
              status
            }
          }
        `,
        variables: {
          id: this.botUser.id,
          isAdmin: this.botUser.isAdmin,
          isTeam: this.botUser.isTeam,
          premiumGranted: this.botUser.premiumGranted
        }
      })
      if (data.updateBotUser.status === 'ok') {
        this.$buefy.toast.open('Usuario actualizado')
      }
    }
  }
}
</script>
