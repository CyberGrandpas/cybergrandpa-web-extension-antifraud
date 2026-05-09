---
title: Project Roadmap
description: Development roadmap and priorities for the CyberGrandpa extension
always: true
trigger: model_decision
---

## CyberGrandpa Anti-Fraud Extension - Project Plan

**Version:** 0.0.4
**Status:** Beta Development
**Last Updated:** 2026-05-09

## Current State Assessment

### ✅ Completed Features

1. **Core URL Blocking System**
   - Compressed blocklist storage (gzip + base64)
   - Automatic sync every 11 hours from hblock.molinero.dev
   - Cross-context proxy service architecture
   - webNavigation-based blocking

2. **User Interface Components**
   - Popup with protection status and manual scanning
   - Options page for settings management
   - Onboarding wizard for first-run experience
   - 11 reusable Svelte 5 components (all using runes syntax)

3. **Internationalization**
   - 28 languages fully supported (exceeds original 7-language spec)
   - YAML-based locale files
   - Browser-specific help screenshots (6 languages)

4. **Cross-Browser Support**
   - Manifest V3 compliant
   - Firefox-specific build pipeline
   - All required permissions properly configured

5. **Storage & State Management**
   - WXT storage API integration
   - 8 persistent storage items
   - Svelte store bindings

6. **Developer Tooling** *(new)*
   - Logger utility with dev/prod environment check
   - CHANGELOG.md tracking project changes
   - CLAUDE.md updated (LokiJS references removed)
   - AGENTS.md documentation structure (Windsurf + directory-specific)

7. **Fraud Detection Library** *(new)*
   - Modular `src/libs/fraud-detector/` with 7 files
   - Tiered scanning: `scanLight()` (inline-only) and `scanDeep()` (full)
   - Weighted patterns with threat categories and scan level tags
   - Entropy analysis and obfuscation detection

### ⚠️ Incomplete/Problematic Features

1. **Close Content Script** (`src/entrypoints/close.content.ts`)
   - **Status:** 90% commented out, non-functional
   - **Issue:** Critical security feature disabled
   - **Action Required:** Complete implementation or remove entirely

2. **Page Scanning Overlay** (`src/components/apps/overlay-loading-app.svelte`)
   - **Status:** Placeholder/fake implementation
   - **Issue:** Shows hardcoded "no issues" after 3-second delay
   - **Action Required:** Wire to fraud-detector library

3. **Real-time Protection Toggle**
   - **Status:** UI exists but functionality unclear
   - **Issue:** Web blocking runs regardless of toggle state
   - **Action Required:** Wire `storeRealtimeEnabled` to control scanning tier

4. **Tab Blocking Mechanism** (`src/libs/web-blocking.ts`)
   - **Status:** Working but potentially unreliable
   - **Issue:** Uses scripting.executeScript which may have timing issues
   - **Action Required:** Consider declarativeNetRequest API for more reliable blocking

5. **Fraud Detector Integration** *(new)*
   - **Status:** Library built but not wired to entrypoints
   - **Issue:** `scanLight()`/`scanDeep()` not called from content.ts or background.ts
   - **Action Required:** Integrate with content script and connect to overlay UI

### ❌ Missing Features

1. **Testing Infrastructure**
   - No test files or framework
   - No CI/CD pipeline
   - No automated quality checks

2. **Production Code Quality**
   - No error tracking/reporting
   - No performance monitoring

## Priority Roadmap

### Phase 1: Critical Fixes (Must Complete Before v0.1.0)

**Priority: CRITICAL**

1. **Wire Fraud Detector to Scanning Overlay**
   - [ ] Replace fake 3s delay with real `scanLight()` call
   - [ ] Display actual results from `FraudReport`
   - [ ] Show risk level and threat details in overlay UI
   - **Files:** `overlay-loading-app.svelte`, `fraud-detector/scanner.ts`

2. **Fix Close Content Script**
   - [ ] Decide: Complete implementation or remove feature
   - [ ] If keeping: Implement reliable tab closing mechanism
   - [ ] If removing: Remove file and update manifest
   - **Files:** `src/entrypoints/close.content.ts`

3. **Wire Real-time Protection Toggle**
   - [ ] Make `storeRealtimeEnabled` control fraud scanning tier
   - [ ] Premium users: auto light scan on navigation, deep on idle
   - [ ] Basic users: manual scan only
   - [ ] Wire `storePackageType` to determine available features
   - **Files:** `content.ts`, `background.ts`, `store.ts`

4. **Improve Tab Blocking Reliability**
   - [ ] Research declarativeNetRequest API for URL blocking
   - [ ] Implement fallback mechanism if current approach fails
   - [ ] Add error handling for blocked navigation
   - **Files:** `src/libs/web-blocking.ts`

### Phase 2: Testing & Quality (Required for v0.1.0)

**Priority: HIGH**

