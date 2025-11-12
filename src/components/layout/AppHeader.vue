<template>
  <header
    class="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <RouterLink to="/" class="flex items-center gap-2 text-lg font-semibold">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">⚡️</span>
        <div>
          <p class="leading-none">PowerCalc</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Battery sizing</p>
        </div>
      </RouterLink>
      <nav class="hidden gap-4 text-sm font-medium sm:flex">
        <RouterLink class="hover:text-primary" to="/">{{ t('nav.calculator') }}</RouterLink>
        <RouterLink class="hover:text-primary" to="/settings">{{ t('nav.settings') }}</RouterLink>
      </nav>
      <div class="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/settings/ThemeToggle.vue'

const { t } = useI18n()
</script>
