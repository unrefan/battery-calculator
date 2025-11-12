import { onMounted, ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'

export function usePWA() {
  const needRefresh = ref(false)
  const offlineReady = ref(false)

  onMounted(() => {
    registerSW({
      immediate: true,
      onOfflineReady() {
        offlineReady.value = true
      },
      onNeedRefresh() {
        needRefresh.value = true
      },
    })
  })

  return {
    needRefresh,
    offlineReady,
  }
}
