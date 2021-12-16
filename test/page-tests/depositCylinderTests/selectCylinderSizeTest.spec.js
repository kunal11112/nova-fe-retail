import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import SelectCylinderPage from '~/pages/depositCylinder/selectCylinderSize.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('', () => {
  let cylinderMutations,
    cylinderState,
    cylinderActions,
    scannedDepositCylindersState,
    scannedDepositCylindersMutations,
    scannedDepositCylindersActions,
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
      resetSelected: jest.fn(),
    }

    scannedDepositCylindersState = {
      depositCylinders: [],
    }

    scannedDepositCylindersMutations = {
      setDepositCylinders: jest.fn(),
      addToDepositCylinders: jest.fn(),
    }

    scannedDepositCylindersActions = {
      loadDepositCylinders: jest.fn(),
      addDepositCylinder: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        productCatalog: {
          state: cylinderState,
          mutations: cylinderMutations,
          actions: cylinderActions,
          namespaced: true,
        },
        scannedDepositCylinders: {
          state: scannedDepositCylindersState,
          mutations: scannedDepositCylindersMutations,
          actions: scannedDepositCylindersActions,
          namespaced: true,
        },
      },
    })
    wrapper = mount(SelectCylinderPage, {
      store,
      localVue,
      mocks: { $store, $route, $router },
    })
  })

  test('renders list of items in scannedDepositCylinders', () => {
    expect(wrapper.find('.steel').exists()).toBe(true)
    expect(wrapper.find('.hybrid').exists()).toBe(true)
    expect(wrapper.find('.fibre').exists()).toBe(true)
  })

  test('click submit button triggers add to scannedDepositCylinders mutation and routes to next page', () => {
    wrapper.find('.steel').trigger('click')
    expect(cylinderActions.setSelectedItem).toHaveBeenCalled()
    expect(scannedDepositCylindersActions.addDepositCylinder).toHaveBeenCalled()
    expect(push).toHaveBeenCalledWith(
      '/depositcylinder/scannedDepositCylindersList'
    )
  })
})
