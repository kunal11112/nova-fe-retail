export default {
  setSelectedItem({ commit }, payload) {
    commit({ type: 'SET_SELECTED_ITEM', payload })
  },

  resetSelectedItems({ commit }) {
    commit({ type: 'RESET_SELECTED' })
  },
}
