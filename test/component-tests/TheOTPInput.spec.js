import { mount } from '@vue/test-utils'
import otp from '~/components/TheOTPInput.vue'

describe('', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(otp)
  })

  afterEach(() => {
    wrapper.destroy()
  })
  test('calls handleChange on input', () => {
    wrapper.vm.handleChange = jest.fn()
    const input = wrapper.find('input[name="ref1"]')
    input.element.value = 8
    input.trigger('input')
    expect(wrapper.vm.handleChange.mock.calls.length).toBe(1)
  })

  test('calls reset input function when handleChange function is called', () => {
    wrapper.vm.resetInputs = jest.fn()
    const input = wrapper.find('input[name="ref1"]')
    input.element.value = 8
    input.trigger('input')
    expect(wrapper.vm.resetInputs.mock.calls.length).toBe(1)
  })

  test('', () => {
    const input = wrapper.find('input[name="ref1"]')
    input.element.value = 8
    input.trigger('input')
    expect(wrapper.vm.data).toBe('8')
  })

  test('handle delete function is called when backspace is pressed', () => {
    wrapper.vm.handleDelete = jest.fn()
    wrapper.find('input[name="ref1"]').trigger('keydown.delete')
    expect(wrapper.vm.handleDelete.mock.calls.length).toBe(1)
  })

  test('last character of data variable is deleted when delete button is clicked', () => {
    wrapper.setData({
      data: '1234',
    })
    wrapper.find('input').trigger('keydown.delete')
    expect(wrapper.vm.data).toBe('123')
  })

  test('alphabet is not added to data string', () => {
    wrapper.setData({
      data: '123',
    })
    wrapper.find('input[name="ref4"]').element.value = 'e'
    wrapper.find('input[name="ref4"]').trigger('input')
    expect(wrapper.vm.data).toBe('123')
  })

  test('reset input sets value to empty string when alphabet is entered', async () => {
    wrapper.find('input[name="ref1"]').element.value = 'e'
    wrapper.find('input[name="ref1"]').trigger('input')
    await expect(wrapper.vm.$refs.ref1[0].value).toBe('')
  })
})
