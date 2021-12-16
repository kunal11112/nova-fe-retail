import { mount } from '@vue/test-utils'
import AppDepositor from '~/components/AppDepositor.vue'

describe('AppDepositor component', () => {
  test('test for AppDepositor component is an instance', () => {
    const wrapper = mount(AppDepositor)
    expect(wrapper.vm).toBeTruthy()
  })
})

describe('AppDepositor Component with new props', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(AppDepositor, {
      propsData: {
        user: {
          name: 'Nii Laryea',
          userId: 'AMM1030420',
        },
      },
    })
  })
  test('contains new name prop', () => {
    expect(wrapper.find('.app-depositor-user-name').html()).toContain(
      'Nii Laryea'
    )
  })
  test('contains new userId prop', () => {
    expect(wrapper.find('.app-depositor-user-userId').html()).toContain(
      'AMM1030420'
    )
  })
})
describe('AppDepositor component', () => {
  test('contains new userId prop', () => {
    const wrapper = mount(AppDepositor)
    expect(wrapper.find('.barcode').exists()).toBe(true)
  })
})
