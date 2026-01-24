# AI Assistant Instructions - kareemhassanein.com

## Project Overview

This is Kareem Hassanein's personal consulting/portfolio website. The purpose is to establish credibility beyond his physiotherapy background - showing that he's an implementation specialist, workflow automation consultant, and operations strategist.

**Primary Goals:**
1. Credibility piece for outbound conversations (consulting, advisory work)
2. Portfolio to help land full-time roles in implementation/operations
3. When people search "Kareem Hassanein", they see he's not just a physio

## Quick Reference

| Item | Value |
|------|-------|
| **Local Path** | `/Users/kareemhassanein/Desktop/kareemhassanein-site` |
| **GitHub Repo** | https://github.com/GenerousPharaoh/kareemhassanein-site |
| **Live URL** | https://kareemhassanein-site.vercel.app |
| **Target Domain** | kareemhassanein.com (not yet purchased) |
| **Resume Location** | `/Users/kareemhassanein/Desktop/Kareem Hassanein - Resume January 2026.pdf` |

## Tech Stack

- **Framework:** Next.js 14.2.35 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (auto-deploy on push to main)

## GitHub & Deployment

### Repository
- **Owner:** GenerousPharaoh
- **Repo:** kareemhassanein-site
- **Branch:** main
- **Auto-deploy:** Yes, Vercel deploys automatically on push to main

### Workflow
```bash
# Development
npm run dev

# Build (always test before pushing)
npm run build

# Deploy (just push to main)
git add -A && git commit -m "descriptive message" && git push origin main
```

### Authentication
- GitHub CLI (`gh`) is authenticated on this machine
- If you encounter issues, the user's GitHub PAT is stored in the knowledge graph MCP under "GitHub_PAT"
- Vercel is connected to the GitHub repo and deploys automatically

## Design System

### Color Palette
```css
--background: #09090b;    /* Near black */
--foreground: #fafafa;    /* Off white */
--accent: #a78bfa;        /* Purple */
--accent-dim: #7c3aed;    /* Darker purple */
--muted: #71717a;         /* Gray */
--muted-foreground: #a1a1aa;  /* Light gray */
--card: #0f0f11;          /* Slightly lighter black */
--border: #1f1f23;        /* Subtle border */
```

### Animation Standards
- **Easing:** Always use `[0.16, 1, 0.3, 1]` (expo out) for smooth, flowing animations
- **Duration:** 0.8s for most animations, 1s for larger sections
- **Stagger:** 0.1s delay between items
- **Viewport trigger:** `margin: '-50px'` or `margin: '-100px'`

### Typography
- Font: Geist Sans (system fallback)
- Headings: `font-medium tracking-tight`
- Body: `text-muted-foreground leading-relaxed`

## Critical Design Rules

### NEVER DO:
- Floating orbs or decorative circles
- Animated gradients or moving backgrounds
- Grid patterns
- Scroll indicators
- Rotating elements
- Gold/yellow color schemes
- Tacky, gimmicky effects
- Rigid, abrupt transitions
- Marketing buzzwords
- Emojis anywhere

### ALWAYS DO:
- Clean, sophisticated, minimal aesthetic
- Smooth flowing transitions
- Subtle hover effects (border color lightening)
- Proper whitespace
- Consistent spacing (py-20 for sections)
- Professional, understated design

## File Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, CSS variables, utilities
│   ├── layout.tsx       # Root layout with Header/Footer
│   ├── page.tsx         # Homepage
│   ├── about/page.tsx   # About page
│   ├── services/page.tsx # Services page
│   └── contact/page.tsx # Contact page
├── components/
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
tailwind.config.ts       # Tailwind configuration with custom colors
```

## Content Source

All content is based on Kareem's resume. Key information:

### Current Roles
1. **Digital Strategy & Operations Lead** - Endorphins Health and Wellness Centre (2024-Present)
   - Leading digital operations across 6 specialties
   - Redesigned booking architecture, reduced intake friction

2. **Workflow Automation Consultant** - Tax Relief Counsel (2025-Present)
   - Built Claude Code automation reducing document generation by 85%
   - Defined SOPs for case management

3. **Clinical Advisor** - Neuro-Mod (2025-Present)
   - Reviewing clinical deployment strategies
   - Supporting market validation

### Past Experience
- **Registered Physiotherapist** - Movement Solutions Physiotherapy (2021-2024)
  - Led Heidi AI implementation, 100% adoption in 8 weeks
  - Highest revenue-generating clinician ($600K+/year) for 3 years

### Education
- MSc Physiotherapy, Robert Gordon University (with Distinction)
- BSc Kinesiology, McMaster University (Honours)

### Key Metrics to Highlight
- 100% adoption rate (Heidi AI rollout)
- 85% time reduction (document automation)
- $600K+ annual revenue generated

## Contact Information
- **Email:** kareem.hassanein@gmail.com
- **LinkedIn:** linkedin.com/in/kareemhassanein
- **Location:** Hamilton/Burlington, Ontario (available for remote work across North America)

## Related Projects

Kareem also has another website project:
- **KinetiKare Physio** - `/Users/kareemhassanein/Desktop/code/physiotherapy-next/` or check the knowledge graph
- This is his physiotherapy practice website, separate from this consulting portfolio

## Common Commands

```bash
# Navigate to project
cd /Users/kareemhassanein/Desktop/kareemhassanein-site

# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Full deploy workflow
git add -A && git commit -m "message" && git push origin main
```

## Troubleshooting

### Framer Motion TypeScript Errors
If you get errors about `ease` property type, add `as const`:
```typescript
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
```

### Build Errors
Always run `npm run build` before pushing. Common issues:
- Unused variables (ESLint will catch these)
- Missing imports
- TypeScript type errors

### GitHub Authentication
If `git push` fails:
1. Check if `gh auth status` shows logged in
2. The PAT is stored in knowledge graph MCP under "GitHub_PAT"
3. Can set temporarily: `GITHUB_TOKEN="" gh auth login`

## User Preferences

- Kareem values sophisticated, professional aesthetics
- Wants premium look without pretentiousness
- Prefers concise, direct communication
- Hates tacky, amateur, or childish designs
- No statistics like "20 years experience"
- No marketing buzzwords like "state-of-the-art"
- The design should be truly impressive and flowing

## Version History

- **January 2026:** Initial creation with sophisticated dark theme, purple accent
- Previous tacky version removed (gold gradients, floating orbs, etc.)

---

**Last Updated:** January 23, 2026
