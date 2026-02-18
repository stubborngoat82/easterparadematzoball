# AGENTS.md

This file provides guidance to AI coding assistants (Claude Code, Cursor, GitHub Copilot, etc.) when working with code in this repository.

## Project Overview

This is a static website for the Easter Parade Matzo Ball community event hosted on GitHub Pages at www.easterparadematzoball.com. The site is a multi-page HTML website celebrating a community parade event that blends Easter and Jewish cultural traditions.

**Key Characteristics:**
- Standalone HTML files with inline styles and scripts
- No build process or package manager
- Tailwind CSS, Lucide Icons, and Google Fonts via CDN
- GitHub Pages hosting with custom domain
- Vibrant, festive, playful design aesthetic

## Project Memory System

This project maintains institutional knowledge in `docs/project_notes/` for consistency across sessions and across different AI tools.

### Memory Files

- **bugs.md** - Bug log with dates, solutions, and prevention notes
- **decisions.md** - Architectural Decision Records (ADRs) with context and trade-offs
- **key_facts.md** - Project configuration, credentials, ports, important URLs
- **issues.md** - Work log with ticket IDs, descriptions, and URLs

### Memory-Aware Protocols

**Before proposing architectural changes:**
- Check `docs/project_notes/decisions.md` for existing decisions
- Verify the proposed approach doesn't conflict with past choices
- If it does conflict, acknowledge the existing decision and explain why a change is warranted

**When encountering errors or bugs:**
- Search `docs/project_notes/bugs.md` for similar issues
- Apply known solutions if found
- Document new bugs and solutions when resolved

**When looking up project configuration:**
- Check `docs/project_notes/key_facts.md` for technology stack, CDN URLs, domain configuration, deployment process
- Prefer documented facts over assumptions

**When completing work on features or fixes:**
- Log completed work in `docs/project_notes/issues.md`
- Include date, brief description, and commit hash for reference

**When user requests memory updates:**
- Update the appropriate memory file (bugs, decisions, key_facts, or issues)
- Follow the established format and style (bullet lists, dates, concise entries)

### Style Guidelines for Memory Files

- **Prefer bullet lists over tables** for simplicity and ease of editing
- **Keep entries concise** (1-3 lines for descriptions)
- **Always include dates** for temporal context
- **Include URLs** for external resources, documentation, live site
- **Manual cleanup** of old entries is expected (not automated)

## Code Conventions

### File Structure
- All HTML files are self-contained with inline `<style>` and `<script>` tags
- No separate CSS or JS files
- All images in root directory (no asset folder structure)

### Design System

**Typography:**
- Cinzel serif font exclusively (via `.cinzel` class)

**Colors:**
- Primary: Purple shades (purple-900, purple-700, purple-600)
- Accents: Pink, yellow, orange, green, blue gradients

**Border Radius:**
- Cards: `rounded-3xl`
- Buttons: `rounded-full`

**Spacing:**
- Consistent use of p-8, mb-12, max-w-6xl/7xl containers

### Navigation Pattern
All pages include consistent navigation with emoji icons:
- 🏠 Home → index.html
- 👒 Hat Making → hatmaking.html
- 📸 Photos → photos.html
- 💌 Join Us → joinus.html

Active page has white background with shadow.

### CDN Dependencies
Always include these three CDN links in `<head>`:
1. Tailwind CSS: `https://cdn.tailwindcss.com`
2. Google Fonts (Cinzel): `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap`
3. Lucide Icons: `https://unpkg.com/lucide@latest`

Initialize Lucide icons with `lucide.createIcons()` in script tag.

## Development Workflow

### Local Development
```bash
# Option 1: Open HTML files directly in browser
# Option 2: Use local server
python3 -m http.server 8000
# View at http://localhost:8000
```

### Deployment
- Push to `main` branch triggers automatic GitHub Pages deployment
- Changes live in 1-2 minutes
- No build step required
- CNAME file maintains custom domain (www.easterparadematzoball.com)

### Testing Checklist
- [ ] Test in multiple browsers (Chrome, Safari, Firefox)
- [ ] Test on mobile viewports
- [ ] Verify CDN resources load correctly
- [ ] Check animation performance
- [ ] Ensure navigation works across all pages

## Common Tasks

### Adding a New Page
1. Copy header structure with logo and navigation
2. Include the three CDN links
3. Add `.cinzel` and `.bg-with-overlay` style definitions
4. Copy footer structure
5. Initialize Lucide icons with `lucide.createIcons()`
6. Update navigation in all existing pages

### Adding a New Section
1. Use `max-w-6xl` or `max-w-7xl` containers with `mx-auto`
2. Apply `rounded-3xl` to cards
3. Use gradient backgrounds (`bg-gradient-to-br`) for emphasis
4. Add `.card-hover` class for interactive elements
5. Include emoji in headings for brand consistency

### Fixing a Bug
1. Search `docs/project_notes/bugs.md` for similar issues
2. Apply known solution if found, or investigate and fix
3. Document the bug and solution in bugs.md
4. Include date, issue, root cause, solution, and prevention notes

### Making Architectural Changes
1. Check `docs/project_notes/decisions.md` first
2. If proposing something that conflicts with an existing ADR, explain why
3. Document new decisions as ADR entries with context, alternatives, and consequences

## Important Constraints

**DO:**
- Maintain the vibrant, playful, festive aesthetic
- Use Tailwind utility classes
- Keep inline styles and scripts (no separate files)
- Test cross-browser compatibility
- Include emoji in headings and buttons
- Use consistent spacing and border radius patterns

**DON'T:**
- Add build processes or bundlers
- Create separate CSS/JS files
- Use fonts other than Cinzel
- Remove or modify CNAME file
- Overcomplicate the simple architecture
- Add npm/package.json (no dependencies)

## Key Resources

**Live Site:** https://www.easterparadematzoball.com
**Documentation:** See `CLAUDE.md` for detailed technical documentation
**Memory Files:** `docs/project_notes/` for historical context and decisions

## Multi-Tool Collaboration

If you're working on this project using multiple AI coding tools:
1. Always check and update memory files to maintain shared context
2. Follow the established patterns in existing code
3. Log completed work in issues.md with your tool identifier if helpful
4. Respect existing architectural decisions documented in decisions.md
5. Keep key_facts.md updated when configuration changes

This ensures consistency whether the user is working with Claude Code, Cursor, GitHub Copilot, or any other AI assistant.
