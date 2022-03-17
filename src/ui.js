import { hex2rgb, hsl2rgb, rgb2hex, rgb2hsl } from './color-converter.js'
import { generateColor } from './color-generator.js'

export function initialize () {
  const generateButton = document.querySelector('#generate-color')
  generateButton.addEventListener('click', colorGenerationHandler)
}

function colorGenerationHandler () {
  const baseColor = document.querySelector('#base-color').value
  const colorscheme = document.querySelector('#colorschemes').value
  const main = document.querySelector('.main')

  if (main.children) main.innerHTML = ''

  const [hue] = rgb2hsl(...hex2rgb(baseColor.slice(1)))
  generateColor(hue, colorscheme)
    .forEach(createColorCard)
}

function createColorCard (color) {
  const [h, s, l] = color
  const main = document.querySelector('.main')

  const card = document.createElement('div')
  card.classList.add('main__color')
  card.style.background = `hsl(${h},${s}%,${l}%)`

  const text = document.createElement('p')
  text.classList.add('main__text')
  text.textContent = '#' + rgb2hex(...hsl2rgb(...color))
  text.style.color = l < 50 ? 'white' : 'black'

  card.append(text)
  main.append(card)
}
