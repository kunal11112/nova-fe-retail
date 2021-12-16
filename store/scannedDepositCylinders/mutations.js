import { SET_DEPOSIT_CYLINDER } from './mutationTypes'

export default {
  [SET_DEPOSIT_CYLINDER]: (state, payload) => {
    state.deposit_cylinders = payload.cylinders
  },
}
