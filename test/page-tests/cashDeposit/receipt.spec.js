import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import receipt from '~/pages/cashDeposit/receipt'
import Receipt from '~/components/Receipt'

const localVue = createLocalVue()
localVue.use(Vuex)

const scannedFilledCylindersState = {
  filled_cylinders: [
    {
      name: 'Steel',
      weight: '3kg',
      unitPrice: 20,
      totalPrice: 60,
      quantity: 3,
    },
  ],
}

const scannedFilledCylindersGetters = {
  getTotalPriceOfcashDepositFilledCylinders: () => 100,
}
const cashDepositState = { initialCashDeposit: 160 }
const store = new Vuex.Store({
  modules: {
    cashDeposit: {
      state: cashDepositState,
      namespaced: true,
    },
    scannedFilledCylinders: {
      state: scannedFilledCylindersState,
      getters: scannedFilledCylindersGetters,
      namespaced: true,
    },
  },
})

describe('Checkout component when cashDeposit is set to true', () => {
  let items, $store, $route, $router, push, name, html2pdf, wrapper
  beforeEach(() => {
    push = jest.fn()
    $store = { items }
    $route = { name }
    $router = { push }
    html2pdf = jest.fn()

    wrapper = mount(receipt, {
      store,
      localVue,
      mocks: { $store, $route, $router, html2pdf },
    })
  })
  test('receipt information should render correctly', () => {
    expect(wrapper.findComponent(Receipt).exists()).toBe(true)
    expect(wrapper.find('.heading').text()).toBe('Thank You')
    expect(wrapper.find('.success').text()).toBe(
      'Your transaction was successful'
    )
    expect(wrapper.find('.id').text()).toBe('521265421')
    expect(wrapper.findAll('.refill-quant').at(0).text()).toBe('3')
    expect(wrapper.findAll('.refill-price').at(0).text()).toBe('GHs 60.00')
    expect(wrapper.find('.cash-deposit-name').exists()).toBe(true)
    expect(wrapper.find('.cash-deposit-amount').exists()).toBe(true)
  })

  test('user click on change order button routes back to deposit cylinder page', () => {
    const printArea = wrapper.find('#print-view').html()
    wrapper.find('.print-receipt').trigger('click')
    expect(wrapper.vm.html2pdf(printArea)).toBeFalsy()
  })
})
