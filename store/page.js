export const state = () => ({
  page: null
})

export const mutations = {
  set(state, page) {
    state.page = page
  }
}

export const getters = {
  get: (state) => {
    return state.page
  }
}
