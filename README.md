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

## 5. Links & Resources
- **YouTrack Project Board:** [View Agile Board](https://diplomaygnz.youtrack.cloud/projects/DIP) 
- **GitHub Repository:** [diploma-topic-team-matching](https://github.com/nuran-command/diploma-topic-team-matching)

---

## 6. Repository Structure
```text
.
├── README.md                 <-- Main Project Overview & Architecture Guide
├── docs/                     <-- Technical & Academic Documentation
│   ├── literature_review.md  <-- Comparative Analysis & Literature Sources
│   └── diploma_draft.docx    <-- Full Thesis Text Draft
├── frontend/                 <-- Client-Side Web Application (React)
│   ├── src/
│   ├── package.json
│   └── Dockerfile
└── backend/                  <-- Server-Side API & Algorithms
    ├── app/
    │   ├── api/              <-- REST Endpoints (Auth, Topics, Teams)
    │   ├── core/             <-- Configuration & Security
    │   ├── models/           <-- Database Entities & ORM Models
    │   └── services/         <-- Matching Engine & Business Logic
    ├── requirements.txt
    └── Dockerfile
