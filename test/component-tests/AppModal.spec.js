import { mount } from '@vue/test-utils'
import loginError from '~/components/AppModal.vue'

describe('Login Error Message Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(loginError)
  })
  test('should emit close event when backdrop is clicked', () => {
    wrapper.find('.backdrop').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
  test('should emit close event when close-btn is clicked', () => {
    wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
  test('should emit close event when ok-btn is clicked', () => {
    wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.emitted('action')).toBeTruthy()
  })
})
