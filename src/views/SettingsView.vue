<template>
  <div class="space-y-6">
    <section class="card space-y-4">
      <div>
        <h2 class="text-2xl font-semibold text-slate-800 dark:text-white">{{ t('nav.settings') }}</h2>
        <p class="text-sm text-slate-500">Control theme, offline status, and persistence.</p>
      </div>
      <ThemeToggle />
      <div class="rounded-lg bg-slate-100/70 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
        App stores settings locally under:
        <ul class="mt-2 list-disc pl-5">
          <li v-for="key in storageKeys" :key="key">{{ key }}</li>
        </ul>
      </div>
    </section>
    <section class="card">
      <h3 class="text-lg font-semibold text-slate-800 dark:text-white">About PowerCalc</h3>
      <p class="text-sm text-slate-500">
        This PWA works offline and targets WCAG 2.2 AA contrast. Calculations never leave your browser.
      </p>
      <p class="mt-3 text-xs text-slate-400">Version {{ version }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/settings/ThemeToggle.vue'

import { STORAGE_KEYS } from '@/composables/usePersistence'

const { t } = useI18n()
const version = __APP_VERSION__
const storageKeys = Object.values(STORAGE_KEYS)
</script>
