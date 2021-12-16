export default {
  storeCylindersInSession: ({ state }) =>
    sessionStorage.setItem(
      'filled_cylinders',
      JSON.stringify(state.filled_cylinders)
    ),
}
