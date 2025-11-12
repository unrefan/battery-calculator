<template>
  <label class="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-100">
    <span>{{ label }}</span>
    <div class="flex items-center gap-2">
      <input
        type="range"
        class="flex-1 accent-primary"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        @input="handleInput"
      />
      <input
        type="number"
        class="w-20 rounded-lg border border-slate-300 px-2 py-1 text-right text-sm dark:border-slate-700 dark:bg-slate-800"
        :value="(value * 100).toFixed(0)"
        @input="handleNumber"
      />
      <span>{{ suffix }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value: number
  min: string
  max: string
  step: string
  suffix?: string
}>()

const emit = defineEmits<{
  update: [value: number]
}>()

const handleInput = (event: Event) => {
  emit('update', Number((event.target as HTMLInputElement).value))
}

const handleNumber = (event: Event) => {
  const percent = Number((event.target as HTMLInputElement).value) / 100
  emit('update', percent)
}
</script>
