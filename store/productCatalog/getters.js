export default {
  getSelectedCylinder: (state) =>
    state.cylinders.filter((item) => item.selected === true),
}
