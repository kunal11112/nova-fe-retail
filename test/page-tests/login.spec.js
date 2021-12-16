import { mount } from '@vue/test-utils'
import login from '~/pages/index.vue'

describe('login page methods', () => {
  let wrapper, push, $router
  beforeEach(() => {
    push = jest.fn()
    $router = { push }
    wrapper = mount(login, { mocks: { $router } })
  })
  test('login button routes to dashboard', () => {
    wrapper.find('button[type="submit"]').trigger('submit')
    expect(push).toHaveBeenCalledWith('/dashboard')
  })

  test('forgot password button click routes to forgot pin page', () => {
    wrapper.findAll('button[type="button"]').at(1).trigger('click')
    expect(push).toHaveBeenCalledWith('/forgotPin')
  })

  test('new user button click changes showLoginError to true', () => {
    wrapper.findAll('button[type="button"]').at(0).trigger('click')
    expect(push).toHaveBeenCalledWith('/newUserCreatePin')
  })
})

describe('login page inputs', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(login)
  })
  test('should update username data attribute with value of phone number input', () => {
    const input = wrapper.find('input[name="phone number"]')
    input.element.value = 1234
    input.trigger('input')
    expect(wrapper.vm.phoneNumber).toBe('1234')
  })

  test('should update password data attribute with value of pin input', () => {
    const input = wrapper.find('input[name="pin"]')
    input.element.value = 1234
    input.trigger('input')
    expect(wrapper.vm.pin).toBe('1234')
  })
})
