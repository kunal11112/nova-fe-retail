import { mount } from '@vue/test-utils'
import Total from '~/components/AppCheckoutTotal.vue'

describe('AppCheckoutTotal Component', () => {
  beforeEach(() => jest.resetModules())
  test('renders value of amount prop', () => {
    const wrapper = mount(Total, {
      propsData: { totalCost: 21 },
    })
    expect(wrapper.isVueInstance).toBeTruthy()
    expect(wrapper.text()).toContain('GHS 21')
  })
})
