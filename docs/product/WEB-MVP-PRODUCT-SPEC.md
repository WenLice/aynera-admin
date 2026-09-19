# Aynera Web MVP Product Specification

**Version:** 0.1  
**Status:** Working specification for founder review  
**Launch markets:** Delhi and Bangalore  
**Delivery approach:** Responsive web product first, native mobile after pilot validation  
**Products:** Aynera Core and Aynera Professionals inside one account and platform

---

## 1. Purpose

This document defines the first functional Aynera product to be tested with real users.

The current public website remains the marketing, trust, application, safety, and legal layer. The Web MVP adds an authenticated, mobile-first product where approved members can create profiles, receive curated introductions, communicate safely, and move through mutual relationship states.

The Web MVP exists to validate the difficult parts of Aynera before building a native mobile app:

- Can balanced local cohorts be formed?
- Can curated introductions create better conversations than an open feed?
- Which compatibility signals produce useful introductions?
- Will people use Focus when it is mutual?
- Do people understand and trust Together?
- Will established professionals pay for a smaller, verified cohort?
- Can a small operations team review profiles and manage safety reliably?

---

## 2. Product promise

> When you choose each other, Aynera stops the search.

Aynera is optimized for relationship outcomes rather than time spent browsing.

The platform has five product modules:

1. **Meet** — curated introductions and meaningful starts
2. **Focus** — a mutual, time-bound pause on new introductions
3. **Together** — independently confirmed exclusivity that stops discovery
4. **Couple Space** — a private home for two
5. **Era Ahead** — future relationship tools shaped after validation

The Web MVP will test Meet first and introduce thin versions of Focus, Together, and Couple Space. Era Ahead remains future scope.

---

## 3. Product structure

Aynera will have one identity system, one account, and one relationship journey.

### 3.1 Public website

**Suggested URL:** `aynera.com`

Responsibilities:

- Explain the brand and product
- Present the five modules
- Explain how Aynera works
- Describe Core and Professionals
- Collect applications and waitlist demand
- Publish safety, privacy, terms, grievance, and account-deletion information
- Link approved or returning members to the web product

### 3.2 Authenticated web product

**Suggested URL:** `app.aynera.com` or `aynera.com/app`

Responsibilities:

- Registration and authentication
- Verification and profile creation
- Application status
- Curated introductions
- Interest, matching, and chat
- Safety controls
- Focus and Together
- Thin Couple Space

The product must be responsive and comfortable at 360–390px mobile widths. A Progressive Web App can be considered after the core flow is stable.

### 3.3 Admin and operations portal

**Suggested URL:** `admin.aynera.com`

Responsibilities:

- Application and profile review
- Professional eligibility review
- Cohort supply and balance
- Manual matchmaking
- Introduction reasoning
- Safety reports and moderation
- Audit history
- Pilot metrics

---

## 4. Launch propositions

### 4.1 Aynera Core

**Audience:** Adults seeking an intentional relationship.

Core requirements:

- Age 18+
- Located in an active Delhi or Bangalore cohort
- Identity and liveness checks completed
- Profile passes human review
- Relationship intent is compatible with the pilot
- Community and safety rules accepted

Core positioning:

> Verified introductions for people who want something real.

### 4.2 Aynera Professionals

**Audience:** Established professionals who want a smaller, manually admitted cohort with career-stage and lifestyle context.

Additional requirements:

- All Core requirements
- Workplace or professional activity verified
- Professional context completed: role, field, work pattern, and future direction
- Professional application passes manual review

Professionals admission will not use a salary or net-worth threshold. The detailed admission rubric will be finalized
after user research; until then, review is limited to authenticity, active professional identity, relationship intent,
profile effort, community standards, and cohort availability.

Professionals positioning:

> A private, verified community for established professionals who value their time and want something serious.

Professionals is not:

- A ranking of human worth
- A list of “top company” employees
- An income or salary club
- A net-worth club
- A matrimony service
- A promise that job title predicts safety, kindness, or compatibility

Professional verification evidence, internal decision notes, and company classification must never be visible to other members.

---

## 5. Product principles

### P-01: Mutuality before state changes

Focus and Together begin only after independent confirmation from both members. A request alone never changes either account.

### P-02: No endless discovery

Members receive a limited number of introductions. The MVP does not include an unlimited swipe deck.

### P-03: Honest cohort availability

If a useful local cohort does not exist, the member waits. The product must not generate fake urgency or expose an empty marketplace.

### P-04: Human review before visibility

Completing registration does not immediately place a profile into discovery.

### P-05: Safety is independent of status

