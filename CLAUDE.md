# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**The primary source of truth for this project is `AGENTS.md` in the repository root.** Read that file first for full architecture, stack, conventions, and project structure.

## Quick Reference

- **Stack**: WXT 0.20.15, Svelte 5.50.1, TypeScript strict, SASS/SCSS
- **Package Manager**: `bun` only (never npm or yarn)
- **Svelte**: Runes only (`$state`, `$derived`, `$effect`) — never Svelte 4 syntax
- **Imports**: Use `@/` alias for `src/`

## Documentation Structure

This project uses directory-scoped AGENTS.md files:

- **`AGENTS.md`**: Root-level source of truth — stack, architecture, conventions
- **`.windsurf/rules/`**: Cross-cutting rules with frontmatter
  - `global.md` - Development commands and workflows (always on)
  - `security.md` - Security best practices (always on)
  - `performance.md` - Performance guidelines
  - `plan.md` - Project roadmap and priorities
- **Directory-specific AGENTS.md**: Location-based instructions
  - `src/AGENTS.md` - Core development directives
  - `src/entrypoints/AGENTS.md` - WXT entrypoint patterns
  - `src/libs/AGENTS.md` - Service and library patterns
  - `src/components/AGENTS.md` - Svelte component guidelines
  - `src/utils/AGENTS.md` - Utility function patterns

When working in a specific directory, check for a local AGENTS.md first.

## Development Commands

```bash
bun dev              # Chrome dev server with hot reload
bun dev:firefox      # Firefox dev server
bun build            # Production build (Chrome)
bun build:firefox    # Production build (Firefox)
bun lint             # Run Prettier + ESLint
bun format           # Format with Prettier
bun check            # Svelte type checking
```

## When in Doubt

1. Read `AGENTS.md` for architecture and conventions
2. Check the relevant directory AGENTS.md file
3. Check `.windsurf/rules/plan.md` for roadmap priorities
4. Look at existing similar files before creating new ones
5. Test both Chrome and Firefox builds
