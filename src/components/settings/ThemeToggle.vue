<template>
  <label class="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
    <span>{{ t('labels.theme') }}</span>
    <select
      class="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
      :value="theme"
      @change="onChange"
      aria-label="Theme picker"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="high">High contrast</option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { theme, setTheme } = useTheme()
const { t } = useI18n()

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setTheme(target.value as 'system' | 'light' | 'dark' | 'high')
}
</script>
