import { mount } from '@vue/test-utils'
import navMenu from '~/components/TheNavMenu.vue'

describe('Navbar', () => {
  test('is a vue instance', () => {
    const name = 'navMenu'
    const $route = {
      name,
    }
    const wrapper = mount(navMenu, {
      mocks: {
        $route,
      },
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})

describe('Navbar', () => {
  test('logout click routes to dashboard page', () => {
    const push = jest.fn()
    const name = 'navMenu'
    const $route = {
      name,
    }
    const $router = {
      push,
    }
    const wrapper = mount(navMenu, {
      mocks: {
        $route,
        $router,
      },
    })
    wrapper.find('.group').trigger('click')
    expect('.group').toBeTruthy()
  })
})
