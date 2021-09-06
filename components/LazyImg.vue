<template>
  <client-only>
    <div ref="appImg" class="app-img">
      <div v-if="dataUrl" :style="styles" class="app-img__placeholder">
        <img
          :src="placeholder || dataUrl"
          v-bind="$attrs"
          :class="classes"
          alt=""
        />
      </div>
      <img
        :alt="$attrs.alt || ''"
        v-bind="$attrs"
        :class="`app-img__img ${classes}`"
        :style="styles"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  ssr: false,
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: null
    },
    styles: {
      type: String,
      default: null
    },
    classes: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isMounted: false
    }
  },
  computed: {
    dataUrl() {
      const { width, height } = this.$attrs
      if (!width || !height) return ''

      // create a png with matching dimensions as img
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      return canvas.toDataURL()
    }
  },
  watch: {
    src() {
      if (process.browser && this.isMounted) {
        const { src, $el } = this
        const img = $el.querySelector(`.app-img__img`)
        img.src = src
      }
    }
  },
  mounted() {
    setTimeout(() => {
      const { src, srcset, $el } = this
      let timeOut

      const observer = new IntersectionObserver(([entry]) => {
        const img = $el.querySelector(`.app-img__img`)
        const placeholder = $el.querySelector(`.app-img__placeholder`)

        img.onload = function() {
          delete img.onload
          $el.classList.add(`app-img--loaded`)
          if (placeholder) {
            timeOut = setTimeout(() => {
              placeholder.remove()
            }, 300)
          }
        }
        if (entry.isIntersecting) {
          // Element is in viewport
          if (srcset) {
            img.srcset = srcset
          }
          img.src = src
          observer.disconnect()
        }
      })
      observer.observe($el)

      this.$once('hook:beforeDestroy', () => {
        observer.disconnect()
        if (timeOut) {
          clearTimeout(timeOut)
        }
      })

      this.isMounted = true
    }, 100)
  }
}
</script>

<style scoped>
.app-img {
  display: inline-block;
  position: relative;
  line-height: 0;
  overflow: hidden;
}

.app-img__placeholder {
  position: absolute;
  overflow: hidden;
}

.app-img__placeholder img {
  filter: blur(10px);
}

.app-img__img {
  opacity: 0;
  transition: opacity 300ms ease;
}

.app-img--loaded .app-img__img {
  opacity: 1;
}
</style>
