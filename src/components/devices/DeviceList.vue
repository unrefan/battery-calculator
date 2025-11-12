<template>
  <div class="space-y-4">
    <header class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 class="text-xl font-semibold text-slate-800 dark:text-white">{{ title }}</h2>
        <p class="text-sm text-slate-500">{{ subtitle }}</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <select
          v-model="selectedPreset"
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="">{{ presetLabel }}</option>
          <option v-for="preset in presets" :key="preset.id" :value="preset.id">
            {{ preset.label }}
          </option>
        </select>
        <button
          type="button"
          class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          @click="handleAdd"
        >
          {{ t('actions.addDevice') }}
        </button>
      </div>
    </header>
    <p v-if="!devices.length" class="text-sm text-slate-500">{{ t('copy.emptyState') }}</p>
    <div class="space-y-3">
      <DeviceRow
        v-for="(device, index) in devices"
        :key="device.id"
        :device="device"
        :index="index"
        @update="(payload) => updateDevice(device.id, payload)"
        @remove="removeDevice(device.id)"
        @duplicate="duplicateDevice(device.id)"
      />
    </div>
    <button class="text-sm text-slate-500 hover:text-red-500" @click="clearAll">
      {{ t('actions.clear') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DeviceRow from '@/components/devices/DeviceRow.vue'
import { devicePresets } from '@/domain/presets'
import { useDeviceStore } from '@/stores/deviceStore'
import type { DeviceLoad } from '@/domain/types'

const { t } = useI18n()
const deviceStore = useDeviceStore()
const selectedPreset = ref('')

const devices = computed(() => deviceStore.devices)
const presets = devicePresets

const title = 'Device loads'
const subtitle = 'Enter power or energy and quantity per device.'
const presetLabel = 'Device presets'

const updateDevice = (id: string, payload: Partial<DeviceLoad>) => {
  deviceStore.updateDevice(id, payload)
}
const removeDevice = (id: string) => deviceStore.removeDevice(id)
const duplicateDevice = (id: string) => deviceStore.duplicateDevice(id)
const clearAll = () => deviceStore.clearAll()

function handleAdd() {
  deviceStore.addDevice(selectedPreset.value || undefined)
  selectedPreset.value = ''
}
</script>
