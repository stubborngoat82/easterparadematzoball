# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for the Easter Parade Matzo Ball community event hosted on GitHub Pages at www.easterparadematzoball.com. The site is a multi-page HTML website celebrating a community parade event that blends Easter and Jewish cultural traditions.

## Architecture

### Technology Stack
- **Frontend Framework**: Tailwind CSS (via CDN)
- **Icons**: Lucide Icons (via CDN)
- **Typography**: Google Fonts (Cinzel serif family)
- **Hosting**: GitHub Pages (custom domain via CNAME)
- **No Build Process**: All HTML files are standalone with inline styles and scripts

### Page Structure
The site consists of four standalone HTML pages with shared design patterns:

1. **index.html** - Home page with event details, single-page app structure with hidden sections
2. **hatmaking.html** - Hat-making workshop information and schedules
3. **joinus.html** - Mailing list signup with embedded Mailchimp form
4. **photos.html** - Photo galleries organized by year with modal functionality

### Design System

**Visual Theme**: Vibrant, festive, playful aesthetic with:
- Colorful gradient overlays (yellow, pink, purple)
- Animated confetti effects (home page only)
- Float, bounce, wiggle, and slide-in animations
- Emoji-heavy content
- Card hover effects with transform and shadow transitions

**Typography**: All pages use the "Cinzel" serif font exclusively via `.cinzel` class

**Color Palette**:
- Primary: Purple shades (purple-900, purple-700, purple-600)
- Accents: Pink, yellow, orange, green, blue gradients
- Backgrounds: Semi-transparent white cards over gradient overlays

**Navigation**: Consistent across all pages with emoji icons:
- 🏠 Home
- 👒 Hat Making
- 📸 Photos
- 💌 Join Us

Active page is highlighted with white background and shadow

### Shared Components

**Header Pattern**: Each page has a centered logo (logo.png) above navigation

**Footer Pattern**: Consistent purple-900 background with event branding and contact info

**Card Pattern**: White/semi-transparent cards with rounded-3xl corners, hover effects

**Background**: All pages use `.bg-with-overlay` class with gradient and optional background image

### JavaScript Functionality

**index.html**:
- Confetti animation on page load
- Section navigation (single-page app behavior)
- Email form submission with success message
- Lucide icon initialization

**photos.html**:
- Modal photo viewer with keyboard/click close functionality
- Lucide icon initialization

**hatmaking.html** and **joinus.html**:
- Lucide icon initialization only

## Development Workflow

### Local Development
Since this is a static site with no build process:
1. Open HTML files directly in a browser, or
2. Use a local server: `python3 -m http.server 8000`
3. View at http://localhost:8000

### Deployment
The site auto-deploys via GitHub Pages when pushing to the main branch. The CNAME file ensures the custom domain (www.easterparadematzoball.com) is maintained.

### Making Changes
- Edit HTML files directly
- All styles are inline `<style>` tags in each page's `<head>`
- All scripts are inline `<script>` tags before closing `</body>`
- Images referenced: logo.png, bglesslogo.png, Epmb_logo.jpg, background.jpg, logonobg.png
- External dependencies loaded via CDN (no package.json or npm)

## Key Implementation Details

### Responsive Design
Uses Tailwind's responsive classes (md:, flex-wrap, etc.) for mobile-first responsive layout

### Email Collection
The joinus.html page embeds a Mailchimp form via iframe: `http://eepurl.com/jx5YG-/`

### Animation Performance
Animations use CSS transforms and opacity for GPU acceleration. Confetti elements are removed from DOM after 6 seconds to avoid memory issues.

### Asset Management
All image assets are in the root directory. No organized asset folder structure.

## Code Patterns to Follow

### When adding new pages:
1. Copy the header structure with logo and navigation
2. Include the three CDN links (Tailwind, Lucide, Google Fonts)
3. Add `.cinzel` and `.bg-with-overlay` style definitions
4. Copy the footer structure
5. Initialize Lucide icons with `lucide.createIcons()` in script tag

### When adding new sections:
1. Use `max-w-6xl` or `max-w-7xl` containers with `mx-auto`
2. Apply `rounded-3xl` to cards and `rounded-full` to buttons
3. Use gradient backgrounds (`bg-gradient-to-br`) for emphasis cards
4. Add `.card-hover` class for interactive elements
5. Include emoji in headings and buttons for brand consistency

### When styling elements:
- Prefer Tailwind utility classes over custom CSS
- Add custom animations in `<style>` tags when needed
- Maintain the playful, colorful aesthetic
- Use consistent spacing (p-8, mb-12, etc.)
