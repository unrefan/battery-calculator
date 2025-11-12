import { batteryPackPresets } from './presets'
import type { CalculationParams, CalculationResult, DeviceLoad } from './types'

const GENERIC_CAPACITIES_WH = [84, 120, 240, 500, 750, 1000, 1500, 2000, 3000, 5000]

interface RecommendationInput {
  targetWh: number
  params: CalculationParams
}

export function computeRequiredWh(devices: DeviceLoad[]): number {
  return devices.reduce((sum, device) => {
    const qty = Math.max(device.quantity || 1, 1)
    const deviceWh =
      device.energyWh ?? ((device.powerW ?? 0) * (device.hours ?? 0))
    return sum + deviceWh * qty
  }, 0)
}

export function computeResult(
  devices: DeviceLoad[],
  params: CalculationParams,
): CalculationResult {
  const totalRawWh = computeRequiredWh(devices)
  const derate = 1 - (params.temperatureDerate ?? 0)
  const denom =
    params.efficiency *
    params.depthOfDischarge *
    Math.max(1 - params.safetyBuffer, 0.1) *
    Math.max(derate, 0.6)

  const adjustedWh = denom ? totalRawWh / denom : totalRawWh
  const strategyFactor = params.strategy === 'extra' ? 1.1 : 1
  const strategyWh = adjustedWh * strategyFactor
  const capacityAh = params.nominalVoltage
    ? strategyWh / params.nominalVoltage
    : 0
  const capacitymAh = capacityAh * 1000

  const rawDeviceMah = devices.reduce((sum, device) => {
    const qty = Math.max(device.quantity || 1, 1)
    const deviceWh =
      device.energyWh ?? ((device.powerW ?? 0) * (device.hours ?? 0))
    const voltage = device.voltageV || params.nominalVoltage
    if (!voltage) return sum
    return sum + (deviceWh * qty * 1000) / voltage
  }, 0)

  const ratio = totalRawWh > 0 ? strategyWh / totalRawWh : 1
  const deviceCapacitymAh = rawDeviceMah * ratio
  const deviceCapacityAh = deviceCapacitymAh / 1000

  const recommendations = buildRecommendations({
    targetWh: strategyWh,
    params,
  })

  return {
    totalRawWh,
    adjustedWh,
    adjustedKWh: strategyWh / 1000,
    capacityAh,
    capacitymAh,
    deviceCapacityAh,
    deviceCapacitymAh,
    strategyWh,
    recommendations,
    deviceBreakdown: devices.map((device) => ({
      deviceId: device.id,
      rawWh:
        (device.energyWh ?? (device.powerW ?? 0) * (device.hours ?? 0)) *
        Math.max(device.quantity || 1, 1),
    })),
    nominalVoltage: params.nominalVoltage,
    timestamp: new Date().toISOString(),
  }
}

export function buildRecommendations({
  targetWh,
  params,
}: RecommendationInput): CalculationResult['recommendations'] {
  const generic = GENERIC_CAPACITIES_WH.map((wh) =>
    recommendationFromWh(wh, targetWh, params),
  ).filter((item) => item.runtimeHours >= 0.5)

  const bestMatch = findPresetMatch(targetWh, params)
  return bestMatch ? [bestMatch, ...generic] : generic
}

function recommendationFromWh(
  wh: number,
  targetWh: number,
  params: CalculationParams,
) {
  const runtime = wh / (targetWh || 1)
  return {
    id: `generic-${wh}`,
    label: `${roundCapacity(wh)} Wh pack`,
    rationale:
      wh >= targetWh
        ? 'Meets requirement with margin'
        : 'Undersized — consider using as supplement',
    runtimeHours: runtime,
    chemistryId: params.chemistryId,
    voltage: params.nominalVoltage,
    capacityAh: params.nominalVoltage
      ? wh / params.nominalVoltage
      : undefined,
  }
}

function roundCapacity(value: number): number {
  if (value < 100) return Math.ceil(value / 10) * 10
  if (value < 1000) return Math.ceil(value / 50) * 50
  return Math.ceil(value / 100) * 100
}

function findPresetMatch(
  targetWh: number,
  params: CalculationParams,
): CalculationResult['recommendations'][number] | null {
  const sorted = batteryPackPresets
    .filter((preset) => preset.chemistryId === params.chemistryId)
    .sort((a, b) => (a.referenceWh ?? 0) - (b.referenceWh ?? 0))

  const match =
    sorted.find((preset) => (preset.referenceWh ?? 0) >= targetWh) ||
    sorted[sorted.length - 1]
  if (!match) return null

  const runtimeHours = (match.referenceWh ?? 0) / (targetWh || 1)
  return {
    id: match.id,
    label: match.label,
    rationale:
      params.strategy === 'extra'
        ? 'Includes ~10% safety headroom'
        : 'Closest capacity that meets the requirement',
    runtimeHours,
    chemistryId: match.chemistryId,
    voltage: match.voltage,
    capacityAh: match.capacityAh,
  }
}
