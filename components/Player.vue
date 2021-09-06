<template>
  <div class="player">
    <div class="player-controls">
      <div id="stop">
        <a title="Stop" href="#" @click.prevent="stop">
          <b-icon icon="stop"></b-icon>
        </a>
      </div>
      <div id="play">
        <a
          :title="playing ? 'Pause' : 'Play'"
          href="#"
          @click.prevent="playing = !playing"
        >
          <b-icon v-if="!playing" icon="play"></b-icon>
          <b-icon v-else icon="pause"></b-icon>
        </a>
      </div>
      <div id="seek">
        <div class="player-progress" title="Seek" @click="seek">
          <div
            :style="{ width: this.percentComplete + '%' }"
            class="player-seeker"
          ></div>
        </div>
        <div class="player-time">
          <div class="player-time-current">
            {{ this.currentSeconds | convertTimeHHMMSS }}
          </div>
          <div class="player-time-total">
            {{ this.durationSeconds | convertTimeHHMMSS }}
          </div>
        </div>
      </div>
      <div id="download">
        <a href="#" title="Download" @click.prevent="download">
          <b-icon icon="download"></b-icon>
        </a>
      </div>
      <div id="loop">
        <a href="#" title="Loop" @click.prevent="innerLoop = !innerLoop">
          <b-icon v-if="!innerLoop" icon="sync"></b-icon>
          <b-icon v-else icon="loop"></b-icon>
        </a>
      </div>
      <div id="mute">
        <a title="Mute" href="#" @click.prevent="mute">
          <b-icon v-if="!muted" icon="volume-mute"></b-icon>
          <b-icon v-else icon="volume-high"></b-icon>
        </a>
      </div>
      <div id="volume">
        <a
          title="Volume"
          href="#"
          @click.prevent=""
          @mouseenter="showVolume = true"
          @mouseleave="showVolume = false"
        >
          <svg
            width="18px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M19,13.805C19,14.462,18.462,15,17.805,15H1.533c-0.88,0-0.982-0.371-0.229-0.822l16.323-9.055C18.382,4.67,19,5.019,19,5.9V13.805z"
            />
          </svg>
          <input
            v-show="showVolume"
            v-model.lazy.number="volume"
            type="range"
            min="0"
            max="100"
          />
        </a>
      </div>
    </div>
    <audio
      ref="audiofile"
      :loop="innerLoop"
      :src="file"
      preload="auto"
      style="display: none;"
    ></audio>
  </div>
</template>

<script>
export default {
  filters: {
    convertTimeHHMMSS(val) {
      const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)

      return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
    }
  },

  props: {
    file: {
      type: String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    audio: undefined,
    currentSeconds: 0,
    durationSeconds: 0,
    innerLoop: false,
    loaded: false,
    playing: false,
    previousVolume: 35,
    showVolume: false,
    volume: 100
  }),

  computed: {
    muted() {
      return this.volume / 100 === 0
    },
    percentComplete() {
      return parseInt((this.currentSeconds / this.durationSeconds) * 100)
    }
  },

  watch: {
    playing(value) {
      if (value) {
        return this.audio.play()
      }
      this.audio.pause()
    },
    volume(value) {
      this.audio.volume = this.volume / 100
    }
  },

  created() {
    this.innerLoop = this.loop
  },

  mounted() {
    this.audio = this.$el.querySelectorAll('audio')[0]
    this.audio.addEventListener('timeupdate', this.update)
    this.audio.addEventListener('loadeddata', this.load)
    this.audio.addEventListener('pause', () => {
      this.playing = false
    })
    this.audio.addEventListener('play', () => {
      this.playing = true
    })
  },

  methods: {
    download() {
      this.stop()
      window.open(this.file, 'download')
    },

    load() {
      if (this.audio.readyState >= 2) {
        this.loaded = true
        this.durationSeconds = parseInt(this.audio.duration)

        return (this.playing = this.autoPlay)
      }

      throw new Error('Failed to load sound file.')
    },

    mute() {
      if (this.muted) {
        return (this.volume = this.previousVolume)
      }

      this.previousVolume = this.volume
      this.volume = 0
    },

    seek(e) {
      if (!this.loaded) return

      const el = e.target.getBoundingClientRect()
      const seekPos = (e.clientX - el.left) / el.width

      this.audio.currentTime = parseInt(this.audio.duration * seekPos)
    },

    stop() {
      this.playing = false
      this.audio.currentTime = 0
    },

    update(e) {
      this.currentSeconds = parseInt(this.audio.currentTime)
    }
  }
}
</script>

<!-- style lang="scss" scoped>
body {
  font-family: 'Nunito', sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

$player-bg: #fff;
$player-border-color: darken($player-bg, 12%);
$player-link-color: darken($player-bg, 75%);
$player-progress-color: $player-border-color;
$player-seeker-color: $player-link-color;
$player-text-color: $player-link-color;

.player-wrapper {
  align-items: center;
  background-color: $player-bg;
  background-image: linear-gradient(90deg, #fff 0, darken(#fff, 12%));
  display: flex;
  height: 100vh;
  justify-content: center;
}

.player {
  background-color: $player-bg;
  border-radius: 5px;
  border: 1px solid $player-border-color;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
  color: $player-text-color;
  display: inline-block;
  line-height: 1.5625;
}

.player-controls {
  display: flex;

  > div {
    border-right: 1px solid $player-border-color;

    &:last-child {
      border-right: none;
    }

    a {
      color: $player-link-color;
      display: block;
      line-height: 0;
      padding: 1em;
      text-decoration: none;
    }
  }
}

.player-progress {
  background-color: $player-progress-color;
  cursor: pointer;
  height: 50%;
  min-width: 200px;
  position: relative;

  .player-seeker {
    background-color: $player-seeker-color;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
  }
}

.player-time {
  display: flex;
  justify-content: space-between;

  .player-time-current {
    font-weight: 700;
    padding-left: 5px;
  }

  .player-time-total {
    opacity: 0.5;
    padding-right: 5px;
  }
}
</style -->
