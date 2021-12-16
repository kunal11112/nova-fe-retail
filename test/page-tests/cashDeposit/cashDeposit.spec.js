import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import cashDeposit from '~/pages/cashDeposit/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('', () => {
  let store,
    $store,
    $route,
    $router,
    push,
    name,
    wrapper,
    items,
    scannedFilledCylindersState,
    scannedFilledCylindersActions

  beforeEach(() => {
    push = jest.fn()
    $store = { items }
    $route = { name }
    $router = { push }
    name = 'cashDeposit'
    scannedFilledCylindersState = {
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

    scannedFilledCylindersActions = {
      storeCylindersInSession: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        scannedFilledCylinders: {
          state: scannedFilledCylindersState,
          actions: scannedFilledCylindersActions,
          namespaced: true,
        },
      },
    })
    wrapper = mount(cashDeposit, {
      store,
      localVue,
      mocks: { $store, $route, $router, window },
    })
  })
  test('is a vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  test('to find filledCylinders is not null', () => {
    expect(wrapper.vm.filledCylinders).toStrictEqual([
      {
        name: 'Steel',
        weight: '3kg',
        unitPrice: 20,
        totalPrice: 60,
        quantity: 3,
      },
    ])
  })

  test('proceedToCheckout function sets scanFilledCylinder to true', () => {
    wrapper.vm.proceedToCheckout()
    expect(wrapper.vm.scanFilledCylinder).toBe(true)
    wrapper.vm.proceedToCheckout()
    expect(push).toHaveBeenCalledWith('/cashDeposit/checkout')
    wrapper.destroy()
  })

  test('Submit button label changes on click', async () => {
    const submitButton = wrapper.find('button[type="submit"]')
    expect(wrapper.vm.scanFilledCylinder).toBe(false)
    expect(submitButton.text()).toBe('Scan Filled Cylinder')
    await submitButton.trigger('click')
    expect(wrapper.vm.scanFilledCylinder).toBe(true)
    expect(submitButton.text()).toBe('Proceed To Checkout')
  })
})
