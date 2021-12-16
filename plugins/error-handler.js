import Vue from 'vue'

Vue.config.errorHandler = (err, vm, info) => {
  console.log(
    `Run into error: ${err.message}, from: ${vm.$route.name}, info: ${info}`
  )
}

window.onunhandledrejection = (event) => {
  console.log(`Run into error: ${event}`)
}
