<template>
  <section class="card">
    <h3 class="text-lg font-semibold text-slate-800 dark:text-white">Device breakdown</h3>
    <table class="mt-3 w-full text-sm">
      <thead class="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
        <tr>
          <th class="pb-2">Device</th>
          <th class="pb-2 text-right">Wh</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id" class="border-t border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-200">
          <td class="py-2">{{ row.label }}</td>
          <td class="py-2 text-right">{{ formatNumber(row.wh, 1) }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalculationResult } from '@/domain/types'
import { useDeviceStore } from '@/stores/deviceStore'
import { formatNumber } from '@/composables/useUnits'

const props = defineProps<{
  result: CalculationResult
}>()

const deviceStore = useDeviceStore()

const rows = computed(() =>
  props.result.deviceBreakdown.map((entry) => ({
    id: entry.deviceId,
    wh: entry.rawWh,
    label: deviceStore.devices.find((d) => d.id === entry.deviceId)?.label ?? 'Device',
  })),
)
</script>
