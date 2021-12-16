import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import createPin from '~/components/CustomerRegistrationForms/CreatePin.vue'

describe('createPin page methods', () => {
  let wrapper
  const push = jest.fn()
  const $router = {
    push,
  }
  beforeEach(() => {
    wrapper = mount(createPin, {
      mocks: {
        $router,
      },
    })
  })

  test('complete button click does not submit when the form does not validate', () => {
    wrapper.find('button[type="submit"]').trigger('submit')
    expect(wrapper.vm.showSuccessMessage).toBe(false)
  })

  test('complete button click does not submit the form when the two pins are different', async () => {
    const input = wrapper.find('input[name="new-pin"]')
    const input2 = wrapper.find('input[name="confirm-pin"]')
    input.element.value = '3241'
    input2.element.value = '3245'
    input.trigger('input')
    input2.trigger('input')
    wrapper.find('button[type="submit"]').trigger('submit')
    await flushPromises()
    expect(wrapper.vm.showSuccessMessage).toBe(false)
  })

  test('should submit the form when validation passes and the pins match, and route to index when modal button is clicked', async () => {
    const input = wrapper.find('input[name="new-pin"]')
    const input2 = wrapper.find('input[name="confirm-pin"]')
    input.element.value = '3241'
    input2.element.value = '3241'
    input.trigger('input')
    input2.trigger('input')
    wrapper.find('button[type="submit"]').trigger('submit')
    await flushPromises()
    expect(wrapper.emitted('send-pin')).toBeTruthy()
    expect(wrapper.vm.showSuccessMessage).toBe(true)
    wrapper.find('button[type="button"]').trigger('click')
    expect(push).toHaveBeenCalledWith('/')
  })
})
