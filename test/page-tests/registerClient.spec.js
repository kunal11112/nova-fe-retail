import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import registerClient from '~/pages/registerClient/index.vue'
import phoneNumber from '~/components/CustomerRegistrationForms/PhoneNumber.vue'
import otp from '~/components/CustomerRegistrationForms/Otp.vue'
import customerName from '~/components/CustomerRegistrationForms/CustomerName.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('registerClient', () => {
  let wrapper
  const push = jest.fn()
  const dispatch = jest.fn()
  const $router = {
    push,
  }

  const $store = { dispatch }

  const registrationState = {
    name: {},
    otp: '',
    phoneNumber: '',
  }

  const registrationActions = {
    setPhoneNumber: jest.fn(),
    setOtp: jest.fn(),
    setName: jest.fn(),
  }
  const store = new Vuex.Store({
    modules: {
      customerRegistration: {
        state: registrationState,
        actions: registrationActions,
        namespaced: true,
      },
    },
  })

  beforeEach(() => {
    wrapper = mount(registerClient, {
      store,
      localVue,
      mocks: {
        $router,
        $store,
      },
    })
  })

  test('should register', () => {
    expect(wrapper.findComponent(phoneNumber).exists()).toBe(true)
    expect(wrapper.vm.step).toBe(1)
    expect(wrapper.vm.sideIcon).toBe('phone-icon')

    expect(wrapper.findComponent(otp).exists()).toBe(false)
    expect(wrapper.findComponent(customerName).exists()).toBe(false)
  })

  test('next button click routes to otp page', async () => {
    // trigger input in the phone number form
    const input = wrapper.find('input[name="phone number"]')
    input.element.value = '0234590243'
    input.trigger('input')

    // trigger submit button to submit data from phone number form
    wrapper.find('button[type="submit"]').trigger('submit')
    // wait for asynchronous validation code to finish executing
    await flushPromises()

    // expect setPhoneNumber action to be dispatched when form is submitted
    expect(registrationActions.setPhoneNumber).toHaveBeenCalled()
    expect(wrapper.vm.step).toBe(2)
    expect(wrapper.findComponent(otp).exists()).toBe(true)
    expect(wrapper.vm.sideIcon).toBe('password-key-icon')

    // expect otp component to be rendered
    expect(wrapper.findComponent(otp).exists()).toBe(true)

    // trigger 6 inputs in the otp component
    const otpInput1 = wrapper.find('input[name="ref1"]')
    const otpInput2 = wrapper.find('input[name="ref2"]')
    const otpInput3 = wrapper.find('input[name="ref3"]')
    const otpInput4 = wrapper.find('input[name="ref4"]')
    const otpInput5 = wrapper.find('input[name="ref5"]')
    const otpInput6 = wrapper.find('input[name="ref6"]')
    otpInput1.element.value = 3
    otpInput2.element.value = 5
    otpInput3.element.value = 6
    otpInput4.element.value = 2
    otpInput5.element.value = 0
    otpInput6.element.value = 3
    otpInput1.trigger('input')
    otpInput2.trigger('input')
    otpInput3.trigger('input')
    otpInput4.trigger('input')
    otpInput5.trigger('input')
    otpInput6.trigger('input')
    // trigger submit button to submit data from phone number form
    wrapper.find('button[type="submit"]').trigger('submit')
    // wait for asynchronous validation code to finish executing
    await flushPromises()

    // expect setOtp action to be dispatched when otp form is submitted
    expect(registrationActions.setOtp).toHaveBeenCalled()
    expect(wrapper.vm.step).toBe(3)

    // expect customer name component to be rendered
    expect(wrapper.findComponent(customerName).exists()).toBe(true)
    expect(wrapper.vm.sideIcon).toBe('user-icon')

    // trigger input in customer name component forms
    const nameInput1 = wrapper.find('input[name="first name"]')
    const nameInput2 = wrapper.find('input[name="last name"]')
    nameInput1.element.value = 'mesut'
    nameInput2.element.value = 'ozil'
    nameInput1.trigger('input')
    nameInput2.trigger('input')

    // trigger submit button to submit data from customer name form
    wrapper.find('button[type="submit"]').trigger('submit')
    // wait for asynchronous validation code to finish executing
    await flushPromises()

    // expect setName action to be dispatched when the form is submitted
    expect(registrationActions.setName).toHaveBeenCalled()
  })
})
