<template>
  <label class="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-200">
    <span class="flex items-center gap-1">
      {{ label }}
      <span v-if="help" class="text-xs font-normal text-slate-500">{{ help }}</span>
    </span>
    <div class="flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-800">
      <input
        class="w-full bg-transparent px-3 py-2 text-base text-slate-900 outline-none dark:text-slate-100"
        :value="modelValue ?? ''"
        :inputmode="inputmode"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span class="bg-slate-100 px-3 py-2 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-700 dark:text-slate-200">{{
        unit
      }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  unit: string
  modelValue?: number
  inputmode?: 'decimal' | 'numeric'
  help?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
