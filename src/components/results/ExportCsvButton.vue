<template>
  <button
    type="button"
    class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
    :disabled="disabled"
    @click="handleExport"
  >
    {{ t('actions.exportCsv') }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { exportCsv } from '@/domain/csv'
import { useDeviceStore } from '@/stores/deviceStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useResultsStore } from '@/stores/resultsStore'

const props = defineProps<{
  resultAvailable: boolean
}>()

const { t } = useI18n()
const deviceStore = useDeviceStore()
const settingsStore = useSettingsStore()
const resultStore = useResultsStore()
const version = __APP_VERSION__

const disabled = computed(() => !props.resultAvailable)

function handleExport() {
  if (disabled.value || !settingsStore.calculationParams) return
  const result = resultStore.result
  if (!result) return
  exportCsv({
    devices: deviceStore.devices,
    params: settingsStore.calculationParams,
    result,
    version,
  })
}
</script>
