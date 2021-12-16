import { SET_PIN, SET_OTP, SET_NAME, SET_PHONE_NUMBER } from './mutationTypes'

export default {
  [SET_PHONE_NUMBER]: (state, payload) => {
    state.phone_number = payload
  },

  [SET_OTP]: (state, payload) => {
    state.otp = payload
  },

  [SET_NAME]: (state, payload) => {
    state.name = payload
  },

  [SET_PIN]: (state, payload) => {
    state.pin = payload
  },
}
