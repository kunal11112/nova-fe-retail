import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ScannedCylindersGallery from '~/pages/depositCylinder/scannedFilledCylindersList'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ScannedCylindersGallery', () => {
  let scannedFilledCylindersState,
    scannedFilledCylindersActions,
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
    wrapper = mount(ScannedCylindersGallery, {
      store,
      localVue,
      mocks: { $store, $route, $router, window },
    })
  })

  test('scan another deposit cylinder button click calls resetSelectedItems action from the store and routes to the scanning page', () => {
    wrapper.find('button[type="submit"]').trigger('click')
    expect(push).toHaveBeenCalledWith('/depositCylinder/checkout')
  })
})
