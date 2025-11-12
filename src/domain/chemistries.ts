import type { ChemistrySpec } from './types'

export const chemistryMap: Record<string, ChemistrySpec> = {
  liion: {
    id: 'liion',
    label: 'Li-ion (NMC/NCA)',
    nominalCellV: 3.6,
    defaultEfficiency: 0.93,
    defaultDoD: { min: 0.85, max: 0.95 },
    typicalPackVoltages: [11.1, 14.8, 24, 48],
    notes: 'Common 18650/21700 cells.',
  },
  lifepo4: {
    id: 'lifepo4',
    label: 'LiFePO₄',
    nominalCellV: 3.2,
    defaultEfficiency: 0.95,
    defaultDoD: { min: 0.8, max: 0.9 },
    typicalPackVoltages: [12.8, 25.6, 51.2],
    notes: 'High cycle life, stable voltage.',
  },
  sla: {
    id: 'sla',
    label: 'Lead-acid (SLA/AGM)',
    nominalCellV: 2.1,
    defaultEfficiency: 0.9,
    defaultDoD: { min: 0.45, max: 0.55 },
    typicalPackVoltages: [6, 12, 24],
    notes: 'Limit discharge to ~50% for longevity.',
  },
  nimh: {
    id: 'nimh',
    label: 'NiMH',
    nominalCellV: 1.2,
    defaultEfficiency: 0.9,
    defaultDoD: { min: 0.65, max: 0.75 },
    typicalPackVoltages: [12, 24],
    notes: 'Useful for smaller packs.',
  },
}

export const defaultChemistryId = 'lifepo4'
