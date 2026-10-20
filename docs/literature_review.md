# Literature Review & Comparative Analysis

> **Academic Context:** Astana IT University | School of Software Engineering  
> **Degree Program:** 3-Year Accelerated Bachelor Degree  
> **Project:** Development of an Intelligent Web System for Selecting Diploma Project Topic and Forming Students Teams  
> **Authors:** Nurdan Zhanabayev (SE-2402), Yerasyl Gaziz (SE-2411)  
> **Supervisor:** Nurtas K. Nadirov  

---

## 1. Theoretical Framework & Background

The problem of forming balanced student project teams and assigning academic capstone topics lies at the intersection of **multi-objective optimization**, **educational data mining**, and **recommender systems**. Within an accelerated three-year undergraduate curriculum (such as that at Astana IT University), students face a critical milestone in their final 3rd year: completing an industry-grade or research-driven diploma thesis within two academic terms.

Historically, academic institutions have relied on two primary allocation models:
1. **Unconstrained Self-Selection:** Students self-assemble teams based on social proximity, personal friendships, or dormitory co-location. While comfortable for students, extensive literature demonstrates that this produces severe skill imbalances (e.g., groups composed solely of frontend enthusiasts or data analysts with no backend capability) and isolates lower-social-capital students.
2. **Top-Down Administrative Assignment:** Department coordinators manually map topics and students using spreadsheets. This imposes immense administrative bottlenecks on faculty, produces opaque assignments, and often disregards student career trajectories and intrinsic motivation.

Algorithmic team and topic matching aims to introduce a **transparent, hybrid paradigm**: honoring individual agency and opt-in preferences while mathematically optimizing for balanced technical roles, prerequisite coverage, and supervisor capacity limits.

---

## 2. Literature Review Matrix (APA 7th Edition)

The following matrix synthesizes the core academic literature foundational to the proposed system architecture.

| Author(s) & Year | Title & Source | Methodology & Cohort | Key Findings | Architectural Relevance to Our Project |
| :--- | :--- | :--- | :--- | :--- |
| **Hastings et al. (2023)** | *Composing team compositions: An examination of instructors’ current algorithmic team formation practices.* Proc. ACM Hum.-Comput. Interact. (CSCW2). | Survey of 77 university instructors, 21 in-depth qualitative interviews. | Instructors actively reject "black-box" optimization; they demand configurable constraints, visible weighting parameters, and administrative override capabilities. | Directs the design of supervisor dashboards allowing faculty to define skill prerequisites, set hard quotas, and review candidates before final confirmation. |
| **Forshaw et al. (2026)** | *Fairness in Student Group Formation: Perspectives, Priorities, Compromises, Mechanisms, and Tooling.* ITiCSE-WGR - Working Group Reports on Innovation and Technology. | Systematic literature review of 262 papers, audit of 18 group-formation tools, and stakeholder interviews. | Highlights equity trade-offs: maximizing total group competence often marginalizes solo students or isolates single minorities. Recommends multi-criteria heuristics that guarantee baseline role distribution. | Establishes our multi-criteria objective function to balance role coverage (Frontend + Backend + Database/ML) without leaving unassigned outliers. |
| **Agarwal et al. (2022)** | *Team formation in engineering classrooms using multi-criteria optimization with genetic algorithms.* IEEE Frontiers in Education Conference (FIE). | Vector Evaluated Genetic Algorithm (VEGA) evaluated across ~1,300 engineering students over 4 semesters. | Automated skill balancing produced statistically significant improvements in capstone project quality and reduced interpersonal friction compared to self-selection. | Demonstrates the mathematical viability of multi-objective optimization for engineering student teams. Informs our weighted skill vector representation. |
| **Singh et al. (2025)** | *Leveraging Multicriteria Integer Programming Optimization for Effective Team Formation.* IEEE Transactions on Learning Technologies. | Mixed-integer linear programming (MILP) with role and schedule constraints. | Mathematical programming effectively avoids competency duplication and ensures complementary skill assignment in small cohorts (3–5 students). | Provides algorithmic inspiration for our complementary role-matching constraints (e.g., matching a Frontend specialist with a Backend specialist). |
| **Wu et al. (2026)** | *Reducing Intragroup Pressure in Heterogeneous Grouping for Collaborative Learning.* Proc. 3rd Int. Conf. on Educational Digitalization and Computer Science. | NSGA-II multi-objective genetic algorithm analysis with 81 engineering students. | Pure skill heterogeneity without shared thematic interest causes psychological friction and communication breakdown. | Proves that topic interest vectors must be weighted alongside raw technical competencies in the recommendation score. |
| **Vinella et al. (2022)** | *Crowdsourcing Team Formation With Worker-Centered Modeling.* Frontiers in Artificial Intelligence. | Agent-based simulation comparing top-down vs. worker-centered matching dynamics. | Systems that grant participants choice and transparent matching explanations achieve higher satisfaction and task commitment than forced automated assignment. | Directs our opt-in invitation pipeline (FR-06): the engine recommends complementary peers, but students mutually confirm team formation. |
| **Gómez-Zará et al. (2019)** | *Discovering collaborators online: Assembling interdisciplinary teams online at an Argentinian University.* Cuadernos.Info. | Field deployment of the "My Dream Team" platform (43 participants, 8 teams). | Transparent search filters displaying peer skills help students overcome social silos and assemble interdisciplinary teams across departments. | Validates our student directory and peer discovery filter UI (searchable by primary role, framework proficiency, and topic domain). |
| **Kohli et al. (2023)** | *Inclusive study group formation at scale.* Proc. 54th ACM Technical Symposium on Computer Science Education (SIGCSE). | Large-scale opt-in algorithm deployed across massive enrollment courses. | Automated grouping is most beneficial for students without established social networks, provided the system provides safe opt-in and withdrawal workflows. | Informs our "Solo Student Matchmaker" module to assist unassigned individuals in finding complementary teams. |
| **Jadhav et al. (2026)** | *ResearchConnect: An AI-Powered Platform for Interdisciplinary Research Team Formation and Ideation Development.* Advanced Intelligent Systems. | Semantic vector clustering and cosine similarity applied to 250+ research project profiles. | High-dimensional vector space embeddings combined with cosine similarity accurately match student competencies with research topic proposals. | Forms the algorithmic baseline for our topic recommendation engine, matching student profile vectors against thesis prerequisite vectors. |

