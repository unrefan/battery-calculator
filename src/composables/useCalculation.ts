import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { computeResult } from '@/domain/calc'
import { useDeviceStore } from '@/stores/deviceStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useResultsStore } from '@/stores/resultsStore'

export function useCalculation() {
  const deviceStore = useDeviceStore()
  const settingsStore = useSettingsStore()
  const resultsStore = useResultsStore()
  const { devices } = storeToRefs(deviceStore)
  const params = computed(() => settingsStore.calculationParams)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const calculate = () => {
    if (!devices.value.length) {
      error.value = 'Add at least one device'
      return
    }
    try {
      loading.value = true
      const result = computeResult(devices.value, params.value)
      resultsStore.setResult(result)
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unable to calculate'
    } finally {
      loading.value = false
    }
  }

  watch(
    () => [devices.value, params.value],
    () => calculate(),
    { deep: true, immediate: true },
  )

  return {
    result: computed(() => resultsStore.result),
    calculate,
    error,
    loading,
  }
}
