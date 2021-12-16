import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import forgotPin from '~/pages/forgotPin/index.vue'
import otp from '~/components/CustomerRegistrationForms/Otp.vue'
import createPin from '~/components/CustomerRegistrationForms/CreatePin.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('forgot pin page', () => {
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
    pin: '',
  }

  const registrationActions = {
    setPhoneNumber: jest.fn(),
    setOtp: jest.fn(),
    setName: jest.fn(),
    setPin: jest.fn(),
  }

  const registrationMutations = {
    setPhoneNumber: (state, payload) => (state.phoneNumber = payload),
    setOtp: (state, payload) => (state.otp = payload),
    setCustomerName: (state, payload) => (state.name = payload),
  }

  const store = new Vuex.Store({
    modules: {
      customerRegistration: {
        state: registrationState,
        actions: registrationActions,
        mutations: registrationMutations,
        namespaced: true,
      },
    },
  })

  beforeEach(() => {
    wrapper = mount(forgotPin, {
      store,
      localVue,
      mocks: {
        $router,
        $store,
      },
    })
  })

  test('should render only phone number form on mount', () => {
    expect(wrapper.findComponent(otp).exists()).toBe(true)
    expect(wrapper.vm.step).toBe(1)
    expect(wrapper.vm.sideIcon).toBe('password-key-icon')

    expect(wrapper.findComponent(createPin).exists()).toBe(false)
  })

  test('next button click routes to otp page', async () => {
    // trigger input in 6 otp fields
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

    // setOtp action should be dispatched
    expect(registrationActions.setOtp).toHaveBeenCalled()
    expect(wrapper.vm.step).toBe(2)

    // create pin form should now be visible
    expect(wrapper.findComponent(createPin).exists()).toBe(true)
    expect(wrapper.vm.sideIcon).toBe('forgot-pin-profile-icon')

    // trigger inputs in createPin fields
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

    //  setPin action should be dispatched and form is submitted
    expect(registrationActions.setPin).toHaveBeenCalled()
  })
})
