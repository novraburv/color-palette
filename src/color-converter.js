export function hex2rgb (hex) {
  if (hex.length !== 6) return 'hex must be 6 digits'
  if (hex.match(/[^0-9a-f]/i)) return 'unknown characters'

  return hex.match(/[0-9a-f]{2}/ig)
    .map(xx => parseInt(xx, 16))
}

export function rgb2hex (r, g, b) {
  if ([r, g, b].some(n => typeof n !== 'number')) return 'type error'
  if ([r, g, b].some(n => n < 0 || n > 255)) return 'out-of-range'

  return Array.from(arguments).map(xx => xx.toString(16))
    .map(xx => xx.length === 1 ? '0' + xx : xx)
    .join('')
}

export function rgb2hsl (r, g, b) {
  if ([r, g, b].some(n => typeof n !== 'number')) return 'type error'
  if ([r, g, b].some(n => n < 0 || n > 255)) return 'out-of-range'

  const [rx, gx, bx] = [r, g, b].map(color => color / 255)
  const Cmax = Math.max(rx, gx, bx)
  const Cmin = Math.min(rx, gx, bx)
  const delta = Cmax - Cmin

  function getHue () {
    if (delta === 0) return 0
    if (Cmax === rx) return 60 * ((gx - bx) / delta % 6)
    if (Cmax === gx) return 60 * ((bx - rx) / delta + 2)
    if (Cmax === bx) return 60 * ((rx - gx) / delta + 4)
  }

  function getSaturation () {
    if (delta === 0) return 0
    return delta / (1 - Math.abs(2 * getLightness() - 1))
  }

  function getLightness () {
    return (Cmax + Cmin) / 2
  }

  function roundedPercent (n) {
    return Math.round(n * 100)
  }

  return [getHue(), roundedPercent(getSaturation()), roundedPercent(getLightness())]
}

export function hsl2rgb (h, s, l) {
  if ([h, s, l].some(n => typeof n !== 'number')) return 'type error'

  // Saturation and Lightness must be 0 < x < 1
  const [sx, lx] = [s, l].map(x => x / 100)

  const C = (1 - Math.abs(2 * lx - 1)) * sx // chroma
  const X = C * (1 - Math.abs((h / 60) % 2 - 1)) // second largest component
  const m = lx - C / 2

  function getTemporaryRGB () {
    if (h >= 0 && h < 60) return [C, X, 0]
    if (h >= 60 && h < 120) return [X, C, 0]
    if (h >= 120 && h < 180) return [0, C, X]
    if (h >= 180 && h < 240) return [0, X, C]
    if (h >= 240 && h < 300) return [X, 0, C]
    if (h >= 300 && h < 360) return [C, 0, X]
  }

  return getTemporaryRGB().map(color => (color + m) * 255)
}