Income, employer, education, and verification badges do not guarantee behaviour. Reporting, blocking, moderation, and date-safety tools apply equally to every member.

### P-06: Private data stays private

Collect the minimum data required for a stated purpose. Restrict access, define retention, support withdrawal where applicable, and delete evidence after verification when it is no longer required.

### P-07: Explain introductions without fake precision

Show understandable reasons such as similar pace or compatible plans. Do not display invented compatibility percentages.

### P-08: Respectful exits are always available

Members can pass, close a conversation, end Focus, or leave Together. The product should reduce ambiguity without forcing continued contact.

---

## 6. Roles

### 6.1 Visitor

- Reads the public website
- Compares Core and Professionals
- Starts an application

### 6.2 Applicant

- Has registered but is not approved
- Completes verification and profile
- Can view application status
- Cannot enter discovery

### 6.3 Approved member

- Can receive introductions
- Can express interest and match
- Can chat and use safety tools
- Can request Focus or Together when eligible

### 6.4 Professionals member

- Has passed Core and Professionals requirements
- Participates in the Professionals cohort
- Sees relevant professional context, never financial status
- Uses the same Meet, Focus, Together, and Couple Space journey

### 6.5 Couple

- Two members currently in Together
- Removed from discovery
- Has access to a shared Couple Space

### 6.6 Verification reviewer

- Reviews identity, profile, workplace, and eligibility evidence
- Records decisions without exposing internal notes to applicants

### 6.7 Match curator

- Reviews reciprocal eligibility and compatibility context
- Creates or approves introductions
- Records concise introduction reasons

### 6.8 Safety moderator

- Reviews reports and evidence
- Applies restrictions
- Escalates urgent cases according to policy

### 6.9 Cohort operator

- Monitors local supply and preference balance
- Opens, pauses, or waitlists cohort segments
- Monitors introduction throughput

---

## 7. End-to-end member journey

### Stage 1: Apply

1. Visitor chooses Delhi or Bangalore.
2. Visitor provides basic contact and eligibility information.
3. Visitor chooses Core or Professionals.
4. Product shows an honest availability result:
   - Continue now
   - Join waitlist
   - Not currently served

### Stage 2: Register and verify

1. Verify phone.
2. Verify email.
3. Confirm date of birth and 18+ eligibility.
4. Complete liveness/video-selfie check.
5. Accept community, privacy, and safety rules.

### Stage 3: Build profile

1. Add required photos.
2. Answer prompts.
3. Declare relationship intent.
4. Add values, lifestyle, communication, and future-plan information.
5. Set hard preferences and dealbreakers.
6. Preview profile.
7. Submit for review.

### Stage 4: Professionals branch

Professionals applicants additionally:

1. Read a separate verification notice.
2. Verify workplace or professional activity.
3. Declare professional category, role, industry, and work pattern.
4. Add career direction, schedule, and five-year context.
5. Submit accepted professional-activity evidence where automated verification is unavailable.
6. Wait for a consistent, criteria-based manual review.

### Stage 5: Approval

Possible states:

- Draft
- Verification required
- Submitted
- Under review
- Additional information requested
- Approved but cohort waitlisted
- Approved and active
- Not currently eligible
- Suspended

### Stage 6: Meet

1. Approved member receives a curated introduction.
2. Product shows concise reasons for the introduction.
3. Member can:
   - Respond to a prompt/photo
   - Express interest
   - Pass privately
   - Report a concern
4. If both express interest, a match opens.

### Stage 7: Connect safely

1. Matched members can chat in the product.
2. Phone numbers and personal contact details remain optional.
3. Members can block, report, or close respectfully.
4. Members can create a date plan and share it with a trusted person.
5. Post-date feedback remains private.

### Stage 8: Focus

1. Either matched member can request Focus.
2. Request includes a duration: 14, 30, or 60 days.
3. Other member accepts or declines privately.
4. On mutual acceptance, new introductions pause for both.
5. Either member can end Focus.
6. At expiry, each member privately chooses whether to:
   - Extend Focus
   - Return to Meet
   - Request Together

### Stage 9: Together

1. One member requests Together.
2. Both members independently review the consequences.
3. Both re-authenticate before confirmation.
4. On dual confirmation:
   - Both profiles leave discovery
   - New likes and introductions stop
   - Unrelated chats archive privately
   - Couple Space opens
5. Either member can leave Together.
6. Exit applies a defined cooling-off and privacy process.

### Stage 10: Couple Space

The MVP version includes:

- Shared relationship status
- Small shared plan/note area
- Important dates
- Safety and account controls
- Leave Together flow

Memories, workshops, commerce, coaching, and Era Ahead features are excluded from the first MVP.

