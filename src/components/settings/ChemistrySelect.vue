<template>
  <div class="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
    <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">{{ t('labels.chemistry') }}</h3>
    <p class="text-sm text-slate-500">Controls efficiency and depth-of-discharge defaults.</p>
    <div class="mt-3 grid gap-3 md:grid-cols-2">
      <label class="text-sm font-medium text-slate-600 dark:text-slate-200">
        <span class="mb-1 block text-xs uppercase tracking-wide text-slate-500">{{ t('labels.chemistry') }}</span>
        <select
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          :value="settings.chemistryId"
          @change="onChemistryChange"
        >
          <option v-for="chemistry in chemistries" :key="chemistry.id" :value="chemistry.id">
            {{ chemistry.label }}
          </option>
        </select>
      </label>
      <label class="text-sm font-medium text-slate-600 dark:text-slate-200">
        <span class="mb-1 block text-xs uppercase tracking-wide text-slate-500">{{ t('labels.nominalVoltage') }}</span>
        <select
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
          :value="settings.nominalVoltage"
          @change="onVoltageChange"
        >
          <option v-for="voltage in packVoltages" :key="voltage" :value="voltage">
            {{ voltage }} V
          </option>
        </select>
      </label>
    </div>
    <p class="mt-2 text-xs text-slate-500">Nominal voltage is used to convert Wh into Ah/mAh.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useChemistries } from '@/composables/useChemistries'
import { useSettingsStore } from '@/stores/settingsStore'

const { t } = useI18n()
const { chemistries, getChemistry } = useChemistries()
const settingsStore = useSettingsStore()
const settings = computed(() => settingsStore.settings)

const packVoltages = computed(() => {
  const chemistry = getChemistry(settings.value.chemistryId)
  return chemistry.typicalPackVoltages
})

const onChemistryChange = (event: Event) => {
  settingsStore.updateChemistry((event.target as HTMLSelectElement).value)
}

const onVoltageChange = (event: Event) => {
  settingsStore.updateSettings({ nominalVoltage: Number((event.target as HTMLSelectElement).value) })
}
</script>
