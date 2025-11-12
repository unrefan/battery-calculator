import { computed, onMounted, ref, watch } from 'vue'
import { readStorage, STORAGE_KEYS, writeStorage } from './usePersistence'

type Theme = 'system' | 'light' | 'dark' | 'high'

const theme = ref<Theme>('system')
const prefersDark =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null
let initialized = false
let watchRegistered = false

const resolvedTheme = computed(() => {
  if (theme.value === 'system') {
    return prefersDark?.matches ? 'dark' : 'light'
  }
  if (theme.value === 'high') {
    return 'high'
  }
  return theme.value
})

export function useTheme() {
  const setTheme = (value: Theme) => {
    theme.value = value
    writeStorage(STORAGE_KEYS.theme, value)
  }

  onMounted(() => {
    if (initialized) return
    const stored = readStorage<Theme>(STORAGE_KEYS.theme)
    if (stored) {
      theme.value = stored
    } else if (prefersDark?.matches) {
      theme.value = 'system'
    }
    applyTheme()
    prefersDark?.addEventListener('change', applyTheme)
    initialized = true
  })

  if (!watchRegistered) {
    watch(resolvedTheme, applyTheme, { immediate: false })
    watchRegistered = true
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
  }
}

function applyTheme() {
  if (typeof document === 'undefined') return
  const mode = resolvedTheme.value
  const root = document.documentElement
  root.classList.remove('light', 'dark', 'high')
  if (mode === 'high') {
    root.classList.add('dark', 'high')
  } else {
    root.classList.add(mode)
  }
}
