import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import Receipt from '~/components/Receipt'

const localVue = createLocalVue()
localVue.use(Vuex)

const cartState = {
  filledCylinders: [
    {
      name: 'Steel',
      weight: '3kg',
      unitPrice: 20,
      totalPrice: 60,
      quantity: 3,
    },
  ],
  depositCylinders: [
    {
      name: 'Hybrid',
      weight: '6kg',
      unitPrice: 20,
      totalPrice: 40,
      quantity: 2,
    },
  ],
}

const cartGetters = {
  getTotalPriceOfFilledCylinders: () => 100,
  getFilledCylinders: () => {
    return [
      {
        name: 'Steel',
        weight: '3kg',
        unitPrice: 20,
        totalPrice: 60,
        quantity: 3,
      },
    ]
  },
  getDepositCylinders: () => {
    return [
      {
        name: 'Hybrid',
        weight: '6kg',
        unitPrice: 20,
        totalPrice: 40,
        quantity: 2,
      },
    ]
  },
}

const store = new Vuex.Store({
  modules: {
    cart: {
      state: cartState,
      getters: cartGetters,
      namespaced: true,
    },
  },
})

describe('Checkout component when cylinderDeposit is set to true', () => {
  let items, $store, $route, $router, push, name, html2pdf, wrapper
  beforeEach(() => {
    push = jest.fn()
    $store = { items }
    $route = { name }
    $router = { push }
    html2pdf = jest.fn()

    wrapper = mount(Receipt, {
      store,
      localVue,
      mocks: { $store, $route, $router, html2pdf },
      propsData: {
        filledCylinders: cartGetters.getFilledCylinders(),
        cylinderDeposit: cartGetters.getDepositCylinders(),
        orderTotal: cartGetters.getTotalPriceOfFilledCylinders(),
        isCylinderDeposit: true,
      },
    })
  })
  test('receipt information should render correctly', () => {
    expect(wrapper.find('.heading').text()).toBe('Thank You')
    expect(wrapper.find('.success').text()).toBe(
      'Your transaction was successful'
    )
    expect(wrapper.find('.id').text()).toBe('521265421')
    expect(wrapper.findAll('.deposit-name').at(0).text()).toBe(
      '6kg Hybrid Cylinder Deposit'
    )
    expect(wrapper.findAll('.deposit-quant').at(0).text()).toBe('2')
    expect(wrapper.findAll('.refill-name').at(0).text()).toBe(
      '3kg Steel Cylinder Refill'
    )
    expect(wrapper.findAll('.refill-quant').at(0).text()).toBe('3')
    expect(wrapper.findAll('.refill-price').at(0).text()).toBe('GHs 60.00')
    expect(wrapper.find('cash-deposit-name').exists()).toBe(false)
    expect(wrapper.find('cash-deposit-amount').exists()).toBe(false)
  })

  test('user click on change order button routes back to deposit cylinder page', () => {
    const printArea = wrapper.find('#print-view').html()
    wrapper.find('.print-receipt').trigger('click')
    expect(wrapper.vm.html2pdf(printArea)).toBeFalsy()
  })
})

describe('Checkout component when cashDeposit is set to true', () => {
  let items, $store, $route, $router, push, name, wrapper
  beforeEach(() => {
    push = jest.fn()
    $store = { items }
    $route = { name }
    $router = { push }

    wrapper = mount(Receipt, {
      store,
      localVue,
      mocks: { $store, $route, $router },
      propsData: {
        filledCylinders: cartGetters.getFilledCylinders(),
        cylinderDeposit: cartGetters.getDepositCylinders(),
        orderTotal: cartGetters.getTotalPriceOfFilledCylinders(),
        isCashDeposit: true,
      },
    })
  })
  test('receipt information should render correctly', () => {
    expect(wrapper.find('.heading').text()).toBe('Thank You')
    expect(wrapper.find('.success').text()).toBe(
      'Your transaction was successful'
    )
    expect(wrapper.find('.id').text()).toBe('521265421')
    expect(wrapper.find('.deposit-name').exists()).toBe(false)
    expect(wrapper.find('.deposit-quant').exists()).toBe(false)
    expect(wrapper.findAll('.refill-name').at(0).text()).toBe(
      '3kg Steel Cylinder Refill'
    )
    expect(wrapper.findAll('.refill-quant').at(0).text()).toBe('3')
    expect(wrapper.findAll('.refill-price').at(0).text()).toBe('GHs 60.00')
    expect(wrapper.find('.cash-deposit-name').text()).toBe(
      'Initial Cash Deposit'
    )
    expect(wrapper.find('.cash-deposit-amount').text()).toBe('GHS 100.00')
  })
})
