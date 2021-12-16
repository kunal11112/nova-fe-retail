export default {
  getTotalPriceOfFilledCylinders: (state) => {
    return JSON.parse(sessionStorage.getItem('filled_cylinders'))
      .map((item) => item.totalPrice)
      .reduce((sum, currentPrice) => sum + currentPrice, 0)
  },
  getDepositCylinders: () => {
    return JSON.parse(sessionStorage.getItem('deposit_cylinders'))
  },
  getFilledCylinders: () => {
    return JSON.parse(sessionStorage.getItem('filled_cylinders'))
  },
}
