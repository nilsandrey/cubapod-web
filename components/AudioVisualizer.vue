<template>
  <div :style="{ '--av-height': avHeight }">
    <div v-if="episode" ref="av" class="av">
      <!-- The canvas component with visualizations -->
      <!--av-canvas
        v-if="isShowing.showVis"
        :audio-analyser="myAnalyser"
        @pauseSong="evalSong"
        @prevSong="prevSong"
        @nextSong="nextSong"
        @lowerVolume="lowerVolume"
        @raiseVolume="raiseVolume"
      /-->

      <!-- Wrapper for the audio player bottom of the page -->
      <div class="av__audio">
        <!-- Audio meta data about the current song -->
        <div class="av__audio__meta">
          <div class="av__audio__meta__img">
            <img :src="episode.image" alt="" />
          </div>
          <div class="av__audio__meta__tags is-hidden-mobile">
            <span class="av__audio__meta__tags__title">
              {{ episode.title }}
            </span>
          </div>
        </div>

        <!-- Audio Controls (Play/Prev/Next + Song Progress) -->
        <audio-controls
          :repeat-val="repeatVal"
          :is-shuffling="isShuffling"
          :song-controls="songControls"
          @evalSong="evalSong"
          @nextSong="nextSong"
          @prevSong="prevSong"
          @toggleShuffle="toggleShuffle"
          @toggleRepeat="toggleRepeat"
          @progress="progress"
        ></audio-controls>

        <!-- Page Togglers on the right side -->
        <div class="av__audio__togglers">
          <div class="av__audio__togglers__volume">
            <transition name="fade">
              <div
                v-show="togglers.showVolumeSlider"
                class="av__audio__togglers__volume__hover"
                @mouseover="togglers.showVolumeSlider = true"
                @mouseout="togglers.showVolumeSlider = false"
              >
                <b-icon icon="volume-low"></b-icon>
                <div>
                  <input
                    ref="volumeBar"
                    class="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    @input="slideVolume"
                  />
                  <span ref="volumeLeft"></span>
                </div>
              </div>
            </transition>
            <div
              @mouseover="togglers.showVolumeSlider = true"
              @mouseout="togglers.showVolumeSlider = false"
            >
              <b-icon icon="volume-high" aria-hidden="true"></b-icon>
            </div>
          </div>
          <!--div @click="isShowing.playlist = !isShowing.playlist">
            <b-icon
              :class="{ 'active-fa': isShowing.playlist }"
              icon="format-list-numbered"
              aria-hidden="true"
            ></b-icon>
          </div-->
          <!--div @click="showCanvas">
            <b-icon
              v-if="canvas"
              icon="signal"
              :class="{ 'active-fa': isShowing.showVis }"
              aria-hidden="true"
            ></b-icon>
          </div-->
        </div>

        <!-- HTML5 Audio -->
        <audio
          ref="myAudio"
          controls
          preload="none"
          style="margin: 5pt 0 20pt 0; width: 100%"
          class="is-hidden-mobile"
          @timeupdate="onTimeUpdateListener"
          @ended="handleSongEnd"
        >
          <source :src="`https://cors-anywhere.herokuapp.com/${enclosure}`" />
          Tu navegador no soporta el audio.
        </audio>
      </div>
    </div>
    <!--audio-playlist
      v-if="isShowing.playlist"
      :playlist="playlist"
      @chooseSong="chooseSong"
    ></audio-playlist-->
  </div>
</template>