1. **Testing Infrastructure Setup**
   - [ ] Add Vitest testing framework
   - [ ] Write unit tests for core services:
     - [ ] `urls-service.ts` - URL matching and storage
     - [ ] `web-blocking.ts` - Blocking logic
     - [ ] `fraud-detector/` - Scanner, analyzer, patterns
   - [ ] Write integration tests for:
     - [ ] Background service worker
     - [ ] Storage synchronization
     - [ ] Cross-context messaging
   - [ ] Add test scripts to package.json
   - [ ] Set minimum coverage threshold (70%)

2. **Component Testing**
   - [ ] Add @testing-library/svelte
   - [ ] Write component tests for:
     - [ ] Popup navigation and state
     - [ ] Options page settings
     - [ ] Wizard flow completion
     - [ ] Toggle components
     - [ ] Modal interactions

3. **End-to-End Testing**
   - [ ] Add Playwright for E2E tests
   - [ ] Test extension installation flow
   - [ ] Test URL blocking in real browsers
   - [ ] Test cross-browser compatibility (Chrome & Firefox)

### Phase 3: Production Readiness (Required for v1.0.0)

**Priority: MEDIUM**

1. **Documentation**
   - [x] Add CHANGELOG.md
   - [x] Update CLAUDE.md to remove LokiJS references
   - [ ] Create comprehensive README with:
     - [ ] Installation instructions
     - [ ] Feature documentation
     - [ ] Troubleshooting guide
   - [ ] Add CONTRIBUTING.md
   - [ ] Add JSDoc comments to all public APIs
   - [ ] Create user manual for extension features

2. **Performance Optimization**
   - [ ] Add performance monitoring
   - [ ] Optimize blocklist sync (currently 11 hours)
   - [ ] Measure and optimize memory usage
   - [ ] Add metrics for blocking effectiveness

3. **Error Handling & Monitoring**
   - [ ] Implement centralized error handler
   - [ ] Add Sentry or similar error tracking (optional)
   - [ ] Add user-facing error messages
   - [ ] Implement retry logic for network failures

4. **Code Quality**
   - [x] Replace console.log with proper logging utility
   - [ ] Run ESLint and fix all warnings
   - [ ] Add pre-commit hooks for linting
   - [ ] Set up GitHub Actions for CI/CD

### Phase 4: Feature Enhancements (Post v1.0.0)

**Priority: LOW**

1. **Premium Features Implementation**
   - [ ] Define premium vs. free feature set
   - [ ] Wire tiered scanning (light/deep) to package type
   - [ ] Add billing/subscription integration
   - [ ] Implement license validation

2. **Advanced Blocking Features**
   - [ ] Custom blocklist management (user-defined)
   - [ ] Whitelist functionality
   - [ ] Temporary allow/block for session
   - [ ] Category-based blocking (ads, malware, trackers, etc.)

3. **Analytics & Reporting**
   - [ ] Track blocked URLs count
   - [ ] Generate weekly safety reports
   - [ ] Show most common threat types
   - [ ] Export blocking history

4. **UI/UX Improvements**
   - [ ] Dark mode support
   - [ ] Customizable themes
   - [ ] Accessibility audit and improvements
   - [ ] Better mobile browser support

5. **Additional Browser Support**
   - [ ] Microsoft Edge testing and optimization
   - [ ] Safari extension (requires different architecture)
   - [ ] Brave browser optimization

## Technical Debt

### High Priority

1. **Commented Code:** close.content.ts has 90% of code commented out
2. **Fake Features:** Page scanning overlay doesn't actually scan (needs fraud-detector wiring)

### Medium Priority

1. **Error Handling:** Minimal error handling in async operations
2. **Type Safety:** Some any types could be more specific
3. **Code Duplication:** Some repeated patterns could be abstracted

### Low Priority

1. **Bundle Size:** Could optimize with code splitting
2. **Icon Assets:** Multiple sizes could be optimized
3. **CSS Organization:** Some style duplication across components

## Success Metrics

### v0.1.0 Release Criteria

- [ ] All Phase 1 critical fixes completed
- [ ] Fraud detector wired to overlay UI
- [ ] Test coverage ≥ 70%
- [ ] All ESLint errors resolved
- [ ] Extension tested in Chrome and Firefox
- [ ] Documentation updated

### v1.0.0 Release Criteria

- [ ] All v0.1.0 criteria met
- [ ] All Phase 3 production readiness items completed
- [ ] Test coverage ≥ 85%
- [ ] Performance benchmarks met
- [ ] Error tracking implemented
- [ ] User manual completed
- [ ] Beta testing with 50+ users

## Next Immediate Steps

1. **Wire fraud-detector to overlay-loading-app.svelte** (Phase 1, item 1)
2. **Fix or remove close.content.ts** (Phase 1, item 2)
3. **Wire real-time protection toggle to scanning tiers** (Phase 1, item 3)

---

**Last Review:** 2026-05-09
**Next Review:** After Phase 1 completion
