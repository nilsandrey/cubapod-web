<template>
  <div v-if="showSettings" class="canvas-settings">
    <div class="canvas-cogs">
      <span v-if="showMenu">Press 'H' / 'S' To Toggle Settings</span>
      <span v-else></span>
      <i v-if="!showMenu" class="fa fa-cog fa-lg" @click="showMenu = true"></i>
      <i
        v-if="showMenu"
        class="fa fa-close fa-lg"
        @click="showMenu = false"
      ></i>
    </div>
    <ul v-if="showMenu" class="canvas-menu">
      <li>
        <span class="dropdown">Visualizer</span>
        <div class="dropdown-options">
          <span>Option 1</span>
          <span>Option 2</span>
          <span>Option 3</span>
        </div>
      </li>
      <li>This is the settings content</li>
      <li>This is the settings content</li>
      <li>This is the settings content</li>
      <li>This is the settings content</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CanvasSettings',
  data() {
    return {
      showMenu: false,
      showSettings: true
    }
  },
  mounted() {
    window.addEventListener('keydown', this.checkKeys)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.checkKeys)
  },
  methods: {
    checkKeys(event) {
      switch (event.keyCode) {
        case 72:
          this.showSettings = !this.showSettings
          break
        case 32:
        case 75:
          this.$emit('pauseSong')
          break
        case 39:
          this.$emit('nextSong')
          break
        case 37:
          this.$emit('prevSong')
          break
        case 40:
          this.$emit('lowerVolume')
          break
        case 38:
          this.$emit('raiseVolume')
          break
        case 83:
          this.showMenu = !this.showMenu
          break
        case 27:
          console.log('closing canvas')
          this.$emit('showCanvas')
          break
      }
    }
  }
}
</script>

<!-- style lang="scss">
.canvas-settings {
  position: absolute;
  max-height: calc(100% - var(--av-height) - 15px);
  height: 80%;
  width: 240px;
  top: 5px;
  right: 15px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  font-family: 'Lucida Grande', sans-serif;
  font-size: 12px;

  .canvas-cogs {
    color: white;
    height: 30px;
    display: flex;
    align-items: center;

    > span {
      flex-grow: 1;
    }
  }

  .canvas-menu {
    flex-grow: 1;
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;

    li {
      height: 28px;
      width: 100%;
      border: 1px solid white;
      display: flex;
      align-items: center;
    }
  }
}
</style -->
