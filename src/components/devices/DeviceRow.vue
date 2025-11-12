<template>
  <div class="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
    <div class="flex items-center justify-between gap-3">
      <div class="flex flex-1 flex-col gap-1">
        <label class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {{ t('labels.deviceName') }} {{ index + 1 }}
        </label>
        <input
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          :value="device.label"
          @input="onText('label', $event)"
          placeholder="e.g., LED strip"
        />
      </div>
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <button class="text-primary" @click="$emit('duplicate')">{{ t('actions.duplicate') }}</button>
        <button class="text-slate-500 hover:text-red-500" @click="$emit('remove')">{{ t('actions.remove') }}</button>
      </div>
    </div>

    <div class="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <UnitInput
        label="Power (W)"
        unit="W"
        :model-value="device.powerW"
        inputmode="decimal"
        @update:model-value="onNumber('powerW', $event); clearField('energyWh')"
      />
      <UnitInput
        label="Hours (h)"
        unit="h"
        :model-value="device.hours"
        inputmode="decimal"
        @update:model-value="onNumber('hours', $event); clearField('energyWh')"
      />
      <UnitInput
        label="Energy (Wh)"
        unit="Wh"
        :model-value="device.energyWh"
        help="Use if device already reports Wh."
        inputmode="decimal"
        @update:model-value="onNumber('energyWh', $event); clearField('powerW'); clearField('hours')"
      />
      <UnitInput
        label="Quantity"
        unit="×"
        :model-value="device.quantity"
        inputmode="numeric"
        @update:model-value="onNumber('quantity', $event)"
      />
      <UnitInput
        label="Voltage (V)"
        unit="V"
        :model-value="device.voltageV"
        inputmode="decimal"
        @update:model-value="onNumber('voltageV', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import UnitInput from '@/components/shared/UnitInput.vue'
import type { DeviceLoad } from '@/domain/types'

defineProps<{
  device: DeviceLoad
  index: number
}>()

const emit = defineEmits<{
  update: [payload: Partial<DeviceLoad>]
  remove: []
  duplicate: []
}>()

const { t } = useI18n()

function onText(field: keyof DeviceLoad, event: Event) {
  emit('update', { [field]: (event.target as HTMLInputElement).value } as Partial<DeviceLoad>)
}

function onNumber(field: keyof DeviceLoad, value: string) {
  const parsed = value === '' ? undefined : Number(value)
  emit('update', { [field]: parsed } as Partial<DeviceLoad>)
}

function clearField(field: keyof DeviceLoad) {
  emit('update', { [field]: undefined } as Partial<DeviceLoad>)
}
</script>
