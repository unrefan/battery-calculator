<template>
  <section class="card space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-slate-800 dark:text-white">{{ t('copy.assumptions') }}</h3>
        <p class="text-sm text-slate-500">These values adjust the adjusted Wh calculation.</p>
      </div>
      <button class="text-sm text-primary" @click="reset">{{ t('actions.resetDefaults') }}</button>
    </div>
    <dl class="grid gap-3 text-sm text-slate-600 dark:text-slate-200 md:grid-cols-2">
      <div v-for="item in assumptionList" :key="item.label" class="rounded-lg border border-slate-100 p-3 dark:border-slate-800">
        <dt class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{{ item.label }}</dt>
        <dd class="text-base font-semibold">{{ item.value }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settingsStore'

const settingsStore = useSettingsStore()
const settings = computed(() => settingsStore.settings)
const { t } = useI18n()

const assumptionList = computed(() => [
  { label: t('labels.efficiency'), value: `${(settings.value.efficiency * 100).toFixed(0)}%` },
  { label: t('labels.dod'), value: `${(settings.value.depthOfDischarge * 100).toFixed(0)}%` },
  { label: t('labels.buffer'), value: `${(settings.value.safetyBuffer * 100).toFixed(0)}%` },
  { label: t('labels.tempDerate'), value: `${(settings.value.temperatureDerate * 100).toFixed(0)}%` },
  { label: t('labels.strategy'), value: settings.value.strategy },
  { label: t('labels.nominalVoltage'), value: `${settings.value.nominalVoltage} V` },
])

const reset = () => settingsStore.resetDefaults()
</script>
