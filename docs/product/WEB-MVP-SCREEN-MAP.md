# ElAris Web MVP Screen Map

**Version:** 0.1  
**Status:** Figma and implementation planning  
**Primary viewport:** Mobile web at 390px  
**Secondary viewports:** 360px Android check, 768px tablet, 1280px desktop  
**Products:** Core and Professionals in one authenticated web product

---

## 1. Figma file structure

Recommended Figma pages:

1. **Foundations**
2. **Components**
3. **Public Web**
4. **Web App — Registration**
5. **Web App — Profile & Approval**
6. **Web App — Meet & Chat**
7. **Web App — Focus & Together**
8. **Web App — Professionals**
9. **Admin Portal**
10. **Safety & Edge Cases**
11. **Prototypes**

Do not create a separate design system for Professionals. It is a cohort and service layer inside ElAris.

---

## 2. Foundations to update

The existing Figma brief contains older teal/coral and Syne references. The active brand system is:

- Deep plum primary
- Rose-gold accent
- Warm paper surfaces
- Cormorant Garamond display type
- Outfit body and interface type
- Two-souls logo mark
- “The Era of Togetherness.”

Foundation work:

- Colour variables
- Typography styles
- Spacing
- Radius
- Border and divider styles
- Motion guidance
- Responsive breakpoints
- Focus states
- Error/success/warning colours

---

## 3. Core components

### 3.1 Navigation

- Public header
- Public footer
- Authenticated mobile bottom navigation
- Authenticated desktop navigation
- Admin sidebar/header
- Back header
- Safety shortcut

### 3.2 Buttons

- Primary
- Secondary
- Ghost
- Text link
- Destructive
- Loading
- Disabled

### 3.3 Inputs

- Text
- Phone
- Email
- OTP
- Select
- Multi-select
- Search
- Textarea
- Date
- Range
- Checkbox
- Radio
- Document upload
- Photo upload

Every input needs:

- Label
- Helper
- Required/optional state
- Error
- Success
- Disabled
- Loading where relevant

### 3.4 Status

- Identity verified
- Workplace verified
- Professionals eligible
- Profile under review
- Additional information requested
- Cohort waitlisted
- Approved
- Restricted

Do not create status labels for:

- Salary, income, or wealth
- Employer rank
- Member “class”
- Attractiveness
- Hidden compatibility score

### 3.5 Profile components

- Profile photo stack
- Prompt answer
- Interest/value chip
- Intent label
- Approximate location
- Career context
- Work-life pattern
- Introduction-reason block
- Report/block menu

### 3.6 Relationship components

- Focus request
- Focus duration selector
- Focus active status
- Together consequences
- Dual-confirmation status
- Couple Space header
- Respectful close

### 3.7 Admin components

- Applicant row/card
- Review checklist
- Evidence viewer
- Eligibility result
- Cohort metric
- Match candidate card
- Introduction-reason editor
- Safety case row
- Audit timeline

---

## 4. Public website additions

The existing public website is largely complete. Add only what supports the functional MVP.

### PUB-01: Core versus Professionals

Purpose:

- Explain that both paths use the same ElAris journey
- Explain Professionals eligibility without classist language
- Link to application

Content:

- ElAris Core
- ElAris Professionals
- Verified professional activity
- Clear, criteria-based manual admission
- No salary or net-worth threshold
- Delhi and Bangalore controlled cohorts

### PUB-02: Login

- Phone/email entry
- Link to registration
- Support link

### PUB-03: Waitlist status entry

- Application reference or authenticated lookup
- Status explanation

### PUB-04: Professionals verification explainer

- What is checked
- How “professional” is defined
- What is not shown
- Accepted routes
- Evidence handling
- No financial-status verification

---

## 5. Shared registration screens

### REG-01: Welcome

- Brand
- Promise
- Create account
- Sign in

### REG-02: Choose city

- Delhi
- Bangalore
- Outside launch markets
- Honest waitlist response

### REG-03: Choose path

- ElAris Core
- ElAris Professionals
- Clear comparison
- Ability to change before submission

### REG-04: Phone

- +91 default
- OTP request
- Rate-limit and support states

### REG-05: OTP

- Six-digit input
- Resend timer
- Wrong/expired code

### REG-06: Email

