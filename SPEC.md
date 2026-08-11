# Portfolio Spec — huynhkhandev.cloud

## 1. Concept & Vision

Một portfolio độc đáo theo phong cách **"Developer Storyteller"** — không phải CV online thông thường, mà là một hành trình kể chuyện qua các dự án và kinh nghiệm. Mỗi section reveal như một chapter, tạo cảm giác đang đọc một cuốn sách kỹ thuật cá nhân. Style hiện đại, tối giản nhưng có điểm nhấn animation để gây ấn tượng.

---

## 2. Design Language

### Aesthetic Direction
**"Dark Canvas with Neon Pulse"** — Dark theme với accent màu cyan/purple gradient. Background là canvas tối với subtle particle/texture, text sáng nổi bật. Mỗi section có entrance animation riêng.

### Color Palette
```
Background Primary:    #0a0a0f (near-black)
Background Secondary:  #12121a (dark card)
Background Accent:     #1a1a2e (elevated surface)
Text Primary:          #f0f0f5 (off-white)
Text Secondary:        #8888a0 (muted)
Accent Primary:        #00d4ff (cyan glow)
Accent Secondary:      #7c3aed (purple)
Accent Gradient:       linear-gradient(135deg, #00d4ff, #7c3aed)
Success:               #10b981
Border:                rgba(255,255,255,0.08)
```

### Typography
- **Headings:** `Space Grotesk` (700, 600) — techy, modern
- **Body:** `Inter` (400, 500) — clean readability
- **Code/Tech tags:** `JetBrains Mono` (400)

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Container max-width: 1200px
- Card padding: 24px-32px
- Gap between elements: 16px-24px

### Motion Philosophy
- **Scroll-triggered reveals:** Sections fade-in + slide-up on scroll (opacity 0→1, translateY 40px→0, 600ms ease-out)
- **Staggered children:** Elements within a section animate in sequence (100ms delay each)
- **Hover micro-interactions:** Scale 1.02, glow shadow, color shift
- **Page load sequence:** Hero first → Nav fades → Content streams in
- **Smooth scroll:** Native CSS smooth-scroll behavior

### Visual Assets
- **Icons:** Lucide React (consistent stroke width, 24px default)
- **Decorative:** CSS gradients, subtle grid patterns, glow effects
- **Project images:** Mockup frames với gradient borders
- **No external images needed** — all CSS/SVG generated

---

## 3. Layout & Structure

### Page Flow (Single Page, Scroll-Driven)

