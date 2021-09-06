export const state = () => ({
  user: null
})

export const mutations = {
  set(state, user) {
    state.user = user
  }
}

export const getters = {
  get: (state) => state.user
}
