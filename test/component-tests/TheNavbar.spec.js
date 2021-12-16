import { shallowMount } from '@vue/test-utils'
import AppNavbar from '~/components/TheNavbar.vue'

describe('Navbar', () => {
  test('should call dashboard route when nova logo is clicked', () => {
    const push = jest.fn()
    const $router = {
      push,
    }
    const wrapper = shallowMount(AppNavbar, {
      mocks: { $router },
    })

    wrapper.find('.nova-logo').trigger('click')
    expect(push).toHaveBeenCalledWith('/dashboard')
  })
})
