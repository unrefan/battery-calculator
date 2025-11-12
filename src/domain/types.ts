export interface DeviceLoad {
  id: string
  label: string
  powerW?: number
  energyWh?: number
  hours?: number
  voltageV?: number
  quantity: number
  notes?: string
}

export type Strategy = 'cost' | 'extra'

export interface CalculationParams {
  efficiency: number // decimal
  depthOfDischarge: number // decimal
  safetyBuffer: number // decimal
  temperatureDerate?: number // decimal
  chemistryId: string
  nominalVoltage: number
  strategy: Strategy
}

export interface ChemistrySpec {
  id: string
  label: string
  nominalCellV: number
  defaultEfficiency: number
  defaultDoD: { min: number; max: number }
  typicalPackVoltages: number[]
  notes?: string
}

export interface BatteryPackPreset {
  id: string
  label: string
  chemistryId: string
  voltage: number
  capacityAh: number
  referenceWh?: number
  notes?: string
  costTier?: 'budget' | 'mid' | 'premium'
}

export interface DevicePreset {
  id: string
  label: string
  powerW?: number
  energyWh?: number
  hours?: number
  quantity: number
  description?: string
}

export interface CalculationResult {
  totalRawWh: number
  adjustedWh: number
  adjustedKWh: number
  capacityAh: number
  capacitymAh: number
  deviceCapacityAh: number
  deviceCapacitymAh: number
  strategyWh: number
  recommendations: Array<{
    id: string
    label: string
    rationale: string
    runtimeHours: number
    chemistryId?: string
    voltage?: number
    capacityAh?: number
  }>
  deviceBreakdown: Array<{ deviceId: string; rawWh: number }>
  nominalVoltage: number
  timestamp: string
}

export interface UserSettings {
  theme: 'system' | 'light' | 'dark' | 'high'
  efficiency: number
  depthOfDischarge: number
  safetyBuffer: number
  temperatureDerate: number
  chemistryId: string
  nominalVoltage: number
  strategy: Strategy
  locale: string
  version: number
}
