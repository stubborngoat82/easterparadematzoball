# Architectural Decisions

This file tracks architectural decisions made for the Easter Parade Matzo Ball website.

## Format

Each decision should include:
- Date and ADR number
- Context (why the decision was needed)
- Decision (what was chosen)
- Alternatives considered
- Consequences (trade-offs, implications)

## Decision Records

### ADR-001: Use Standalone HTML Files Without Build Process (Pre-2026)

**Context:**
- Need a simple, maintainable website for community event
- Team may not have deep JavaScript/Node.js expertise
- Want instant preview and easy deployment
- GitHub Pages hosting is free and reliable

**Decision:**
- Use standalone HTML files with inline styles and scripts
- Load dependencies via CDN (Tailwind CSS, Lucide Icons, Google Fonts)
- No build process, bundler, or package manager required
- Each page is self-contained and can be edited independently

**Alternatives Considered:**
- React/Next.js → Rejected: overkill for static site, requires build process
- Jekyll/Hugo static site generator → Rejected: adds complexity, learning curve
- Separate CSS/JS files → Rejected: prefer single-file simplicity for small site

**Consequences:**
- ✅ Extremely simple to edit and deploy
- ✅ No build step or dependencies to manage
- ✅ Can edit files in GitHub web interface if needed
- ✅ Fast page loads with CDN caching
- ❌ Some code duplication across pages (header, footer, styles)
- ❌ Manual updates needed across pages for shared components
- ❌ Larger file sizes due to inline styles/scripts

### ADR-002: Use Cinzel Serif Font for Brand Identity (Pre-2026)

**Context:**
- Need distinctive typography for festive event
- Want elegant, readable font that works for both headings and body text
- Must be free and available via Google Fonts

**Decision:**
- Use Cinzel serif font family exclusively via `.cinzel` class
- Apply to all text on the site for consistent brand identity

**Alternatives Considered:**
- Sans-serif fonts (Montserrat, Open Sans) → Rejected: less festive feel
- Script fonts → Rejected: harder to read, especially on mobile
- Multiple fonts → Rejected: prefer single consistent typeface

**Consequences:**
- ✅ Strong, consistent brand identity
- ✅ Elegant, festive aesthetic
- ✅ Good readability
- ❌ Limited font weights loaded (may need to add more if needed)

### ADR-003: Use Mailchimp for Email Collection (Pre-2026)

**Context:**
- Need to collect email addresses for event updates
- Want reliable email service provider
- Need GDPR/CAN-SPAM compliant solution

**Decision:**
- Embed Mailchimp form via iframe on joinus.html page
- Use Mailchimp's hosted form at `http://eepurl.com/jx5YG-/`

**Alternatives Considered:**
- Custom form with backend API → Rejected: requires server, overkill for static site
- Google Forms → Rejected: less professional looking
- ConvertKit/Buttondown → Rejected: team already using Mailchimp

**Consequences:**
- ✅ Professional email management
- ✅ No backend required
- ✅ Compliance handled by Mailchimp
- ❌ Iframe has limited styling control
- ❌ Dependent on Mailchimp service availability

## Tips

- Number decisions sequentially (ADR-001, ADR-002, etc.)
- Update this file when making significant changes to site architecture
- Document "why" not "how" (implementation details go in CLAUDE.md)
