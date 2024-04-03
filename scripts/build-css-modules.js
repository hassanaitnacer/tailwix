const fs = require('fs')
const path = require('path')
const { colors, styleCssEntry } = require('../index')

const colorsOutputDir = './colors'
const radixColorsPath = '@radix-ui/colors'
const colorsCssFilePath = './colors.css'
const themeCssFilePath = './theme.css'

const stepsRange = [1, 12]
const steps = range(...stepsRange)
const alphaSteps = steps.map((step) => `a${step}`)
const allSteps = [...steps, ...alphaSteps]

if (!fs.existsSync(colorsOutputDir)) {
  fs.mkdirSync(colorsOutputDir, { recursive: true })
}

// ! Clearing the color namespace (must be at the top)
let tailwindThemeVariables = [generateTailwindCssVariable('*', 'initial')]

colors.forEach((color) => {
  const colorVariants = generateColorVariants(color)
  const cssImports = colorVariants
    .map(
      (variant) => `@import "${path.join(radixColorsPath, `${variant}.css`)}";`
    )
    .join('\n')

  const filename = `${color}.css`
  const filePath = path.join(colorsOutputDir, filename)

  fs.writeFileSync(filePath, cssImports)
  fs.appendFileSync(colorsCssFilePath, `@import "${filePath}";\n`)

  tailwindThemeVariables.push(
    ...generateColorStepsCssVariables(
      color,
      isBlackOrWhite(color) ? alphaSteps : allSteps
    )
  )
})

// Theme CSS file
let cssThemeRule = '@theme {\n'
cssThemeRule += tailwindThemeVariables
  .map((variable) => `\t${variable}`)
  .join('\n')
cssThemeRule += '\n}'
fs.writeFileSync(themeCssFilePath, cssThemeRule)

// Entry CSS file
fs.writeFileSync(
  styleCssEntry,
  [
    `@import "${colorsCssFilePath}" layer(base);`,
    `@import "${themeCssFilePath}";`,
  ].join('\n')
)

/* --------------------------------- Helpers -------------------------------- */

function generateColorStepsCssVariables(color, steps) {
  const cssVariables = []
  if (color === 'black') {
    cssVariables.push(generateTailwindCssVariable('black', '#000'))
  } else if (color === 'white') {
    cssVariables.push(generateTailwindCssVariable('white', '#fff'))
  }

  steps.forEach((step) => {
    const cssVariable = generateTailwindCssVariable(
      `${color}-${step}`,
      `var(--${color}-${step})`
    )

    cssVariables.push(cssVariable)
  })

  return cssVariables
}

function generateColorVariants(color) {
  if (isBlackOrWhite(color)) {
    return [`${color}-alpha`]
  }

  return [color, `${color}-dark`, `${color}-alpha`, `${color}-dark-alpha`]
}

function generateTailwindCssVariable(suffix, value) {
  return `--color-${suffix}: ${value};`
}

function isBlackOrWhite(color) {
  return color === 'black' || color === 'white'
}

function range(min, max) {
  return Array.from({ length: max - min + 1 }, (_, index) => index + min)
}
