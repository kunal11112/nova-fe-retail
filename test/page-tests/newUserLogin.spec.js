import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import newUser from '~/pages/newUserCreatePin/index.vue'
import phoneNumber from '~/components/CustomerRegistrationForms/PhoneNumber.vue'
import otp from '~/components/CustomerRegistrationForms/Otp.vue'
import createPin from '~/components/CustomerRegistrationForms/CreatePin.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('new user create pin page', () => {
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
    setPin: jest.fn(),
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
    wrapper = mount(newUser, {
      store,
      localVue,
      mocks: {
        $router,
        $store,
      },
    })
  })

  test('should render phone number form when mounted', () => {
    // phone number component is displayed mount
    expect(wrapper.findComponent(phoneNumber).exists()).toBe(true)
    expect(wrapper.vm.step).toBe(1)
    expect(wrapper.vm.sideIcon).toBe('phone-icon')

    // otp and create pin components should not be rendered
    expect(wrapper.findComponent(otp).exists()).toBe(false)
    expect(wrapper.findComponent(createPin).exists()).toBe(false)
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

    // expect create pin component to be rendered
    expect(wrapper.findComponent(createPin).exists()).toBe(true)
    expect(wrapper.vm.sideIcon).toBe('forgot-pin-profile-icon')

    // trigger input in create pin component forms
    const nameInput1 = wrapper.find('input[name="new-pin"]')
    const nameInput2 = wrapper.find('input[name="confirm-pin"]')
    nameInput1.element.value = '3241'
    nameInput2.element.value = '3241'
    nameInput1.trigger('input')
    nameInput2.trigger('input')

    // trigger submit button to submit data from phone number form
    wrapper.find('button[type="submit"]').trigger('submit')
    // wait for asynchronous validation code to finish executing
    await flushPromises()

    // expect set pin action to be called when create pin form is submitted
    expect(registrationActions.setPin).toHaveBeenCalled()
  })
})
