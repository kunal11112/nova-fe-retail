import { shallowMount } from '@vue/test-utils'
import AppStepper from '~/components/AppStepper'

describe('AppStepper', () => {
  test('should', () => {
    const push = jest.fn()
    const $router = { push }
    const wrapper = shallowMount(AppStepper, {
      propsData: {
        steps: 3,
        currentStep: 2,
      },
      mocks: { $router },
    })
    expect(wrapper.findAll('.step-node').length).toBe(3)
    expect(wrapper.findAll('.step-link').length).toBe(2)
    expect(wrapper.findAll('.done').length).toBe(1)
    wrapper.findAll('.step-node').at(2).trigger('click')
    expect(wrapper.emitted('change-step')).toBeTruthy()
  })
})
