# Development of an Intelligent Web System for Selecting Diploma Project Topic and Forming Students Teams

## 1. Project Overview & Problem Statement
- **Project Title:** Development of an Intelligent Web System for Selecting Diploma Project Topic and Forming Students Teams
- **Brief Description:** A centralized, intelligent web platform designed to automate and optimize the allocation of academic thesis topics and the assembly of balanced student project teams using multi-criteria matching and ranking algorithms.
- **Problem Statement:** The current diploma topic assignment and team selection processes in higher education rely predominantly on disconnected manual workflows (spreadsheets, paper applications, informal group chats). This leads to:
  1. Competency mismatches between students, selected project topics, and teammates.
  2. Severe administrative overhead for thesis supervisors and department deans manually reviewing submissions.
  3. Skill imbalance within student teams (e.g., teams lacking a backend developer or ML specialist).
  4. Workload distribution bottlenecks where popular supervisors are overloaded while topics overlap or duplicate.
- **Target Users:**
  - **Students:** Browse catalogued topics, complete verified skill/role profiles, discover matching thesis topics, and find complementary teammates.
  - **Thesis Supervisors (Faculty):** Propose project topics with explicit technical prerequisites, review candidate teams, and approve final rosters.
  - **Dean's Office & Department Administration:** Oversee quotas, manage university-wide topic distributions, and monitor supervisor workloads.
- **Aim:** To design, implement, and evaluate an intelligent web platform that automates topic discovery and balanced, role-based student team formation using profile-matching algorithms.

---

## 2. Team Members & Supervisor
- **Team Members:**
  - **Nurdan Zhanabayev** (Group: SE-2402) – *Backend Developer & System Architect*: System Architecture, Relational Database Modeling, API Development, Matching & Clustering Module Implementation, Containerization.
  - **Yerasyl Gaziz** (Group: SE-2411) – *Frontend Developer & UI/UX*: UI/UX Prototyping, Client-Side Implementation (React), API Client Integration, Responsive Layouts, Client Validation & Usability Testing.
- **Supervisor:** Nurtas K. Nadirov

---

## 3. Scope & Development Status
- **Project Scope:**
  - **In-Scope:**
    - Role-Based Access Control (RBAC) for Students, Supervisors, and Department Administrators.
    - Diploma topic catalog management with capacity constraints and prerequisite filters.
    - Multi-criteria matching engine to recommend topics based on student competencies and interests.
    - Automated and assisted student team formation based on complementary technical skill sets (e.g., Frontend, Backend, ML/Data, Mobile).
    - Application submission and approval pipeline between student groups and supervisors.
    - Task tracking, automated API test suites, and academic documentation.
  - **Out-of-Scope:**
    - Native mobile applications (system is desktop and mobile web responsive).
    - Code execution or plagiarism detection environments for thesis files.
- **Current Development Status:** Phase 1 – Problem Analysis, Literature Review, Comparative System Study, Requirements Engineering, and Initial Technical Architecture Setup (Pre-Defense 1).

---

## 4. Proposed Technology Stack
- **Frontend:** React.js, TypeScript, Tailwind CSS, Axios, React Router
- **Backend:** Python (FastAPI) or Node.js / Express.js, Pydantic, SQLAlchemy / Prisma
- **Database:** PostgreSQL (Relational schema for student profiles, technical skills, topics, and team memberships)
- **Intelligent Engine:** Vector cosine similarity & weighted multi-criteria ranking algorithm (Scikit-learn, NumPy)
- **DevOps & Tooling:** Docker, Docker Compose, Git (GitHub), YouTrack (Agile Task Board), Postman

---

## 5. Requirements Specification

### 5.1 Functional Requirements (FR)
- **FR-01 (Authentication & RBAC):** The system shall authenticate users via university credentials and enforce Role-Based Access Control for Students, Thesis Supervisors, and Department Administrators.
- **FR-02 (Student Profile & Skill Inventory):** Students shall create and maintain profiles declaring their technical competencies, proficiency ratings, preferred development roles (Frontend, Backend, Fullstack, ML/Data, Mobile), and research track interests.
- **FR-03 (Topic Creation & Catalog Management):** Supervisors shall propose diploma project topics with structured parameters: title, problem scope, expected deliverables, maximum student team capacity (typically 2–3 students), and mandatory prerequisite skill tags.
- **FR-04 (Intelligent Topic Recommendation):** The system shall compute and rank recommended topics for each student using multi-criteria vector similarity matching against declared competencies and project interests.
- **FR-05 (Complementary Teammate Matching):** Unassigned students shall receive teammate recommendations designed to maximize complementary role coverage and minimize skill redundancy.
- **FR-06 (Team Assembly & Opt-In Workflow):** Students shall be able to create teams, dispatch mutual invitations, track invitation statuses, and join approved rosters.
- **FR-07 (Topic Application & Approval Pipeline):** Assembled teams shall submit formal project applications for selected topics; supervisors can review candidate resumes, approve rosters, or reject with feedback.
- **FR-08 (Department Oversight & Quota Enforcement):** Department administrators shall monitor cohort-wide allocation statistics, set advisor capacity limits, and resolve stranded student allocations.

