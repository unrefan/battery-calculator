import { computed } from 'vue'
import { chemistryMap, defaultChemistryId } from '@/domain/chemistries'

export function useChemistries() {
  const chemistries = computed(() => Object.values(chemistryMap))
  const defaultChemistry = chemistryMap[defaultChemistryId]

  const getChemistry = (id: string) => chemistryMap[id] ?? defaultChemistry

  return {
    chemistries,
    getChemistry,
    defaultChemistry,
  }
}
