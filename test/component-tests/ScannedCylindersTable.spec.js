import { mount } from '@vue/test-utils'
import ScannedCylindersTable from '~/components/ScannedCylindersTable.vue'

describe('ScannedCylindersTable', () => {
  test('should render display dataItems as text', () => {
    const wrapper = mount(ScannedCylindersTable, {
      propsData: {
        columns: ['yes', 'no', 'maybe', 'so'],
        dataItems: [
          { weight: '3kg', name: 'Steel', quantity: 3, totalPrice: 20 },
        ],
        headClass: '',
        bodyClass: '',
      },
    })
    expect(wrapper.find('.description').text()).toBe('3kg/Steel')
    expect(wrapper.find('.price').text()).toBe('GHS 20')
    expect(wrapper.find('.quantity').text()).toBe('3')
  })
})
