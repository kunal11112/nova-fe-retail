export default {
  addDepositCylinder: ({ commit, state }, payload) => {
    const index = state.deposit_cylinders.findIndex(
      (item) => item.name === payload.name
    )
    let cylinders = state.deposit_cylinders
    if (index >= 0) {
      cylinders[index].quantity++
      cylinders[index].totalPrice += payload.price
    } else {
      cylinders = [
        ...cylinders,
        {
          name: payload.name,
          weight: payload.weight,
          unitPrice: payload.price,
          totalPrice: payload.price,
          quantity: 1,
        },
      ]
    }
    commit({ type: 'SET_DEPOSIT_CYLINDER', cylinders })
  },

  reduceCylinderQuantity: ({ commit, state }, payload) => {
    const index = state.deposit_cylinders.findIndex(
      (item) => item.name === payload.name
    )
    const cylinders = state.deposit_cylinders
    cylinders[index].quantity--
    cylinders[index].totalPrice -= cylinders[index].unitPrice
    if (cylinders[index].totalPrice <= 0) cylinders.splice(index, 1)
    commit({
      type: 'SET_DEPOSIT_CYLINDER',
      cylinders,
    })
  },
}
