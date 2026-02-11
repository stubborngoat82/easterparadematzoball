# 📸 Photo Upload Quick Reference Card
## Easter Parade Matzo Ball - One-Page Guide

---

## ⚡ Quick Steps

1. **Optimize photo** → Use [TinyPNG.com](https://tinypng.com)
2. **Upload to GitHub** → `photos/[YEAR]/` folder
3. **Edit photos.html** → Add photo card
4. **Commit changes** → Push to main branch
5. **Done!** → Live in 1-2 minutes

---

## 📁 File Structure

```
photos/
├── 2026/    ← Put 2026 photos here
├── 2023/    ← Put 2023 photos here
├── 2021/    ← Put 2021 photos here
└── 2019/    ← Put 2019 photos here
```

---

## 🎨 Photo Specs

| Setting | Value |
|---------|-------|
| **Format** | JPG or PNG |
| **Max Width** | 1200px |
| **Max File Size** | 500 KB |
| **Naming** | `2023-01.jpg`, `2023-02.jpg`, etc. |

---

## 📝 HTML Template

**Copy this, replace [BRACKETS], paste into photos.html:**

```html
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

**Example:**
```html
<div class="rounded-2xl overflow-hidden shadow-lg card-hover photo-hover cursor-pointer"
     onclick="openModal('photos/2023/2023-05.jpg', 'Hat Contest Winners')">
    <img src="photos/2023/2023-05.jpg" alt="2023 Hat Contest Winners" class="w-full h-64 object-cover" onerror="...">
    <div class="bg-purple-900 text-white p-3 text-center">
        <p class="font-bold cinzel">Hat Contest Winners</p>
    </div>
</div>
```

---

## 🔧 Where to Edit

1. Open `photos.html`
2. Find the year section (search for `<!-- 2023 Gallery -->`)
3. Find the `<!-- Photo Grid -->` section
4. Add your photo card inside the grid
5. Save and commit

---

## ✅ Checklist Before Publishing

- [ ] Photo optimized (under 500 KB)
- [ ] File uploaded to correct year folder
- [ ] HTML updated with correct file path
- [ ] Caption is descriptive and accurate
- [ ] Alt text added for accessibility
- [ ] Changes committed to main branch
- [ ] Tested on website (wait 1-2 min after push)
- [ ] Works on mobile and desktop

---

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| Photo not showing | Check file path matches exactly (case-sensitive!) |
| Too slow to load | Re-optimize image (make it smaller) |
| Wrong photo in modal | Check `onclick="openModal('...')` path |
| Can't push to GitHub | Run `git pull origin main` first |

---

## 🔗 Resources

- **Full Guide:** See `PHOTO_ADMIN_GUIDE.md`
- **Optimize Photos:** https://tinypng.com
- **GitHub Help:** https://docs.github.com

---

## 📞 Need More Help?

See the complete **PHOTO_ADMIN_GUIDE.md** for:
- Detailed step-by-step instructions
- Adding a new year section
- Troubleshooting guide
- Best practices

---

**Pro Tip:** Bookmark TinyPNG.com and always optimize before uploading!
