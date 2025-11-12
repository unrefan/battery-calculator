export function convertWhToAh(wh: number, voltage: number) {
  if (!voltage) return 0
  return wh / voltage
}

export function convertAhToWh(ah: number, voltage: number) {
  return ah * voltage
}

export function formatNumber(value: number, digits = 1) {
  if (!Number.isFinite(value)) return '0'
  return Number(value).toFixed(digits)
}