---

## 3. Research Gap Analysis

Existing solutions in the academic domain generally address **isolated segments** of the problem:
- **Classroom Grouping Tools (e.g., CATME Team-Maker):** Designed exclusively for in-class peer evaluations and short-term laboratory assignments. They lack topic proposal catalogs, faculty supervisor quota tracking, and multi-term capstone milestone tracking.
- **Learning Management Systems (e.g., Moodle Group Choice):** Provide basic static sign-up sheets or random grouping. They offer zero skill balancing, no profile vectorization, and no intelligent recommendation.
- **Hackathon Platforms (e.g., Devpost):** Cater to open-ended public hackathons with ad-hoc team formation, omitting formal academic supervisor quotas, prerequisite validation, and university administration workflows.

**Our Contribution:** The proposed platform unifies **thesis topic discovery**, **multi-criteria skill-balanced team formation**, and **departmental supervisor quota governance** into a cohesive, production-grade web application tailored to university diploma defense workflows.

---

## 4. Existing System Comparative Matrix

| Feature / Capability | CATME Team-Maker | Moodle Group Choice | Devpost | Proposed Diploma System |
| :--- | :---: | :---: | :---: | :---: |
| **Diploma Topic Proposal Catalog** | ❌ No | ⚠️ Static list only | ❌ No | ✅ Full Lifecycle Management |
| **Supervisor Capacity & Quota Balancing** | ❌ No | ⚠️ Simple cap | ❌ No | ✅ Dynamic Quota Enforcement |
| **Granular Skill & Role Profiling** | ⚠️ Survey-based | ❌ No | ⚠️ Basic bio tags | ✅ Verified Skill/Role Matrix |
| **Vector / Multi-Criteria Topic Recommendation** | ❌ No | ❌ No | ❌ No | ✅ Cosine Similarity + Filters |
| **Complementary Team Formation Engine** | ✅ Yes (Heuristic) | ❌ No | ❌ No | ✅ Role-Balanced Optimizer |
| **Student Invitation & Opt-In Workflow** | ❌ Forced by instructor | ⚠️ Student self-select | ⚠️ Chat-based | ✅ Mutual Opt-In Invitations |
| **Supervisor Application Review Pipeline** | ❌ No | ❌ No | ❌ No | ✅ Dedicated Review Portal |
| **Explainable Matching Criteria** | ❌ Black-box | ❌ None | ❌ None | ✅ Explicit Score Breakdown |
| **Department Administrative Oversight** | ❌ No | ⚠️ Basic reporting | ❌ No | ✅ Cohort-Wide Governance Dashboard |

---

## 5. Technology Selection Rationale

