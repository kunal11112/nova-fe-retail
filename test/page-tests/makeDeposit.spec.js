import { mount } from '@vue/test-utils'
import makeDeposit from '~/pages/makeDeposit/index.vue'

describe('makeDeposit', () => {
  test('is a vue instance', () => {
    const name = 'makeDeposit'
    const $route = {
      name,
    }
    const wrapper = mount(makeDeposit, {
      mocks: {
        $route,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('depositCash click routes to cashDeposit page', () => {
    const push = jest.fn()
    const name = 'makeDeposit'
    const $route = {
      name,
    }
    const $router = {
      push,
    }
    const wrapper = mount(makeDeposit, {
      mocks: {
        $route,
        $router,
      },
    })
    wrapper.find('.depositCash').trigger('click')
    expect(push).toHaveBeenCalledWith('/cashDeposit')
  })

  test('depositCylinder click routes to depositCylinder page', () => {
    const push = jest.fn()
    const name = 'makeDeposit'
    const $route = {
      name,
    }
    const $router = {
      push,
    }
    const wrapper = mount(makeDeposit, {
      mocks: {
        $route,
        $router,
      },
    })
    wrapper.find('.depositCylinder').trigger('click')
    expect(push).toHaveBeenCalledWith('/depositCylinder')
  })
})
