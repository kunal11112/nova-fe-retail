export function saveDepositCylinderToSessionStorage(store) {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === 'scannedDepositCylinders/REMOVE_DEPOSIT_CYLINDER' ||
      mutation.type === 'scannedDepositCylinders/ADD_DEPOSIT_CYLINDER'
    ) {
      const cylinders = state.scannedDepositCylinders.deposit_cylinders
      sessionStorage.setItem('deposit_cylinders', JSON.stringify(cylinders))
    }
  })
}
