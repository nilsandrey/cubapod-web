<template>
  <div class="av__audio__playback">
    <div class="audio__controls">
      <div class="audio__controls__controls">
        <!--div @click="$emit('toggleShuffle')">
          <b-icon icon="shuffle-variant"></b-icon>
        </div>
        <div @click="$emit('prevSong')">
          <b-icon icon="chevron-double-left"></b-icon>
        </div-->
        <div v-if="songControls.songPaused" @click="$emit('evalSong')">
          <b-icon icon="play-circle"></b-icon>
        </div>
        <div v-else @click="$emit('evalSong')">
          <b-icon icon="pause-circle"></b-icon>
        </div>
        <!--div @click="$emit('nextSong')">
          <b-icon icon="chevron-double-right"></b-icon>
        </div>
        <div @click="$emit('toggleRepeat')">
          <b-icon icon="repeat"></b-icon>
        </div-->
      </div>
      <div class="audio__controls__progress">
        <div class="audio__controls__progress__currentTime">
          {{ songControls.songTime }}
        </div>
        <!-- div class="audio__controls__progress__bar">
          <div
            ref="progressBar"
            class="audio__controls__progress__bar__percent"
          ></div>
        </div -->
        <div class="audio__controls__progress__bar">
          <b-slider
            v-model="progress"
            class="audio__controls__progress__bar__percent"
            :tooltip="false"
            rounded
            @change="($payload) => $emit('progress', $payload)"
          ></b-slider>
        </div>
        <div class="audio__controls__progress__songDuration">
          {{ songControls.songDuration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioControls',
  props: ['isShuffling', 'repeatVal', 'songControls'],
  data() {
    return {
      progress: 0
    }
  }
}
</script>

<style lang="css" scoped>
.audio__controls {
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.audio__controls__controls {
  align-self: center;
  color: #ff0000;
  width: 260px;
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
}

.audio__controls__progress {
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.audio__controls__progress__currentTime,
.audio__controls__progress__songDuration {
  width: 3em;
  font-size: 12px;
  font-family: Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5pt;
}

.audio__controls__progress__bar {
  flex-grow: 1;
  align-self: center;
  border-radius: 5px;
  position: relative;
}

.audio__controls__progress__bar__percent {
  border-radius: 5px;
  z-index: 5;
}
</style>
