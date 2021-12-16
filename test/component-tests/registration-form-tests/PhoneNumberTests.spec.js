import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import phoneNumber from '~/components/CustomerRegistrationForms/PhoneNumber.vue'

describe('phoneNumber page methods', () => {
  let wrapper
  const push = jest.fn()
  const $router = {
    push,
  }

  beforeEach(() => {
    wrapper = mount(phoneNumber, {
      mocks: {
        $router,
      },
    })
  })
  test('back button click routes to otp page', async () => {
    wrapper.find('button[type="submit"]').trigger('submit')
    await flushPromises()
    expect(wrapper.emitted('send-phone-number')).toBeFalsy()
  })
  test('should submit the form when it passes validation and emits send-phone-number event', async () => {
    const input = wrapper.find('input[name="phone number"]')
    input.element.value = '0234590243'
    input.trigger('input')
    expect(wrapper.vm.phoneNumber).toBe('0234590243')
    wrapper.find('button[type="submit"]').trigger('submit')
    await flushPromises()
    expect(wrapper.emitted('send-phone-number')).toBeTruthy()
  })
})
