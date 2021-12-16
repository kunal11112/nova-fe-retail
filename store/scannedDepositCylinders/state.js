export default () => ({
  deposit_cylinders:
    JSON.parse(sessionStorage.getItem('deposit_cylinders')) || [],
})
