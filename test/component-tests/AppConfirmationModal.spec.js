import { mount } from '@vue/test-utils'
import appConfirmationModal from '~/components/AppConfirmationModal.vue'

describe('AppConfirmationModal component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(appConfirmationModal)
    expect(wrapper.vm).toBeTruthy()
  })
})
describe('Login Error Message', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(appConfirmationModal)
  })
  test('cancel button emits close event on click', () => {
    wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })
  test('yes button emits confirm event on click', () => {
    wrapper.find('button[type="submit"]').trigger('click')
    expect(wrapper.emitted().action).toBeTruthy()
  })
  test('close button emits close event on click', () => {
    wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  test('backdrop emits close event on click', () => {
    wrapper.find('.backdrop').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
