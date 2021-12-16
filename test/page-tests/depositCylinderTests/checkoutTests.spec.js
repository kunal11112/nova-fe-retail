import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import checkout from '~/pages/depositCylinder/checkout'
import AppCheckoutTotal from '~/components/AppCheckoutTotal'
import AppCheckoutSummary from '~/components/AppCheckoutSummary'
import ScannedCylindersTable from '~/components/ScannedCylindersTable'
import PayMobileMoney from '~/components/PayMobileMoney'
import PayBankCard from '~/components/PayBankCard'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Checkout', () => {
  let cartState,
    cartGetters,
    store,
    items,
    $store,
    $route,
    $router,
    push,
    name,
    wrapper
  beforeEach(() => {
    push = jest.fn()
    $store = { items }
    $route = { name }
    $router = { push }

    cartState = {
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

    cartGetters = {
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

    store = new Vuex.Store({
      modules: {
        cart: {
          state: cartState,
          getters: cartGetters,
          namespaced: true,
        },
      },
    })
    wrapper = mount(checkout, {
      store,
      localVue,
      mocks: { $store, $route, $router },
    })
  })
  test('should render the desired components on mount', () => {
    expect(wrapper.findComponent(ScannedCylindersTable).exists()).toBe(true)
    expect(wrapper.findComponent(AppCheckoutSummary).exists()).toBe(true)
    expect(wrapper.findComponent(AppCheckoutTotal).exists()).toBe(false)
    expect(wrapper.findComponent(PayBankCard).exists()).toBe(false)
    expect(wrapper.findComponent(PayMobileMoney).exists()).toBe(false)
  })

  test('filled cylinders information should render correctly', () => {
    expect(wrapper.find('.description').text()).toBe('3kg/Steel')
    expect(wrapper.find('.price').text()).toBe('GHS 60')
    expect(wrapper.find('.quantity').text()).toBe('3')
  })

  test('user click on mobile money payment option renders PayMobileMoney component', async () => {
    await wrapper.find('.mobile-money-icon').trigger('click')
    expect(wrapper.findComponent(AppCheckoutSummary).exists()).toBe(false)
    expect(wrapper.findComponent(PayMobileMoney).exists()).toBe(true)
    expect(wrapper.findComponent(AppCheckoutTotal).exists()).toBe(true)
    expect(wrapper.findComponent(PayBankCard).exists()).toBe(false)
    expect(wrapper.vm.payment_type).toBe('Mobile Money')

    // click on pay button submits the form to the receipt page
    wrapper.findAll('button').at(0).trigger('submit')
    expect(push).toHaveBeenCalledWith('/depositCylinder/receipt')
  })

  test('user click on bank cards payment option renders PayBankCard component', async () => {
    await wrapper.find('.cards-icon').trigger('click')
    expect(wrapper.findComponent(AppCheckoutSummary).exists()).toBe(false)
    expect(wrapper.findComponent(PayMobileMoney).exists()).toBe(false)
    expect(wrapper.findComponent(AppCheckoutTotal).exists()).toBe(true)
    expect(wrapper.findComponent(PayBankCard).exists()).toBe(true)
    expect(wrapper.vm.payment_type).toBe('Cards')

    // click on pay button submits the form to the receipt page
    wrapper.findAll('button').at(0).trigger('submit')
    expect(push).toHaveBeenCalledWith('/depositCylinder/receipt')
  })

  test('user click on other methods payment option renders only AppCheckoutTotal component', async () => {
    await wrapper.find('.other-payments-icon').trigger('click')
    expect(wrapper.findComponent(AppCheckoutSummary).exists()).toBe(false)
    expect(wrapper.findComponent(PayMobileMoney).exists()).toBe(false)
    expect(wrapper.findComponent(AppCheckoutTotal).exists()).toBe(true)
    expect(wrapper.findComponent(PayBankCard).exists()).toBe(false)
    expect(wrapper.vm.payment_type).toBe('Others')
  })

  test('user click on change order button routes back to deposit cylinder page', () => {
    wrapper.findAll('button').at(0).trigger('click')
    expect(push).toHaveBeenCalledWith('/depositCylinder')
  })

  test('user click on cash payment option routes to receipt page', () => {
    wrapper.find('.cash-icon').trigger('click')
    expect(push).toHaveBeenCalledWith('/depositCylinder/receipt')
  })
})
