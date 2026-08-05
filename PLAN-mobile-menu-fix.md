# Plan: Fix CMA Mobile Menu Not Responding to Tap

## PHASE 1 — Discovery & Verification

**What:** Fix the mobile navigation menu on Confluence Martial Arts website — the hamburger toggle doesn't respond when tapped on mobile devices.

**Problem:** The hamburger button (`.nav-toggle`) does nothing when tapped on mobile. The menu doesn't slide down, and the hamburger icon doesn't animate.

**Users:** Site visitors on mobile devices (phones, tablets).

**Success criteria:**
- Tapping the hamburger icon on a mobile-width viewport toggles the menu open/closed
- The hamburger animates to an X when active
- The menu slides down with the nav links visible and tappable
- Tapping a nav link closes the menu

**Existing systems verified:**
- ✅ HTML structure — `index.html` has `nav-toggle` button with `id="navToggle"` and `nav-menu` ul with `id="navMenu"`. Script loads at bottom of body.
- ✅ CSS — `.nav-toggle` has `display: none` by default, `display: flex` at `@media (max-width: 768px)`. `.nav-menu` has `position: fixed; transform: translateY(-100%); opacity: 0` on mobile, `.active` state shows it.
- ✅ JavaScript — `DOMContentLoaded` listener toggles `.active` class on both `navToggle` and `navMenu`. Nav links close menu on click.
- ✅ Deployed to Netlify — `confluence-martial-arts.netlify.app` serves the latest code (commit `5367dc5`). Custom domain `confluencemartialarts.co.uk` does NOT resolve (DNS not configured).
- ✅ Live CSS includes `z-index: 999` on mobile nav-menu (from last fix commit)
- ✅ Live JS includes the toggle event listener

**Current gaps:**
- ❌ Cannot visually verify the rendered page — browser tool fails (missing `libnspr4.so`)
- ❓ Root cause of "does not respond when tapped" not yet identified — code looks structurally correct

**Clarifying questions:**
- ❓ Is there a JavaScript console error on the live site? (Need to check)
- ❓ Does the hamburger icon show on mobile but just not respond, or is it invisible?
- ❓ Does the issue occur on a specific device/browser or all mobile devices?

## PHASE 2 — Solution Space Mapping

### Approach 1: Investigate JS console errors first
**Description:** Check the browser console for JavaScript errors that might prevent the event listener from firing.
**Pros:** Fastest path to root cause if it's a JS error. No code changes needed if it's a deployment issue.
**Cons:** Requires browser access which is currently broken on this system.
**Complexity:** Low
**Success probability:** 50% — depends on whether there's a visible error

### Approach 2: Add defensive JS + CSS fixes
**Description:** Apply known fixes for common mobile menu issues — add `touch-action: manipulation` to the toggle button, ensure the button has `cursor: pointer` and `z-index` above all content, add a `click` event on the document to catch any bubbling issues.
**Pros:** Covers multiple potential root causes in one deploy. Low risk.
**Cons:** Might fix symptoms without addressing root cause.
**Complexity:** Low
**Success probability:** 70%

### Approach 3: Check if the hero video/overlay intercepts touches
**Description:** The hero video has `z-index: 0` and the overlay has `z-index: 1`, but the navbar has `z-index: 1000`. However, if the navbar's `position: fixed` doesn't create a proper stacking context on mobile, the toggle button could be behind the hero content.
**Pros:** Targets a specific known mobile CSS issue.
**Cons:** The z-index values look correct already.
**Complexity:** Low
**Success probability:** 30%

### Chosen path: Approach 1 first (investigate), then Approach 2 (fix)
**Reasoning:** The code looks structurally correct. The most likely cause is either a JS error (uncaught exception preventing the listener from attaching) or a CSS stacking issue. We need to check the console first, then apply defensive fixes.

