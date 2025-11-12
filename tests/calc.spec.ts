import { describe, expect, it } from 'vitest'
import { computeRequiredWh, computeResult } from '@/domain/calc'
import type { CalculationParams, DeviceLoad } from '@/domain/types'

const devices: DeviceLoad[] = [
  { id: '1', label: 'LED', powerW: 20, hours: 5, quantity: 2, voltageV: 12 },
  { id: '2', label: 'Cooler', energyWh: 120, quantity: 1, voltageV: 24 },
]

const params: CalculationParams = {
  efficiency: 0.93,
  depthOfDischarge: 0.85,
  safetyBuffer: 0.05,
  temperatureDerate: 0.05,
  chemistryId: 'lifepo4',
  nominalVoltage: 12.8,
  strategy: 'extra',
}

describe('computeRequiredWh', () => {
  it('sums mixed inputs correctly', () => {
    const wh = computeRequiredWh(devices)
    expect(wh).toBeCloseTo(20 * 5 * 2 + 120, 2)
  })
})

describe('computeResult', () => {
  it('applies adjustments and strategies', () => {
    const result = computeResult(devices, params)
    expect(result.totalRawWh).toBeGreaterThan(0)
    expect(result.adjustedWh).toBeGreaterThan(result.totalRawWh)
    expect(result.capacityAh).toBeGreaterThan(0)
    expect(result.recommendations.length).toBeGreaterThan(0)
    expect(result.deviceCapacitymAh).toBeGreaterThan(0)
  })

  it('uses per-device voltage when deriving mAh totals', () => {
    const simpleParams: CalculationParams = {
      efficiency: 1,
      depthOfDischarge: 1,
      safetyBuffer: 0,
      temperatureDerate: 0,
      chemistryId: 'lifepo4',
      nominalVoltage: 12,
      strategy: 'cost',
    }
    const result = computeResult(devices, simpleParams)
    const rawWh = computeRequiredWh(devices)
    const expectedMah =
      (rawWh - 120) / 12 * 1000 + (120 / 24) * 1000 // first device uses 12V, second 24V
    expect(result.deviceCapacitymAh).toBeCloseTo(expectedMah, -1)
  })
})
