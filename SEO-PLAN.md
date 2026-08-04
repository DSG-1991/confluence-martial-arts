# Confluence Martial Arts — SEO Optimisation Plan

## Phase 1 — Discovery

**What:** Research SEO best practices for martial arts, build a topical map, SEO optimise the website, add robots.txt and sitemap.xml

**Problem:** The site has basic SEO (meta tags, schema) but needs proper technical SEO (robots.txt, sitemap.xml), a topical map for local martial arts queries, and full on-page optimisation for the Blackpool/Thornton-Cleveleys area.

**Current state verified:**
- ✅ Site live at https://confluence-martial-arts.netlify.app
- ✅ Basic meta title/description present
- ✅ Schema.org LocalBusiness JSON-LD present
- ✅ Open Graph tags present
- ✅ Mobile responsive
- ❌ No robots.txt
- ❌ No sitemap.xml
- ❌ No topical map / content strategy
- ❌ No local SEO optimisation beyond basic geo tags
- ❌ No image alt text optimisation
- ❌ No heading hierarchy audit

**Target keywords (martial arts niche, local area):**
- Primary: "martial arts Blackpool", "jujutsu Blackpool", "martial arts classes Thornton-Cleveleys"
- Secondary: "Daito-ryu jujutsu UK", "Takeuchi Renshinkan UK", "kids martial arts FY5", "adult martial arts classes Blackpool"
- Long-tail: "traditional Japanese jujutsu near me", "martial arts for beginners Blackpool", "self defence classes Cleveleys"

## Phase 2 — Solution Space

### Approach A: Manual SEO optimisation (chosen)
- Research keywords, build topical map, update HTML/CSS, add robots.txt + sitemap.xml
- Pros: Full control, no dependencies
- Cons: Time-consuming
- Complexity: Medium

### Approach B: Delegate to Claude Code with SEO + copywriting skills
- Use MCP to delegate the full SEO pass
- Pros: Uses the right model for the job, follows operating manual
- Cons: MCP can time out on large tasks
- Complexity: Low (delegation)

**Chosen:** Approach B — delegate to Claude Code via MCP with the SEO skill and copywriting skill loaded as context.

## Phase 3 — Workflow

### Research phase:
1. Identify primary, secondary, and long-tail keywords for martial arts in Blackpool/Fylde Coast
2. Build a topical map covering: classes, styles, location, audience segments, learning resources
3. Map each topic to a page section or new content

### Implementation phase:
1. Add robots.txt (allow all crawlers, point to sitemap)
2. Add sitemap.xml (list all page sections)
3. Update meta titles/descriptions with keyword targeting
4. Add alt text to all images
5. Improve heading hierarchy (H1 → H2 → H3)
6. Add FAQ schema for People Also Ask targeting
7. Add local business schema improvements
8. Add internal links between sections
9. Add breadcrumb structured data

## Phase 4 — Detailed Steps

### Step 1: Research keywords
- Use web search for "martial arts Blackpool SEO", "jujutsu classes near me search terms"
- Identify question-based queries for FAQ schema

### Step 2: Build topical map
- Create a markdown document mapping topics to page sections
- Include: class types, styles taught, location, instructor credentials, age groups, learning resources

### Step 3: Create robots.txt
- Allow all legitimate crawlers (Google, Bing, AI search bots)
- Disallow training-only scrapers
- Point to sitemap

### Step 4: Create sitemap.xml
- List all sections: /, #about, #classes, #gallery, #learning, #contact
- Set appropriate priority and change frequency

### Step 5: Update on-page SEO
- Meta title: include primary keyword + location
- Meta description: include secondary keywords + CTA
- H1: already good ("Confluence Martial Arts")
- H2s: ensure each section heading includes relevant keywords
- Image alt text: descriptive, keyword-rich where natural
- Internal links: cross-link between sections

### Step 6: Add structured data
- FAQPage schema for common questions
- Review schema for testimonials
- Course/Service schema for class types

## Phase 5 — Checklist
- [ ] Research keywords and build topical map
- [ ] Create robots.txt
- [ ] Create sitemap.xml
- [ ] Update meta title and description
- [ ] Add alt text to all images
- [ ] Improve heading hierarchy
- [ ] Add FAQ schema
- [ ] Add internal links
- [ ] Deploy and verify

## Phase 6 — Constraints
- Must delegate to Claude Code via MCP (operating manual rule)
- Must use SEO and copywriting skills as context
- Site is static HTML/CSS/JS — no CMS, no server-side rendering
- Netlify handles hosting — sitemap and robots.txt go in the root directory
