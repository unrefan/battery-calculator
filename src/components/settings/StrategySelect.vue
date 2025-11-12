<template>
  <div class="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
    <h3 class="text-lg font-semibold text-slate-800 dark:text-white">{{ t('labels.strategy') }}</h3>
    <div class="mt-3 grid gap-3 md:grid-cols-2">
      <label
        class="flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 text-sm shadow-sm transition hover:border-primary"
        :class="settings.strategy === 'cost' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'"
      >
        <div class="flex items-center gap-2">
          <input type="radio" value="cost" :checked="settings.strategy === 'cost'" @change="update('cost')" />
          <span class="font-semibold">{{ t('labels.cost') }}</span>
        </div>
        <p class="text-slate-500">Nearest capacity ≥ requirement. Good for budget builds.</p>
      </label>
      <label
        class="flex cursor-pointer flex-col gap-1 rounded-xl border px-4 py-3 text-sm shadow-sm transition hover:border-primary"
        :class="settings.strategy === 'extra' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700'"
      >
        <div class="flex items-center gap-2">
          <input type="radio" value="extra" :checked="settings.strategy === 'extra'" @change="update('extra')" />
          <span class="font-semibold">{{ t('labels.extra') }}</span>
        </div>
        <p class="text-slate-500">Always adds +10% headroom for harsher conditions.</p>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settingsStore'
import type { Strategy } from '@/domain/types'

const settingsStore = useSettingsStore()
const settings = computed(() => settingsStore.settings)
const { t } = useI18n()

const update = (strategy: Strategy) => settingsStore.updateSettings({ strategy })
</script>
