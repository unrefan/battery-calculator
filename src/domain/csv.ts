import type { CalculationParams, CalculationResult, DeviceLoad } from './types'

const CSV_HEADERS = ['Field', 'Value']

export function exportCsv({
  devices,
  params,
  result,
  version,
}: {
  devices: DeviceLoad[]
  params: CalculationParams
  result: CalculationResult
  version: string
}) {
  const timestamp = new Date().toISOString()
  const rows: string[][] = [
    ...[ ['PowerCalc version', version], ['Timestamp', timestamp], ['Strategy', params.strategy], ['Chemistry', params.chemistryId], ['Nominal voltage (V)', params.nominalVoltage.toString()], ['Efficiency', params.efficiency.toString()], ['DoD', params.depthOfDischarge.toString()], ['Safety buffer', params.safetyBuffer.toString()], ['Temperature derate', (params.temperatureDerate ?? 0).toString()] ],
    [],
    ['Devices'],
    ['Name', 'Qty', 'Power (W)', 'Hours', 'Energy (Wh)', 'Voltage (V)'],
    ...devices.map((d) => [
      d.label,
      String(d.quantity ?? 1),
      d.powerW != null ? String(d.powerW) : '',
      d.hours != null ? String(d.hours) : '',
      d.energyWh != null ? String(d.energyWh) : '',
      d.voltageV != null ? String(d.voltageV) : '',
    ]),
    [],
    ['Results'],
    ['Raw Wh', result.totalRawWh.toFixed(2)],
    ['Adjusted Wh', result.adjustedWh.toFixed(2)],
    ['Adjusted kWh', result.adjustedKWh.toFixed(3)],
    ['Pack capacity Ah', result.capacityAh.toFixed(2)],
    ['Pack capacity mAh', result.capacitymAh.toFixed(0)],
    ['Device voltage Ah', result.deviceCapacityAh.toFixed(2)],
    ['Device voltage mAh', result.deviceCapacitymAh.toFixed(0)],
  ]

  const output = [CSV_HEADERS, ...rows]
    .map((columns) => columns.map(escapeCsv).join(','))
    .join('\n')

  const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `powercalc-${timestamp}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function escapeCsv(value: string): string {
  if (value == null) return ''
  if (value.includes(',') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}
