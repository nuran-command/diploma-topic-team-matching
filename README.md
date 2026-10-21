# Development of an Intelligent Web System for Selecting Diploma Project Topic and Forming Students Teams

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2016-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Container-Docker%20Compose-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

---

## 1. Project Overview & Problem Statement
- **Project Title:** Development of an Intelligent Web System for Selecting Diploma Project Topic and Forming Students Teams
- **Brief Description:** A centralized, intelligent web platform designed to automate and optimize the allocation of academic thesis topics and the assembly of balanced student project teams using multi-criteria matching and ranking algorithms at Astana IT University (AITU).
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
- **Current Development Status:** Phase 1 – Problem Analysis, Literature Review, Comparative System Study, Requirements Engineering, Initial Technical Architecture Setup, and Runnable Base (Pre-Defense 1).

---

## 4. Proposed Technology Stack
- **Frontend:** React.js, TypeScript / JavaScript, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Python (FastAPI), Pydantic v2, SQLAlchemy, Uvicorn
- **Database:** PostgreSQL 16 (Relational schema for student profiles, technical skills, topics, and team memberships)
- **Intelligent Engine:** Vector cosine similarity & weighted multi-criteria ranking algorithm (Scikit-learn, NumPy)
- **DevOps & Tooling:** Docker, Docker Compose, Git (GitHub), YouTrack (Agile Task Board), Postman, Pytest

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

*Full specification available in [docs/requirements.md](docs/requirements.md).*

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

Visual diagrams:
- [Editable Architecture Diagram (.mmd)](docs/diagrams/system_architecture.mmd)
- [Readable Vector Architecture (.svg)](docs/diagrams/system_architecture.svg)
- [Database ER Diagram (.mmd)](docs/diagrams/database_er_diagram.mmd)
- [Readable Database ER Diagram (.svg)](docs/diagrams/database_er_diagram.svg)

---

## 7. Setup, Execution, and Testing Instructions

### 7.1 Prerequisites
- **Python:** 3.10+ (tested on Python 3.11 / 3.12)
- **Node.js:** 18.x or higher & `npm`
- **Docker & Docker Compose:** *(optional, for one-command containerized run)*

---

### 7.2 Quick Start with Docker (Recommended)
Run the entire stack (PostgreSQL database, FastAPI backend, and React frontend) with a single command:

```bash
# 1. Clone the repository
git clone https://github.com/nuran-command/diploma-topic-team-matching.git
cd diploma-topic-team-matching

# 2. Copy environment configuration
cp .env.example .env

# 3. Build and launch all services
docker compose up --build
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8000](http://localhost:8000)
- **Interactive API Documentation (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
- **PostgreSQL Database:** `localhost:5432` (db: `diploma_matching_db`)

To stop all services:
```bash
docker compose down
```

---

### 7.3 Manual Local Setup

#### Backend Setup & Execution
```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server in development mode
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API will be accessible at: `http://localhost:8000`
- Swagger UI Documentation: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

#### Frontend Setup & Execution
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Start Vite development server
npm run dev
```
- Client application will be running at: `http://localhost:5173`

---

### 7.4 Running Automated Tests

#### Backend Automated Tests
Automated tests are written using `pytest` and FastAPI's `TestClient` (HTTPX):

```bash
cd backend
# Make sure virtualenv is activated and dependencies are installed
pytest -v
```

Expected output:
```text
tests/test_main.py::test_root_endpoint PASSED                            [ 50%]
tests/test_main.py::test_health_check_endpoint PASSED                    [100%]
============================== 2 passed in 0.12s ==============================
```

#### Frontend Build & Type Validation
```bash
cd frontend
npm run build
```

---

## 8. Repository Structure (Step 4: Organize the Repository)

The repository is strictly organized into five functional pillars:

