# Visume — Stitch UI Prompts

> Copy-paste these prompts directly into Stitch. Always include the **Global Design Tokens** block at the end of every prompt.

---

##  Master Design Tokens

> **Paste this at the end of EVERY prompt below — no exceptions.**

```
Global rules (never break these):
- Dark theme only, no light backgrounds anywhere
- Font: DM Sans for all body/UI text, Syne for all headings and names only
- Page background: #0A0A0F
- Card background: #13131A
- Border color: #1E1E2E
- Primary accent: #6C5CE7 (electric purple)
- Secondary accent: #00CEC9 (teal)
- Success color: #00B894
- Danger color: #D63031
- Text primary: #EAEAF0
- Text muted: #6B6B80
- Border radius: 12px for all cards, 8px for all inputs, 999px for badges/pills
- Spacing: 8px grid only (8, 16, 24, 32, 48, 64px)
- Button primary: #6C5CE7 bg, white text, 8px radius, 12px 24px padding
- Button outline: transparent bg, #6C5CE7 border and text, same padding
- All inputs: bg #1E1E2E, border #2A2A3E, text #EAEAF0, focus border #6C5CE7
- Sidebar: 240px wide, fixed left, bg #13131A
- Active sidebar item: 3px left purple border + rgba(108,92,231,0.12) background
- Icons: Lucide icons ONLY
- No lorem ipsum — use realistic placeholder content only
```

---

## Prompt 1 — Landing Page

```
Build a dark-themed landing page for "Visume" — a video resume job platform.
Use DM Sans body font, Syne for headings.
Background #0A0A0F, accent #6C5CE7, teal #00CEC9.

Sections:

Navbar: Logo "Visume" left, nav links center (How it Works, For Recruiters, Pricing),
  "Post a Job" outlined button + "Record Resume" purple filled button right.
  Glassmorphism navbar with blur and subtle border bottom.

Hero: Large Syne heading "Get Hired by Being Seen", subtext about video resumes
  replacing boring PDF resumes. Two CTA buttons: purple filled "Record My Resume"
  + teal outline "Browse Jobs". Right side: floating mock video resume card with
  candidate photo, play button overlay, name, headline, and AI match badge
  "94% Match" in teal.

Features: 3-column grid with dark icon cards:
  - Video Resume: Record yourself in 60 seconds
  - AI Matching: Smart skill-based scoring
  - Instant Interviews: Recruiters reach you directly

Stats bar: dark background, three large bold numbers:
  2,400+ Candidates | 380+ Companies | 94% Match Accuracy

Footer: minimal dark, Visume logo left, links right.

[Apply global design tokens above]
```

---

## Prompt 2 — Candidate Registration + KYC

```
Build a multi-step registration flow for job candidates. Dark theme only.
bg #0A0A0F, card bg #13131A, accent #6C5CE7. Font: DM Sans.

Show a 3-step progress bar at top with step labels:
  Step 1: Account Setup | Step 2: KYC Verification | Step 3: Profile

Step 1 — Account Setup:
  Full Name, Email Address, Password, Confirm Password, Phone Number fields.
  Role selector: two large cards side by side —
    "I'm a Candidate" (person icon) and "I'm a Recruiter" (briefcase icon).
  Active role card has purple border glow. Purple "Continue" button full width.

Step 2 — KYC Verification:
  Heading "Verify Your Identity". Subtext "Required for profile trust badge."
  Two upload zones side by side:
    Left: "Upload Aadhaar Card" with upload icon and dashed border
    Right: "Upload PAN Card" with upload icon and dashed border
  Selfie section below: large camera icon button "Take Selfie or Upload Photo".
  Status badge below each upload zone: "Pending Verification" in yellow pill.
  "Submit for Verification" purple button full width.

Step 3 — Profile Setup:
  Profile photo upload circle (96px) with camera edit icon overlay.
  Professional Headline input, Skills multi-select tag input (type + enter),
  Location dropdown, LinkedIn URL input (optional label).
  "Complete Profile" purple button.

[Apply global design tokens above]
```