### 5.1 Backend Framework Comparison
| Criterion | FastAPI (Python) *(Selected)* | Node.js (Express.js) | Java (Spring Boot) | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Algorithmic Integration** | Native access to NumPy, Scikit-learn, and SciPy for vector similarity and optimization. | Requires spawning child processes or external Python microservices for scientific computing. | Complex interop with modern Python ML/data libraries; heavy JVM footprint. | Python is the standard for matching algorithms. FastAPI delivers high asynchronous throughput on ASGI. |
| **Type Safety & Validation** | Automated Pydantic data validation and auto-generated OpenAPI (Swagger) documentation. | Manual Joi/Zod setup required. Type safety only via TypeScript compilation. | Strong static typing via Java classes; verbose boilerplate. | Pydantic v2 ensures strict contract compliance for academic data payloads. |
| **Execution Performance** | Asynchronous coroutines (`async`/`await`) matching Node.js event-loop speed for I/O operations. | High I/O performance via event loop; CPU-bound matching blocks the loop. | High throughput under enterprise loads; slower startup and high RAM consumption. | FastAPI handles database I/O asynchronously while offloading matching logic efficiently. |

### 5.2 Frontend Framework Comparison
| Criterion | React.js (Vite + TypeScript) *(Selected)* | Vue.js 3 | Angular | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Ecosystem & UI Libraries** | Vast ecosystem of accessible, customizable components (Tailwind CSS, Lucide icons, Headless UI). | Smaller ecosystem of enterprise design libraries. | Comprehensive framework but steep learning curve and rigid architecture. | Allows rapid construction of role-based dashboards with granular responsive design. |
| **State Management & Team Skills** | Direct team member familiarity (SE-2411 curriculum alignment); flexible component composability. | Intuitive reactivity, but less prevalent in departmental industry projects. | Excessive boilerplate for a 2-person development timeline. | Maximizes delivery speed and code maintainability for Pre-Defense deadlines. |

### 5.3 Database Selection Rationale
- **Selected: PostgreSQL (Relational Database)**
  - Enforces relational integrity across foreign keys: `users`, `skills`, `topics`, `teams`, `team_members`, and `applications`.
  - ACID transactions guarantee that supervisor quotas and team size limits are never violated during concurrent student registrations.
  - Native JSONB support enables flexible storage of student self-assessment metadata while keeping core relational links structured.
  - Future support for `pgvector` enables seamless migration of in-memory vector cosine similarity into database-native index searches.

---

## 6. References (APA 7th Edition)

1. Agarwal, J., Piatt, E., & Imbrie, P. K. (2022). Team formation in engineering classrooms using multi-criteria optimization with genetic algorithms. *2022 IEEE Frontiers in Education Conference (FIE)*, 1–6. https://doi.org/10.1109/FIE56618.2022.9962741
2. Forshaw, M., Alexandru, A., Bentley, C., González-Zelaya, V., et al. (2026). Fairness in Student Group Formation: Perspectives, Priorities, Compromises, Mechanisms, and Tooling. *ITiCSE-WGR - Working Group Reports on Innovation and Technology in Computer Science Education*, 217–276. https://doi.org/10.1145/3760545.3783973
3. Gómez-Zará, D., Andreoli, S., Dechurch, L. A., & Contractor, N. S. (2019). Discovering collaborators online: Assembling interdisciplinary teams online at an Argentinian University. *Cuadernos.Info*, (44), 21–41. https://doi.org/10.7764/cdi.44.1575
4. Hastings, E. M., Ojha, V., Austriaco, B. V., Karahalios, K., & Bailey, B. P. (2023). Composing team compositions: An examination of instructors’ current algorithmic team formation practices. *Proceedings of the ACM on Human-Computer Interaction*, 7(CSCW2), Article 305. https://doi.org/10.1145/3610096
5. Jadhav, A. V., Masrouri, M., & Qin, Z. (2026). ResearchConnect: An AI-Powered Platform for Interdisciplinary Research Team Formation and Ideation Development. *Advanced Intelligent Systems*, 8(5). https://doi.org/10.1002/aisy.202501399
6. Kohli, S., Ramachandran, N., Tudor, A., Tumushabe, G., Hsu, O., & Ranade, G. (2023). Inclusive study group formation at scale. *Proceedings of the 54th ACM Technical Symposium on Computer Science Education*, 1, 11–17. https://doi.org/10.1145/3545945.3569885
7. Singh, P., Huynh, P. K., Nguyen, D., Le, T. Q., & Moreno, W. (2025). Leveraging Multicriteria Integer Programming Optimization for Effective Team Formation. *IEEE Transactions on Learning Technologies*, 18, 72–84. https://doi.org/10.1109/TLT.2024.3401734
8. Vinella, F. L., Hu, J., Lykourentzou, I., & Masthoff, J. (2022). Crowdsourcing Team Formation With Worker-Centered Modeling. *Frontiers in Artificial Intelligence*, 5, Article 818562. https://doi.org/10.3389/frai.2022.818562
9. Wu, Y., Mo, W., & Liang, L. (2026). Reducing Intragroup Pressure in Heterogeneous Grouping for Collaborative Learning. *Proceedings of the 3rd International Conference on Educational Digitalization and Computer Science*, 1326–1331. https://doi.org/10.1145/3828183.3828386
