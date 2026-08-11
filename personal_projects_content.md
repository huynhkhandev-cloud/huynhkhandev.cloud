# Personal Projects — CV Content

Source reviewed: GitHub account [huynhkhandev-cloud](https://github.com/huynhkhandev-cloud), 2026-08-10. This file contains only claims supported by repository code, configuration, documentation, and commit history. Private repositories are marked **Private** and should not be linked in a public CV unless their visibility changes.

## Recommended CV selection

Use the following three projects in a one-page backend-developer CV. They show distinct strengths without repeating similar Next.js projects.

### ZekiFeed — Multi-tenant Social Content Ingestion Platform
**Aug. 2026 — Present** | TypeScript, NestJS, Next.js, PostgreSQL, Prisma, Docker, Turbo | **Private**

- Built a monorepo platform with a NestJS API and Next.js application for workspace-based social-content ingestion.
- Implemented authentication, workspace membership and invitation flows, role-based access control, tenant isolation, and administrative audit capabilities.
- Developed source catalog and trusted-account management with normalized RSS ingestion for Reddit and Nitter sources.
- Added durable ingestion orchestration, health checks, OpenAPI documentation, Prisma migrations, and Jest/Vitest test commands.

**Repository evidence:** `ZekiFeed` contains `apps/api` (NestJS, Prisma, PostgreSQL, Swagger, Jest) and `apps/app` (Next.js, Vitest). Recent commits cover durable ingestion orchestration, source catalog/trusted accounts, workspace RBAC, audit policy, membership lifecycle, and Reddit RSS ingestion.

### VM Store — Virtual Machine Commerce and Provisioning Platform
**May 2026** | TypeScript, NestJS, PostgreSQL, Prisma, Azure, Azure Service Bus, Docker | **Private**

- Designed a layered NestJS API for a virtual-machine store covering authentication, catalog, cart, checkout, wallet top-ups, support, and service lifecycle operations.
- Integrated Azure VM provisioning and Service Bus-backed production job queues; supported provisioning of custom Ubuntu gallery images.
- Implemented operational controls including Swagger/OpenAPI docs, liveness and readiness probes, rate limiting, webhook signature validation, encrypted provider settings, and retried/deduplicated outbound webhooks.
- Modeled the platform with PostgreSQL and Prisma; maintained automated unit and end-to-end test commands.

**Repository evidence:** `vm-store-api`, `vm-store-application`, and `vm-store-internal` form one system: API, customer application, and internal administration application. Present it as one project, not three.

### Facebook Group Workflow Tool — Local Dashboard and Desktop Connector
**Jul. 2026** | Python, FastAPI, PostgreSQL, SQLAlchemy, Playwright, Next.js, Electron, WebSockets | [GitHub](https://github.com/huynhkhandev-cloud/schedule_facebook)

- Built a workflow dashboard for managing approved Facebook-group posting, with explicit safety boundaries: no credential storage, group joining, CAPTCHA/checkpoint bypass, or detection evasion.
- Developed a FastAPI backend with PostgreSQL migrations, layered application/domain/infrastructure/presentation modules, and a Next.js administration dashboard.
- Packaged a cross-platform Electron desktop connector with a Python sidecar and WebSocket pairing; automated Windows installer and update-release artifacts through CI.
- Added automated testing and quality tooling with pytest, Playwright, Ruff, Pyright, frontend lint/typecheck/build, and end-to-end tests.

## Optional fourth project

Use only when the CV has room or when applying to data-tooling roles.

### Parquet Data Viewer
**Mar. 2026** | TypeScript, Next.js, Apache Arrow, Hyparquet, Parquet WASM, TanStack Table, XLSX | **Private**

- Built a browser-based data-viewing application using Apache Arrow, Hyparquet, Parquet WASM, and TanStack Table.
- Added spreadsheet export support through XLSX and interactive UI motion with Framer Motion.

**Repository evidence:** `views-parquets` dependency manifest. Do not add unverified claims about file size, performance metrics, or deployment architecture.

## Other verified repositories

Do not place these in the primary CV project section unless tailored to a specific job. They are supporting portfolio material:

- `mcp-web-tools` — public JavaScript repository.
- `bot.huynhkhandev.cloud` — public TypeScript/Docker repository with backend and frontend directories.
- `log-stream` — private Next.js app displaying real-time API log streams.
- `tvhome-backend` and `tvhome-client` — private NestJS and Next.js applications; backend manifest shows JWT auth, MongoDB/Mongoose, Swagger, throttling, Azure Service Bus, and S3 integration.
- `api.chat.huynhkhandev.cloud` — private Express/Socket.IO live-chat backend. Its README includes broad product claims that were not independently verified feature-by-feature, so do not use it as a primary CV project yet.
- `mibecam-app`, `huynhkhandev.cloud`, `internal.huynhkhandev.cloud`, and `nextgen` — primarily Next.js/TypeScript projects; insufficient project documentation for stronger CV bullets.

## LaTeX-ready replacement for `Selected Projects`

Replace the existing generic project block in the CV with this content. Keep only the first three entries on a one-page CV.

```latex
\section{Selected Projects}
\resumeSubheading
  {ZekiFeed --- Social Content Ingestion Platform}{Aug. 2026 -- Present}
  {TypeScript, NestJS, Next.js, PostgreSQL, Prisma}{Private Repository}
\begin{itemize}
  \resumeItem{Built a multi-tenant content-ingestion platform with workspace RBAC, tenant isolation, membership invitations, and administrative audit capabilities.}
  \resumeItem{Developed source catalog and trusted-account management with normalized Reddit and Nitter RSS ingestion, durable orchestration, health checks, OpenAPI docs, and automated tests.}
\end{itemize}

\resumeSubheading
  {VM Store --- Virtual Machine Commerce Platform}{May 2026}
  {TypeScript, NestJS, PostgreSQL, Prisma, Azure}{Private Repository}
\begin{itemize}
  \resumeItem{Designed backend services for authentication, catalog, checkout, wallet top-ups, support, VM lifecycle operations, and custom Ubuntu image provisioning.}
  \resumeItem{Integrated Azure provisioning and Service Bus jobs; implemented readiness probes, rate limits, signed webhooks, encrypted provider settings, and Prisma-backed persistence.}
\end{itemize}

\resumeSubheading
  {Facebook Group Workflow Tool}{Jul. 2026}
  {Python, FastAPI, PostgreSQL, Next.js, Electron, Playwright}{\href{https://github.com/huynhkhandev-cloud/schedule_facebook}{GitHub}}
\begin{itemize}
  \resumeItem{Built an approved-group posting workflow dashboard with FastAPI, PostgreSQL, and a Next.js admin interface, explicitly excluding credential storage and bypass automation.}
  \resumeItem{Packaged an Electron desktop connector with a Python sidecar and WebSocket pairing; added Windows release automation plus backend and frontend test tooling.}
\end{itemize}
```

## Use notes

- Link the public GitHub profile in the CV header: `\href{https://github.com/huynhkhandev-cloud}{github.com/huynhkhandev-cloud}`.
- Do not describe private repositories as publicly accessible. Offer a code walkthrough only if appropriate.
- Do not invent user counts, revenue, latency, uptime, team size, or production scale. Add metrics only after they can be substantiated.
- The `Experience` section was intentionally not changed; add verified employment history separately.
