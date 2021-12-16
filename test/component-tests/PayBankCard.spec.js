import { mount } from '@vue/test-utils'
import PayBankCard from '~/components/PayBankCard.vue'
describe('', () => {
  const wrapper = mount(PayBankCard)
  test('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  test('input tag accepts Card Number', () => {
    const input = wrapper.find('input[name="Card Number"]')
    input.element.value = '12345'
    input.trigger('input')
    expect(wrapper.vm.payment.cardNumber).toBe('12345')
  })

  test('input tag accepts Name on Card', () => {
    const input = wrapper.find('input[name="Name on Card"]')
    input.element.value = 'xxxx'
    input.trigger('input')
    expect(wrapper.vm.payment.cardName).toBe('xxxx')
  })

  test('input tag accepts Expiry Date', () => {
    const input = wrapper.find('input[name="Expiry Date"]')
    input.element.value = '1/02/2001'
    input.trigger('input')
    expect(wrapper.vm.payment.cardDate).toBe('1/02/2001')
  })

  test('input tag accepts CVV', () => {
    const input = wrapper.find('input[name="CVV"]')
    input.element.value = '111'
    input.trigger('input')
    expect(wrapper.vm.payment.cardCVV).toBe('111')
  })

  test('selecting mastercard option changes payment type to mastercard from visa card', () => {
    expect(wrapper.vm.payment.type).toBe('visa')
    wrapper.find('.mastercard').trigger('click')
    expect(wrapper.vm.payment.type).toBe('mastercard')
  })
})
