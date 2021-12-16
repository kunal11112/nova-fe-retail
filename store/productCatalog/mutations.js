import { SET_SELECTED_ITEM, RESET_SELECTED } from './mutationTypes'

export default {
  [SET_SELECTED_ITEM]: (state, payload) => {
    // called to set the selected cylinder's selected property to true
    state.cylinders.forEach((item) => {
      item.selected = payload.data === item.name
    })
  },

  [RESET_SELECTED]: (state, payload) => {
    // called to reset all cylinders' selected property to false
    return state.cylinders.forEach((item) => (item.selected = false))
  },
}
