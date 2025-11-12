import { defineStore } from 'pinia'
import type { CalculationResult } from '@/domain/types'
import { readStorage, STORAGE_KEYS, writeStorage } from '@/composables/usePersistence'

type ResultsState = {
  result: CalculationResult | null
}

export const useResultsStore = defineStore('results', {
  state: (): ResultsState => ({
    result: readStorage<CalculationResult>(STORAGE_KEYS.results),
  }),
  actions: {
    setResult(result: CalculationResult) {
      this.result = result
      writeStorage(STORAGE_KEYS.results, result)
    },
    clearResult() {
      this.result = null
      writeStorage(STORAGE_KEYS.results, null)
    },
  },
})
