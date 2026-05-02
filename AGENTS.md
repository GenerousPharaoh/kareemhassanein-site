# AI Assistant Instructions - kareemhassanein.com

> **For Antigravity, Codex, or any AI assistant working on this project**

---

## CRITICAL PATHS - MEMORIZE THESE

| What | Path |
|------|------|
| **This Project** | `/Users/kareemhassanein/Desktop/kareemhassanein-site` |
| **Main AGENTS.md** | `/Users/kareemhassanein/AGENTS.md` (has info on ALL projects) |
| **Resume (Latest)** | `/Users/kareemhassanein/Desktop/Kareem Hassanein - Resume January 2026.pdf` |
| **KinetiKare Project** | `/Users/kareemhassanein/Desktop/kinetikare-physio-landing-page` |
| **Endorphins Project** | `/Users/kareemhassanein/Desktop/endorphins-new-website` |
| **User Home** | `/Users/kareemhassanein` |
| **User Desktop** | `/Users/kareemhassanein/Desktop` |

---

## PROJECT OVERVIEW

This is Kareem Hassanein's **personal consulting/portfolio website**.

**Purpose:**
1. Credibility piece for outbound conversations (consulting, advisory work)
2. Portfolio to help land full-time roles in implementation/operations
3. When people search "Kareem Hassanein", they see he's NOT just a physio - he's an implementation specialist

**This is SEPARATE from:**
- KinetiKare Physio (his physiotherapy practice website)
- Endorphins Health (the clinic website)

---

## GITHUB & DEPLOYMENT

### Repository Details
| Item | Value |
|------|-------|
| **GitHub Username** | GenerousPharaoh |
| **Repo Name** | kareemhassanein-site |
| **Repo URL** | https://github.com/GenerousPharaoh/kareemhassanein-site |
| **Branch** | main |
| **Live URL** | https://kareemhassanein-site.vercel.app |
| **Domain** | khassanein.bio (purchased January 25, 2025) |

### Authentication
- **GitHub CLI (`gh`)** is already authenticated on this machine
- If you need the PAT token, it's stored in the **knowledge graph MCP** under entity name `GitHub_PAT`
- To check auth status: `gh auth status`

### Deployment Workflow
Vercel auto-deploys when you push to main. **User does NOT like running localhost servers** - just push and check the live Vercel URL.

```bash
# 1. Navigate to project
cd /Users/kareemhassanein/Desktop/kareemhassanein-site

# 2. Make your changes...

# 3. Build to verify (ALWAYS do this before pushing)
npm run build

# 4. If build succeeds, commit and push
git add -A && git commit -m "descriptive message" && git push origin main

# 5. Check the LIVE site: https://kareemhassanein-site.vercel.app
```

### Common Commands
```bash
# Production build (required before pushing)
npm run build

# Check git status
git status

# View recent commits
git log --oneline -10

# DO NOT use npm run dev - user doesn't like localhost
```

---

## TECH STACK

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 14.2.35 | App Router |
| React | 18 | |
| TypeScript | 5 | Strict mode |
| Tailwind CSS | 3.4 | Custom config |
| Framer Motion | 11 | For animations |
| Lucide React | Latest | Icons |

---

## FILE STRUCTURE

```
/Users/kareemhassanein/Desktop/kareemhassanein-site/
├── AGENTS.md              # THIS FILE - instructions for AI assistants
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind + custom colors
├── tsconfig.json          # TypeScript config
├── next.config.mjs        # Next.js config
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles, CSS variables
│   │   ├── layout.tsx     # Root layout + JSON-LD schema
│   │   ├── page.tsx       # HOMEPAGE
│   │   ├── not-found.tsx  # Custom 404 page
│   │   ├── sitemap.ts     # Auto-generated sitemap
│   │   ├── robots.ts      # Robots.txt configuration
│   │   ├── about/
│   │   │   └── page.tsx   # About page
│   │   ├── services/
│   │   │   └── page.tsx   # Services page
│   │   ├── contact/
│   │   │   └── page.tsx   # Contact page (form + LinkedIn)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts  # Contact form API (Resend email)
│   └── components/
│       ├── Header.tsx     # Navigation header
│       ├── Footer.tsx     # Site footer
│       ├── ProjectList.tsx      # Homepage project showcase
│       ├── ProjectListItem.tsx  # Individual project card
│       ├── ScrollReveal.tsx     # Scroll animation wrapper
│       └── ParallaxImage.tsx    # Parallax image component
└── public/                # Static assets (images, resume PDF)
```

