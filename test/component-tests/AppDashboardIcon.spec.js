import { shallowMount } from '@vue/test-utils'
import dashIcon from '~/components/AppDashboardIcon.vue'

describe('Dashboard Icon Component', () => {
  test('is a vue instance', () => {
    const wrapper = shallowMount(dashIcon, {
      propsData: {
        image: 'add-client-icon',
        label: 'no',
        link: '',
      },
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
