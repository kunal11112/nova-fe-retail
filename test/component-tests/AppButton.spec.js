import { shallowMount } from '@vue/test-utils'
import AppButton from '~/components/AppButton.vue'

const { test } = require('@jest/globals')

describe('Unit tests for Button Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AppButton, {
      propsData: {
        label: 'Click Me',
      },
    })
  })

  test('instance of a button', () => {
    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('instance of a button', () => {
    expect(wrapper.props().label).toBe('Click Me')
  })
})
