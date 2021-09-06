<template>
  <div v-if="botAnnouncement">
    <div class="columns">
      <div class="column">
        <AnalyticsMetricCard
          title="Alcanzados"
          :value="botAnnouncement.usersCount - botAnnouncement.failedCount"
          icon="account"
          color="info"
        />
      </div>
      <div class="column">
        <AnalyticsMetricCard
          title="Fallados"
          :value="botAnnouncement.failedCount"
          icon="account"
          color="info"
        />
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-header-title">
          {{ botAnnouncement.title }}
        </div>
        <a href="#" class="card-header-icon" aria-label="more options">
          <BotAnnouncementState :value="botAnnouncement.state" />
        </a>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <p v-html="botAnnouncement.text"></p>
          </div>
          <div class="column is-narrow">
            <p>
              <boolean-widget
                :value="botAnnouncement.isPremiumActive"
                label="Premium activo"
                icon="checkbox-blank-circle"
              />
              Premium activo
            </p>

            <p>
              <boolean-widget
                :value="botAnnouncement.isPremiumActive"
                label="Premium de regalo"
                icon="checkbox-blank-circle"
              />
              Premium de regalo
            </p>

            <p>
              <boolean-widget
                :value="botAnnouncement.isTeam"
                label="Team"
                icon="checkbox-blank-circle"
              />
              Team
            </p>

            <p>
              <boolean-widget
                :value="botAnnouncement.isAdmin"
                label="Admin"
                icon="checkbox-blank-circle"
              />
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import AnalyticsMetricCard from '~/components/AnalyticsMetricCard'
import BotAnnouncementState from '~/components/BotAnnouncementState'
export default {
  layout: 'admin',
  auth: true,
  components: { AnalyticsMetricCard, BotAnnouncementState },

  data() {
    return {
      botAnnouncement: null
    }
  },

  async mounted() {
    const { data } = await this.$apollo.query({
      query: gql`
        query botAnnouncement($id: Int!) {
          botAnnouncement(id: $id) {
            title
            text
            state
            isAdmin
            isPremiumActive
            isTeam
            premiumGranted
            createdAt
            updatedAt
            usersCount
            failedCount
          }
        }
      `,
      variables: {
        id: this.$route.params.id
      }
    })
    this.botAnnouncement = data.botAnnouncement
  }
}
</script>
