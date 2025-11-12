import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import type { DeviceLoad } from '@/domain/types'
import { devicePresets } from '@/domain/presets'
import { readStorage, STORAGE_KEYS, writeStorage } from '@/composables/usePersistence'

interface DeviceState {
  devices: DeviceLoad[]
}

const createDevice = (): DeviceLoad => ({
  id: uuid(),
  label: 'New device',
  powerW: 10,
  hours: 1,
  quantity: 1,
})

export const useDeviceStore = defineStore('devices', {
  state: (): DeviceState => ({
    devices: readStorage<DeviceLoad[]>(STORAGE_KEYS.devices) ?? [createDevice()],
  }),
  getters: {
    hasDevices: (state) => state.devices.length > 0,
  },
  actions: {
    addDevice(presetId?: string) {
      const preset = presetId ? devicePresets.find((p) => p.id === presetId) : null
      const device: DeviceLoad = preset
        ? { ...preset, id: uuid() }
        : createDevice()
      this.devices.push(device)
      this.persist()
    },
    updateDevice(id: string, patch: Partial<DeviceLoad>) {
      this.devices = this.devices.map((device) =>
        device.id === id ? { ...device, ...patch } : device,
      )
      this.persist()
    },
    removeDevice(id: string) {
      this.devices = this.devices.filter((device) => device.id !== id)
      if (!this.devices.length) this.addDevice()
      this.persist()
    },
    duplicateDevice(id: string) {
      const target = this.devices.find((device) => device.id === id)
      if (!target) return
      const clone = JSON.parse(JSON.stringify(target)) as DeviceLoad
      clone.id = uuid()
      clone.label = `${target.label} copy`
      this.devices.push(clone)
      this.persist()
    },
    clearAll() {
      this.devices = [createDevice()]
      this.persist()
    },
    persist() {
      writeStorage(STORAGE_KEYS.devices, this.devices)
    },
  },
})
