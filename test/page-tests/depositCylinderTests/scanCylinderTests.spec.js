import { mount } from '@vue/test-utils'
import scan from '~/pages/depositCylinder/index.vue'

describe('Scan Deposit Cylinder Page', () => {
  let mockMediaDevices, $route, $router, push, name, wrapper, drawImage
  beforeEach(() => {
    mockMediaDevices = {
      getUserMedia: jest.fn().mockResolvedValueOnce('fake data'),
    }
    Object.defineProperty(window.navigator, 'mediaDevices', {
      writable: true,
      value: mockMediaDevices,
    })
    name = '/depositcylinder/'
    drawImage = jest.fn()
    push = jest.fn()
    $route = { name }
    $router = { push }
    wrapper = mount(scan, {
      mocks: {
        $route,
        $router,
        drawImage,
      },
    })
  })

  test('button click takes picture', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
    expect(
      wrapper.vm.$refs.canvas
        .getContext('2d')
        .drawImage(wrapper.vm.$refs.canvas, 0, 0, 100, 200)
    ).toBeFalsy()
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.pictureTaken).toBe(true)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.pictureTaken).toBe(false)
  })

  test('select cylinder image click routes to select cylinder size page', () => {
    wrapper.find('button').trigger('click')
    wrapper.find('.select-cylinder-size-image').trigger('click')
    expect(push).toHaveBeenCalledWith('/depositcylinder/selectCylinderSize')
  })
})