<script>
// import AvCanvas from '~/components/AvCanvas/AvCanvas'
import AudioControls from '~/components/AudioControls'
// import AudioPlaylist from '~/components/AudioPlaylist'
import * as Utils from '~/utils/utils.js'
export default {
  name: 'AudioVisualizer',

  components: { /* AvCanvas, */ AudioControls /* AudioPlaylist */ },

  props: {
    avHeight: {
      type: String,
      default: '72px'
    },
    canvas: {
      type: Boolean,
      default: false
    },
    playlist: {
      type: Array,
      default: null
    },
    episode: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      myAudioPlayer: null,
      volumeBar: null,
      myAnalyser: null,
      currentSong: 0,
      isShuffling: false,
      repeatVal: 0, // 0 -> repeat none, 1 -> repeat one, 2 -> repeat all
      isShowing: {
        playlist: false,
        showVis: false
      },
      songControls: {
        songPercent: 0,
        songTime: '',
        songDuration: '',
        songPaused: true
      },
      volume: {
        volumeBar: null,
        volumeLeft: null
      },
      togglers: {
        showVolumeSlider: false
      },
      enclosure: null
    }
  },

  computed: {
    /* computedPlaylist() {
      if (this.isShuffling) {
        return Utils.shuffle(this.playlist)
      }
      return this.playlist
    } */
  },

  watch: {
    episode() {
      this.songControls.songPaused = true
      this.myAudioPlayer.pause()
      this.myAnalyser = null
      this.enclosure = null
      setTimeout(
        function() {
          this.initPlayer()
        }.bind(this),
        150
      )
    }
  },

  mounted() {
    this.initPlayer()
  },

  methods: {
    initPlayer() {
      this.enclosure = this.episode.enclosure
      this.myAudioPlayer = this.$refs.myAudio
      this.myAudioPlayer.currentTime = 0
      this.songControls.songPercent = 0
      this.volume.volumeBar = this.$refs.volumeBar
      this.volume.volumeLeft = this.$refs.volumeLeft
      this.setAnalyser()
      this.updateVolumeBar()
      this.playSong()
    },

    showCanvas() {
      this.isShowing.showVis = !this.isShowing.showVis
      this.isShowing.showVis
        ? (this.$refs.av.style.height = '100%')
        : (this.$refs.av.style.height = 'auto')
    },

    evalSong() {
      this.myAudioPlayer.paused ? this.playSong() : this.pauseSong()
    },

    chooseSong(songIndex) {
      if (this.currentSong !== songIndex) {
        // Vue.set(this.playlist[this.currentSong], 'isPlaying', false)
        this.currentSong = songIndex
        this.myAudioPlayer.currentTime = 0
        this.playSong()
      } else if (
        this.currentSong === songIndex &&
        this.songControls.songPaused
      ) {
        this.playSong()
      } else {
        this.pauseSong()
      }
    },

    progress(percent) {
      const currentDuration = this.myAudioPlayer.duration
      const time = (percent * currentDuration) / 100
      const newTime =
        Math.floor(time.toFixed(0) / 60) +
        ':' +
        (time.toFixed(0) % 60 ? Utils.minTwoDigits(time.toFixed(0) % 60) : '00')

      this.songControls.songTime = newTime
      this.songControls.songPercent = percent
      this.myAudioPlayer.currentTime = time
      this.myAudioPlayer.pause()
      this.myAudioPlayer.play()
    },

    playSong() {
      setTimeout(
        function() {
          this.myAudioPlayer.play()
          this.songControls.songPaused = false
          // Vue.set(this.playlist[this.currentSong], 'isPlaying', true)
        }.bind(this),
        150
      )
    },

    pauseSong() {
      setTimeout(
        function() {
          this.myAudioPlayer.pause()
          this.songControls.songPaused = true
          // Vue.set(this.playlist[this.currentSong], 'isPlaying', false)
        }.bind(this),
        150
      )
    },

    nextSong() {
      // Vue.set(this.playlist[this.currentSong], 'isPlaying', false)
      this.currentSong = (this.currentSong + 1) % this.playlist.length
      this.myAudioPlayer.currentTime = 0
      this.playSong()
    },

    prevSong() {
      if (this.myAudioPlayer.currentTime < 2) {
        // Vue.set(this.playlist[this.currentSong], 'isPlaying', false)
        this.currentSong = Utils.mod(this.currentSong - 1, this.playlist.length)
        // Vue.set(this.playlist[this.currentSong], 'isPlaying', false)
      }
      this.myAudioPlayer.currentTime = 0
      this.playSong()
    },

    lowerVolume() {
      this.myAudioPlayer.volume - 0.05 < 0
        ? (this.myAudioPlayer.volume = 0)
        : (this.myAudioPlayer.volume -= 0.05)
      this.updateVolumeBar()
    },

    raiseVolume() {
      this.myAudioPlayer.volume + 0.05 > 1
        ? (this.myAudioPlayer.volume = 1)
        : (this.myAudioPlayer.volume += 0.05)
      this.updateVolumeBar()
    },

    updateVolumeBar() {
      this.cleanVolumeLeft(this.myAudioPlayer.volume * 100)
      this.volume.volumeBar.value = this.myAudioPlayer.volume * 100
    },

    slideVolume(event) {
      const targetVal = event.target.value
      this.cleanVolumeLeft(targetVal)
      this.setVolume(targetVal / 100)
    },

    setVolume(val) {
      this.myAudioPlayer.volume = val
      this.volume.volumeLeft.style.display = 'block'
      if (val === 0) {
        this.volume.volumeLeft.style.display = 'none'
        this.volume.volumeLeft.style.width = '0%'
      }
    },

    cleanVolumeLeft(targetVal) {
      this.volume.volumeLeft.style.width = targetVal.toString() + '%'
      /* if (targetVal > 75) {
        this.volume.volumeLeft.style.width = (targetVal - 6).toString() + '%'
      } else if (targetVal > 50) {
        this.volume.volumeLeft.style.width = (targetVal - 3.5).toString() + '%'
      } else if (targetVal > 25) {
        this.volume.volumeLeft.style.width = (targetVal - 3).toString() + '%'
      } else if (targetVal > 10) {
        this.volume.volumeLeft.style.width = (targetVal - 2).toString() + '%'
      } else {
        this.volume.volumeLeft.style.width = (targetVal - 1.5).toString() + '%'
      } */
    },

    toggleShuffle() {
      this.isShuffling = !this.isShuffling
    },

    toggleRepeat() {
      this.repeatVal = Utils.mod(this.repeatVal + 1, 3)
    },

    onTimeUpdateListener() {
      const currentTime = this.myAudioPlayer.currentTime
      const currentDuration = this.myAudioPlayer.duration
      const percent = currentTime / currentDuration
      if (isNaN(percent)) {
        this.songControls.songPercent = 0
      } else {
        this.songControls.songPercent = percent
        this.songControls.songTime =
          Math.floor(currentTime.toFixed(0) / 60) +
          ':' +
          (currentTime.toFixed(0) % 60
            ? Utils.minTwoDigits(currentTime.toFixed(0) % 60)
            : '00')
        this.songControls.songDuration =
          Math.floor(currentDuration.toFixed(0) / 60) +
          ':' +
          (currentDuration.toFixed(0) % 60
            ? Utils.minTwoDigits(currentDuration.toFixed(0) % 60)
            : '00')
      }
    },

    handleSongEnd() {
      /* switch (this.repeatVal) {
        case 0: // Repeat None
          this.currentSong + 1 === this.playlist.length
            ? (this.currentSong = 0)
            : this.nextSong()
          break
        case 1: // Repeat One
          this.myAudioPlayer.currentTime = 0
          this.playSong()
          break
        case 2: // Repeat All
          this.nextSong()
          break
      } */
    },

    setAnalyser() {
      const ctx = new AudioContext()
      const src = ctx.createMediaElementSource(this.myAudioPlayer)
      ctx.crossOrigin = 'anonymous'
      this.myAudioPlayer.crossOrigin = 'anonymous'
      this.myAnalyser = ctx.createAnalyser()
      src.connect(this.myAnalyser)
      this.myAnalyser.fftSize = 32768
      this.myAnalyser.connect(ctx.destination)
    }
  }
}
</script>

