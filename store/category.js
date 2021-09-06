export const state = () => ({
  category: null
})

export const mutations = {
  set(state, category) {
    state.category = category
  }
}

export const getters = {
  get: (state) => {
    return state.category
  }
}
