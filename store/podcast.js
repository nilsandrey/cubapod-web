export const state = () => ({
  podcast: null
})

export const mutations = {
  set(state, podcast) {
    state.podcast = podcast
  }
}

export const getters = {
  get: (state) => {
    return state.podcast
  }
}
