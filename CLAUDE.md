# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Directives

1. I'm using Svelte 5;
2. don't show me solutions for svelte4;
3. Im builing a cross-browser web extension;
4. don't show me formattation inline suggestions;

## Development Commands

### Building and Development

- `bun dev` - Start development server with hot reload
- `bun dev:firefox` - Start development server for Firefox
- `bun build` - Build extension for production
- `bun build:firefox` - Build extension for Firefox specifically
- `bun zip` - Create distribution ZIP file
- `bun zip:firefox` - Create Firefox distribution ZIP

### Code Quality

- `bun lint` - Run prettier check and ESLint
- `bun format` - Format code with Prettier
- `bun check` - Run Svelte type checking
- `bun check:watch` - Run Svelte type checking in watch mode

### Package Management

- Uses `bun` as package manager (specified in packageManager field)
- Run `bun postinstall` after dependency changes to prepare WXT

## Architecture Overview

This is a cross-browser extension built with WXT framework for anti-fraud and safety online activities. The extension blocks malicious URLs using a distributed blocklist system.

### Core Technologies

- **WXT Framework**: Modern web extension framework with TypeScript support
- **Svelte 5**: Frontend framework for UI components with runes syntax
- **TypeScript**: Strict typing throughout the codebase
- **SASS/SCSS**: Styling with modular architecture
- **LokiJS**: In-memory database for URL storage
- **Proxy Service**: Cross-context communication using @webext-core/proxy-service

### Extension Structure

#### Entrypoints (src/entrypoints/)

- `background.ts` - Service worker handling extension lifecycle, message passing, and URL blocking
- `content.ts` - Content script for page scanning and UI injection
- `close.content.ts` - Content script for closing/blocking tabs
- `popup/` - Extension popup interface
- `options/` - Extension settings page
- `wizard/` - Onboarding wizard for new users

#### Core Services (src/libs/)

- `urls-service.ts` - URL blocklist management with compressed storage
- `web-blocking.ts` - Real-time URL blocking using webNavigation API
- `store.ts` - Persistent storage management
- `init-db.ts` - Database initialization and setup

#### Key Features

- **URL Blocking**: Uses compressed blocklist from hblock.molinero.dev/hosts
- **Real-time Scanning**: Monitors navigation and blocks malicious URLs
- **Cross-browser Support**: Manifest V3 compatible with Chrome and Firefox
- **Internationalization**: Multi-language support with @wxt-dev/i18n
- **Onboarding**: Wizard-based setup for new users

### Component Architecture

#### UI Components (src/components/)

- Modular Svelte components with consistent props interfaces
- Reusable components: Button, Modal, Toggle, Status, Header
- App-specific components in `apps/` directory
- Icon components in `icons/` directory

#### Utilities (src/utils/)

- Cross-context messaging utilities
- Tab management and activation
- Stream processing for compressed data
- Environment and configuration helpers

### Configuration

#### Browser Permissions

- `activeTab`, `alarms`, `scripting`, `storage`, `tabs`
- `webNavigation`, `declarativeNetRequestWithHostAccess`
- `host_permissions` for all URLs

#### Build Configuration

- WXT config in `wxt.config.ts` with Svelte and i18n modules
- ESLint config supports TypeScript and Svelte
- PostCSS with rem-to-px conversion
- SASS with modular styling architecture

### Storage Strategy

- Uses WXT storage API with local storage
- Compressed URL data using streams and base64 encoding
- Proxy service for cross-context data access
- Real-time updates across all contexts

### Development Workflow

- Hot reload during development
- Browser-specific builds and testing
- Automatic manifest generation
- Type checking with Svelte compiler integration

### Internationalization

- YAML locale files in `src/locales/`
- Supports: English, German, Spanish, French, Italian, Dutch, Portuguese
- Messages accessed via `i18n.t()` function
- Manifest uses `__MSG_*__` format for localized strings
