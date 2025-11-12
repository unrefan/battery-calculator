<template>
  <section class="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
    <header class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-sm uppercase tracking-wide text-white/70">Required energy</p>
        <h2 class="text-3xl font-semibold">{{ formatNumber(result.strategyWh) }} Wh</h2>
        <p class="text-sm text-white/80">{{ formatNumber(result.adjustedWh, 2) }} Wh before buffer</p>
      </div>
      <div class="text-right space-y-1">
        <p class="text-xs uppercase text-white/70">Pack capacity @ {{ result.nominalVoltage }}V</p>
        <p class="text-2xl font-semibold">{{ formatNumber(result.capacityAh, 2) }} Ah</p>
        <p class="text-sm text-white/80">{{ Math.round(result.capacitymAh).toLocaleString() }} mAh</p>
        <p class="text-xs uppercase text-white/70">Device voltage total</p>
        <p class="text-sm text-white/80">{{ formatNumber(result.deviceCapacityAh, 2) }} Ah ({{ Math.round(result.deviceCapacitymAh).toLocaleString() }} mAh)</p>
      </div>
    </header>
    <dl class="mt-6 grid gap-4 sm:grid-cols-3">
      <div>
        <dt class="text-xs uppercase tracking-wide text-white/60">Raw load</dt>
        <dd class="text-xl font-semibold">{{ formatNumber(result.totalRawWh) }} Wh</dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-white/60">Strategy Wh</dt>
        <dd class="text-xl font-semibold">{{ formatNumber(result.strategyWh) }} Wh</dd>
      </div>
      <div>
        <dt class="text-xs uppercase tracking-wide text-white/60">Last run</dt>
        <dd class="text-xl font-semibold">{{ formattedTimestamp }}</dd>
      </div>
    </dl>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CalculationResult } from '@/domain/types'
import { formatNumber } from '@/composables/useUnits'

const props = defineProps<{
  result: CalculationResult
}>()

const formattedTimestamp = computed(() =>
  new Date(props.result.timestamp).toLocaleString(),
)
</script>
