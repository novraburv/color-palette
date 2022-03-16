export function generateColor (baseHue, colorscheme) {
  if (typeof baseHue !== 'number') return 'type error: baseHue must be number'
  if (typeof colorscheme !== 'string') return 'type error: colorscheme must be string'
  if (baseHue < 0 || baseHue > 360) return 'out-of-range'

  const schemes = {
    monochromatic: [0],
    analogous: [0, -30, 30],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210],
    tetradicSquare: [0, 90, 180, 270],
    tetradicRectangle: [0, 60, 180, 240]
  }

  const colors = []
  const variation = schemes[colorscheme].length

  while (colors.length < 5) {
    const i = Math.floor(Math.random() * variation)
    const color = schemes[colorscheme][i]
    colors.push(color < 0 ? color + 360 : color >= 360 ? color - 360 : color)
  }

  return colors
}
