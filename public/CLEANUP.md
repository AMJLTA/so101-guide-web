# public/ cleanup checklist

This folder has ~10 MB of dead files that should be removed, and 4 icon files
that are 30-40× larger than they should be. Patch zips can only **add or
overwrite** files, never delete — so the author needs to do this step manually.

## ❌ Delete (unreferenced — verified with `grep -r` across the repo)

```
public/1apple-icon.png                   1.4 MB
public/1icon-dark-32x32.png              1.4 MB
public/1icon-light-32x32.png             1.4 MB
public/1lvjin-so101-hero.jpeg            1.8 MB
public/1lvjin-so101-view-front.png       1.5 MB
public/1lvjin-so101-view-rear.png        1.5 MB
public/1lvjin-so101-view-top.png         1.5 MB
public/2lvjin-so101-hero.jpeg
public/3lvjin-so101-view-side.jpeg
public/3lvjin-so101-view-side.png        1.5 MB
public/placeholder-logo.png
public/placeholder-logo.svg
public/placeholder-user.jpg
public/placeholder.jpg
public/placeholder.svg
public/logo.jpeg
```

**One-liner (Unix / macOS / Git Bash):**

```bash
cd public && rm -f \
  1apple-icon.png 1icon-dark-32x32.png 1icon-light-32x32.png \
  1lvjin-so101-hero.jpeg 1lvjin-so101-view-front.png \
  1lvjin-so101-view-rear.png 1lvjin-so101-view-top.png \
  2lvjin-so101-hero.jpeg 3lvjin-so101-view-side.jpeg \
  3lvjin-so101-view-side.png placeholder-logo.png \
  placeholder-logo.svg placeholder-user.jpg placeholder.jpg \
  placeholder.svg logo.jpeg
```

**PowerShell (Windows):**

```powershell
cd public; Remove-Item -Force `
  1apple-icon.png, 1icon-dark-32x32.png, 1icon-light-32x32.png, `
  1lvjin-so101-hero.jpeg, 1lvjin-so101-view-front.png, `
  1lvjin-so101-view-rear.png, 1lvjin-so101-view-top.png, `
  2lvjin-so101-hero.jpeg, 3lvjin-so101-view-side.jpeg, `
  3lvjin-so101-view-side.png, placeholder-logo.png, `
  placeholder-logo.svg, placeholder-user.jpg, placeholder.jpg, `
  placeholder.svg, logo.jpeg
```

## ⚠ Compress (still used, but way oversized)

These 4 files are **served on every page load** and are 30-40× larger than they
should be. Compress them in-place — same filenames, just smaller.

| File | Current | Target | Why |
|------|---------|--------|-----|
| `apple-icon.png` | 1.4 MB | ~50 KB | Apple touch icon, 180×180 |
| `icon-dark-32x32.png` | 1.4 MB | < 5 KB | Favicon, 32×32 |
| `icon-light-32x32.png` | 1.4 MB | < 5 KB | Favicon, 32×32 |
| `lvjin-logo.png` | 1.4 MB | ~80 KB | Header logo, used at 40px |

**Quick command using `cwebp` + `convert` (ImageMagick) if installed:**

```bash
# Resize favicons down to actually-32 pixels and re-encode
convert apple-icon.png    -resize 180x180 -strip apple-icon.png
convert icon-dark-32x32.png  -resize 32x32 -strip icon-dark-32x32.png
convert icon-light-32x32.png -resize 32x32 -strip icon-light-32x32.png
# Logo: keep transparent PNG, resize to render size + 2x for retina
convert lvjin-logo.png -resize 80x80 -strip lvjin-logo.png
```

Or upload them to <https://squoosh.app> and replace.

## 📊 Expected savings

| Action | Before | After |
|--------|--------|-------|
| Delete dead files | ~13 MB | 0 MB |
| Compress 4 icons | ~5.6 MB | ~140 KB |
| **Total reduction** | **~18 MB** | **~150 KB** |

`public/` repo size drops by ~99%, build output by similar amount, every page
load saves ~3 MB of icon traffic.
