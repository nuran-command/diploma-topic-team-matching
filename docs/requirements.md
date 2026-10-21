# System Requirements Specification (SRS)

## 1. Introduction & Objectives
The purpose of the **Intelligent Web System for Selecting Diploma Project Topic and Forming Students Teams** is to automate and streamline academic thesis assignments at Astana IT University (AITU).

---

## 2. User Roles & Personas

| Role | Primary Responsibilities | Core System Actions |
|---|---|---|
| **Student** | Select thesis topics, find complementary teammates, submit applications | Build skill profile, browse topic recommendations, send/accept team invites, apply for topics |
| **Thesis Supervisor** | Formulate topics, define prerequisites, review candidate teams | Propose thesis topics, review team applications, accept/reject rosters, manage capacity |
| **Department Admin (Dean's Office)** | Oversee quotas, manage deadlines, monitor cohort progress | Set supervisor quotas, monitor cohort allocation %, resolve unassigned students |

---

## 3. Functional Requirements (FR)

### Module 1: Authentication & Authorization (FR-01 to FR-03)
- **FR-01:** System shall provide JWT-based user authentication supporting student and staff university emails.
- **FR-02:** Role-Based Access Control (RBAC) shall restrict route access according to assigned role (`STUDENT`, `SUPERVISOR`, `ADMIN`).
- **FR-03:** Password policies shall enforce cryptographic hashing using bcrypt.

### Module 2: Profile & Skill Matrix (FR-04 to FR-06)
- **FR-04:** Students shall define and update their technical profile including primary role (Frontend, Backend, Fullstack, ML, Mobile), secondary skills, and proficiency ratings (1–5).
- **FR-05:** Students shall specify academic interests, research tracks, and preferred development methodologies.
- **FR-06:** System shall maintain a standardized taxonomy of software engineering and data science skills.

### Module 3: Topic Management & Catalog (FR-07 to FR-10)
- **FR-07:** Supervisors shall create, edit, and archive thesis topics with descriptions, expected deliverables, and prerequisite skills.
- **FR-08:** Each topic shall enforce an explicit maximum team size (default: 2 to 3 students).
- **FR-09:** Topic catalog shall support keyword search, supervisor filtering, and prerequisite tag matching.
- **FR-10:** Topics with accepted applications shall automatically transition to `ALLOCATED` status.

### Module 4: Intelligent Matching Engine (FR-11 to FR-13)
- **FR-11:** The engine shall calculate cosine similarity scores between student competency vectors and topic requirement vectors.
- **FR-12:** The engine shall recommend complementary teammates to unassigned students to avoid role overlap.
- **FR-13:** Recommendation outputs shall include explainability factors detailing which matched skills drove the recommendation score.

### Module 5: Team Assembly & Application Pipeline (FR-14 to FR-16)
- **FR-14:** Students shall be able to initiate teams, send direct invitations to peers, and manage invitation responses.
- **FR-15:** Assembled teams shall submit formal applications to an available topic along with project justification.
- **FR-16:** Supervisors shall approve or reject team applications, with rejections providing constructive textual feedback.

---

## 4. Non-Functional Requirements (NFR)

- **NFR-01 (Security):** All passwords stored with salt and bcrypt. Transport layer encrypted via TLS/HTTPS. All sensitive endpoints guarded by Bearer tokens.
- **NFR-02 (Performance):** Algorithmic matching for cohort of 500 students computed in $\le 3.0$ seconds. API response time for typical CRUD queries under $150$ ms.
- **NFR-03 (Usability & Responsiveness):** User interface compliant with responsive breakpoints (mobile 375px, tablet 768px, desktop 1280px+).
- **NFR-04 (Reliability & Availability):** Database operations wrapped in ACID transactions to eliminate partial or race-condition allocations.
- **NFR-05 (Observability):** Structured logging on all API endpoints and health check probes (`/health`).
