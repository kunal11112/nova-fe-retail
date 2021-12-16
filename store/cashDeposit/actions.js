export default {
  storeInitialCashDeposit: ({ state }) =>
    sessionStorage.setItem('initialCashDeposit', state.initialCashDeposit),
}