- Email entry
- Verification-link state
- Change email

### REG-07: Age and date of birth

- 18+ gate
- Explain private use
- Underage stop state

### REG-08: Identity/liveness introduction

- Why verification exists
- What provider receives
- Retention summary
- Continue

### REG-09: Liveness capture

- Camera permission
- Capture guidance
- Retry
- Failure/manual support

### REG-10: Rules and consent

- Community Guidelines
- Privacy Notice
- Safety Rules
- Separate optional consents
- Version references

---

## 6. Profile creation screens

### PRO-01: Profile checklist

- Photos
- Prompts
- Intent
- About
- Preferences
- Preview

### PRO-02: Photos

- Minimum required
- Primary photo
- Reorder
- Replace/delete
- Content guidance

### PRO-03: Prompts

- Choose prompts
- Answer
- Character guidance
- Preview

### PRO-04: Relationship intent

- Exploring seriously
- Relationship ready
- Open to exclusivity
- Plain-language explanations

Final options require founder review.

### PRO-05: About your life

- Values
- Social rhythm
- Communication
- Work pattern
- City/area
- Relocation
- Family expectations

### PRO-06: Preferences

- Hard preferences
- Soft preferences
- Dealbreakers
- Explain how strict filters affect availability

### PRO-07: Profile preview

- Exact discovery representation
- Edit sections
- Submit for review

### PRO-08: Submitted

- Review-time expectation
- What happens next
- Support link

---

## 7. Professionals screens

Professionals screens appear only after the shared identity flow and path selection.

### PROF-01: Professionals eligibility

- No salary or net-worth requirement
- Active professional identity must be verifiable
- Established-professional positioning
- Criteria apply consistently across professional categories
- Continue or return to Core

### PROF-02: Verification consent

- Data collected
- Purpose
- Who reviews it
- Retention/deletion
- Withdrawal/support route

### PROF-03: Professional category

- Salaried
- Founder/business owner
- Self-employed
- Independent practitioner
- Government/public sector

### PROF-04: Workplace details

- Employer/practice/business
- Role/title
- Industry
- Start date
- Work pattern

### PROF-05: Workplace verification method

- LinkedIn verification
- Corporate email
- Manual verification
- Alternative professional route

### PROF-06: Career and life context

- Career stage
- Work schedule
- Travel
- Relocation
- Five-year goals

### PROF-07: Admission criteria explanation

- What ElAris means by active professional identity
- Authenticity, intent, profile effort, and cohort-fit criteria
- Accepted verification routes
- No employer-prestige or financial ranking

This frame must use the versioned admission rubric approved after user research.

### PROF-08: Evidence submission

- Secure upload
- Redaction guidance
- Preview
- Remove/re-upload
- Explicit submit

### PROF-09: Professionals review summary

- Workplace method
- Professional evidence received
- Profile checklist
- Submit

### PROF-10: Professionals under review

- Expected review window
- Evidence privacy reminder
- Return to status

### PROF-11: Additional information requested

- Exact missing item
- Deadline if any
- Secure resubmission

### PROF-12: Eligible, cohort waitlisted

- Verification passed
- City cohort not ready
- No fake queue urgency
- Notification preference

### PROF-13: Approved

- Professionals access confirmed
- What members can see
- First-introduction expectation

### PROF-14: Not currently eligible

- Neutral explanation
- Core path available
- Reapply timing
- Support/dispute route

---

## 8. Application and home states

### APP-01: Applicant home

- Current status
- Remaining actions
- Expected next step
- Support

### APP-02: Approved, waiting for introduction

- Profile active
- Curation explanation
- No-introduction-yet state
- Profile edit

### APP-03: Member home

- Current introduction
- Active matches
- Focus/Together state
- Safety shortcut

### APP-04: Paused/inactive

- Reason
- Resume action where allowed
- Impact on introductions

### APP-05: Restricted

- High-level reason category
- Available actions
- Appeal/support

---

## 9. Meet screens

### MEET-01: Today’s introduction

- One primary profile
- Member-facing reasons
- Intent
- Approximate location
- Open profile
- Pass
- Report

### MEET-02: Full introduction

- Photos
- Prompts
- Values/interests
- Core or verified-professional context
- Why introduced
- Comment on content
- Pass

### MEET-03: Send interest

