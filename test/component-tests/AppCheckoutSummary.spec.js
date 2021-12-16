import { mount } from '@vue/test-utils'
import Summary from '~/components/AppCheckoutSummary.vue'

describe('AppCheckoutSummary Component', () => {
  let wrapper, bill
  beforeEach(() => {
    bill = [
      { weight: '3kg', name: 'Steel', totalPrice: '20', quantity: 3 },
      { weight: '6kg', name: 'Fibre', totalPrice: '30', quantity: 2 },
    ]

    wrapper = mount(Summary, {
      propsData: { bill, deposit: 100, amount: 20 },
    })
  })
  test('should render name of product', () => {
    expect(wrapper.text()).toContain('3kg Steel Cylinder Refill')
    expect(wrapper.findAll('span').at(0).text()).toBe('(x3)')
    expect(wrapper.text()).toContain('6kg Fibre Cylinder Refill')
    expect(wrapper.findAll('span').at(2).text()).toBe('(x2)')
  })
})
