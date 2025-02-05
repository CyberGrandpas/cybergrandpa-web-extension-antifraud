# cybergrandpa-cross-browser-extension

A browser compatible web extension for safety and anti-fraud online

## Features

- 🌐 Cross-browser support (Chrome, Firefox)
- 📦 TypeScript support
- 🔄 Hot reload during development
- 🎨 SASS/SCSS styling
- 🔧 ESLint and Prettier configuration
- 🔐 Cross-browser polyfills
- 🏗️ Browser-specific manifest generation
- 📦 Automatic ZIP packaging for distribution

## Customization

Use `web-ext.config.ts` on the root of the project to customize the browser launcher.

### Launcher configuration example

```ts
import { defineRunnerConfig } from 'wxt';

export default defineRunnerConfig({
  binaries: {
    chrome: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
    // firefox: 'firefoxdeveloperedition', // Use Firefox Developer Edition instead of regular Firefox
    // edge: '/path/to/edge', // Open MS Edge when running "wxt -b edge"
  },
});
```