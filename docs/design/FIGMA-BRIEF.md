# ElAris Figma brief v0.1

Use this document to build the Figma file. Import colours and spacing from `design-tokens.json` as Figma Variables.

> **Functional Web MVP update:** This early brief remains useful for baseline components and mobile concepts. For the
> current Core + Professionals product, use
> [`../product/WEB-MVP-PRODUCT-SPEC.md`](../product/WEB-MVP-PRODUCT-SPEC.md) and
> [`../product/WEB-MVP-SCREEN-MAP.md`](../product/WEB-MVP-SCREEN-MAP.md) as the source of truth.

**Figma file name:** `ElAris — Product UI v0.1`  
**Design order:** Design system → Public web → Admin → Mobile (pilot frames)

---

## 1. Figma pages (create in this order)

| # | Page | Frames | Priority |
|---|------|--------|----------|
| 1 | 🎨 Design System | Tokens, type, 15 core components | Week 1 |
| 2 | 🌐 Public Web | 12 desktop + 12 mobile | Week 1–2 |
| 3 | 🛡 Admin Portal | 8 desktop screens | Week 2 |
| 4 | 📱 Mobile — Pilot | 15 frames (discovery path) | Week 3 |
| 5 | 📱 Mobile — Focus & Together | 12 frames | After pilot validation |
| 6 | ⚠️ Edge Cases | Waitlist, report, verification fail | Week 2 |
| 7 | 🔗 Prototypes | Clickable flows | Week 2–3 |

---

## 2. Design system components

Build as Figma components with variants.

### Buttons
- Primary (filled teal), Secondary (outline), Ghost, Destructive
- States: default, hover, pressed, disabled, loading
- Sizes: sm, md, lg

### Inputs
- Text, textarea, select, phone (+91), OTP boxes
- Label + helper + error state

### Chips & badges
- Intent: Exploring seriously / Relationship ready / Open to exclusivity
- Verified (tap explains: phone + liveness + age)
- Why-intro chips (2–4 per card)

### Cards
- **IntroductionCard** — photo, name, intent, one prompt, why chips, CTA row
- **PromptCard** — question + answer (profile and chat)
- **ApplicantCard** — admin review summary
- **DatePlanCard** — venue, time, share action
- **CohortStatCard** — supply/demand metric

### Sheets & modals
- SafetySheet (report categories)
- RespectfulCloseModal
- ShareDateSheet
- VerifiedExplainerBottomSheet
- FocusRequestModal / TogetherConsequencesModal

### Navigation
- Public web header + footer
- Admin sidebar
- Mobile bottom nav — Discovery state (5 tabs)
- Mobile bottom nav — Together state (5 tabs, different labels)

### Empty states
- Waitlist (honest cohort copy)
- No introductions today
- Thin cohort — recruiting
- Verification pending

---

## 3. Public website frames (design first)

Frame width: **1280px** desktop, **390px** mobile web.

| ID | Screen | Key content |
|----|--------|-------------|
| WEB-01 | Home | Hero: "When you choose each other, we stop the search." CTA: Apply for Delhi or Bangalore |
| WEB-02 | How it works | 4 steps: Verify → Meet intentionally → Focus → Just us |
| WEB-03 | Apply — Step 1 | Name, email, phone, city zone, age |
| WEB-04 | Apply — Step 2 | Intent ladder, relationship goal |
| WEB-05 | Apply — Step 3 | Consent + community guidelines checkbox |
| WEB-06 | Apply — Success | "You're on the waitlist" + position honesty |
| WEB-07 | Waitlist status | Cohort building — no fake urgency |
| WEB-08 | Safety centre | Safety tools overview, report offline incident |
| WEB-09 | Community guidelines | Full policy page |
| WEB-10 | Privacy policy | DPDP-oriented structure |
| WEB-11 | Terms of service | |
| WEB-12 | Account deletion | Form + confirmation (Play Store requirement) |
| WEB-13 | Grievance / Contact | India grievance officer contact |
| WEB-14 | About / WenLice | Optional |
| WEB-15 | 404 / Error | |

### Public web header
Logo · How it works · Safety · Apply · Login (future)

### Public web footer
Privacy · Terms · Safety · Deletion · Grievance · © ElAris

---

## 4. Admin portal frames

Frame width: **1440px**. Dark sidebar optional; keep accessible contrast.