---

## DESIGN SYSTEM

### Color Palette (defined in tailwind.config.ts and globals.css)
```css
--background: #0d1117;      /* Deep midnight slate - main background */
--foreground: #f0f4f8;      /* Off white - main text */
--accent: #14b8a6;          /* Teal - accent color */
--accent-secondary: #0d9488; /* Deep teal */
--muted: #71717a;           /* Gray - secondary elements */
--muted-foreground: #a1a1aa; /* Light gray - secondary text */
--card: #0f0f11;            /* Slightly lighter black - cards */
--border: #1f1f23;          /* Subtle border color */
```

### Animation Standards
- **Easing:** ALWAYS use `[0.16, 1, 0.3, 1]` (expo out easing)
- **Duration:** 0.8s standard, 1s for large sections
- **Stagger:** 0.1s between items
- **Viewport margin:** `-50px` or `-100px`

Example:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
```

### Typography
- Font: Geist Sans (with system fallback)
- Headings: `font-medium tracking-tight`
- Body text: `text-muted-foreground leading-relaxed`
- Page titles: `text-4xl md:text-5xl`
- Section titles: `text-3xl`

---

## DESIGN RULES - CRITICAL

### NEVER DO (User HATES these):
- ❌ Floating orbs or decorative circles
- ❌ Animated gradients or moving backgrounds
- ❌ Grid patterns
- ❌ Scroll indicators
- ❌ Rotating elements
- ❌ Purple color schemes (we switched away from purple)
- ❌ Tacky, gimmicky effects
- ❌ Rigid, abrupt transitions
- ❌ Marketing buzzwords ("state-of-the-art", "cutting-edge")
- ❌ Emojis anywhere on the site
- ❌ Em dashes (—) in any content
- ❌ Statistics like "20+ years experience"
- ❌ Stock photos
- ❌ **"Movement Solutions"** - NEVER use this name ANYWHERE (content, metadata, schema, comments, alt text). Use "Private Physiotherapy Clinic" instead. User wants ZERO searchable connection to this name.
- ❌ Stepwise narrative ("Then X. Then Y.") - integrate naturally instead
- ❌ Claiming tools user doesn't use (e.g., Asana, Slack)
- ❌ Over-the-top claims like "I build systems"
- ❌ Brief metric labels without context

### ALWAYS DO:
- ✅ Clean, sophisticated, minimal aesthetic
- ✅ Smooth flowing transitions (expo easing)
- ✅ Subtle hover effects (border color lightens)
- ✅ Proper whitespace
- ✅ Consistent spacing (`py-20` for sections)
- ✅ Professional, understated design
- ✅ The design should be "truly impressive and flowing"

---

## CONTENT WRITING GUIDELINES

### Headline/Copy Style
- Current headline: "I find friction, solve it, and make it stick."
- Capture the full cycle: identify friction → create solutions → drive adoption
- Avoid over-the-top claims ("build systems") - be direct but not grandiose
- Metrics need full context, not just brief labels

### Narrative Style
- DON'T use stepwise chronological approach ("Then X. Then Y. After that Z.")
- DO integrate information naturally within paragraphs
- Example (bad): "First physiotherapy. Then operations. Then consulting."
- Example (good): "I spent years as a physiotherapist... Former semi-professional soccer player in Scotland and Canada."

### Project Descriptions - FACTUAL
| Project | Facts |
|---------|-------|
| **KinetiKare** | 60+ page web application (55 condition pages, 6 treatment pages, booking integration, Google Reviews) |
| **Endorphins** | Clinic website for 8 practitioners across 6 specialties, local SEO across 8 municipalities |
| **Tax Relief Counsel** | LLM-powered document drafting, 85% time reduction |
| **Private Physio Clinic** | Heidi AI rollout, 100% adoption in 8 weeks (this was at Movement Solutions but NEVER name it) |

### Tools Kareem Actually Uses
| Domain | Tools |
|--------|-------|
| Automation & AI | Codex, Cursor, Codex |
| Healthcare Operations | Jane App, JotForm |
| Development & Analytics | Next.js, React, Vercel, GitHub, Google Analytics |

**Does NOT use:** Asana, Slack, Notion, Google Workspace (for work)

---

## CONTENT SOURCE - KAREEM'S BACKGROUND

Read the full resume at: `/Users/kareemhassanein/Desktop/Kareem Hassanein - Resume January 2026.pdf`

### Current Roles (2024-Present)

**1. Digital Strategy & Operations Lead** - Endorphins Health and Wellness Centre
- Leading digital operations across 6 specialties
- Redesigned booking architecture
- Reduced intake friction

**2. Workflow Automation Consultant** - Tax Relief Counsel (2025-Present)
- Built Codex automation reducing document generation by 85%
- Defined SOPs for case management

**3. Clinical Advisor** - Neuro-Mod (2025-Present)
- Reviewing clinical deployment strategies and interface design
- Supporting market validation

### Past Experience

**Registered Physiotherapist** - Movement Solutions Physiotherapy (2021-2024)
- Led Heidi AI implementation achieving 100% adoption in 8 weeks
- Highest revenue-generating clinician ($600K+/year) for 3 consecutive years
- Reduced documentation time by 3 hours/week per practitioner

### Education
- **MSc Physiotherapy** - Robert Gordon University (with Distinction)
- **BSc Kinesiology** - McMaster University (Honours)

### Key Metrics to Highlight
| Metric | Context |
|--------|---------|
| 100% | Adoption rate - Heidi AI rollout |
| 85% | Time reduction - document automation |
| $600K+ | Annual revenue generated as clinician |
| 8 weeks | Time to full adoption |

---

## CONTACT INFORMATION

| Channel | Value |
|---------|-------|
| Email | kareem.hassanein@gmail.com |
| LinkedIn | linkedin.com/in/kareemhassanein |
| Location | Hamilton / Burlington, Ontario |
| Availability | Remote work across North America |

---

## RELATED PROJECTS (Kareem's Other Websites)

### KinetiKare Physiotherapy
| Item | Value |
|------|-------|
| Path | `/Users/kareemhassanein/Desktop/kinetikare-physio-landing-page` |
| Repo | https://github.com/GenerousPharaoh/kinetikare-physio-landing-page |
| Live | https://www.kinetikarephysio.com |
| Purpose | Kareem's physiotherapy practice website |
| Deploy | Vercel (auto on push) |
| Port | 4040 for local dev (`npm run build && PORT=4040 npm run start`) |

### Endorphins Health & Wellness Centre
| Item | Value |
|------|-------|
| Path | `/Users/kareemhassanein/Desktop/endorphins-new-website` |
| Repo | https://github.com/GenerousPharaoh/endorphins-website-new-june25 |
| Live | https://endorphinshealth.com |
| Purpose | The clinic website (Kareem works here) |
| Deploy | Hostpapa via GitHub Actions |

### Main AGENTS.md
The file at `/Users/kareemhassanein/AGENTS.md` contains EXTENSIVE documentation about:
- KinetiKare website (detailed SEO, components, design rules)
- Endorphins website
- User preferences
- Design guidelines that apply to ALL projects

**Always read that file for context on Kareem's preferences!**

---

## SEO IMPLEMENTATION

### JSON-LD Schema (in layout.tsx)
- Type: Person
- Includes: education (Robert Gordon, McMaster), knowsAbout, location
- Keywords: workflow automation, operations improvement, technology implementation, healthcare operations, change management, AI implementation, digital transformation

### SEO Files
- `sitemap.ts` - Auto-generates sitemap for all 4 pages
- `robots.ts` - Allows all crawlers, points to sitemap
- `not-found.tsx` - Custom 404 page matching site design

### Meta Tags
- Title: "Kareem Hassanein | Implementation Consulting"
- Description focuses on: operations improvement, workflow automation, technology implementation
- Open Graph and Twitter cards configured

---

## TROUBLESHOOTING

### Framer Motion TypeScript Error
If you get: `Type 'number[]' is not assignable to type 'Easing'`

Fix by adding `as const`:
```tsx
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
```

### ESLint Unused Variable Error
Remove unused variables or prefix with underscore:
```tsx
// Error: 'i' is defined but never used
.map((item, i) => ...)