---

## Prompt 3 — Candidate Dashboard

```
Build a candidate dashboard with fixed left sidebar. Dark theme.
Page bg #0A0A0F, sidebar bg #13131A, cards #13131A. Font: DM Sans.

Sidebar (240px fixed left):
  Top: Visume logo.
  Nav items with Lucide icons:
    Dashboard (active), My Profile, Video Resume, Browse Jobs, Applications, Settings.
  Active state: 3px purple left border + rgba(108,92,231,0.12) bg.
  Bottom: user avatar circle + name + "KYC Verified" small green badge + logout button.

Main content area (remaining width):
  Top header: "Welcome back, Ashwin" in Syne font + small "KYC Verified" green badge.

  Stats row — 4 equal cards:
    Jobs Applied: 12 | Profile Views: 284 | Interview Calls: 3 | Top Match: 97%
    Each card: large number in accent color, label below in muted, subtle icon top-right.

  Video Resume card:
    Left: 16:9 dark video thumbnail with play button overlay, duration badge.
    Right: "My Video Resume" title, upload date, view count, "Re-record" ghost button
    + "Replace Video" outline button.
    If no video: full-width dashed border card with camera icon and
    "Record Your Video Resume" purple CTA button.

  Recommended Jobs section heading + "See All" link:
    2-column grid of 4 job cards. Each card:
      Company logo circle, job title in Syne font, company name muted,
      location tag + work mode tag (Remote/Hybrid/Onsite),
      salary range, AI match % badge large in teal,
      top 3 required skills as small dark pills,
      "Apply Now" purple button.
    Cards: #13131A bg, #1E1E2E border, 12px radius.
    Hover: subtle purple glow border.

[Apply global design tokens above]
```

---

## Prompt 4 — Video Resume Recorder

```
Build a video resume recording page. Dark theme only.
bg #0A0A0F, panel bg #13131A. Accent #6C5CE7. Font: DM Sans + Syne headings.

Two-column layout (no sidebar on this page — full focus mode):

Left panel (60% width):
  Page heading "Record Your Visume" in Syne at top.
  16:9 rounded card (12px radius) showing camera feed area.
  Dark placeholder with camera icon and "Camera will appear here" when inactive.
  When recording: red REC dot top-left corner with pulsing ring animation.
  Timer display centered below feed: "00:47 / 02:00" in large monospace font,
  muted color, with a thin progress bar below.
  Controls row centered:
    Large red circle button "Record" (with mic icon),
    Grey "Stop" button,
    Ghost "Re-record" button.
  Teleprompter toggle below controls: "Show Script Tips" label + toggle switch.
  When on: semi-transparent overlay card at bottom of feed with tip text in italic.

Right panel (40% width):
  Card: "Tips for a Great Visume" heading.
  5 checklist items with green check icons:
    - Keep it under 90 seconds
    - Good lighting, quiet background
    - State your name and top skill first
    - Smile and speak clearly and slowly
    - End with a strong call to action
  Divider line with "OR" centered in muted text.
  Upload zone: dashed border card, upload icon, "Upload Existing Video"
  subtext "MP4, MOV up to 100MB".
  "Save & Publish My Visume" purple full-width button at bottom of panel.

[Apply global design tokens above]
```

---

## Prompt 5 — Job Discovery Page

