<template>
  <div>
    <!-- modal -->
    <modal :active="modalForm.active" @close="modalForm.active = false">
      <h3 class="has-text-centered">
        Acortar enlace
      </h3>
      <label for="" class="label">Destino</label>
      <b-field>
        <b-input
          v-model="modalForm.destiny"
          icon="link"
          @blur="loadMeta()"
        ></b-input>
      </b-field>

      <div v-if="modalForm.destiny">
        <label for="" class="label">Acortado</label>
        <b-field>
          <p class="control">
            <span class="button is-static">
              <b-icon
                icon="link"
                size="is-small"
                class="margin-right-10"
              ></b-icon>
              <span>https://link.cubapod.net/</span>
            </span>
          </p>
          <b-input
            v-model="modalForm.slug"
            placeholder="Automático"
            expanded
          ></b-input>
        </b-field>
      </div>

      <div v-if="meta" class="card margin-top-10">
        <div class="card-image">
          <figure class="image">
            <img
              :src="
                meta.meta.image ||
                  meta.meta['og:image'] ||
                  meta.meta['twitter:image']
              "
              alt=""
              width="100%"
            />
          </figure>
        </div>
        <div class="card-content">
          <p>
            <b>
              {{ meta.meta.title || meta.meta['og:title'] || meta.page.title }}
            </b>
          </p>
          <small>
            {{ meta.meta.description }}
          </small>
        </div>
      </div>

      <div class="has-text-right margin-top-10">
        <b-button type="is-primary" icon-left="link" @click="createLink()">
          Acortar enlace
        </b-button>
      </div>
    </modal>
    <!-- end modal -->
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-button
              type="is-primary"
              icon-left="plus"
              @click="modalForm.active = true"
            >
              Acortar enlace
            </b-button>
          </div>
        </div>
        <b-table :data="links.objects" narrowed class="margin-bottom-10">
          <template slot-scope="props">
            <b-table-column field="destiny" label="Destino">
              <a :href="props.row.destiny" target="_blank">
                {{ props.row.destiny }}
              </a>
            </b-table-column>
            <b-table-column field="title" label="Acortado">
              <a
                :href="`https://link.cubapod.net/${props.row.hash}`"
                target="_blank"
              >
                {{ props.row.hash }}
              </a>
            </b-table-column>
            <b-table-column field="createdAt" label="Peticiones">
              {{ props.row.requestsCount }}
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
                @click="$router.replace(`/admin/links/${props.row.id}`)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
        <paginator :pagination="links" @prev="prev()" @next="next()" />
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
      links: {
        page: null,
        pages: null,
        hasNext: null,
        hasPrev: null,
        objects: []
      },
      modalForm: {
        active: false,
        destiny: null,
        slug: null
      },
      meta: null
    }
  },

  mounted() {
    this.loadLinks()
  },

  methods: {
    async loadLinks() {
      const { data } = await this.$apollo.query({
        query: gql`
          query links($page: Int!) {
            links(page: $page) {
              page
              pages
              hasNext
              hasPrev
              objects {
                id
                hash
                destiny
                requestsCount
                createdAt
              }
            }
          }
        `,
        variables: {
          page: this.page
        }
      })
      this.links = data.links
      this.page = data.links.page
    },

    prev() {
      this.page -= 1
      this.loadLinks()
    },

    next() {
      this.page += 1
      this.loadLinks()
    },

    async loadMeta() {
      if (this.modalForm.destiny) {
        const { data } = await this.$apollo.query({
          query: gql`
            query meta($url: String!) {
              meta(url: $url)
            }
          `,
          variables: {
            url: this.modalForm.destiny
          }
        })
        this.meta = JSON.parse(data.meta)
      }
    },

    async createLink() {
      const { data } = await this.$apollo.mutate({
        mutation: gql`
          mutation createLink($destiny: String!, $hash: String) {
            createLink(destiny: $destiny, hash: $hash) {
              status
              link {
                id
                destiny
                hash
                requestsCount
                createdAt
              }
            }
          }
        `,
        variables: {
          destiny: this.modalForm.destiny,
          hash: this.modalForm.slug
        }
      })
      if (data.createLink.status === 'ok') {
        this.links.objects.unshift(data.createLink.link)
        this.modalForm.active = false
      }
    }
  }
}
</script>
