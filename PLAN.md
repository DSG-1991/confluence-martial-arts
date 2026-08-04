# Fix Plan: Hero Video on Mobile + Video 3 Not Playing

## Phase 1 — Discovery

**Problem 1:** Hero background video doesn't show on mobile. The video file (271KB, 640x340, vp09 codec) was downloaded as a DASH fragment without proper MP4 metadata. Mobile browsers need the moov atom at the start of the file for streaming playback. Without ffmpeg (no sudo), the file can't be fixed.

**Problem 2:** Video card 3 uses a Facebook Reel embed (`reel/3403520003128982/`). Reels use a different player format than standard videos and may not play inline via the plugin embed.

**Verified:**
- ✅ Video file exists at `images/hero-bg-video.mp4` (277KB, valid MP4 header)
- ✅ HTML has `<video>` element with `autoplay muted loop playsinline preload="auto"`
- ✅ CSS has `.hero-video` with correct positioning and z-index
- ✅ No `poster` attribute (removed in previous fix)
- ✅ Video card 3 embed uses reel format URL
- ❌ Cannot run ffmpeg (no sudo)
- ❌ Cannot verify video plays on mobile from this environment

## Phase 2 — Solution Space

### Hero Video on Mobile

**Approach A — Re-download with yt-dlp using a compatible format (BEST)**
- Use yt-dlp to download the video in a mobile-compatible format (h264 instead of vp09)
- Pros: Fixes the root cause, no CSS changes needed
- Cons: Facebook may not offer h264 in the available formats
- Complexity: Low

**Approach B — Add a CSS fallback background image for mobile**
- Add a `background-image` to `.hero` that shows when the video doesn't play
- Pros: Guaranteed to work on all devices
- Cons: Workaround, not root cause fix
- Complexity: Low

**Approach C — Use a YouTube-hosted version of the video**
- Upload to YouTube, embed via YouTube iframe
- Pros: Reliable playback across all devices
- Cons: Requires manual upload, different from Facebook source
- Complexity: Medium

**Chosen:** Approach A first. If no h264 format available, combine A + B.

### Video 3 Not Playing

**Approach A — Use standard video embed format instead of reel format**
- Reels use a different player. Try the standard `/videos/` URL format
- Pros: Standard video embeds are more reliable
- Cons: The reel URL may not have a standard video equivalent
- Complexity: Low

**Approach B — Replace with a different working video from the same pages**
- Use a different video from Confluence MA or Craig's page
- Pros: Guaranteed to work if we find a working one
- Cons: Need to find one
- Complexity: Low

**Chosen:** Approach A. Try converting the reel URL to standard video format.

## Phase 3 — Workflow

### Hero Video Fix:
1. Check available formats from Facebook for this video
2. Download in h264 format if available
3. If not, add CSS background fallback for mobile

### Video 3 Fix:
1. Try the reel URL as a standard video embed
2. If that doesn't work, find an alternative video

## Phase 4 — Steps

### Step 1: Check video formats
- Run `yt-dlp -F` on the hero video URL
- Look for h264/mp4 format (not vp09)

### Step 2: Re-download if possible
- If h264 format exists, download and replace the file
- If not, proceed to CSS fallback

### Step 3: Fix video 3 embed
- Change the embed URL from reel format to standard video format
- Deploy and verify

### Step 4: Deploy
- Commit, push, deploy to Netlify
- Verify live site

## Phase 5 — Checklist
- [ ] Check available video formats
- [ ] Re-download hero video in mobile-compatible format
- [ ] Fix video 3 embed URL
- [ ] Commit, push, deploy
- [ ] Verify live site

## Phase 6 — Constraints
- No sudo access (can't install ffmpeg)
- Can't test mobile rendering from this environment
- Must use delegate_task for code changes
