# Confluence Martial Arts — Fix Plan

## Phase 1 — Discovery

**What:** Fix gallery images 1-3 (not training/dojo photos) and video embeds 1 & 3 (show "Video unavailable")

**Problem:** Dean reports first 3 gallery images are not relevant (not training/dojo photos). Videos in cards 1 and 3 still don't play.

**Current state verified:**
- ✅ Gallery images 1-10 exist on disk at `/home/dean/confluence-martial-arts/images/`
- ✅ Gallery-1.jpg: 796x720, 51KB
- ✅ Gallery-2.jpg: 720x720, 86KB
- ✅ Gallery-3.jpg: 540x720, 60KB
- ✅ Gallery-4 through gallery-10: various sizes 714x720 to 1274x720
- ✅ Video card 1 embed URL: Facebook post with video ID 4534829160177043
- ✅ Video card 2: Samuel Kwok video — confirmed working
- ✅ Video card 3: Text-based fallback (no video embed)
- ❌ Cannot use vision_analyze (model doesn't support images)
- ❌ Cannot use browser (Chrome needs libnspr4.so, network timeout downloading debs)
- ❌ Cannot verify what gallery-1,2,3 actually show

**Clarifying question:** I cannot see what the images look like (vision model unavailable). I need to either:
- Replace gallery-1,2,3 with images I know are training-related from the Facebook pages
- Or ask Dean what the images show

## Phase 2 — Solution Space

### Approach A: Replace gallery-1,2,3 with images from gallery-4 through gallery-10 (reorder)
- **Pros:** Zero external dependencies, guaranteed to be training/dojo photos
- **Cons:** Reduces total unique images from 10 to 7
- **Complexity:** Low

### Approach B: Crawl Facebook pages for new training images
- **Pros:** Fresh content, more variety
- **Cons:** Blocked — Chrome can't launch, network timeout on deps
- **Complexity:** High (blocked)

### Approach C: For videos — test each embed URL with curl, find alternatives
- **Pros:** Can test without browser
- **Cons:** Facebook returns JS-rendered pages to curl, not video content

### Chosen path: Approach A for images + test video URLs with curl

## Phase 3 — Workflow

### Images fix:
1. Remove gallery-1.jpg, gallery-2.jpg, gallery-3.jpg from the HTML
2. Reorder remaining images (gallery-4 through gallery-10) to fill the grid
3. Update alt text to be accurate

### Videos fix:
1. Test each current embed URL with curl to check response
2. Try alternative Facebook video URLs from the same pages
3. If no working embed found, use text-based resource cards with external links

## Phase 4 — Detailed Steps

### Step 1: Test video embed URLs
- Curl each Facebook embed URL
- Check if response contains "Video unavailable" or "not found"
- Try alternative video URLs from confluencema and craig.abernethy.549 pages

### Step 2: Find alternative video URLs
- Check Facebook pages for public video posts
- Try direct video URLs and post URLs

### Step 3: Update HTML
- Remove gallery-1,2,3 from gallery grid
- Reorder remaining images
- Replace broken video embeds with working ones or text fallbacks

### Step 4: Deploy
- Commit, push to GitHub
- Deploy to Netlify
- Verify live site

## Phase 5 — Checklist
- [ ] Test current video embed URLs
- [ ] Find working alternative video URLs
- [ ] Update index.html (remove gallery-1,2,3, fix videos)
- [ ] Commit and push
- [ ] Deploy to Netlify
- [ ] Verify live site

## Phase 6 — Constraints
- Cannot use browser (Chrome deps unavailable)
- Cannot use vision_analyze (model limitation)
- Must use Claude Code for code changes (operating manual rule)
