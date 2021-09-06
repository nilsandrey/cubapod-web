export const state = () => ({
  data: null,
  play: null
  /* [
    {
      title: 'Tiempo',
      enclosure:
        'https://anchor.fm/s/164f2390/podcast/play/15315300/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fproduction%2F2020-5-17%2F83024754-48000-2-78f68e6d05266.mp3',
      artistName: 'Carlos Lugones',
      image:
        'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/3642852/3642852-1592397640331-ae681eb407059.jpg',
      itunesDuration: '1417'
    }
  ] */
})

export const mutations = {
  set(state, episode) {
    state.data = episode
  },
  setPlay(state, play) {
    state.play = play
  }
  /* removeItem(state, item) {
    const index = state.items.findIndex(i => i.id === item.id)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  },
  clean(state) {
    state.items = []
  },
  isAdded(state, item) {
    return !!state.items.find(i => i.id === item.id)
  },
   */
}

export const getters = {
  get: (state) => {
    return state.data
  },
  getPlay: (state) => {
    return state.play
  }
}