```text
.
├── docker-compose.yml              <-- [Configuration] Full-stack multi-container orchestration
├── .env.example                    <-- [Configuration] Environment variables template
├── LICENSE                         <-- Open source license
├── README.md                       <-- Main entrypoint, setup & testing documentation
│
├── backend/                        <-- [Source Code & Tests] Server-side application
│   ├── app/                        <-- Application code organized by component
│   │   ├── api/                    <-- REST API routes (Auth, Topics, Teams, Matching)
│   │   ├── core/                   <-- Configuration, app settings, and security
│   │   │   ├── config.py
│   │   │   └── __init__.py
│   │   ├── models/                 <-- SQLAlchemy database models & schemas
│   │   │   ├── base.py
│   │   │   └── __init__.py
│   │   ├── schemas/                <-- Pydantic data validation schemas & DTOs
│   │   ├── services/               <-- Matching algorithms & business logic
│   │   ├── __init__.py
│   │   └── main.py                 <-- FastAPI application entrypoint
│   ├── tests/                      <-- [Tests] Automated test suite
│   │   ├── __init__.py
│   │   └── test_main.py            <-- API endpoint and health check tests
│   ├── .dockerignore               <-- [Configuration]
│   ├── Dockerfile                  <-- [Configuration] Backend container specification
│   └── requirements.txt            <-- [Configuration] Python dependency definitions
│
├── frontend/                       <-- [Source Code] Client-side web application
│   ├── src/                        <-- Frontend source code organized by component
│   │   ├── components/             <-- Reusable UI components
│   │   ├── services/               <-- API client abstraction
│   │   ├── App.jsx                 <-- Root React application view
│   │   └── main.jsx                <-- React DOM entrypoint
│   ├── index.html                  <-- HTML template
│   ├── vite.config.js              <-- Vite build configuration
│   ├── .dockerignore               <-- [Configuration]
│   ├── Dockerfile                  <-- [Configuration] Multi-stage Nginx build specification
│   └── package.json                <-- [Configuration] Node dependencies and scripts
│
└── docs/                           <-- [Documentation & Diagrams] Academic & technical deliverables
    ├── Diploma_Project_Proposal_and_Report_with_Survey.docx <-- Formal Proposal & Survey Report
    ├── diploma-report1.docx        <-- Milestone report
    ├── literature_review.md        <-- 9-Paper Literature Matrix & Comparative Analysis
    ├── requirements.md             <-- Functional (FR) & Non-Functional (NFR) Requirements
    ├── architecture_decisions.md   <-- Architecture Decision Records (ADRs)
    └── diagrams/                   <-- [Diagrams] Architecture & database diagrams
        ├── system_architecture.mmd <-- Editable Mermaid source
        ├── system_architecture.svg <-- Readable vector export
        ├── database_er_diagram.mmd <-- Editable Mermaid ER source
        └── database_er_diagram.svg <-- Readable vector export
```

### Mapping to Required Repository Pillars:
1. **Source Code:** Application code organized by component in `backend/app/` (FastAPI core, models, api, services) and `frontend/src/` (React views, components, services).
2. **Documentation:** Academic and system documentation in `docs/` (`Diploma_Project_Proposal_and_Report_with_Survey.docx`, `literature_review.md`, `requirements.md`, `architecture_decisions.md`).
3. **Diagrams:** System and database diagrams in `docs/diagrams/` with both editable source files (`.mmd`) and readable vector exports (`.svg`).
4. **Tests:** Automated tests in `backend/tests/` (`test_main.py` using `pytest` and `httpx/TestClient`) with automated pass assertions.
5. **Configuration:** Dependency specifications (`requirements.txt`, `package.json`), environment templates (`.env.example`), and container manifests (`docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`).

---

## 9. Links & Project Deliverables
- **YouTrack Project Board:** [View Agile Board (AITU DIP)](https://diplomaygnz.youtrack.cloud/projects/DIP)
- **GitHub Repository:** [nuran-command/diploma-topic-team-matching](https://github.com/nuran-command/diploma-topic-team-matching)
- **Project Release Tag:** [prob-period-1 Release](https://github.com/nuran-command/diploma-topic-team-matching/releases/tag/prob-period-1)
- **Project Proposal & Survey Report:** [docs/Diploma_Project_Proposal_and_Report_with_Survey.docx](docs/Diploma_Project_Proposal_and_Report_with_Survey.docx)
- **Literature Review & Comparisons:** [docs/literature_review.md](docs/literature_review.md)
- **Requirements Specification:** [docs/requirements.md](docs/requirements.md)
- **Architectural Decision Records (ADR):** [docs/architecture_decisions.md](docs/architecture_decisions.md)
- **Architecture Diagram (Editable):** [docs/diagrams/system_architecture.mmd](docs/diagrams/system_architecture.mmd)
- **Architecture Diagram (Export):** [docs/diagrams/system_architecture.svg](docs/diagrams/system_architecture.svg)
- **Database ER Diagram (Editable):** [docs/diagrams/database_er_diagram.mmd](docs/diagrams/database_er_diagram.mmd)
- **Database ER Diagram (Export):** [docs/diagrams/database_er_diagram.svg](docs/diagrams/database_er_diagram.svg)