- Selected prompt/photo context
- Comment
- Review/send

### MEET-04: Interest sent

- Calm confirmation
- No manipulative animation
- Return home

### MEET-05: Pass

- Private confirmation
- Optional private reason for curation
- No message sent to other member

### MEET-06: Mutual match

- Subtle celebration
- Original introduction reason
- Start conversation
- Safety reminder

### MEET-07: No introduction today

- Honest curation state
- Profile improvement where relevant
- No fake countdown

---

## 10. Chat and safety screens

### CHAT-01: Connections

- Active conversations
- Closed/archive
- Capacity explanation

### CHAT-02: Conversation

- Messages
- Profile context
- Safety menu
- Date plan
- Focus request
- Respectful close

### CHAT-03: Safety menu

- Report
- Block
- Close conversation
- Safety centre

### SAFE-01: Report category

- Harassment
- Explicit content
- Scam/money request
- Fake profile
- Felt unsafe on a date
- Other

### SAFE-02: Report details

- Narrative
- Relevant messages/content
- Immediate danger notice
- Submit

### SAFE-03: Report confirmation

- Case acknowledgement
- Contact expectations
- Block option

### SAFE-04: Block confirmation

- Immediate contact stop
- Anonymous action explanation

### SAFE-05: Respectful close

- Neutral reason options
- Optional custom message subject to moderation
- Close confirmation

### DATE-01: Date plan

- Public venue
- Date/time
- Notes
- Partner café option

### DATE-02: Share Date

- Trusted contact
- Shared details
- Privacy explanation

### DATE-03: Post-date check-in

- Did you meet?
- Meet again?
- Felt respected?
- Safety concern?
- Private feedback

---

## 11. Focus screens

### FOC-01: Focus explainer

- Mutual
- Time-bound
- Discovery pauses after acceptance
- Either person can end

### FOC-02: Request Focus

- 14/30/60 days
- Consequences
- Send request

### FOC-03: Focus request received

- Requester
- Duration
- Accept
- Decline privately
- Not now

### FOC-04: Focus active

- Partner
- Start/end date
- Time remaining without urgency
- End Focus
- Request Together when eligible

### FOC-05: End Focus

- Consequences
- Private next-step choice
- Confirm

### FOC-06: Focus ending decision

- Extend
- Return to Meet
- Request Together
- Close connection

### FOC-07: Focus result

- Mutual result only
- Private decisions remain private until resolved

---

## 12. Together screens

### TOG-01: Together explainer

- Exclusivity
- Discovery removal
- Chat archiving
- Couple Space
- Exit always allowed

### TOG-02: Request Together

- Review consequences
- Send request

### TOG-03: Together request received

- Review independently
- Continue
- Decline/not now

### TOG-04: Re-authentication

- OTP or recent-auth check
- Independent confirmation

### TOG-05: Awaiting confirmation

- Do not reveal the partner’s private incomplete decision
- Cancel request

### TOG-06: Together active

- Calm confirmation
- Discovery stopped
- Enter Couple Space

### TOG-07: Leave Together

- Explain access/data effects
- Cooling-off
- Safety/report option
- Confirm

### TOG-08: Together ended

- Neutral confirmation
- Cooling-off status
- Private-data controls

---

## 13. Couple Space screens

### CPL-01: Couple Space home

- Two member names
- Together start date
- Shared plan/note
- Important dates
- Relationship controls

### CPL-02: Shared plan/note

- Add/edit
- Ownership visibility
- Delete

### CPL-03: Important dates

- Add date
- Reminder preference

### CPL-04: Couple Space settings

- Privacy
- Export/delete policy
- Leave Together
- Safety

The MVP must not imply that shared content will exist forever. Exit and ownership rules must be finalized first.

---

## 14. Admin portal screens

### ADM-01: Login

- Staff authentication
- MFA
- Role awareness

### ADM-02: Operations dashboard

- New applicants
- Reviews due
- Active members
- City/cohort balance
- Introductions awaiting action
- Open safety cases

### ADM-03: Applicant queue

Filters:

- City
- Core/Professionals
- Status
- Submitted date
- Reviewer
- Missing information

### ADM-04: Applicant detail

- Identity status
- Profile
- Intent
- Preferences summary
- Content/moderation checks
- Review checklist
- Approve/waitlist/request info/reject

