import { mount } from '@vue/test-utils'
import AppInput from '~/components/AppInput.vue'

describe('Unit tests for Input Component', () => {
  let wrapper
  let inputType
  beforeEach(() => {
    wrapper = mount(AppInput, {
      propsData: {
        type: inputType,
        label: 'username',
        name: 'username',
        value: 'likemD',
        containerClass: 'one',
        fieldClass: 'one',
      },
    })
  })
  test('value of showPassword variable shows true when type prop is set to text', () => {
    inputType = 'text'
    expect(wrapper.vm.showPassword).toBe(true)
  })

  test('value of showPassword variable shows true when type prop is set to password', () => {
    inputType = 'password'
    expect(wrapper.vm.showPassword).toBe(true)
  })

  test('Calls toggleShow', () => {
    inputType = 'password'
    wrapper.vm.toggleShow = jest.fn()

    wrapper.find('img.eye').trigger('click')
    expect(wrapper.vm.toggleShow).toHaveBeenCalled()
  })

  test('toggle changes boolean value of show password variable', () => {
    inputType = 'password'
    expect(wrapper.vm.toggleShow()).toBe(true)
  })
})
