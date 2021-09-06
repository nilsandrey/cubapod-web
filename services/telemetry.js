import gql from 'graphql-tag'

/**
 * Report user action to telemetry.
 * @param ctx The caller context
 * @param action The action performed by the user
 * @param url The url of the page where the user is
 */
const reportAction = function(ctx, action, url) {
  ctx.$apollo.mutate({
    mutation: gql`
      mutation viewerUserReportAction($action: String!, $url: String) {
        viewerUserReportAction(action: $action, url: $url) {
          status
        }
      }
    `,
    variables: {
      action,
      url
    }
  })
}

export default {
  reportAction
}