| ID | Screen | Key content |
|----|--------|-------------|
| ADM-01 | Login | Email + MFA placeholder |
| ADM-02 | Dashboard | Cohort stats: applicants, approved, WAU, imbalance alert |
| ADM-03 | Applicant queue | Table: name, zone, intent, applied date, status |
| ADM-04 | Applicant detail | Photos, prompts, approve / reject / waitlist + reason |
| ADM-05 | Verification queue | Liveness pending, manual review |
| ADM-06 | Profile flagged | Moderation flags |
| ADM-07 | Safety cases | Severity, SLA timer, assignee |
| ADM-08 | Case detail | Report narrative, evidence refs, actions |
| ADM-09 | Cohort config | Zone, age band, imbalance threshold |

### Admin roles (annotate on ADM-01)
Support · Verification reviewer · Safety moderator · Marketplace operator

---

## 5. Mobile pilot frames (Phase A — user testing)

Frame: **390 × 844** (iPhone 14) + one Android 360 width check.

| ID | Screen | Notes |
|----|--------|-------|
| MOB-01 | Splash / Welcome | Logo + tagline |
| MOB-02 | Phone OTP | +91, rate limit message |
| MOB-03 | Email verify | |
| MOB-04 | Age + DOB | 18+ gate copy |
| MOB-05 | Selfie / liveness | Provider placeholder UI |
| MOB-06 | Intent selection | 3 intent ladder options |
| MOB-07 | Photos upload | Min 4, face on first |
| MOB-08 | Prompts (×3) | Hinge-style answer fields |
| MOB-09 | Preferences | Hard filters vs soft |
| MOB-10 | Profile preview | Before submit for review |
| MOB-11 | Pending approval | Cannot enter discovery |
| MOB-12 | Today — Introduction | 1 curated card + why chips |
| MOB-13 | Intro detail | Full profile scroll, comment-to-like |
| MOB-14 | Send comment | Must attach to prompt/photo |
| MOB-15 | Match celebration | Subtle, not slot machine |
| MOB-16 | Chat | Safety icon in header |
| MOB-17 | Safety sheet | Report / block |
| MOB-18 | Connections list | Active capacity indicator |

---

## 6. Mobile — Focus & Together (Phase C — design after pilot)

| ID | Screen |
|----|--------|
| MOB-F01 | Focus request + duration picker |
| MOB-F02 | Partner accept/decline |
| MOB-F03 | Focus home |
| MOB-F04 | End-of-focus private decision |
| MOB-T01 | Together request |
| MOB-T02 | Mutual Expectations |
| MOB-T03 | Consequences + dual confirm |
| MOB-T04 | Us home (couple space) |
| MOB-T05 | Exit Together + cooling-off |

---

## 7. Prototype links (connect in Figma)

### Prototype A — Apply flow (public web)
WEB-01 → WEB-03 → WEB-04 → WEB-05 → WEB-06

### Prototype B — Admin review
ADM-03 → ADM-04 → approve → ADM-02

### Prototype C — Mobile pilot
MOB-01 → MOB-12 → MOB-13 → MOB-14 → MOB-16

### Prototype D — Safety
MOB-16 → MOB-17 → report submitted confirmation

---

## 8. Annotations (add sticky notes on frames)

- **MOB-12:** Max 2–3 introductions per week in pilot
- **MOB-13:** User must comment on specific content — no blank like
- **MOB-F02:** No state change until both accept
- **MOB-T03:** Re-auth / OTP on Together confirm
- **ADM-04:** Reject reason internal only — never shown to user verbatim

---

## 9. Import design tokens into Figma

1. Create variable collections: `color/brand`, `color/surface`, `color/text`, `spacing`, `radius`
2. Map values from `design-tokens.json`
3. Typography styles: `Heading/XL`, `Heading/L`, `Body/M`, `Body/S`, `Label`, `Hindi/Body/M`
4. Export later to `packages/design-tokens` for code

---

## 10. Review checklist before dev handoff

- [ ] Hindi strings fit without truncation on MOB frames
- [ ] Verified badge has explainer sheet
- [ ] Waitlist copy is honest (no fake profiles)
- [ ] Safety report reachable from chat in ≤2 taps
- [ ] Focus/Together consequence screens reviewed by advisory cohort
- [ ] Account deletion page matches mobile requirement
- [ ] All CTAs have one primary action per screen
- [ ] Admin actions show audit implication note

---

## 11. What NOT to design yet

- Payment / subscription flows
- Full swipe deck
- Matrimony / family modules
- Wedding / vendor marketplace
- AI relationship coach UI

---

**Next step after Figma Phase A:** User test Prototype C with target users in both the Delhi and Bangalore segments.
