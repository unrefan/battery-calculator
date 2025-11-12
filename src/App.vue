<template>
  <div class="min-h-screen bg-[var(--surface)] text-[var(--ink)] transition-colors">
    <AppHeader />
    <main class="mx-auto w-full max-w-6xl px-4 py-8">
      <RouterView />
    </main>
    <AppFooter />

    <transition name="fade">
      <div
        v-if="offlineReady"
        class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg"
      >
        {{ t('app.offline') }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { usePWA } from '@/composables/usePWA'
import { useTheme } from '@/composables/useTheme'

const { offlineReady } = usePWA()
const { t } = useI18n()
useTheme()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