<style lang="css">
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  overflow-x: hidden;
}

.av {
  width: 100vw;
  position: fixed;
  bottom: 0;
  color: #000;
  user-select: none;
  z-index: 1;
  transition-duration: 200ms;
}
.av__audio {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: var(--av-height);
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.av__audio__meta {
  position: absolute;
  left: 0;
  height: inherit;
  width: auto;
  max-width: 25%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.av__audio__meta__img {
  width: var(--av-height);
  height: 100%;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.av__audio__meta__img img {
  max-height: 70%;
  max-width: 70%;
  border-radius: 5pt;
}

.av__audio__meta__tags {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Helvetica, sans-serif;
}

.av__audio__meta__tags__title {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.21px;
  color: #000;
}

.av__audio__playback {
  margin: 0 auto;
  height: 100%;
  width: 50%;
  max-width: 770px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.av__audio__togglers {
  position: absolute;
  right: 40px;
  top: 0px;
  height: 100%;
  color: #000;
  display: flex;
  flex-direction: space-between;
  justify-content: center;
  align-items: center;
  margin: 0 -5px;
}

.av__audio__togglers__volume {
  width: 150px;
  height: 30px;
  margin: 0;
  display: flex;
  justify-content: flex-end;
}

.av__audio__togglers__volume > i {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.av__audio__togglers__volume__hover {
  flex-grow: 1;
  height: 20pt;
  display: flex;
  margin: 0;
  transition-duration: 200ms;
}

.av__audio__togglers__volume__hover > i {
  display: flex;
  justify-content: center;
  align-items: center;
}

.av__audio__togglers__volume__hover > div {
  margin-top: 2pt;
  /* width: 100%;
  margin-right: 10pt;
  align-self: center;
  position: relative; */

  /* .volume-slider {
    -webkit-appearance: none;
    position: absolute;
    border-radius: 5px;
  }

  > span {
    position: absolute;
    background: #000;
    border: 3px solid #3e83ff;
    height: 10pt;
    border-radius: 5px;
    z-index: 1;
  } */
}

input[type='range'] {
  -webkit-appearance: none;
  background-color: #c6c6c6;
  cursor: pointer;
}

/* input[type='range']:focus {
  outline: none;
}

input[type='range']::-webkit-slider-runnable-track {
  height: 10pt;
  -webkit-appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10pt;
  height: 10pt;
  margin-top: -5px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #3e83ff;
} */
</style>
