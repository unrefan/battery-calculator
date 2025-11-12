const STORAGE_VERSION = 1

export const STORAGE_KEYS = {
  settings: `powercalc.settings.v${STORAGE_VERSION}`,
  devices: `powercalc.devices.v${STORAGE_VERSION}`,
  results: `powercalc.results.v${STORAGE_VERSION}`,
  theme: `powercalc.theme.v${STORAGE_VERSION}`,
}

export function readStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function writeStorage<T>(key: string, payload: T) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(payload))
}

export function removeStorage(key: string) {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(key)
}
