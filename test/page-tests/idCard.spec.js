import { mount } from '@vue/test-utils'
import scanner from '~/pages/registerClient/idCard.vue'

describe('scan id page', () => {
  let mockMediaDevices, wrapper
  beforeEach(() => {
    mockMediaDevices = {
      getUserMedia: jest.fn().mockResolvedValueOnce('fake data'),
    }
    Object.defineProperty(window.navigator, 'mediaDevices', {
      writable: true,
      value: mockMediaDevices,
    })
    wrapper = mount(scanner, {
      data() {
        return {
          showFrame: false,
        }
      },
    })
  })

  test('should have a video stream present', () => {
    expect(mockMediaDevices.getUserMedia).toHaveBeenCalled()
  })

  test('capture btn calls takePhoto function', () => {
    wrapper.findAll('button[type="button"]').at(0).trigger('click')
    expect(wrapper.vm.pictureTaken).toBe(true)
  })

  test('', () => {
    const captureBtn = wrapper.findAll('button[type="button"]').at(0)
    captureBtn.trigger('click')
    expect(wrapper.vm.pictureTaken).toBe(true)
    expect(
      wrapper.vm.$refs.canvas
        .getContext('2d')
        .drawImage(wrapper.vm.$refs.camera, 0, 0, 300, 150)
    ).toBeFalsy()
    expect(wrapper.vm.idDetails).toStrictEqual({
      cardNumber: 'ADL-23101985-10122',
      cardName: 'LARYEA ADOLPHUS',
      expiryDate: '2025-03-25',
    })
    captureBtn.trigger('click')
    expect(wrapper.vm.idDetails).toStrictEqual({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
    })
  })
})

describe('scan id page', () => {
  let mockMediaDevices, wrapper, push, go, $router
  beforeEach(() => {
    push = jest.fn()
    go = jest.fn()
    $router = { push, go }
    mockMediaDevices = {
      getUserMedia: jest.fn().mockResolvedValueOnce('fake data'),
    }
    Object.defineProperty(window.navigator, 'mediaDevices', {
      writable: true,
      value: mockMediaDevices,
    })
    wrapper = mount(scanner, {
      data() {
        return {
          showFrame: true,
        }
      },
      mocks: {
        $router,
      },
    })
  })
  test('click on submit button routes to make deposit page', () => {
    expect(wrapper.vm.pictureTaken).toBe(false)
    wrapper.find('button[type="submit"]').trigger('submit')
    expect(go).toHaveBeenCalledWith(0)
  })

  test('click on submit button routes to make deposit page', async () => {
    const captureBtn = wrapper.findAll('button[type="button"]').at(0)
    await captureBtn.trigger('click')
    await captureBtn.trigger('click')
    wrapper.find('button[type="submit"]').trigger('submit')
    expect(push).toHaveBeenCalledWith('/makedeposit')
  })

  test('capture btn label changes on click', async () => {
    const captureBtn = wrapper.findAll('button[type="button"]').at(0)
    expect(captureBtn.text()).toBe('Start Scanning')
    await captureBtn.trigger('click')
    expect(captureBtn.text()).toBe('Capture')
    await captureBtn.trigger('click')
    expect(captureBtn.text()).toBe('Rescan')
  })
})