### 5.2 Non-Functional Requirements (NFR)
- **NFR-01 (Security & Authorization):** All protected API endpoints shall enforce JWT Bearer validation and RBAC authorization with standard HTTP 401/403 responses.
- **NFR-02 (Performance & Latency):** Algorithmic matching computations across cohorts of up to 500 candidate profiles shall execute in $\le 3.0$ seconds.
- **NFR-03 (Responsive User Experience):** Frontend interfaces shall render responsively across mobile, tablet, and desktop viewports (375px to 1440px) without layout breakage.
- **NFR-04 (Algorithmic Explainability):** All recommendation scores shall provide transparent, human-readable match rationale indicating which criteria and skill tags contributed to the recommendation.

---

## 6. System Architecture

```text
+-------------------------------------------------------------+
|                        Client Layer                         |
|  [Student Dashboard]   [Supervisor Portal]   [Admin Console] |
|              (React.js + Tailwind CSS + Axios)              |
+------------------------------+------------------------------+
                               | HTTPS / REST API (OpenAPI v3)
+------------------------------v------------------------------+
|                      Application Layer                      |
|                      (FastAPI Backend)                      |
|  +--------------------+  +-------------------------------+  |
|  | Auth & RBAC Module |  | Topic Catalog Service         |  |
|  +--------------------+  +-------------------------------+  |
|  +--------------------+  +-------------------------------+  |
|  | Profile Service    |  | Team Workflow Service         |  |
|  +--------------------+  +-------------------------------+  |
|  +-------------------------------------------------------+  |
|  |           Intelligent Multi-Criteria Engine           |  |
|  |   - Weighted Role Balancing  - Cosine Skill Vector    |  |
|  +-------------------------------------------------------+  |
+------------------------------+------------------------------+
                               | Async ORM (SQLAlchemy / asyncpg)
+------------------------------v------------------------------+
|                         Data Layer                          |
|             (PostgreSQL Relational Database)                |
|  [Users & Roles]  [Skills Matrix]  [Topics]  [Applications] |
+-------------------------------------------------------------+
```

---

## 7. Links & Project Deliverables
- **YouTrack Project Board:** [View Agile Board (AITU DIP)](https://diplomaygnz.youtrack.cloud/projects/DIP)
- **GitHub Repository:** [nuran-command/diploma-topic-team-matching](https://github.com/nuran-command/diploma-topic-team-matching)
- **Formal Project Proposal & Report (DOCX):** [docs/Diploma_Project_Proposal_and_Report_with_Survey.docx](docs/Diploma_Project_Proposal_and_Report_with_Survey.docx)
- **Literature Review & Comparison Matrix (Markdown):** [docs/literature_review.md](docs/literature_review.md)

---

## 8. Repository Structure
```text
.
├── README.md                 <-- Main Project Overview & Architecture Guide
├── docker-compose.yml        <-- Full-stack orchestration (Frontend, Backend, DB)
├── docs/                     <-- Technical & Academic Deliverables
│   ├── Diploma_Project_Proposal_and_Report_with_Survey.docx
│   ├── diploma-report1.docx
│   └── literature_review.md  <-- 9-Paper Literature Matrix & Comparative Analysis
├── frontend/                 <-- Client-Side Web Application (React + Vite)
│   ├── src/
│   │   ├── components/       <-- UI components (TopicCard, TeamCard, SkillBadge)
│   │   ├── services/         <-- API client abstraction
│   │   ├── App.tsx           <-- Interactive preview dashboard
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
└── backend/                  <-- Server-Side API & Intelligent Algorithms
    ├── app/
    │   ├── api/              <-- REST Endpoints (Auth, Topics, Teams, Matching)
    │   ├── core/             <-- Configuration, Settings, & Security
    │   ├── models/           <-- SQLAlchemy Relational Models
    │   ├── schemas/          <-- Pydantic Data Contracts & Payloads
    │   ├── services/         <-- Multi-Criteria Matching Algorithm & Business Logic
    │   └── main.py           <-- FastAPI Application Entrypoint
    ├── tests/                <-- Automated API & Algorithmic Unit Tests
    ├── requirements.txt
    └── Dockerfile
```
