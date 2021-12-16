import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import checkout from '~/pages/cashDeposit/checkout.vue'
import AppCheckoutTotal from '~/components/AppCheckoutTotal'
import AppCheckoutSummary from '~/components/AppCheckoutSummary'
import ScannedCylindersTable from '~/components/ScannedCylindersTable'
import PayMobileMoney from '~/components/PayMobileMoney'
import PayBankCard from '~/components/PayBankCard'
const localVue = createLocalVue()
localVue.use(Vuex)

describe('', () => {
  let checkoutActions,
    checkoutState,
    store,
    $store,
    $route,
    $router,
    push,
    name,
    wrapper,
    scannedFilledCylindersGetters,
    scannedFilledCylindersState,
    scannedFilledCylindersActions
  beforeEach(() => {
    push = jest.fn()
    $store = {}
    $route = { name }
    $router = { push }
    name = 'checkout'
    checkoutState = {
      initialCashDeposit: 0,
    }
    scannedFilledCylindersState = {
      filled_cylinders: [
        {
          name: 'Steel',
          weight: '3kg',
          unitPrice: 20,
          totalPrice: 60,
          quantity: 3,
        },
        {
          name: 'Hybrid',
          weight: '6kg',
          unitPrice: 20,
          totalPrice: 40,
          quantity: 2,
        },
      ],
    }
    checkoutActions = {
      storeInitialCashDeposit: jest.fn(),
    }
    scannedFilledCylindersGetters = {
      getTotalPriceOfcashDepositFilledCylinders: () => 100,
    }
    scannedFilledCylindersActions = {
      storeCylindersInSession: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        cashDeposit: {
          actions: checkoutActions,
          state: checkoutState,
          namespaced: true,
        },
        scannedFilledCylinders: {
          state: scannedFilledCylindersState,
          getters: scannedFilledCylindersGetters,
          actions: scannedFilledCylindersActions,
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
  test('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
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
  })

  test('user click on bank cards payment option renders PayBankCard component', async () => {
    await wrapper.find('.cards-icon').trigger('click')
    expect(wrapper.findComponent(AppCheckoutSummary).exists()).toBe(false)
    expect(wrapper.findComponent(PayMobileMoney).exists()).toBe(false)
    expect(wrapper.findComponent(AppCheckoutTotal).exists()).toBe(true)
    expect(wrapper.findComponent(PayBankCard).exists()).toBe(true)
    expect(wrapper.vm.payment_type).toBe('Cards')
  })

  test('user click on other methods payment option renders only AppCheckoutTotal component', async () => {
    await wrapper.find('.other-payments-icon').trigger('click')
    expect(wrapper.findComponent(AppCheckoutSummary).exists()).toBe(false)
    expect(wrapper.findComponent(PayMobileMoney).exists()).toBe(false)
    expect(wrapper.findComponent(AppCheckoutTotal).exists()).toBe(true)
    expect(wrapper.findComponent(PayBankCard).exists()).toBe(false)
    expect(wrapper.vm.payment_type).toBe('Others')
  })

  test('onclick cash icon routes to cashDeposit receipt page', () => {
    wrapper.find('.cash-icon').trigger('click')
    expect(push).toHaveBeenCalledWith('/cashDeposit/receipt')
  })
})
