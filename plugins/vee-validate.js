import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
} from 'vee-validate/dist/vee-validate.full'
import { required, email, alpha, numeric } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'Please enter a valid email address',
})

extend('alpha', {
  ...alpha,
  message: 'This field accepts only alphabets',
})

extend('numeric', {
  ...numeric,
  message: 'This field accepts only numbers',
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match',
})
