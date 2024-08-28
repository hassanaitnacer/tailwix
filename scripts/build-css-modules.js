const fs = require('fs');
const path = require('path');
const { colors, alphaOnlyColors, styleIndexPath } = require('../index');

const colorsOutDir = './colors';
if (!fs.existsSync(colorsOutDir)) {
  fs.mkdirSync(colorsOutDir, { recursive: true });
}

// Generates the @import statements
function generateImportStatements(color, isAlpha) {
  const baseImport = `@import '@radix-ui/colors/${color}${isAlpha ? '-alpha' : ''}.css';`;
  const darkImport = alphaOnlyColors.includes(color)
    ? ''
    : `@import '@radix-ui/colors/${color}${isAlpha ? '-dark-alpha' : '-dark'}.css';`;

  return [baseImport, darkImport].filter(Boolean).join('\n');
}

// Generates the theme content
function generateThemeContent(color, isAlpha) {
  const variant = isAlpha ? 'a' : '';
  const steps = 12;

  return Array.from({ length: steps }, (_, index) => {
    const step = index + 1;
    return `  --color-${color}-${variant}${step}: var(--${color}-${variant}${step});`;
  }).join('\n');
}

// Generates CSS content
function generateCSSContent(color, isAlpha = false) {
  const importStatements = generateImportStatements(color, isAlpha);
  const themeContent = generateThemeContent(color, isAlpha);

  return `
${importStatements}

@theme inline {
${themeContent}
}
  `.trim();
}

// Writes the content to a CSS file
function writeCSSFile(color, isAlpha = false) {
  const fileName = path.join(colorsOutDir, `${color}${isAlpha ? '-alpha' : ''}.css`);
  const content = generateCSSContent(color, isAlpha);

  fs.writeFileSync(fileName, content);
  console.log(`Generated ${fileName}`);
}

// Generates specific CSS file for solid colors (e.g., white and black)
function generateSolidColorCSS(color, hexValue) {
  const content = `
@theme {
  --color-${color}: ${hexValue};
}
  `.trim();

  fs.writeFileSync(path.join(colorsOutDir, `${color}.css`), content);
  console.log(`Generated ${color}.css`);
}

// Generates index.css that imports all colors
function generateIndexCSS() {
  const importStatements = [
    `@import './colors/white.css';`,
    `@import './colors/black.css';`,
    ...colors.map(color => `@import './colors/${color}.css';`),
    '',
    ...colors.map(color => `@import './colors/${color}-alpha.css';`),
    ...alphaOnlyColors.map(color => `@import './colors/${color}-alpha.css';`)
  ].join('\n');

  const indexCSSContent = importStatements.trim();

  fs.writeFileSync(styleIndexPath, indexCSSContent);
  console.log(`Generated ${styleIndexPath}`);
}

// Entry point: Generate all CSS files
function generateAllCSSFiles() {
  colors.forEach((color) => {
    writeCSSFile(color);        // standard CSS file
    writeCSSFile(color, true);  // alpha variant CSS file
  });

  alphaOnlyColors.forEach((color) => {
    writeCSSFile(color, true);  // only generate alpha variant for alpha-only colors
  });

  // generate CSS for solid colors
  generateSolidColorCSS('white', '#fff');
  generateSolidColorCSS('black', '#000');

  // generate index.css
  generateIndexCSS();

  console.log('All CSS files generated successfully.');
}

generateAllCSSFiles();