### ADM-05: Professionals review

- Professional category
- Workplace method/result
- Professional evidence viewer
- Admission result
- Evidence deletion state
- Internal notes

Never display employer rank or a “member class.”

### ADM-06: Cohort dashboard

- City
- Reciprocal preference segments
- Approved/active/waitlisted supply
- Age-range overlap
- Introduction capacity
- Open/controlled/waitlisted/paused controls

### ADM-07: Member detail

- Profile
- Verification
- State
- Introduction history
- Restrictions
- Reports
- Audit log

### ADM-08: Match curator workspace

- Eligible candidate suggestions
- Hard-filter result
- Compatibility rubric
- Tensions
- Exposure history
- Member-facing reasons
- Introduce/hold/clarify/do not introduce

### ADM-09: Introduction detail

- Pair
- Curator
- Reasons
- Delivery/view/interest outcomes
- Conversation/date/Focus outcomes

### ADM-10: Safety queue

- Severity
- Category
- SLA
- Assignee
- Status

### ADM-11: Safety case

- Reporter narrative
- Relevant content
- Prior cases
- Actions
- Escalation
- Audit history

### ADM-12: Policy and rule versions

- Consent versions
- Community rules
- Matching-rule version
- Effective dates

### ADM-13: Audit log

- Actor
- Action
- Subject
- Reason
- Timestamp

---

## 15. Edge-case frames

Design these before development:

- OTP rate limited
- Email link expired
- Camera permission denied
- Liveness failed
- Duplicate account
- Underage
- Unsupported city
- Thin cohort
- Profile rejected for content
- Additional information requested
- Professional evidence invalid
- Evidence upload failed
- LinkedIn unavailable
- Corporate email unavailable
- Introduction withdrawn
- Member restricted during conversation
- Focus eligibility changed before acceptance
- Together confirmation expires
- One member leaves Together
- Report submitted after unmatch
- Account deletion while in Focus/Together
- Network offline/retry
- Generic 404 and service error

---

## 16. Prototype flows

### Prototype A: Core application

`PUB-01 → REG-01 → REG-02 → REG-03 → REG-04 → REG-05 → REG-06 → REG-07 → REG-08 → REG-09 → REG-10 → PRO-01…PRO-08 → APP-01`

### Prototype B: Professionals application

`REG-03 → shared verification → PROF-01…PROF-10 → PROF-12 or PROF-13`

### Prototype C: First introduction

`APP-03 → MEET-01 → MEET-02 → MEET-03 → MEET-04 → MEET-06 → CHAT-02`

### Prototype D: Safety

`CHAT-02 → CHAT-03 → SAFE-01 → SAFE-02 → SAFE-03`

### Prototype E: Focus

`CHAT-02 → FOC-01 → FOC-02 → FOC-03 → FOC-04 → FOC-06`

### Prototype F: Together

`FOC-04 → TOG-01 → TOG-02 → TOG-03 → TOG-04 → TOG-06 → CPL-01`

### Prototype G: Admin review and introduction

`ADM-02 → ADM-03 → ADM-04/ADM-05 → ADM-06 → ADM-08 → ADM-09`

---

## 17. Design review checklist

- Core and Professionals feel like one ElAris system
- Mobile web works without horizontal scrolling
- Every status explains what happens next
- No fake urgency
- No salary, income, or net-worth collection
- No employer tier/member class
- Focus and Together show mutuality clearly
- Declines and passes remain private
- Report/block reachable within two taps
- Safety language does not imply emergency response
- Empty and waitlist states are honest
- Forms explain why sensitive information is needed
- Keyboard and screen-reader navigation considered
- Contrast and focus states meet accessibility expectations
- Hindi/localization expansion will not break layouts
- Every screen has one primary action

---

## 18. Figma delivery order

### Design batch 1

- Foundations
- Components
- Shared registration
- Profile creation
- Applicant status

### Design batch 2

- Professionals branch
- Admin applicant review
- Cohort dashboard

### Design batch 3

- Meet
- Match
- Chat
- Safety
- Curator workspace

### Design batch 4

- Focus
- Together
- Thin Couple Space
- Edge cases

Implementation should begin after batch 1 and 2 prototypes are reviewed, while later product flows continue in design.

