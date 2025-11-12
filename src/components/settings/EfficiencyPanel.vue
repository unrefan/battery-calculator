<template>
  <div class="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100">System assumptions</h3>
        <p class="text-sm text-slate-500">Adjust if your setup differs from defaults.</p>
      </div>
      <button class="text-sm text-primary" @click="reset">{{ t('actions.resetDefaults') }}</button>
    </div>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <AssumptionSlider
        label="Efficiency"
        :value="settings.efficiency"
        min="0.7"
        max="0.99"
        step="0.01"
        suffix="%"
        @update="(val) => update('efficiency', val)"
      />
      <AssumptionSlider
        label="Depth of discharge"
        :value="settings.depthOfDischarge"
        min="0.4"
        max="0.95"
        step="0.01"
        suffix="%"
        @update="(val) => update('depthOfDischarge', val)"
      />
      <AssumptionSlider
        label="Safety buffer"
        :value="settings.safetyBuffer"
        min="0"
        max="0.3"
        step="0.01"
        suffix="%"
        @update="(val) => update('safetyBuffer', val)"
      />
      <AssumptionSlider
        label="Temperature derating"
        :value="settings.temperatureDerate"
        min="0"
        max="0.4"
        step="0.01"
        suffix="%"
        @update="(val) => update('temperatureDerate', val)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settingsStore'
import AssumptionSlider from '@/components/settings/inputs/AssumptionSlider.vue'

const settingsStore = useSettingsStore()
const settings = computed(() => settingsStore.settings)
const { t } = useI18n()

const update = (field: keyof typeof settings.value, val: number) => {
  settingsStore.updateSettings({ [field]: val } as Record<string, number>)
}

const reset = () => settingsStore.resetDefaults()
</script>
