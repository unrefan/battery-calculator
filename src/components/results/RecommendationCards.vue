<template>
  <section class="card space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold text-slate-800 dark:text-white">{{ t('copy.recommendations') }}</h3>
        <p class="text-sm text-slate-500">Capacity suggestions include presets and rounded market sizes.</p>
      </div>
      <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        {{ recommendations.length }} options
      </span>
    </div>
    <div class="grid gap-3 md:grid-cols-2">
      <article
        v-for="item in recommendations"
        :key="item.id"
        class="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
      >
        <header class="flex items-center justify-between gap-2">
          <h4 class="text-base font-semibold text-slate-800 dark:text-white">{{ item.label }}</h4>
          <span class="text-xs font-medium text-slate-500">{{ formatNumber(item.runtimeHours, 2) }}× runtime</span>
        </header>
        <p class="mt-2 text-sm text-slate-500">{{ item.rationale }}</p>
        <dl class="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          <div>
            <dt>Voltage</dt>
            <dd>{{ item.voltage ?? '—' }} V</dd>
          </div>
          <div>
            <dt>Capacity</dt>
            <dd>{{ item.capacityAh ? `${formatNumber(item.capacityAh, 1)} Ah` : '—' }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { CalculationResult } from '@/domain/types'
import { formatNumber } from '@/composables/useUnits'

defineProps<{
  recommendations: CalculationResult['recommendations']
}>()

const { t } = useI18n()
</script>
