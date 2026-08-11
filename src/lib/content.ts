export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  techStack: string[];
  isPrivate: boolean;
  githubUrl?: string;
  demoUrl?: string;
  description: string;
  highlights: string[];
  challenges?: string[];
  solutions?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  icon: string;
  items: string[];
}

export const projects: Project[] = [
  {
    id: "zekifeed",
    title: "ZekiFeed",
    subtitle: "Multi-tenant Social Content Ingestion Platform",
    period: "Aug. 2026 — Present",
    techStack: ["TypeScript", "NestJS", "Next.js", "PostgreSQL", "Prisma", "Docker"],
    isPrivate: true,
    description:
      "A monorepo platform with NestJS API and Next.js application for workspace-based social-content ingestion. Built for teams to manage, monitor, and analyze content from multiple social sources in a unified dashboard.",
    highlights: [
      "Authentication, workspace membership and invitation flows with role-based access control",
      "Tenant isolation and administrative audit capabilities for multi-tenant security",
      "Source catalog and trusted-account management with normalized RSS ingestion",
      "Durable ingestion orchestration with health checks and OpenAPI documentation",
    ],
    challenges: [
      "Designing multi-tenant architecture with strict data isolation",
      "Building reliable RSS ingestion that handles various feed formats",
      "Implementing durable orchestration for long-running ingestion tasks",
    ],
    solutions: [
      "Workspace-level RBAC with tenant-scoped queries in Prisma",
      "Normalized RSS parser supporting Reddit and Nitter sources",
      "Background job queue with retry logic and health monitoring",
    ],
  },
  {
    id: "vm-store",
    title: "VM Store",
    subtitle: "Virtual Machine Commerce and Provisioning Platform",
    period: "May 2026",
    techStack: ["TypeScript", "NestJS", "PostgreSQL", "Prisma", "Azure", "Docker"],
    isPrivate: true,
    description:
      "A layered NestJS API for virtual-machine commerce covering authentication, catalog, cart, checkout, wallet top-ups, support, and service lifecycle operations. Integrated with Azure for automated VM provisioning.",
    highlights: [
      "Authentication, catalog, checkout, wallet top-ups, and support workflows",
      "Azure VM provisioning with custom Ubuntu gallery images",
      "Service Bus-backed production job queues for async operations",
      "Swagger/OpenAPI docs, liveness/readiness probes, rate limiting",
    ],
    challenges: [
      "Integrating Azure VM provisioning with e-commerce workflows",
      "Building reliable webhook system with retry and deduplication",
      "Implementing encrypted provider settings for security",
    ],
    solutions: [
      "Layered architecture separating domain logic from infrastructure",
      "Webhook signature validation with idempotency keys",
      "Azure Key Vault integration for secrets management",
    ],
  },
  {
    id: "facebook-tool",
    title: "Facebook Group Workflow Tool",
    subtitle: "Local Dashboard and Desktop Connector",
    period: "Jul. 2026",
    techStack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "Electron", "Playwright"],
    isPrivate: false,
    githubUrl: "https://github.com/huynhkhandev-cloud/schedule_facebook",
    description:
      "A workflow dashboard for managing approved Facebook-group posting with explicit safety boundaries. Built with FastAPI backend, Next.js admin interface, and cross-platform Electron desktop connector.",
    highlights: [
      "FastAPI backend with PostgreSQL and layered application modules",
      "Next.js administration dashboard with real-time status",
      "Electron desktop connector with Python sidecar and WebSocket pairing",
      "Automated Windows installer and update-release via CI",
    ],
    challenges: [
      "Building safe automation that respects platform terms of service",
      "Creating reliable WebSocket pairing between desktop and web",
      "Cross-platform desktop application with auto-updates",
    ],
    solutions: [
      "Explicit safety boundaries: no credential storage, no bypass automation",
      "Secure WebSocket handshake with device pairing flow",
      "electron-builder with auto-update server integration",
    ],
  },
];

export const experience: Experience[] = [
  {
    id: "data-platform",
    role: "Data Engineer / Full-stack Engineer",
    company: "Enterprise Data Platform Project",
    period: "2024 — Present",
    highlights: [
      "Built end-to-end data platform and Business Intelligence on Azure using Medallion Architecture (Bronze, Silver, Gold)",
      "Developed data pipelines with Azure Data Factory, Azure Databricks, and PySpark for REST API, SQL Server, CDC, Excel, and Google Sheets integration",
      "Created NestJS/PostgreSQL backend and Next.js admin portal for pipeline configuration, orchestration monitoring, and Power BI reporting",
      "Implemented refresh orchestration with dependency management, parallel execution, advisory locks, retry, cancellation, and ETA estimation",
      "Applied transactional outbox pattern for safe data synchronization between PostgreSQL and Gold layer",
      "Built metadata-driven Dashboard Builder and PBIP/PBIR artifact generator supporting semantic models and Power BI visual mapping",
      "Documented lineage and transformation logic for 73 Power BI queries/tables serving Finance, Sales, Inventory, and AOP reports",
      "Implemented Microsoft Entra ID authentication, JWT/JWKS, report-level authorization, and secure credential management via Azure Key Vault",
      "Created comprehensive test coverage for API, orchestration, migration, CDC, snapshot, transformation, and Power BI artifacts",
    ],
    technologies: [
      "Azure Data Factory",
      "Azure Databricks",
      "PySpark",
      "NestJS",
      "PostgreSQL",
      "Next.js",
      "Power BI",
      "Microsoft Entra ID",
    ],
  },
];

export const skills: Skill[] = [
  {
    category: "Backend",
    icon: "Server",
    items: ["NestJS", "Python", "FastAPI", "Express", "TypeScript", "Node.js"],
  },
  {
    category: "Frontend",
    icon: "Monitor",
    items: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS"],
  },
  {
    category: "Database",
    icon: "Database",
    items: ["PostgreSQL", "Prisma", "SQLAlchemy", "MongoDB"],
  },
  {
    category: "Data & BI",
    icon: "BarChart3",
    items: ["Azure Data Factory", "Databricks", "Power BI", "dbt"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    items: ["Azure", "AWS", "Docker", "GitHub Actions", "CI/CD"],
  },
];

export const aboutText = `I'm a Backend Developer specializing in data engineering and business intelligence. With experience building systems that handle the full data lifecycle — from ingestion to visualization — I bridge the gap between raw data and actionable insights.

My approach combines solid software engineering practices with data-centric thinking. I care about system reliability, clean architecture, and building solutions that scale. Whether it's a NestJS API, a PySpark pipeline, or a Power BI report, I focus on making the pieces work together seamlessly.`;
