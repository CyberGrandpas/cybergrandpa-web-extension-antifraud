# CyberGrandpa Cross-Browser CyberSecurity Extension

A cross-browser compatible web extension boilerplate for safety online, initially supporting Chrome Manifest V3. 

## Features

- 🌐 Cross-browser support (Chrome, Firefox, Opera)
- 📦 TypeScript support
- 🔄 Hot reload during development
- 🎨 SASS/SCSS styling
- 🔧 ESLint and Prettier configuration
- 📦 Webpack bundling with optimization
- 🔐 Cross-browser polyfills
- 🏗️ Browser-specific manifest generation
- 📦 Automatic ZIP packaging for distribution

## Project Structure

```
src/
├── shared/           # Shared code between browsers
│   ├── popup.html
│   ├── popup.ts
│   ├── popup.scss
│   ├── background.ts
│   └── contentScript.ts
└── browsers/        # Browser-specific manifests
    └── chrome/
        └── manifest.json
```

## Development Setup

1. Clone this repository
2. Install pnpm if you haven't already:
   ```bash
   npm install -g pnpm
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## Development Commands

- Start development for Chrome:
  ```bash
  pnpm run dev:chrome
  ```
- Start development for Firefox:
  ```bash
  pnpm run dev:firefox
  ```
- Start development for Opera:
  ```bash
  pnpm run dev:opera
  ```

## Build Commands

- Build for all browsers:
  ```bash
  pnpm run build
  ```
- Build for specific browser:
  ```bash
  pnpm run build:chrome
  pnpm run build:firefox
  pnpm run build:opera
  ```

## Loading in Browsers

### Chrome
1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist/chrome` directory

### Firefox
1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select the `manifest.json` in the `dist/firefox` directory

### Opera
1. Open Opera and navigate to `opera:extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist/opera` directory

## Development Notes

### Browser-Specific Code
Use the `manifest.json` prefix syntax for browser-specific settings:
```json
{
  "__chrome__name": "Extension Chrome",
  "__firefox__name": "Extension Firefox",
  "__opera__name": "Extension Opera"
}
```

### TypeScript Support
The project includes full TypeScript support with:
- Chrome types (@types/chrome)
- ESLint configuration
- Source maps for debugging

### Building for Production
Production builds:
- Minify and optimize code
- Generate source maps
- Create ZIP files for each browser
- Sync version with package.json