```
┌─────────────────────────────────────────────┐
│  HEADER (fixed, glassmorphism on scroll)    │
│  Logo | Nav: About, Projects, Experience,    │
│        Contact | GitHub, LinkedIn icons     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  HERO SECTION                               │
│  ┌─────────────────────────────────────┐    │
│  │  Name: Huỳnh Văn Chí Khánh           │    │
│  │  Title: Backend Developer | Data     │    │
│  │          Engineer | BI Specialist     │    │
│  │  Tagline: Building systems that       │    │
│  │           scale, insight that matters │    │
│  │                                         │    │
│  │  [CTA: View Projects]  [Contact Me]   │    │
│  │                                         │    │
│  │  Scroll indicator (animated chevron)  │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  ABOUT SECTION                              │
│  Brief intro (3-4 sentences)                │
│  Skills grid (Tech stack badges)            │
│  - Backend: NestJS, Python, PostgreSQL      │
│  - Frontend: Next.js, React, TypeScript     │
│  - Data: Azure, Power BI, dbt              │
│  - Cloud: Docker, Azure, AWS               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  PROJECTS SECTION (3 featured)              │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ PROJECT 1: ZekiFeed                    │  │
│  │ (Full details from content file)       │  │
│  │ - Tech stack badges                    │  │
│  │ - Architecture overview               │  │
│  │ - Key features list                    │  │
│  │ - Challenges & solutions               │  │
│  │ [Demo] [GitHub] (if public)           │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ PROJECT 2: VM Store                    │  │
│  │ (Full details from content file)       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ PROJECT 3: Facebook Group Tool         │  │
│  │ (Full details from content file)       │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  EXPERIENCE SECTION                          │
│  Timeline format (vertical)                  │
│  - Company, Role, Duration                   │
│  - Key achievements                          │
│  - Technologies used                         │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  CONTACT SECTION                             │
│  Get in touch message                        │
│  Email | LinkedIn | GitHub links              │
│  (Optional: Simple contact form)              │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  FOOTER                                      │
│  © 2026 | Built with Next.js | Back to top  │
└─────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1200px+):** Full layout, side-by-side elements
- **Tablet (768px-1199px):** Stacked sections, reduced padding
- **Mobile (< 768px):** Single column, hamburger nav, touch-friendly

### Visual Pacing
- Hero: Full viewport height, bold typography
- About: Breathing room, grid layout
- Projects: Dense but organized cards
- Experience: Clean timeline
- Contact: Minimal, focused

---

## 4. Features & Interactions

### Navigation
- **Fixed header:** Appears after scrolling past hero (or immediate on mobile)
- **Glassmorphism:** Background blur when scrolled
- **Active section highlighting:** Nav link glows when section in view
- **Smooth scroll:** Click nav → smooth scroll to section
- **Mobile menu:** Hamburger → slide-in overlay

### Hero Section
- **Entrance:** Name types in letter-by-letter (typewriter effect, 50ms/char)
- **Subtitle:** Fades in after name completes
- **CTAs:** Pulse glow on idle, scale on hover
- **Scroll indicator:** Bouncing chevron, fades out on scroll

### Projects Section
- **Card hover:** Lift effect (translateY -8px), glow border
- **Expand/collapse:** Click card to expand full details (accordion style)
- **Tech badges:** Hover shows tooltip with description
- **Links:** Icon buttons with hover glow

### Experience Timeline
- **Line animation:** Draws as you scroll (SVG stroke animation)
- **Nodes:** Pulse when in view
- **Card hover:** Subtle scale and glow

### Contact Section
- **Email link:** Copy-to-clipboard với toast notification
- **Social links:** Icon scale + glow on hover
- **Optional form:** EmailJS or similar (if implement)

### Error States
- **Image load fail:** Gradient placeholder
- **Link error:** Fallback text

### Empty/Loading States
- **Skeleton:** Pulsing gradient for any async content

---

## 5. Component Inventory

### Header
- **Default:** Transparent background
- **Scrolled:** Glassmorphism (backdrop-blur, semi-transparent)
- **Mobile:** Hamburger icon → overlay menu

### HeroTitle
- **Typewriter:** Letter-by-letter reveal
- **Cursor:** Blinking underscore

### SectionHeading
- **Default:** Large text with gradient accent line
- **Animated:** Fade + slide on scroll

### ProjectCard
- **Collapsed:** Summary preview
- **Expanded:** Full details with all content
- **Hover:** Lift + glow border
- **Tech badges:** Colored pills

### ExperienceItem
- **Default:** Timeline node + card
- **In-view:** Animated entry

### SkillBadge
- **Default:** Pill with icon + text
- **Hover:** Glow + tooltip

### ContactButton
- **Default:** Outlined
- **Hover:** Filled with glow
- **Active:** Scale down

### SocialIcon
- **Default:** Muted color
- **Hover:** Primary color + scale

### Footer
- Minimal, centered text

---

## 6. Technical Approach

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Space Grotesk, Inter, JetBrains Mono)

### Project Structure
```
/
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Main page (all sections)
│   └── globals.css     # Tailwind + custom styles
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── Experience.tsx
│   ├── ExperienceItem.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── SectionHeading.tsx
│   └── ui/             # Reusable primitives
├── lib/
│   └── content.ts      # Content data (projects, experience)
├── public/
│   └── (static assets if needed)
├── package.json
├── tailwind.config.ts
├── next.config.js
└── SPEC.md
```

### SEO Strategy
- **Metadata API:** Title, description, Open Graph, Twitter cards
- **Semantic HTML:** Proper heading hierarchy, landmarks
- **Performance:** Next.js image optimization, font display swap
- **Accessibility:** Keyboard nav, focus states, ARIA where needed

### Performance Targets
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Bundle:** Code-split per section

---

## 7. Content Source

All content pulled from:
- `personal_projects_content.md` — Full project details
- `review-kinh-nghiem-lam-viec-cv.md` — Work experience

Projects to showcase (3):
1. **ZekiFeed** — Multi-tenant Social Content Platform
2. **VM Store** — Virtual Machine Commerce Platform
3. **Facebook Group Workflow Tool** — FastAPI/Electron automation

---

## 8. Deploy Target

**Domain:** `huynhkhandev.cloud`

**Options:**
- Vercel (recommended for Next.js)
- GitHub Pages (static export)
- Docker + any cloud

**Process:**
1. Push to GitHub
2. Connect to Vercel (auto-deploy)
3. Point DNS to Vercel

---

*Spec locked — Ready to build*