---

## 8. Core functional requirements

### FR-01 Authentication

- Support phone OTP and verified email.
- Sessions must expire safely.
- Sensitive confirmations require recent authentication.

### FR-02 Profile privacy

- Do not expose surname by default.
- Do not expose phone, email, exact address, or verification documents.
- Show approximate location only.

### FR-03 Application status

- Applicants can always see their current status.
- Additional-information requests must be clear and actionable.
- Internal reviewer notes remain private.

### FR-04 Curated introductions

- No unrestricted swipe feed.
- Curators can create or approve introductions.
- Every introduction stores structured and human-readable reasons.
- Passing is private.

### FR-05 Matching

- Chat opens only after reciprocal interest.
- Hard filters must be reciprocal.
- Restricted or blocked pairs must never be reintroduced.

### FR-06 Chat

- Support text in the MVP.
- Support report, block, and respectful close from chat.
- Media sharing can be deferred until moderation controls are ready.

### FR-07 Safety

- Report and block must be reachable within two taps from profile and chat.
- Blocking immediately prevents further contact.
- Reports create an auditable case.
- Severe categories receive priority handling.

### FR-08 Focus

- Requires dual consent.
- Must show duration and consequences before acceptance.
- Must support end and expiry.
- Decline remains private.

### FR-09 Together

- Requires dual confirmation and recent authentication.
- Removes both members from discovery atomically.
- Must have a reversible, clearly explained exit process.

### FR-10 Professionals privacy

- Salary, income, and net worth are not Professionals admission or matching fields.
- Raw evidence is accessible only to authorized reviewers.
- Store a professional-verification result rather than retaining evidence indefinitely.
- Do not rank members by employer prestige.

### FR-11 Auditability

- Record reviewer, decision, timestamp, and reason category for sensitive operations.
- Record relationship-state transitions.
- Record safety and account restrictions.

### FR-12 Notifications

The MVP should support essential email or in-product notifications for:

- Verification result
- Additional information request
- Approval/waitlist result
- New introduction
- Mutual match
- Focus request/result/expiry
- Together request/result
- Safety case acknowledgement

Push notifications are deferred until mobile/PWA notification work.

---

## 9. Professionals verification policy

### 9.1 Workplace verification methods

Preferred methods:

- LinkedIn workplace verification, subject to approved API access and consent
- Corporate email verification
- Manual employment review

Alternative professional routes:

- Founder/business owner
- Self-employed professional
- Doctor or independent practitioner
- Lawyer or consultant
- Government/public-sector professional

The product must not depend exclusively on LinkedIn.

### 9.2 Professional admission criteria

Professionals admission is based on verifiable professional activity and community fit, not earnings.

Initial review criteria:

- Real, current professional activity can be verified
- Professional category, role, field, and work pattern are complete
- Career and future-direction answers show reasonable effort
- Relationship intent is compatible with the Professionals cohort
- Identity, profile quality, and community standards pass Core review
- The relevant city and reciprocal-preference cohort has capacity

Reviewers must not use employer prestige, education brand, job title, salary, social class, appearance, or subjective
“high-value” language as a proxy for professionalism.

Before launch, the team must define a versioned rubric for consistency across salaried employees, founders, business
owners, independent practitioners, government professionals, and self-employed applicants.

### 9.3 Evidence handling

Possible evidence:

- LinkedIn workplace verification result
- Corporate email verification
- Professional registration or licence where relevant
- Business registration or public professional presence
- Redacted employment/engagement evidence with compensation removed
- Approved third-party workplace verification result

Controls:

- Separate, purpose-specific notice and consent
- Encryption in transit and at rest
- Access restricted to authorized reviewers
- No downloads where avoidable
- Automatic deletion after the review and dispute window
- Audit record stores outcome, method, reviewer, and date
- Never use professional evidence for advertising or unrelated analytics

### 9.4 No financial-status verification in MVP

Salary, income, assets, and net worth are excluded. They do not define professionalism, create unnecessary privacy
risk, and would shift the product toward wealth-based matchmaking.

---

## 10. Operations requirements

### 10.1 Review service levels

Initial targets:

- Standard profile review: within 48 hours
- Professionals review: within 72 hours
- Additional-information response: within 2 business days
- Urgent safety report triage: same day

Targets are promises only after staffing proves they are sustainable.

### 10.2 Cohort controls

Operators must be able to:

- View supply by city and reciprocal preference segment
- Pause admissions for over-supplied segments
- Waitlist under-supported combinations
- Cap introductions per member
- Avoid repeatedly showing the same small pool
- Monitor inactive or low-response members

