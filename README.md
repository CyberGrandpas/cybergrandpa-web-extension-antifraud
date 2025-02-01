# Cross-Browser Extension Boilerplate

A cross-browser compatible web extension boilerplate, initially supporting Chrome Manifest V3.

## Project Structure

```
src/
├── shared/           # Shared code between browsers
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   └── background.js
└── browsers/        # Browser-specific manifests and configurations
    └── chrome/
        └── manifest.json
```

## Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build for Chrome:
   ```bash
   npm run build:chrome
   ```

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist/chrome` directory

## Adding Support for Other Browsers

The project is structured to easily add support for other browsers in the future. Browser-specific configurations will be added to the `src/browsers` directory.
