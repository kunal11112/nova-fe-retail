export default {
  setPhoneNumber: ({ commit }, payload) => {
    const { phoneNumber } = payload
    if (payload) commit({ type: 'SET_PHONE_NUMBER', phoneNumber })
  },
  setOtp: ({ commit }, payload) => {
    const { otp } = payload
    if (payload) commit({ type: 'SET_OTP', otp })
  },
  setName: ({ commit }, payload) => {
    const { name } = payload
    if (payload) commit({ type: 'SET_NAME', name })
  },
  setPin: ({ commit }, payload) => {
    const { pin } = payload
    if (payload) commit({ type: 'SET_PIN', pin })
  },
}
