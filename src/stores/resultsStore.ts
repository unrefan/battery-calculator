import { defineStore } from 'pinia'
import type { CalculationResult } from '@/domain/types'
import { readStorage, STORAGE_KEYS, writeStorage } from '@/composables/usePersistence'

export const useResultsStore = defineStore('results', {
  state: () => ({
    result: readStorage<CalculationResult>(STORAGE_KEYS.results),
  }),
  actions: {
    setResult(result: CalculationResult) {
      this.result = result
      writeStorage(STORAGE_KEYS.results, result)
    },
    clearResult() {
      this.result = undefined
      writeStorage(STORAGE_KEYS.results, null)
    },
  },
})
