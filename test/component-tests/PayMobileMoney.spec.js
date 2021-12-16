import { mount } from '@vue/test-utils'
import PayMobileMoney from '~/components/PayMobileMoney.vue'

describe('PayMobileMoney component', () => {
  const wrapper = mount(PayMobileMoney)

  test('should change value of network variable when user toggles between networks', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
    expect(wrapper.vm.payment.network).toBe('vodafone')
    wrapper.find('.mtn').trigger('click')
    expect(wrapper.vm.payment.network).toBe('mtn')
    wrapper.find('.airtel').trigger('click')
    expect(wrapper.vm.payment.network).toBe('airtel')
    wrapper.find('.vodafone').trigger('click')
    expect(wrapper.vm.payment.network).toBe('vodafone')
  })

  test('input tag accepts Phone Number', () => {
    const input = wrapper.find('input[name="Phone Number"]')
    input.element.value = '12345'
    input.trigger('input')
    expect(wrapper.vm.payment.phoneNumber).toBe('12345')
  })
})
