
import * as types from './mutation-types'

const state = {
  sidebarOpened: true,
}

// getters: can be maped into a component, get the updated state
const getters = {
  sidebarOpened: state => state.sidebarOpened,
}

// actions: can be maped into a component, commit action
const actions = {
  toogleSidebar ({ state, commit, rootState }) {
    state.sidebarOpened
      ? commit(types.CLOSE_SIDEBAR)
      : commit(types.OPEN_SIDEBAR)
  },
}

// mutations: logic of update state
const mutations = {
  [types.OPEN_SIDEBAR] (state) {
    state.sidebarOpened = true;
  },

  [types.CLOSE_SIDEBAR] (state) {
    state.sidebarOpened = false;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
