# ThesisFlow UX specification

## Purpose and visual direction

Help a student move from skills and interests to a suitable topic, a complementary team, and a supervisor decision. Keep the next action visible. A student can explore topics before completing a team. Recommendations inform the student's choice; invitations require acceptance and applications require explicit submission.

Use a restrained academic workspace: off-white page background, white content surfaces, deep green navigation, and teal actions. Amber indicates missing roles or capacity issues. Always pair status colors with text. Topic matching and team complementarity are different concepts: show a topic fit score with an explanation, and explain teammate suggestions through missing role coverage and shared interests. Do not imply that a topic match percentage is a probability of acceptance.

## Information architecture

| Role | Navigation | Primary action |
| --- | --- | --- |
| Student | Overview, Explore topics, My team, Applications | Find topic and form team |
| Supervisor | Overview, My topics, Applications, My teams | Review applications |
| Administrator | Overview, Supervisors, Topic allocation, Reports | Resolve allocation and quota issues |

The avatar opens account and profile settings in the future application. Role switching is available only to accounts authorized for multiple roles. The HTML viewer tabs are review tools, not product navigation.

## Core prototype flow

1. Student overview → Explore topics via “Explore all topics”.
2. Explore topics → Topic details via “View topic”. Search and filters update the result list and result count.
3. Topic details → My team when a required role is missing. Students can still browse topics with an incomplete profile or team.
4. My team → View profile → Send invitation → Pending invitation. A sent invitation never silently adds a student.
5. Accepted invitation → Updated team membership and role coverage. Recheck capacity on acceptance; show a clear error if another invitation has already filled the position.
6. Topic details → Review application → Confirm team, topic, and required acknowledgements → Submit application.
7. Applications → Pending review → Approved or Rejected with supervisor feedback.
8. Supervisor overview → Review → Check team skills and topic requirements → Approve or Reject. Recheck team eligibility and supervision capacity before saving the decision.
9. Administrator overview → Manage limits → Inspect approved load → Edit limit → Save. Do not accept a limit below current approved load without a separately specified reassignment workflow.

Screens 1–4 illustrate the student flow. Screens 5–6 illustrate role overviews. Profile, confirmation, and decision states above are planned screens/dialogs, not delivered mockups.

## Layout and components

Desktop frame: 1440 × 1000. Sidebar: 240 px. Header: 88 px. Content: 40 px side margins and 1104 px usable width. Base spacing: 8 px, with 4 px for small adjustments. Cards: 16 px radius, 1 px border. Buttons: 42 px height in desktop mockups; use at least 44 px touch targets in implementation. Body type: 15 px, section headings: 20–22 px, page title: 32–34 px. Avoid all caps beyond short metadata labels.

| Component | Content | Required states |
| --- | --- | --- |
| Sidebar item | Icon, label, active indicator | Default, hover, active, keyboard focus |
| Topic card | Title, short description, tags, supervisor, open team slots, match | Default, hover, saved if later supported, full |
| Recommendation explanation | Contributing skills, interests, role fit | Ready, insufficient profile data, unavailable |
| Filter | Visible label, checkbox or select, reset | Default, selected, disabled, focus |
| Team member | Name, role, owner indicator | Active, leaving, removed |
| Teammate suggestion | Role, skills, explanation, profile and invitation actions | Available, invited, invitation accepted, unavailable |
| Application row | Team, topic, role coverage, date, review action | Pending, approved, rejected, withdrawn |
| Quota row | Supervisor, approved/limit, pending, capacity label | Available, full, updating, save error |
| Primary button | One clear action label | Default, hover, focus, disabled, submitting |

## Essential missing and failure states

- Empty profile: explain which skills and interests improve recommendations; offer “Complete profile”. Do not show an invented match score.
- No topic matches: keep search/filter settings visible; offer “Reset filters” and broader topic browsing.
- No teammate results: suggest broadening role or interest filters. Never conceal mandatory project requirements.
- Topic full: disable submission and explain capacity; allow continued browsing.
- Incomplete role coverage: list missing roles. Block only where the topic's mandatory requirements demand it, rather than blocking all teams indiscriminately.
- Pending invitation: show recipient, status, and cancel action. Expired, declined, and capacity-conflict states need explicit explanations.
- Application submitted: show topic, team snapshot, submission status, and next expected step. Prevent duplicate submissions during network retries.
- Rejected application: show supervisor feedback and an action to revise or explore another topic.
- Loading: skeleton cards and preserved page structure. Errors: a short local explanation with retry; preserve typed inputs.
- Insufficient permissions: deny the action and show a useful return path. Hiding a navigation item is not authorization.

## Responsive and accessibility guidance

The delivered SVGs are desktop frames. For later mobile frames at 375 px, replace the sidebar with a menu, use a compact header, stack cards into one column, and place filters in a labeled sheet. Replace wide tables with readable record cards; preserve role, capacity, and status labels. Allow text to wrap, avoid horizontal scrolling, and make primary actions full width where appropriate. At tablet widths, reduce the sidebar before squeezing the content.

Implementation must use semantic controls, visible keyboard focus, form labels, descriptive errors, and a logical tab order. Support 200% zoom, announce asynchronous invitation and application status changes, and check WCAG AA contrast before release. The static mockups alone do not establish accessibility compliance.

## Requirement mapping

| Report requirement | Design coverage |
| --- | --- |
| FR-01 Authentication and RBAC | Role-specific navigation illustrated; login screens remain |
| FR-02 Student profile | Readiness prompt and skill-based explanations; editor remains |
| FR-03 Topic catalog | Topic list, details, supervisor metadata; creation form remains |
| FR-04 Topic recommendations | Ranked topic cards and explanation panel |
| FR-05 Teammate recommendations | Suggested profiles with complementary role explanations |
| FR-06 Team formation | Team overview and invitation entry; invitation states specified |
| FR-07 Application and approval | Application entry and supervisor queue; dialogs remain |
| FR-08 Department quotas | Allocation table, capacity status, management entry |
| NFR-03 Responsive layout | Mobile behavior specified; mobile mockups remain |
| NFR-04 Explainability | Visible topic fit factors and teammate recommendation reasons |

## Suggested evaluation

Ask students to find a topic, explain why it was recommended, identify a missing team role, and locate the application action. Ask supervisors to find a pending application and their remaining capacity. Ask administrators to identify overloaded supervisors. Record completion, confusion, wrong turns, and comments. Collect usability findings before treating this concept as a validated design.
