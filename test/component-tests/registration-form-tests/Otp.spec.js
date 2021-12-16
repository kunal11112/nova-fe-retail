import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import otp from '~/components/CustomerRegistrationForms/Otp.vue'
import otperror from '~/components/AppModal.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('OTP Signup Page', () => {
  let wrapper
  const push = jest.fn()
  const $router = {
    push,
  }
  beforeEach(() => {
    wrapper = mount(otp, {
      mocks: {
        $router,
      },
    })
  })

  test('complete button click sets showOTP to true', () => {
    wrapper.find('button[type="button"]').trigger('click')
    expect(wrapper.vm.showOtpError).toBe(true)
  })

  test('otp error modal shows when showOtpError is true', () => {
    wrapper = mount(otp, {
      data() {
        return {
          showOtpError: true,
        }
      },
    })
    expect(wrapper.findComponent(otperror).exists()).toBe(true)
  })

  test('otp data variable on input', () => {
    const input = wrapper.find('input[name="ref1"]')
    const input2 = wrapper.find('input[name="ref2"]')
    const input3 = wrapper.find('input[name="ref3"]')
    const input4 = wrapper.find('input[name="ref4"]')
    const input5 = wrapper.find('input[name="ref5"]')
    const input6 = wrapper.find('input[name="ref6"]')
    input.element.value = 3
    input2.element.value = 5
    input3.element.value = 6
    input4.element.value = 2
    input5.element.value = 0
    input6.element.value = 3
    input.trigger('input')
    input2.trigger('input')
    input3.trigger('input')
    input4.trigger('input')
    input5.trigger('input')
    input6.trigger('input')
    expect(wrapper.vm.otp).toBe('356203')
    wrapper.find('button[type="submit"]').trigger('submit')
    expect(wrapper.emitted('send-otp')).toBeTruthy()
  })
})
