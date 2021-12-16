import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import customerName from '~/components/CustomerRegistrationForms/CustomerName.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('customerName page methods', () => {
  let wrapper
  const push = jest.fn()
  const $router = {
    push,
  }
  beforeEach(() => {
    wrapper = mount(customerName, {
      mocks: {
        $router,
      },
    })
  })

  test('send otp button click does not submit when the form does not validate', () => {
    wrapper.find('button[type="submit"]').trigger('submit')
    expect(wrapper.vm.registrationSuccess).toBe(false)
  })

  test('should submit the form when it passes validation, emmits send-name event and opens modal', async () => {
    const input = wrapper.find('input[name="first name"]')
    const input2 = wrapper.find('input[name="last name"]')
    input.element.value = 'mesut'
    input2.element.value = 'ozil'
    input.trigger('input')
    input2.trigger('input')
    wrapper.find('button[type="submit"]').trigger('submit')
    await flushPromises()
    expect(wrapper.emitted('send-name')).toBeTruthy()
    expect(wrapper.vm.registrationSuccess).toBe(true)
  })
})
