import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ScannedCylindersGallery from '~/pages/depositCylinder/scannedDepositCylindersList'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ScannedCylindersGallery', () => {
  let cylinderMutations,
    cylinderState,
    cylinderActions,
    cylinderGetters,
    scannedDepositCylindersState,
    scannedDepositCylindersActions,
    store,
    items,
    $store,
    $route,
    $router,
    push,
    name,
    mapGetters,
    wrapper
  beforeEach(() => {
    push = jest.fn()
    mapGetters = jest.fn()
    $store = { items }
    $route = { name }
    $router = { push }
    cylinderState = {
      cylinders: [
        { name: 'Steel', weight: '3kg', price: 20, selected: false },
        { name: 'Hybrid', weight: '6kg', price: 20, selected: false },
        { name: 'Fibre', weight: '14kg', price: 20, selected: false },
      ],
    }

    cylinderMutations = {
      setSelectedItem: jest.fn(),
      resetSelected: jest.fn(),
    }

    cylinderActions = {
      setSelectedItem: jest.fn(),
      resetSelectedItems: jest.fn(),
    }

    cylinderGetters = {
      getSelectedCylinder: () => {
        return cylinderState.cylinders.filter((c) => c.selected === true)
      },
    }

    scannedDepositCylindersState = {
      deposit_cylinders: [],
    }

    scannedDepositCylindersActions = {
      addDepositCylinder: jest.fn(),
      reduceCylinderQuantity: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        productCatalog: {
          state: cylinderState,
          mutations: cylinderMutations,
          actions: cylinderActions,
          getters: cylinderGetters,
          namespaced: true,
        },
        scannedDepositCylinders: {
          state: scannedDepositCylindersState,
          actions: scannedDepositCylindersActions,
          namespaced: true,
        },
      },
    })
    wrapper = mount(ScannedCylindersGallery, {
      store,
      localVue,
      mocks: { $store, $route, $router, mapGetters, length },
    })
  })
  test('scan another deposit cylinder button click calls resetSelectedItems action from the store and routes to the scanning page', () => {
    wrapper.find('button[type="button"]').trigger('click')
    expect(cylinderActions.resetSelectedItems).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith('/depositcylinder')
  })

  test('reduceItemQuantity function call triggers a call to the store actions to reset selected items and reduce item quantity', () => {
    let val
    wrapper.vm.reduceItemQuantity(val)
    expect(cylinderActions.resetSelectedItems).toHaveBeenCalled()
    expect(
      scannedDepositCylindersActions.reduceCylinderQuantity
    ).toHaveBeenCalled()
  })
})