**Trade-offs accepted:** If the issue is a DNS/custom domain problem (the user testing on `confluencemartialarts.co.uk` which doesn't resolve), the fix won't help until DNS is configured. But the Netlify app URL works, so the user should be testing there.

## PHASE 3 — High-Level Workflow

**What it does:**
1. User visits site on mobile (viewport <= 768px)
2. Hamburger icon is visible in the navbar
3. User taps hamburger → menu slides down with nav links
4. User taps a link → menu closes, page scrolls to section
5. User taps hamburger again → menu slides up

**Technical structure:**
- `index.html` — contains `nav-toggle` button and `nav-menu` ul
- `style.css` — contains desktop styles (`.nav-menu` flex row) and mobile styles (`.nav-menu` fixed, hidden off-screen, toggled via `.active`)
- `script.js` — contains `DOMContentLoaded` event listener that toggles `.active` class

**Data flow:**
1. Page loads → `DOMContentLoaded` fires → event listener attached to `navToggle`
2. User taps `navToggle` → `click` handler fires → toggles `.active` on both `navToggle` and `navMenu`
3. CSS transition animates the menu from `translateY(-100%)` to `translateY(0)`

## PHASE 4 — Detailed Workflow Steps

### Step 1: Check browser console for JS errors
**What:** Load the live site and check for JavaScript errors.
**How:**
1. Open `https://confluence-martial-arts.netlify.app/` in a browser
2. Open DevTools console
3. Check for any red errors (uncaught exceptions, syntax errors)
4. If errors found, fix them

**Validation:** Console shows no errors. Toggle click handler is attached.

### Step 2: Apply defensive fixes
**What:** Add `touch-action: manipulation` to the toggle button and ensure proper stacking.
**How:**
1. Add `touch-action: manipulation` to `.nav-toggle` in CSS (eliminates 300ms tap delay on mobile)
2. Ensure `.nav-toggle` has `z-index: 1001` (above the nav-menu's 999)
3. Add `-webkit-tap-highlight-color: transparent` for clean tap feedback
4. Ensure the button has `type="button"` in HTML (prevents any form submission default)

**Validation:** CSS changes applied, deployed, and verified on live site.

### Step 3: Deploy and verify
**What:** Push changes to GitHub and deploy to Netlify.
**How:**
1. Commit changes with approval phrase
2. Push to GitHub
3. Deploy to Netlify: `netlify deploy --prod`
4. Verify live site has the changes

**Validation:** `curl` the live site and confirm the CSS/HTML changes are present.

## PHASE 5 — Implementation Checklist

### Investigation
- [ ] Check browser console for JS errors on live site
- [ ] Verify the hamburger button is visible and tappable in the DOM
- [ ] Check if any element is overlapping the button (z-index stacking)

### Fixes
- [ ] Add `touch-action: manipulation` to `.nav-toggle` in CSS
- [ ] Add `z-index: 1001` to `.nav-toggle` in CSS
- [ ] Add `type="button"` to the `nav-toggle` button in HTML
- [ ] Add `-webkit-tap-highlight-color: transparent` to `.nav-toggle`

### Deployment
- [ ] Commit changes (requires approval phrase)
- [ ] Push to GitHub
- [ ] Deploy to Netlify
- [ ] Verify live site

## PHASE 6 — Implementation Notes

**Environment limitations:**
- Browser tool is broken (missing `libnspr4.so`) — cannot visually verify the page
- Custom domain `confluencemartialarts.co.uk` does not resolve — user must test on `confluence-martial-arts.netlify.app`
- Can verify CSS/HTML changes via `curl` on the live site

**What can be done now:**
- All code changes can be made and deployed
- Verification via curl (checking CSS/HTML is present) is possible
- Visual verification requires the user to test on their device

**What needs a different session/environment:**
- Visual verification of the fix on a real mobile device
- DNS configuration for the custom domain

---

## Success Criteria — Definition of Done

- [ ] Hamburger button responds to tap on mobile (menu slides down)
- [ ] Hamburger animates to X when active
- [ ] Nav links are visible and tappable in the open menu
- [ ] Tapping a nav link closes the menu
- [ ] Tapping the hamburger again closes the menu
- [ ] No JavaScript console errors on the live site

## Next Steps

**Immediate (this session):**
1. Check browser console for JS errors
2. Apply defensive CSS/HTML fixes
3. Deploy to Netlify
4. Verify via curl

**Requires user action:**
- Test on a real mobile device and confirm the fix works
- Configure DNS for `confluencemartialarts.co.uk` if needed

**Depends on user approval:**
- Commit and deploy (requires approval phrase)

---

Status: 🔍 Phase 1 complete — ready for investigation and fix
