# Key Project Facts

This file stores important configuration and reference information for the Easter Parade Matzo Ball website.

## ⚠️ Security Note

This file contains **non-sensitive** reference information only. Never store passwords, API keys, or credentials here.

## Project Overview

**Site Name:** Easter Parade Matzo Ball
**Primary Domain:** www.easterparadematzoball.com
**Hosting:** GitHub Pages (custom domain via CNAME)
**Repository:** GitHub (current working directory)
**Deployment:** Automatic on push to `main` branch

## Technology Stack

**Frontend Framework:**
- Tailwind CSS v3.4.1 (loaded via CDN)
- CDN URL: `https://cdn.tailwindcss.com`

**Icons:**
- Lucide Icons (loaded via CDN)
- CDN URL: `https://unpkg.com/lucide@latest`

**Typography:**
- Google Fonts: Cinzel (serif family)
- CDN URL: `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap`

**Build Process:** None (static HTML files)

## Site Structure

**Pages:**
1. `index.html` - Home page with event details (single-page app structure)
2. `hatmaking.html` - Hat-making workshop information
3. `joinus.html` - Mailing list signup page
4. `photos.html` - Photo gallery organized by year

**Image Assets:**
- `logo.png` - Main logo with background
- `bglesslogo.png` - Logo without background
- `Epmb_logo.jpg` - Alternate logo format
- `logonobg.png` - Logo without background (PNG)
- `background.jpg` - Background image used on some pages

**PDF Documents:**
- `HatFeb.pdf` / `Hat Workshop Feb 23,2026.pdf` - February workshop flyer (embedded in hatmaking.html)
- `HatMarch.pdf` / `Hat Workshop March 28, 2026.pdf` - March workshop flyer (embedded in hatmaking.html)
- `FOFparking.pdf` / `Fusion on First Parking 2.pdf` - Parking and directions flyer (embedded in hatmaking.html)
- Note: Duplicate PDF files exist (e.g., HatFeb.pdf.pdf) - may need cleanup

**Font Files (Not Currently Used):**
- `CormorantGaramond-Medium.ttf` - Font file added but not referenced in HTML
- `CormorantGaramond-MediumItalic.ttf` - Font file added but not referenced in HTML
- Status: Files present but site still uses Cinzel exclusively via Google Fonts CDN

**Configuration Files:**
- `CNAME` - Custom domain configuration (www.easterparadematzoball.com)
- `CLAUDE.md` - AI assistant instructions (project conventions)

## Design System

**Color Palette:**
- Primary: Purple (`purple-900`, `purple-700`, `purple-600`)
- Accents: Pink, yellow, orange, green, blue (gradient overlays)
- Backgrounds: Semi-transparent white cards over gradient overlays

**Typography:**
- Font Family: Cinzel (applied via `.cinzel` class)
- All headings and body text use Cinzel

**Border Radius:**
- Cards: `rounded-3xl`
- Buttons: `rounded-full`

**Animation Classes:**
- `.float` - Floating animation
- `.bounce` - Bounce animation
- `.wiggle` - Wiggle animation
- `.slide-in-left` - Slide from left
- `.slide-in-right` - Slide from right
- `.card-hover` - Card hover effect with transform and shadow

## Navigation Structure

**Main Navigation (all pages):**
- 🏠 Home → index.html
- 👒 Hat Making → hatmaking.html
- 📸 Photos → photos.html
- 💌 Join Us → joinus.html

**Active Page Styling:**
- White background with shadow on active nav item

## Email Collection

**Service:** Mailchimp
**Form URL:** http://eepurl.com/jx5YG-/
**Implementation:** Embedded iframe on joinus.html
**Form Type:** Hosted Mailchimp form

## Local Development

**No Build Required:**
- Open HTML files directly in browser, or
- Run local server: `python3 -m http.server 8000`
- View at: http://localhost:8000

**Testing:**
- Test all pages in multiple browsers (Chrome, Safari, Firefox)
- Test on mobile viewports
- Verify CDN resources load correctly
- Check animation performance

## Deployment

**GitHub Pages Configuration:**
- Branch: `main`
- Directory: root (`/`)
- Custom domain: www.easterparadematzoball.com (via CNAME file)
- HTTPS: Enforced
- Auto-deployment: Enabled (pushes to main trigger deployment)

**Deployment Process:**
1. Push changes to `main` branch
2. GitHub Pages automatically deploys
3. Changes live in 1-2 minutes
4. No build step required

## Page-Specific Details

### index.html (Home Page)
- **Features**: Confetti animation, section navigation (SPA behavior), email form
- **Sections**: Hero, About, Details, Honorees, Sponsors, Donate, Email signup
- **JavaScript**: Confetti generation, section navigation, form handling
- **Honorees**:
  - Estelle Speros MacDonald (Estelle's Bistro owner, jazz community supporter)
  - Jana Bommersbach ("Belle of Hoover Street", journalist, author of "The Trunk Murderess")

### hatmaking.html
- **Features**: Workshop schedule, special announcements, embedded PDF flyers
- **Content**: Hat-making workshop details and times
- **Workshop Times**:
  - 11:00 AM - 2:00 PM Workshop
  - 2:00 PM - 4:00 PM Lecture
- **PDF Section**: Three embedded iframes with downloadable flyers:
  - February workshop flyer
  - March workshop flyer
  - Parking and directions

### photos.html
- **Features**: Photo gallery with modal functionality (click to enlarge)
- **Photo Count**: 19 photos from photos/ directory
- **Layout**: 4-column responsive grid with generic photo numbering
- **JavaScript**: Modal open/close functionality, keyboard navigation (Escape to close)
- **Note**: Photos are numbered generically (Photo 1, Photo 2, etc.) without specific contexts or year-based organization

### joinus.html
- **Features**: Embedded Mailchimp form
- **Content**: Mailing list signup

## Important URLs

**Live Site:** https://www.easterparadematzoball.com
**GitHub Pages Default:** [Your GitHub Pages URL - not publicly documented to avoid confusion]

## Recent Major Changes

**2026-02-13 (Latest - Commit b615306):**
- Added PDF flyer section to hatmaking.html with embedded iframes
- Updated workshop schedule to show separate workshop (11 AM-2 PM) and lecture (2 PM-4 PM) times
- Enhanced honoree descriptions with detailed biographies
- Changed honoree message to memorial tone ("We miss and are thankful for them")
- Added Cormorant Garamond font files (not yet used in HTML)
- Added multiple PDF files: workshop flyers (Feb/March) and parking information

**2026-02-13 (Earlier):**
- Added sponsor section and donation functionality
- Implemented comprehensive photo gallery system
- Updated navigation links
- Added RSVP functionality
- Enhanced hat-making page with special announcements

## Tips

- Keep all image assets in root directory (current pattern)
- Maintain consistent header/footer across pages
- Always test CDN loading in incognito/private browsing
- Update CNAME file if changing custom domain
- Remember: No build process means changes go live immediately after push

## Potential Cleanup Items

- **Duplicate PDF files**: Multiple copies exist (e.g., HatFeb.pdf + HatFeb.pdf.pdf, FOFparking.pdf + FOFparking.pdf.pdf + "Fusion on First Parking 2.pdf"). Consider removing duplicates.
- **Unused font files**: CormorantGaramond-Medium.ttf and CormorantGaramond-MediumItalic.ttf are present but not referenced. Remove if not planning to use, or update design system to implement.