// Fix: Remove if not needed
.map((item) => ...)

// Or prefix with underscore if needed later
.map((item, _i) => ...)
```

### Git Push Fails
1. Check auth: `gh auth status`
2. If not logged in: `gh auth login`
3. The PAT is in knowledge graph MCP under `GitHub_PAT`

### Build Fails
Always run `npm run build` before pushing. Common issues:
- Unused imports/variables
- TypeScript type errors
- Missing dependencies

---

## WORKFLOW RULES

1. **ALWAYS build before pushing**: `npm run build`
2. **ALWAYS push after making changes**: `git add -A && git commit -m "message" && git push origin main`
3. **ALWAYS use expo easing**: `[0.16, 1, 0.3, 1]`
4. **NEVER add tacky effects** (orbs, gradients, grid patterns)
5. **NEVER run localhost** - user hates it. Just push and check the live Vercel URL.
6. **Preview changes at**: https://kareemhassanein-site.vercel.app

---

## USER PREFERENCES (Kareem)

- Values sophisticated, professional aesthetics
- Wants premium look WITHOUT pretentiousness
- Prefers concise, direct communication
- HATES tacky, amateur, or childish designs
- HATES marketing buzzwords
- HATES emojis on websites
- HATES em dashes (—) - NEVER use them in content
- HATES running localhost servers - just push to Vercel and check live URL
- Wants the design to be "truly impressive and flowing"
- Wants transitions to be smooth, not rigid

---

## MCP TOOLS AVAILABLE

If you're Codex with MCP access, these tools are available:

1. **Knowledge Graph MCP** (`mcp__knowledge-graph__*`)
   - Store/retrieve memories
   - GitHub PAT is stored under entity `GitHub_PAT`

2. **Memory MCP** (`mcp__memory__*`)
   - Alternative memory storage
   - Search for project info

3. **Supabase MCP** (`mcp__supabase__*`)
   - Database operations (not used for this project)

4. **Filesystem MCP** (`mcp__filesystem__*`)
   - File operations

---

## VERSION HISTORY

| Date | Changes |
|------|---------|
| Jan 23, 2026 | Initial creation with sophisticated dark theme, purple accent |
| Jan 23, 2026 | Removed tacky elements (gold gradients, floating orbs, grid patterns) |
| Jan 23, 2026 | Added this comprehensive AGENTS.md |
| Jan 25, 2026 | Added athletic background (semi-pro soccer) to About page |
| Jan 25, 2026 | Refined headline to "I find friction, solve it, and make it stick." |
| Jan 25, 2026 | Added SEO: JSON-LD schema, sitemap.ts, robots.ts, custom 404 |
| Jan 25, 2026 | Corrected project facts (KinetiKare = 60+ pages, Endorphins = 8 practitioners) |
| Jan 25, 2026 | Replaced "Movement Solutions" with "Private Physiotherapy Clinic" |
| Jan 25, 2026 | Added content writing guidelines and tools sections to AGENTS.md |
| Jan 25, 2026 | Domain purchased: khassanein.bio |
| Jan 27, 2026 | Added contact form with Resend email integration |
| Jan 27, 2026 | Fixed robots.txt domain (was kareemhassanein.com, now khassanein.bio) |
| Jan 27, 2026 | Reverted broken mobile changes, restored original transitions |

---

## CONTACT FORM (Resend Integration)

| Item | Value |
|------|-------|
| **Service** | [Resend](https://resend.com) |
| **API Route** | `src/app/api/contact/route.ts` |
| **Env Variable** | `RESEND_API_KEY` (set in Vercel dashboard) |
| **Sends to** | kareem.hassanein@gmail.com |
| **From address** | `onboarding@resend.dev` (Resend default sender) |
| **Reply-To** | Visitor's email (so you reply directly to them) |

The contact form lives on `/contact`. Visitors fill in name, email, and message. The form POSTs to `/api/contact`, which uses Resend to send the email. Your address is never exposed in frontend code.

**To use a custom sender domain** (e.g., `contact@khassanein.bio`), verify the domain in Resend dashboard and update the `from` field in `route.ts`.

---

**Last Updated:** January 27, 2026

**For questions about other projects, check:** `/Users/kareemhassanein/AGENTS.md`
