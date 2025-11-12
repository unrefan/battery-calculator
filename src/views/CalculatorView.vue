<template>
  <div class="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
    <section class="space-y-6">
      <DeviceList />
      <ChemistrySelect />
      <StrategySelect />
      <EfficiencyPanel />
      <AssumptionsDrawer />
    </section>
    <section class="space-y-4">
      <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ error }}
      </div>
      <ResultsSummary v-if="result" :result="result" />
      <div v-else class="card text-sm text-slate-500">
        Run a calculation to see Wh totals and pack guidance.
      </div>
      <ResultsTable v-if="result" :result="result" />
      <RecommendationCards v-if="result" :recommendations="result.recommendations" />
      <ExportCsvButton :result-available="Boolean(result)" />
    </section>
  </div>
</template>

<script setup lang="ts">
import DeviceList from '@/components/devices/DeviceList.vue'
import ChemistrySelect from '@/components/settings/ChemistrySelect.vue'
import StrategySelect from '@/components/settings/StrategySelect.vue'
import EfficiencyPanel from '@/components/settings/EfficiencyPanel.vue'
import AssumptionsDrawer from '@/components/settings/AssumptionsDrawer.vue'
import ResultsSummary from '@/components/results/ResultsSummary.vue'
import ResultsTable from '@/components/results/ResultsTable.vue'
import RecommendationCards from '@/components/results/RecommendationCards.vue'
import ExportCsvButton from '@/components/results/ExportCsvButton.vue'
import { useCalculation } from '@/composables/useCalculation'

const { result, error } = useCalculation()
</script>
