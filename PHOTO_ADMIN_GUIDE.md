# 📸 Photo Gallery Admin Guide
## Easter Parade Matzo Ball Website

This guide provides step-by-step instructions for adding and managing photos on the Easter Parade Matzo Ball website.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [File Structure](#file-structure)
3. [Preparing Photos](#preparing-photos)
4. [Adding Photos to the Website](#adding-photos-to-the-website)
5. [Updating HTML Code](#updating-html-code)
6. [Publishing Changes](#publishing-changes)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

**What you'll need:**
- Access to the GitHub repository
- Photo files (JPG or PNG format)
- Basic text editor or GitHub web interface
- (Optional) Image editing software for optimization

**Basic workflow:**
1. Prepare and optimize photos
2. Upload photos to the correct folder
3. Update the HTML code to display photos
4. Commit and push changes to GitHub
5. Photos appear on website automatically

---

## File Structure

### Recommended Organization

```
easterparadematzoball-website/
├── photos/
│   ├── 2026/
│   │   ├── 2026-01.jpg
│   │   ├── 2026-02.jpg
│   │   └── 2026-03.jpg
│   ├── 2023/
│   │   ├── 2023-01.jpg
│   │   ├── 2023-02.jpg
│   │   └── 2023-03.jpg
│   ├── 2021/
│   │   ├── 2021-01.jpg
│   │   └── 2021-02.jpg
│   └── 2019/
│       ├── 2019-01.jpg
│       └── 2019-02.jpg
├── photos.html
├── index.html
└── (other files)
```

### Creating the Photos Directory

If the `photos` folder doesn't exist yet:

**Method 1: Using GitHub Web Interface**
1. Go to your repository on GitHub
2. Click "Add file" → "Create new file"
3. Type `photos/2023/placeholder.txt` (this creates the folder structure)
4. Add a simple message in the file
5. Commit the file

**Method 2: Using Command Line**
```bash
# Navigate to your website directory
cd /path/to/easterparadematzoball-website

# Create the photos directory structure
mkdir -p photos/2019
mkdir -p photos/2021
mkdir -p photos/2023
mkdir -p photos/2026

# Add a placeholder file (optional)
echo "Photo directory for Easter Parade Matzo Ball" > photos/README.txt
```

---

## Preparing Photos

### Image Specifications

**Recommended settings:**
- **Format:** JPG (preferred) or PNG
- **File size:** Under 500 KB per image (for fast loading)
- **Dimensions:** 1200px wide (max) or 1920px wide for high-quality displays
- **Aspect ratio:** 3:2 or 4:3 works best
- **File naming:** Use simple names like `2023-01.jpg`, `2023-02.jpg`, etc.

### Optimizing Images

**Why optimize?**
- Faster page loading
- Better mobile experience
- Lower bandwidth usage
- Better SEO

**How to optimize:**

**Option 1: Online Tools (Easiest)**
- Visit [TinyPNG.com](https://tinypng.com) or [Squoosh.app](https://squoosh.app)
- Upload your images
- Download the compressed versions
- Typically reduces file size by 50-70% with no visible quality loss

**Option 2: Using Image Editing Software**

**Photoshop:**
1. Open image
2. Image → Image Size → Set width to 1200px
3. File → Export → Save for Web
4. Choose "JPEG High" quality (60-80%)
5. Save

**Preview (Mac):**
1. Open image
2. Tools → Adjust Size → Set width to 1200px
3. File → Export → Adjust quality slider
4. Save

**GIMP (Free):**
1. Open image
2. Image → Scale Image → Set width to 1200px
3. File → Export As → Choose JPEG
4. Set quality to 80-85%
5. Export

### File Naming Convention

Use consistent, descriptive names:

**Good examples:**
- `2023-01.jpg`, `2023-02.jpg` (sequential)
- `2023-parade-start.jpg`, `2023-hat-contest.jpg` (descriptive)
- `2023-group-photo.jpg`

**Avoid:**
- `IMG_1234.jpg` (not descriptive)
- `My Amazing Photo!!!.jpg` (special characters, spaces)
- `photo final FINAL v2.jpg` (confusing)

---

## Adding Photos to the Website

### Method 1: GitHub Web Interface (Easiest for Non-Technical Users)

**Step 1: Navigate to the photos folder**
1. Go to https://github.com/[YOUR-USERNAME]/easterparadematzoball-website
2. Click on the `photos` folder
3. Click on the year folder (e.g., `2023`) or create a new year folder

**Step 2: Upload photos**
1. Click "Add file" → "Upload files"
2. Drag and drop your optimized photos OR click "choose your files"
3. Select all the photos you want to upload
4. Add a commit message: e.g., "Add 2023 parade photos"
5. Click "Commit changes"

**Step 3: Verify upload**
- Your photos should now appear in the folder
- Note the file names and paths (you'll need these for the HTML)

### Method 2: Using Git Command Line (For Technical Users)

```bash
# Navigate to your website directory
cd /path/to/easterparadematzoball-website

# Make sure you're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Copy your photos to the appropriate folder
cp /path/to/your/photos/*.jpg photos/2023/

# Add the photos to git
git add photos/2023/*.jpg

# Commit the changes
git commit -m "Add 2023 parade photos (12 images)"

# Push to GitHub
git push origin main
```

---

## Updating HTML Code

After uploading photos, you need to update `photos.html` to display them.

### Understanding the Photo Card Structure

Each photo uses this HTML structure:

```html
<!-- Photo Card -->
<div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer"
     onclick="openModal('photos/2023/2023-01.jpg', 'Grand Parade')">
    <img src="photos/2023/2023-01.jpg"
         alt="2023 Grand Parade"
         class="w-full h-64 object-cover"
         onerror="this.parentElement.innerHTML='<div class=\'bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-center min-h-64 flex flex-col items-center justify-center\'><i data-lucide=\'camera\' class=\'w-16 h-16 text-yellow-300 mb-4\'></i><h4 class=\'text-white font-bold cinzel text-lg\'>Grand Parade</h4><p class=\'text-sm text-yellow-200 mt-2 cinzel\'>Photo coming soon</p></div>'; lucide.createIcons();">
    <div class="bg-purple-900 text-white p-3 text-center">
        <p class="font-bold cinzel">Grand Parade</p>
    </div>
</div>
```

### Step-by-Step: Adding a New Photo

**Step 1: Open photos.html**
- Use a text editor (VS Code, Sublime Text, Notepad++) OR
- Edit directly on GitHub (click the pencil icon)

**Step 2: Find the correct year section**
- Look for comments like `<!-- 2023 Gallery -->`
- Find the `<!-- Photo Grid -->` section within that year

**Step 3: Copy an existing photo card**
- Copy one complete photo div (from `<div class="rounded-2xl...` to `</div>`)
- Paste it below the last photo in the grid

**Step 4: Update the photo information**

Change these parts:
1. **File path** (appears 2 times): `photos/2023/2023-01.jpg` → `photos/2023/2023-05.jpg`
2. **Caption text** (appears 2 times): `Grand Parade` → `Your New Caption`
3. **Alt text**: `alt="2023 Grand Parade"` → `alt="2023 Your New Caption"`

**Example - Before:**
```html
<div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer"
     onclick="openModal('photos/2023/2023-01.jpg', 'Grand Parade')">
    <img src="photos/2023/2023-01.jpg"
         alt="2023 Grand Parade"
         class="w-full h-64 object-cover"
         onerror="...">
    <div class="bg-purple-900 text-white p-3 text-center">
        <p class="font-bold cinzel">Grand Parade</p>
    </div>
</div>
```

**Example - After:**
```html
<div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer"
     onclick="openModal('photos/2023/2023-05.jpg', 'Hat Workshop Fun')">
    <img src="photos/2023/2023-05.jpg"
         alt="2023 Hat Workshop Fun"
         class="w-full h-64 object-cover"
         onerror="...">
    <div class="bg-purple-900 text-white p-3 text-center">
        <p class="font-bold cinzel">Hat Workshop Fun</p>
    </div>
</div>
```

**Step 5: Save the file**

### Adding Photos for a New Year

If you're adding photos for a brand new year (e.g., 2026):

**Step 1: Copy an entire year section**
- Find a complete year section (from `<!-- 2023 Gallery -->` to `</section>`)
- Copy the entire section
- Paste it above the oldest year

**Step 2: Update year references**
- Change all instances of `2023` to `2026`
- Update the heading: `🌟 2023 Parade Highlights` → `🌟 2026 Parade Highlights`
- Update the description text
- Update all photo paths: `photos/2023/` → `photos/2026/`

**Step 3: Update photo cards**
- Add your new photos following the instructions above
- You can add as many photos as needed to the grid

### Visual Layout Guide

The photo grid uses responsive columns:
- **Desktop:** 4 photos per row (for 2023) or 3 photos per row (for 2021/2019)
- **Tablet:** 2 photos per row
- **Mobile:** 1 photo per row

**Grid classes:**
- `md:grid-cols-4` = 4 columns on desktop
- `md:grid-cols-3` = 3 columns on desktop

You can adjust these if you want different layouts.

---

## Publishing Changes

### Using GitHub Web Interface

After editing `photos.html`:
1. Scroll to bottom of page
2. Add commit message: "Add 5 new photos to 2023 gallery"
3. Choose "Commit directly to main branch"
4. Click "Commit changes"
5. Wait 1-2 minutes for GitHub Pages to rebuild
6. Visit www.easterparadematzoball.com/photos.html to see changes

### Using Git Command Line

```bash
# After editing photos.html locally
git add photos.html

# If you also added new photos
git add photos/

# Commit with a clear message
git commit -m "Add 8 new photos to 2023 parade gallery"

# Push to GitHub
git push origin main

# Changes will be live in 1-2 minutes
```

### Verifying Changes

1. Visit the photos page on your website
2. Check that:
   - New photos load correctly
   - Captions are accurate
   - Clicking photos opens the modal view
   - Photos look good on mobile (use browser dev tools)

---

## Best Practices

### Photo Quality
- ✅ Always optimize images before uploading
- ✅ Use consistent image sizes within the same gallery
- ✅ Test photos on both desktop and mobile
- ✅ Ensure photos are well-lit and in focus
- ❌ Don't upload RAW files or extremely large images

### Organization
- ✅ Organize by year in separate folders
- ✅ Use sequential numbering (2023-01.jpg, 2023-02.jpg)
- ✅ Keep a local backup of all photos
- ✅ Document what each photo shows
- ❌ Don't mix years in the same folder

### Performance
- ✅ Keep file sizes under 500 KB
- ✅ Limit number of photos displayed per page (12-20 max)
- ✅ Use "View Complete Gallery" buttons for additional photos
- ✅ Consider lazy loading for large galleries
- ❌ Don't upload hundreds of photos to a single page

### Accessibility
- ✅ Always include descriptive alt text
- ✅ Use clear, readable captions
- ✅ Ensure good color contrast in overlays
- ✅ Test keyboard navigation (tab through photos)
- ❌ Don't use generic alt text like "image" or "photo"

### Copyright & Privacy
- ✅ Only upload photos you have permission to use
- ✅ Be mindful of people's privacy (especially children)
- ✅ Credit photographers when appropriate
- ✅ Remove photos if requested by subjects
- ❌ Don't upload photos with sensitive information visible

---

## Troubleshooting

### Photo Not Displaying

**Problem:** You see a colored placeholder instead of your photo

**Solutions:**
1. **Check file path:** Make sure the path in the HTML matches the actual file location
   - HTML says: `photos/2023/2023-01.jpg`
   - File location should be: `/photos/2023/2023-01.jpg` in your repository

2. **Check file name:** Ensure exact match including:
   - Capitalization (2023-01.jpg vs 2023-01.JPG)
   - File extension (.jpg vs .jpeg vs .JPG)

3. **Wait for deployment:** GitHub Pages takes 1-2 minutes to update

4. **Clear browser cache:**
   - Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Photo Loads Slowly

**Problem:** Photos take a long time to load

**Solutions:**
1. **Optimize the image:**
   - Use TinyPNG.com or Squoosh.app
   - Reduce dimensions to 1200px wide
   - Reduce quality to 80%

2. **Check file size:**
   - Right-click file in Finder/Explorer
   - Should be under 500 KB
   - If larger, re-optimize

### Wrong Photo Displays

**Problem:** Clicking a photo opens the wrong image in the modal

**Solutions:**
1. **Check onclick attribute:**
   ```html
   onclick="openModal('photos/2023/2023-05.jpg', 'Caption')"
   ```
   Make sure the path matches the actual photo

2. **Check both src and onclick:**
   - The `<img src="">` should match the `onclick="openModal('')"`
   - Both should point to the same file

### Photos Don't Align Properly

**Problem:** Photos have different heights or look misaligned

**Solutions:**
1. **Consistent dimensions:** Use images with the same aspect ratio
2. **Check CSS class:** Make sure `object-cover` class is present on `<img>` tag
3. **Browser zoom:** Reset browser zoom to 100%

### Modal Not Working

**Problem:** Clicking photos doesn't open the large view

**Solutions:**
1. **Check JavaScript:** Scroll to bottom of photos.html
   - Verify the `openModal()` function exists
   - Check browser console for errors (F12 → Console)

2. **Check onclick attribute:** Make sure it's properly formatted:
   ```html
   onclick="openModal('photos/2023/2023-01.jpg', 'Caption')"
   ```

3. **Test in different browser:** Try Chrome, Firefox, or Safari

### Git Push Fails

**Problem:** Can't push changes to GitHub

**Solutions:**
1. **Pull first:**
   ```bash
   git pull origin main
   ```

2. **Check authentication:**
   - Ensure you're logged into GitHub
   - Update credentials if needed

3. **Check file size:**
   - GitHub has a 100 MB file size limit
   - Individual photos should be under 10 MB

---

## Common Tasks Reference

### Add 1 Photo to Existing Gallery

1. Optimize photo
2. Upload to `photos/YEAR/` folder
3. Copy existing photo card in HTML
4. Update file path and caption
5. Commit changes

**Time estimate:** 5-10 minutes

### Add New Year Gallery

1. Create new folder: `photos/2026/`
2. Upload optimized photos
3. Copy entire year section in HTML
4. Update all year references (2023 → 2026)
5. Update photo cards with new photos
6. Commit changes

**Time estimate:** 20-30 minutes

### Replace a Photo

1. Upload new photo with same filename
2. No HTML changes needed if filename is the same
3. Commit changes
4. Clear browser cache to see new photo

**Time estimate:** 5 minutes

### Remove a Photo

1. Delete the photo from `photos/YEAR/` folder
2. Remove the corresponding photo card from HTML
3. Commit changes

**Time estimate:** 5 minutes

---

## Need Help?

**Common Resources:**
- GitHub Help: https://docs.github.com
- Image Optimization: https://tinypng.com or https://squoosh.app
- HTML Tutorial: https://www.w3schools.com/html/

**Questions?**
- Review this guide
- Check the CLAUDE.md file for project-specific info
- Ask a team member with GitHub access

---

## Appendix: Complete Photo Card Template

Use this template to add a new photo (copy and paste, then customize):

```html
<!-- Photo [NUMBER] -->
<div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer"
     onclick="openModal('photos/[YEAR]/[FILENAME].jpg', '[CAPTION]')">
    <img src="photos/[YEAR]/[FILENAME].jpg"
         alt="[YEAR] [CAPTION]"
         class="w-full h-64 object-cover"
         onerror="this.parentElement.innerHTML='<div class=\'bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-center min-h-64 flex flex-col items-center justify-center\'><i data-lucide=\'camera\' class=\'w-16 h-16 text-yellow-300 mb-4\'></i><h4 class=\'text-white font-bold cinzel text-lg\'>[CAPTION]</h4><p class=\'text-sm text-yellow-200 mt-2 cinzel\'>Photo coming soon</p></div>'; lucide.createIcons();">
    <div class="bg-purple-900 text-white p-3 text-center">
        <p class="font-bold cinzel">[CAPTION]</p>
    </div>
</div>
```

**Replace these placeholders:**
- `[NUMBER]` - Sequential number (1, 2, 3, etc.)
- `[YEAR]` - Event year (2023, 2024, etc.)
- `[FILENAME]` - Your image filename (without extension)
- `[CAPTION]` - Descriptive caption for the photo

**Example filled in:**
```html
<!-- Photo 5 -->
<div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer"
     onclick="openModal('photos/2023/2023-05.jpg', 'Hat Workshop')">
    <img src="photos/2023/2023-05.jpg"
         alt="2023 Hat Workshop"
         class="w-full h-64 object-cover"
         onerror="this.parentElement.innerHTML='<div class=\'bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-center min-h-64 flex flex-col items-center justify-center\'><i data-lucide=\'camera\' class=\'w-16 h-16 text-yellow-300 mb-4\'></i><h4 class=\'text-white font-bold cinzel text-lg\'>Hat Workshop</h4><p class=\'text-sm text-yellow-200 mt-2 cinzel\'>Photo coming soon</p></div>'; lucide.createIcons();">
    <div class="bg-purple-900 text-white p-3 text-center">
        <p class="font-bold cinzel">Hat Workshop</p>
    </div>
</div>
```

---

**Document Version:** 1.0
**Last Updated:** February 10, 2026
**Maintained By:** Easter Parade Matzo Ball Web Team
