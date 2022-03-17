import { hex2rgb, hsl2rgb, rgb2hex, rgb2hsl } from './color-converter.js'
import { generateColor } from './color-generator.js'

export function initialize () {
  const generateButton = document.querySelector('#generate-color')
  generateButton.addEventListener('click', colorGenerationHandler)
}

function colorGenerationHandler () {
  const baseColor = document.querySelector('#base-color').value
  const colorscheme = document.querySelector('#colorschemes').value

  const [hue] = rgb2hsl(...hex2rgb(baseColor.slice(1)))
  const colors = generateColor(hue, colorscheme)

  console.log(hue)
  printColors(colors)
}

function printColors (colorsArray) {
  if (!Array.isArray(colorsArray)) return 'type error: colors must be array'

  const main = document.querySelector('.main')
  if (main.children) main.innerHTML = ''

  colorsArray.map(x => rgb2hex(...hsl2rgb(...x)))
    .forEach(createColorCard)
}

function createColorCard (color) {
  const main = document.querySelector('.main')

  const card = document.createElement('div')
  card.classList.add('main__color')
  card.style.background = '#' + color
  card.style.height = '100px'
  card.style.width = '100px'

  main.append(card)
}
