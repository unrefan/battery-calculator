import { defineStore } from 'pinia'
import { chemistryMap, defaultChemistryId } from '@/domain/chemistries'
import type { CalculationParams, UserSettings } from '@/domain/types'
import { readStorage, STORAGE_KEYS, writeStorage } from '@/composables/usePersistence'

const defaultChemistry = chemistryMap[defaultChemistryId];
const defaultVoltage = defaultChemistry?.typicalPackVoltages[0]

const defaultSettings: UserSettings = {
  theme: 'system',
  efficiency: defaultChemistry?.defaultEfficiency ?? 0.95,
  depthOfDischarge: defaultChemistry?.defaultDoD?.min ?? 0,
  safetyBuffer: 0.05,
  temperatureDerate: 0,
  chemistryId: defaultChemistryId,
  nominalVoltage: defaultVoltage ?? 12,
  strategy: 'cost',
  locale: 'en',
  version: 1,
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: readStorage<UserSettings>(STORAGE_KEYS.settings) ?? defaultSettings,
  }),
  getters: {
    calculationParams(state): CalculationParams {
      return {
        efficiency: state.settings.efficiency,
        depthOfDischarge: state.settings.depthOfDischarge,
        safetyBuffer: state.settings.safetyBuffer,
        temperatureDerate: state.settings.temperatureDerate,
        chemistryId: state.settings.chemistryId,
        nominalVoltage: state.settings.nominalVoltage,
        strategy: state.settings.strategy,
      }
    },
  },
  actions: {
    updateSettings(patch: Partial<UserSettings>) {
      this.settings = { ...this.settings, ...patch }
      this.persist()
    },
    updateChemistry(chemistryId: string) {
      const chemistry = chemistryMap[chemistryId]
      if (!chemistry) return
      this.settings.chemistryId = chemistryId
      this.settings.efficiency = chemistry.defaultEfficiency
      this.settings.depthOfDischarge = chemistry.defaultDoD.min
      this.settings.nominalVoltage =
        chemistry.typicalPackVoltages[0] ?? this.settings.nominalVoltage
      this.persist()
    },
    resetDefaults() {
      this.settings = JSON.parse(JSON.stringify(defaultSettings)) as UserSettings
      this.persist()
    },
    persist() {
      writeStorage(STORAGE_KEYS.settings, this.settings)
    },
  },
})