```
Build a job discovery and search page for candidates. Dark theme.
bg #0A0A0F, filter sidebar #13131A, job cards #13131A. Accent #6C5CE7. Font: DM Sans.

Left filter sidebar (280px fixed):
  "Filter Jobs" heading.
  Search input at top with search Lucide icon inside.
  Filter sections with bold labels:
    Work Mode: three toggle chips — Remote / Hybrid / Onsite (multi-select).
    Salary Range: dual-handle range slider, shows "₹4L — ₹18L" values dynamically.
    Experience Level: checkboxes — Fresher, 1–3 yrs, 3–5 yrs, 5+ yrs.
    AI Match Filter: toggle switch "Show only 80%+ matches" — teal color when active.
  "Apply Filters" purple full-width button pinned to bottom.

Main job listing area:
  Top bar: "Showing 24 jobs" muted text left + "Sort by: Best Match" dropdown right.
  Active filter pills row below (dismissible with x): e.g. "Remote ×", "80%+ Match ×".
  2-column responsive job card grid:
    Each card:
      Top: company logo circle (32px) + company name muted + posted date right.
      Job title in Syne font (18px).
      Location icon + location text, work mode tag pill.
      Salary range bold.
      AI Match row: "94% Match" in large teal text + thin teal progress bar.
      Top 4 required skills as small dark pills (#1E1E2E bg, muted text).
      Bottom: "View Details" ghost button left + "Quick Apply" purple button right.
    Hover: purple border glow, slight card lift.

[Apply global design tokens above]
```

---

## Prompt 6 — Recruiter Dashboard

```
Build a recruiter dashboard with fixed left sidebar. Dark theme.
bg #0A0A0F, sidebar #13131A, cards #13131A. Accent #6C5CE7. Font: DM Sans.

Sidebar (240px fixed left):
  Visume logo + small "Recruiter" role badge in purple pill.
  Nav items with Lucide icons:
    Dashboard (active), Find Candidates, Job Postings, Pipeline, Company Profile, Settings.
  Bottom: company logo circle + company name.

Main content area:
  Header: "Good morning, Sarah" in Syne font left
  + "Post New Job" purple button right.

  Stats row — 4 equal cards:
    Active Jobs: 8 | Total Applicants: 147 | Interviews Today: 4 | Hires This Month: 2
    Each card: large number in accent, label muted, icon top-right.

  AI-Matched Candidates section (70% width left):
    Heading "AI-Matched Candidates" + job selector dropdown "For: Senior React Developer".
    Horizontal scroll row of candidate cards (260px wide each):
      Profile photo (circular 48px), name in Syne, headline muted,
      top 3 skill pills, large "94% Match" in teal,
      "View Profile" ghost + "Shortlist" purple buttons.
    Cards ordered highest match first.

  Recent Activity feed (30% width right):
    "Recent Activity" heading.
    Timeline list with avatar + action text + time ago:
      "Rohan applied for React Dev — 2m ago"
      "AI shortlisted 3 candidates — 15m ago"
      "Interview scheduled with Priya — 1h ago"
      "New application from Karthik — 3h ago"

[Apply global design tokens above]
```

---

## Prompt 7 — Hiring Pipeline (Kanban)

```
Build a Kanban hiring pipeline board for recruiters. Dark theme.
bg #0A0A0F, column bg #13131A, candidate cards #1A1A24. Font: DM Sans.

Full-width horizontal board with horizontal scroll. 5 columns, 260px each, 16px gap.

Column headers (sticky at top of each column):
  Applied — blue count badge
  Under Review — yellow count badge
  Shortlisted — purple count badge
  Interview Scheduled — teal count badge
  Hired — green count badge

Each candidate card (draggable, show drag handle on hover):
  Top row: profile photo circle (36px) + name bold + AI match % badge top-right.
  Job title applied for in muted smaller text.
  Application date muted at bottom left.
  Quick action icons row (bottom right, appear on hover):
    Eye icon (view profile),
    Calendar icon (schedule interview),
    ChevronRight icon (move to next stage),
    X icon (reject — red on hover).
  Cards: #1A1A24 bg, #1E1E2E border, 12px radius.
  Drag handle: grip dots icon left side, visible on hover.

Add 3–4 realistic candidate cards in each column.
Column scroll independently if cards overflow.
Column header shows card count in colored badge matching column theme color.

[Apply global design tokens above]
```

---

## Prompt 8 — Candidate Public Profile

