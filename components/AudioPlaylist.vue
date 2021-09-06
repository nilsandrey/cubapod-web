<template>
  <transition name="slide-fade">
    <div class="audio__playlist">
      <span>
        <span class="songNum"></span>
        <span class="songName"><b>Episodio</b></span>
        <span class="songDuration">
          <b-icon icon="clock" size="is-small"></b-icon>
        </span>
      </span>
      <span v-for="(song, index) in playlist" :key="index">
        <span class="songNum" @click="$emit('chooseSong', index)">
          <span v-if="!song.isPlaying">{{ index + 1 }}</span>
          <span v-else>
            <b-icon icon="pause"></b-icon>
          </span>
        </span>
        <span class="songName" @click="$emit('chooseSong', index)">
          {{ song.title }}
        </span>
        <span class="songDuration">{{ song.itunesDuration }}</span>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AudioPlaylist',
  props: ['playlist']
}
</script>

<!-- style scoped>
.audio__playlist {
  position: fixed;
  top: 40pt;
  right: 0;
  height: calc(100% - var(--av-height));
  width: 350px;
  display: flex;
  flex-direction: column;
  background: #2f3136;
  color: rgb(246, 246, 247);
  box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.15);
  font-size: 12px;
  overflow: auto;
  padding: 10pt;

  > span {
    display: flex;
    height: 33px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;

    .songNum {
      width: 33px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .songName {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
    }

    .songDuration {
      width: 4em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style-->
