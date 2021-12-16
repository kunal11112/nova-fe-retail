import { shallowMount } from '@vue/test-utils'
import dashboard from '~/pages/dashboard/index.vue'

describe('Dashboard Icon Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(dashboard)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('register-btn routes to registerclient/phonenumber', () => {
    const push = jest.fn()
    const $router = {
      push,
    }
    wrapper = shallowMount(dashboard, {
      mocks: {
        $router,
      },
    })
    wrapper.find('.register-client-button').trigger('click')
    expect(push).toHaveBeenCalledWith('/registerclient')
  })
})