```
Build a public candidate profile page (viewed by recruiters). Dark theme.
bg #0A0A0F, cards #13131A. Accent #6C5CE7, teal #00CEC9. Font: DM Sans + Syne.

Top hero card (full width):
  Left section: profile photo (circular 96px) with green online dot bottom-right.
  Centre section: name in Syne 32px bold, professional headline below in muted,
    location with MapPin icon, "KYC Verified" green pill badge, LinkedIn icon button.
  Right section: "Download PDF Resume" ghost button + "Schedule Interview" purple button.
  Card background: subtle purple radial gradient overlay on #13131A.

Video Resume section (full width card):
  "Video Resume" section heading.
  16:9 dark video player with custom dark controls bar.
  Below player: video title, duration, view count in muted text.

Two-column layout below:

Left column (60%):
  Skills section heading + skill tag pills (#1E1E2E bg, #6C5CE7 text, 999px radius).
  Experience section: timeline cards with company logo, role, dates, description.
  Education section: timeline cards with institution, degree, year, grade.

Right column (40%):
  Portfolio section: project cards with project name bold, short description,
    tech stack tags, "View Project" link button with ExternalLink icon.
  Stats card: "Profile Stats" heading, three rows:
    Applications Sent: 12
    Average Match Rate: 87%
    Profile Views: 284

All cards #13131A, borders #1E1E2E, 12px radius. No white anywhere.

[Apply global design tokens above]
```

---

## Prompt 9 — Post a Job (Recruiter)

```
Build a job posting form page for recruiters. Dark theme.
bg #0A0A0F, form card #13131A. Accent #6C5CE7. Font: DM Sans + Syne heading.

Single centered form card (max 720px wide):
  Page heading "Post a New Job" in Syne at top.

  Form fields (full width, stacked):
    Job Title — text input, placeholder "e.g. Senior React Developer"
    Department — dropdown (Engineering, Design, Marketing, Sales, HR, Finance)
    Work Mode — 3 toggle chip options: Remote / Hybrid / Onsite (single select)
    Location — text input, placeholder "e.g. Hyderabad, India"
    Salary Range — two side-by-side inputs "Min ₹" and "Max ₹"
    Experience Required — dropdown (Fresher, 1–3 yrs, 3–5 yrs, 5+ yrs)
    Required Skills — multi-tag input (type skill + press Enter to add pill)
      Pills shown below input with × to remove. Purple bordered pills.
    Job Description — large textarea (min 6 rows), placeholder with formatting tips.
    Application Deadline — date picker input.

  Bottom action row:
    "Save as Draft" ghost button left
    "Post Job & Generate AI Match" purple button right with Sparkles icon.
    Subtext below: "AI will automatically rank matching candidates after posting."

[Apply global design tokens above]
```

---

## Prompt 10 — Applications Tracker (Candidate)

```
Build an applications tracker page for candidates. Dark theme.
bg #0A0A0F, sidebar #13131A, cards #13131A. Accent #6C5CE7. Font: DM Sans.

Use the same sidebar as the Candidate Dashboard (Prompt 3).
Active sidebar item: "Applications".

Main area:
  Page heading "My Applications" in Syne.

  Filter tabs row below heading (horizontal pills, single select):
    All (12) | Applied (5) | Under Review (3) | Shortlisted (2) | Interview (1) | Rejected (1)
  Active tab: purple filled pill. Inactive: ghost pill.

  Application cards list (full width, stacked):
    Each card (horizontal layout):
      Left: company logo circle (48px).
      Centre: job title in Syne bold, company name muted, location + work mode tags.
        Applied date in muted small text below.
      Right: status badge pill (color coded):
        Applied — blue | Under Review — yellow | Shortlisted — purple
        Interview Scheduled — teal | Rejected — red
      Far right: "View Job" ghost icon button + vertical dots menu icon.
    Cards: #13131A bg, #1E1E2E border, 12px radius, 16px padding.

  Interview Scheduled card (special highlight):
    Teal left border accent.
    Extra row below: "Interview on May 28, 2026 at 3:00 PM"
    + "Join Meet" teal button with Video icon.

[Apply global design tokens above]
```

---

*10 prompts total. Always append the Master Design Tokens block to every prompt before submitting to Stitch.*
