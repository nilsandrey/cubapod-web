<template>
  <div v-if="podcast">
    <div>
      <img
        :src="podcast.image"
        :alt="podcast.title"
        width="200pt"
        style="border-radius: 10pt"
      />
    </div>
    <div class="margin-bottom-10">
      <b-button
        icon-left="earth"
        expanded
        rounded
        @click="$router.replace(`/${podcast.slug}`)"
      >
        Página pública
      </b-button>
    </div>
    <b-menu>
      <b-menu-list>
        <b-menu-item
          icon="rss"
          label="Pódcast"
          :active="$route.path === `/podcaster/${podcast.slug}`"
          @click="navigateTo(`/podcaster/${podcast.slug}`)"
        ></b-menu-item>
        <b-menu-item
          icon="play"
          label="Episodios"
          :active="$route.path === `/podcaster/${podcast.slug}/episodes`"
          @click="navigateTo(`/podcaster/${podcast.slug}/episodes`)"
        ></b-menu-item>
        <b-menu-item
          icon="chart-bar"
          label="Analíticas"
          :active="$route.path === `/podcaster/${podcast.slug}/analytics`"
          @click="navigateTo(`/podcaster/${podcast.slug}/analytics`)"
        ></b-menu-item>
        <b-menu-item
          icon="palette"
          :active="$route.path === `/podcaster/${podcast.slug}/appeareance`"
          @click="navigateTo(`/podcaster/${podcast.slug}/appeareance`)"
        >
          <template #label>
            Apariencia
          </template>
        </b-menu-item>
        <b-menu-item
          icon="cog"
          label="Preferencias"
          :active="$route.path === `/podcaster/${podcast.slug}/preferences`"
          @click="navigateTo(`/podcaster/${podcast.slug}/preferences`)"
        ></b-menu-item>
        <b-menu-item
          icon="comment-check"
          label="Consejos"
          :active="$route.path === `/podcaster/${podcast.slug}/insights`"
          @click="navigateTo(`/podcaster/${podcast.slug}/insights`)"
        ></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
export default {
  props: {
    podcast: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      isActive: true
    }
  },

  methods: {
    navigateTo(path) {
      if (this.$router.path !== path) {
        this.$router.replace(path)
      }
    }
  }
}
</script>

<style scoped></style>
