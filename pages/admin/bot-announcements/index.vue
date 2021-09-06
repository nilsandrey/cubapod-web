<template>
  <div v-if="botAnnouncements">
    <modal :active="modalActive" @close="modalActive = false">
      <h3 class="has-text-centered">
        Nuevo anuncio
      </h3>
      <label for="" class="label">Título</label>
      <b-field>
        <b-input v-model="$v.form.title.$model"></b-input>
      </b-field>

      <label for="" class="label">Texto</label>
      <b-field>
        <b-input v-model="$v.form.text.$model" type="textarea"></b-input>
      </b-field>

      <boolean-nullable-radio
        v-model="form.isPremiumActive"
        label="Premium activo"
        class="margin-bottom-10"
      />
      <boolean-nullable-radio
        v-model="form.premiumGranted"
        label="Premium de regalo"
        class="margin-bottom-10"
      />
      <boolean-nullable-radio
        v-model="form.isAdmin"
        label="Admin"
        class="margin-bottom-10"
      />
      <boolean-nullable-radio
        v-model="form.isTeam"
        label="Team"
        class="margin-bottom-10"
      />
      <div class="has-text-right">
        <b-button
          type="is-primary"
          icon-left="send"
          :disabled="$v.$invalid"
          :loading="creating"
          @click="send()"
        >
          Enviar anuncio
        </b-button>
      </div>
    </modal>

    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-button type="is-primary" icon-left="plus" @click="showModal()">
              Enviar anuncio
            </b-button>
          </div>
        </div>
        <b-table
          :data="botAnnouncements.objects"
          narrowed
          class="margin-bottom-10"
        >
          <template slot-scope="props">
            <b-table-column field="title" label="Título">
              {{ props.row.title }}
            </b-table-column>
            <b-table-column field="state" label="Estado">
              <BotAnnouncementState :value="props.row.state" />
            </b-table-column>
            <b-table-column field="usersCount" label="Alcanzados">
              {{ props.row.usersCount - props.row.failedCount }}
            </b-table-column>
            <b-table-column field="usersCount" label="Fallidos">
              {{ props.row.failedCount }}
            </b-table-column>
            <b-table-column field="createdAt" label="Creado">
              {{
                $moment(props.row.createdAt).format('MM/DD/YYYY - h:mm:ss a')
              }}
            </b-table-column>
            <b-table-column>
              <b-button
                size="is-small"
                icon-left="eye"
                @click="
                  $router.replace(`/admin/bot-announcements/${props.row.id}`)
                "
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
        <paginator
          :pagination="botAnnouncements"
          @prev="prev()"
          @next="next()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { required } from 'vuelidate/lib/validators'
import BotAnnouncementState from '~/components/BotAnnouncementState'
export default {
  components: { BotAnnouncementState },
  layout: 'admin',
  auth: true,

  data() {
    return {
      page: 1,
      botAnnouncements: null,
      modalActive: false,
      creating: false,
      form: {
        title: null,
        text: null,
        isAdmin: null,
        isPremiumActive: null,
        isTeam: null,
        premiumGranted: null
      }
    }
  },

  async mounted() {
    await this.loadAnnouncements()
  },

  methods: {
    async loadAnnouncements() {
      const { data } = await this.$apollo.query({
        query: gql`
          query botAnnouncements($page: Int!) {
            botAnnouncements(page: $page) {
              page
              pages
              hasNext
              hasPrev
              objects {
                id
                title
                state
                usersCount
                failedCount
                createdAt
              }
            }
          }
        `,
        variables: {
          page: this.page
        }
      })
      this.botAnnouncements = data.botAnnouncements
    },

    prev() {
      this.page -= 1
      this.loadAnnouncements()
    },

    next() {
      this.page += 1
      this.loadAnnouncements()
    },

    showModal() {
      this.form.title = null
      this.form.text = null
      this.form.isAdmin = null
      this.form.isPremiumActive = null
      this.form.isTeam = null
      this.form.premiumGranted = null
      this.modalActive = true
    },

    async send() {
      this.creating = true
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation createBotAnnouncement(
            $title: String!
            $text: String!
            $isAdmin: Boolean
            $isPremiumActive: Boolean
            $isTeam: Boolean
            $premiumGranted: Boolean
          ) {
            createBotAnnouncement(
              title: $title
              text: $text
              isAdmin: $isAdmin
              isPremiumActive: $isPremiumActive
              isTeam: $isTeam
              premiumGranted: $premiumGranted
            ) {
              status
              botAnnouncement {
                id
                title
                state
                usersCount
                failedCount
                createdAt
              }
            }
          }
        `,
        variables: this.form
      })
      if (data.createBotAnnouncement.status === 'ok') {
        this.botAnnouncements.objects.unshift(
          data.createBotAnnouncement.botAnnouncement
        )
        this.modalActive = false
      }
      this.creating = false
    }
  },

  validations: {
    form: {
      title: {
        required
      },
      text: {
        required
      }
    }
  }
}
</script>