### 10.3 Introduction operations

Each curator introduction should record:

- Reciprocal hard-filter result
- Compatibility signals
- Potential risks or uncertainties
- Member-facing reasons
- Curator identity
- Introduction date
- Outcome

### 10.4 Safety operations

Safety cases require:

- Severity
- Category
- Reporter and reported-member references
- Relevant content/evidence references
- Assigned reviewer
- Status and timestamps
- Action taken
- Escalation notes

Emergency language must clearly state that Aynera is not an emergency-response service.

---

## 11. Pilot metrics

### 11.1 Acquisition and supply

- Applications by city and product
- Eligibility completion rate
- Approval rate
- Waitlist size
- Cohort balance by reciprocal preference segment
- Professionals evidence completion rate

### 11.2 Activation

- Approved members completing profiles
- Time from application to approval
- Time from approval to first introduction
- Introduction viewed rate

### 11.3 Connection quality

- Interest rate per introduction
- Reciprocal match rate
- Two-way conversation rate
- Meaningful-conversation proxy
- Planned-meeting rate
- Private post-date feedback

### 11.4 Relationship progression

- Focus request rate
- Focus acceptance rate
- Focus completion/extension/end
- Together request and confirmation rate
- Together exit rate

### 11.5 Trust and safety

- Reports per active member
- Blocks per active member
- Case-response time
- Repeat-offender detection
- Verification resubmission rate

### 11.6 Professionals commercial validation

- Eligible waitlist demand
- Approval-to-paid conversion
- Price-test conversion
- Renewal intent
- Referral rate
- Support and review cost per approved member

Metrics must not encourage unsafe engagement or optimize for endless app usage.

---

## 12. Pilot exit gates

Native mobile development should accelerate after evidence shows:

- Balanced, usable cohorts in at least one launch city
- Manual review can be completed reliably and affordably
- Curated introductions produce regular two-way conversations
- Members progress to planned meetings
- Safety operations meet agreed response standards
- Focus is understood and used without coercion
- Professionals members demonstrate willingness to pay
- The team can explain which matching signals correlate with useful outcomes

The original target of 200+ qualified waitlist applicants remains a useful minimum signal, but cohort balance matters more than the total number alone.

---

## 13. MVP release sequence

### Release 0: Product definition and prototype

- Finalize this specification
- Finalize matchmaking rules
- Design Figma flows
- Test with representative Core and Professionals users

### Release 1: Application and operations foundation

- Real application submission
- Authentication
- Verification status
- Admin applicant queue
- Cohort dashboard

### Release 2: Profiles and curated Meet

- Profile builder
- Human review
- Curator workspace
- Introduction dashboard
- Interest/pass

### Release 3: Match, chat, and safety

- Reciprocal matching
- Basic text chat
- Report/block/close
- Date plan and Share Date
- Private feedback

### Release 4: Focus

- Request, consent, duration, expiry, end
- Discovery pause
- Private decisions

### Release 5: Together and thin Couple Space

- Dual confirmation and re-authentication
- Discovery removal
- Shared private space
- Exit/cooling-off

### Release 6: Native mobile

- Build React Native/Expo clients against validated APIs and rules
- Add push notifications and mobile-specific safety/device capabilities

---

## 14. Explicitly out of scope

Do not include in the first Web MVP:

- Unlimited swipe discovery
- AI-generated compatibility scoring
- Automated relationship advice
- Net-worth verification
- Employer prestige tiers
- Public ratings or date reviews
- Events marketplace
- Friends product
- Voice-first product
- Creator platform
- Wedding or vendor marketplace
- Payments before pricing tests justify implementation
- Full memory vault or advanced Couple Space
- Family-managed matrimony profiles

---

## 15. Product decisions still requiring founder approval

1. The versioned, inclusive definition of “professional” used for admission
2. Professionals introductory pricing tests
3. Minimum age for Professionals, if different from Core
4. Which relationship intents are accepted into the first cohort
5. Initial introduction frequency and active-connection capacity
6. Focus durations and cooling-off rules
7. Together exit/cooling-off behaviour
8. Evidence deletion and dispute windows
9. Pilot cohort size by city
10. Whether Delhi and Bangalore open simultaneously or sequentially

---

## 16. Supporting specifications

- [Matchmaking and Relationship Rules](MATCHMAKING-RULES.md)
- [Web MVP Screen Map](WEB-MVP-SCREEN-MAP.md)
- [Build Order](../BUILD-ORDER.md)
- [Figma Brief](../design/FIGMA-BRIEF.md)
- [Copy Deck](../design/copy-deck.md)

