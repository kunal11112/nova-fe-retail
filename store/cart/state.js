const state = () => ({
  deposit_cylinders:
    JSON.parse(sessionStorage.getItem('deposit_cylinders')) || [],
  filled_cylinders:
    JSON.parse(sessionStorage.getItem('filled_cylinders')) || [],
})

export default state
