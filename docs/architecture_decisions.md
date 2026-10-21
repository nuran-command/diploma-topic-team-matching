# Architectural Decision Records (ADR)

This document records the foundational architectural decisions made for the **Intelligent Web System for Selecting Diploma Project Topics and Forming Student Teams** at Astana IT University.

---

## ADR-001: Backend Framework Selection — FastAPI (Python)
- **Status:** Accepted
- **Context:** The system requires high-throughput asynchronous REST APIs, automated OpenAPI documentation generation, and native integration with scientific/machine learning computation libraries (NumPy, Scikit-learn) for topic recommendation and team clustering algorithms.
- **Decision:** Use **FastAPI** with Python 3.11+.
- **Rationale:**
  1. **Algorithmic Compatibility:** Python is the de facto standard for vector computations, cosine similarity, and multi-criteria optimization algorithms. Running both API endpoints and matching routines in the same runtime avoids cross-process or microservice serialization overhead.
  2. **Performance:** FastAPI's ASGI event loop (uvicorn) offers sub-millisecond route resolution.
  3. **Strict Validation:** Integrated Pydantic v2 schemas provide compile-time and runtime validation with automatic OpenAPI v3 documentation.
- **Consequences:** Developers must maintain clean layered architecture (routers, services, repositories) to isolate CPU-bound mathematical operations from I/O-bound web requests.

---

## ADR-002: Relational Database Selection — PostgreSQL 16
- **Status:** Accepted
- **Context:** Academic allocations, user credentials, team rosters, and application states require strict ACID transactions, foreign key referential integrity, and relational constraints (e.g., student uniqueness, team capacity caps, supervisor topic quotas).
- **Decision:** Use **PostgreSQL 16** with SQLAlchemy ORM and Alembic schema migrations.
- **Rationale:**
  1. **Referential Integrity:** Enforces database-level constraints preventing over-allocation or orphan assignments.
  2. **Relational Complexities:** Natural schema fit for many-to-many relationships (Students <-> Skills, Teams <-> Members, Topics <-> Prerequisites).
  3. **Future Extensibility:** Native support for `pgvector` extension if scaling to embedding-based semantic topic matching later.
- **Consequences:** Requires relational migrations via Alembic as models evolve.

---

## ADR-003: Client-Side Architecture — React with Vite & Tailwind CSS
- **Status:** Accepted
- **Context:** The platform serves three distinct user roles (Students, Thesis Supervisors, Department Administrators) with dynamic dashboards, real-time status transitions (invitation accepted/rejected), and interactive recommendation filters.
- **Decision:** Build a Single Page Application (SPA) using **React 18**, **Vite**, and **Tailwind CSS**.
- **Rationale:**
  1. **Developer Velocity:** Vite provides near-instant Hot Module Replacement (HMR) and optimized Rollup bundling.
  2. **Component Reusability:** Modular UI components (`TopicCard`, `SkillBadge`, `ApplicationModal`, `QuotaBar`) can be reused across Student and Supervisor views.
  3. **Design System Consistency:** Tailwind CSS guarantees atomic, tokenized styling with zero CSS runtime overhead.
- **Consequences:** Client state management must be cleanly separated from API clients (using Axios and custom hooks).

---

## ADR-004: Multi-Criteria Algorithmic Matching Strategy
- **Status:** Accepted
- **Context:** Topic selection must consider student technical competencies, supervisor prerequisites, student topic preferences, and team role balancing (Frontend, Backend, ML, Mobile).
- **Decision:** Employ a two-stage hybrid matching algorithm:
  1. **Stage 1 (Topic-to-Student Vector Cosine Similarity):** Vectorize student skill proficiencies against topic prerequisite requirement vectors.
  2. **Stage 2 (Complementary Role & Capacity Optimization):** Weighted scoring penalizing skill redundancy in forming teams and enforcing strict capacity caps (2–3 members per group).
- **Rationale:** Highly interpretable ("white-box" scoring) compared to black-box deep learning models, allowing students and supervisors to inspect why a match was recommended.
- **Consequences:** Matching scores must include itemized breakdowns for UI explainability.

---

## ADR-005: Containerization & Deployment Model — Docker Compose
- **Status:** Accepted
- **Context:** The project must be easily reproducible across developer machines, academic defense presentations, and automated CI/CD pipelines without environment drift.
- **Decision:** Standardize environment containerization with **Docker** and **Docker Compose** covering PostgreSQL, FastAPI Backend, and React/Nginx Frontend.
- **Rationale:** Single-command startup (`docker compose up --build`) guarantees unified runtime parameters across macOS, Linux, and Windows.
- **Consequences:** Production deployments will map seamlessly into Kubernetes or cloud VMs.
