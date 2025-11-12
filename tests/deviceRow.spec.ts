import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DeviceRow from '@/components/devices/DeviceRow.vue'
import i18n from '@/i18n'

describe('DeviceRow', () => {
  it('emits update events when editing fields', async () => {
    const wrapper = mount(DeviceRow, {
      props: {
        device: { id: '1', label: 'LED', powerW: 10, hours: 2, quantity: 1 },
        index: 0,
      },
      global: {
        plugins: [i18n],
      },
    })

    const input = wrapper.find('input')
    await input.setValue('Camp Light')

    const updateEvents = wrapper.emitted('update')
    expect(updateEvents).toBeTruthy()
    expect(updateEvents?.[0]?.[0]).toMatchObject({ label: 'Camp Light' })
  })
})
