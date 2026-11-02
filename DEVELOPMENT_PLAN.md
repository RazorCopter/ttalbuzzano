# TABLE TENNIS - BEYOND THE SPEED: PIANO DI SVILUPPO

Il documento integrale, operativo e dettagliato step-by-step per lo sviluppo del progetto è disponibile in:

👉 [**`plans/DEVELOPMENT_PLAN.md`**](plans/DEVELOPMENT_PLAN.md)

---

## Indice delle Fasi di Sviluppo

1. [**FASE 1** - Setup iniziale del repository e configurazione ambiente](plans/DEVELOPMENT_PLAN.md#fase-1---setup-iniziale-del-progetto)
2. [**FASE 2** - Configurazione Docker: Dockerfile multi-stage (`dependencies`, `builder`, `runner`)](plans/DEVELOPMENT_PLAN.md#fase-2---configurazione-docker-dockerfile-multi-stage)
3. [**FASE 3** - Configurazione Docker Compose (`compose.yaml`, porta 3000, limiti risorse, healthcheck)](plans/DEVELOPMENT_PLAN.md#fase-3---configurazione-docker-compose)
4. [**FASE 4** - Configurazione Next.js (`output: 'standalone'`, security headers, `tsconfig.json`)](plans/DEVELOPMENT_PLAN.md#fase-4---configurazione-nextjs)
5. [**FASE 5** - Struttura applicazione, App Router, layout base e font locali WOFF2](plans/DEVELOPMENT_PLAN.md#fase-5---struttura-applicazione-e-routing)
6. [**FASE 6** - Endpoint Healthcheck HTTP (`GET /api/health` e `HEAD /api/health`)](plans/DEVELOPMENT_PLAN.md#fase-6---implementazione-endpoint-apihealth)
7. [**FASE 7** - Configurazione Tailwind CSS v4, design tokens e stili globali](plans/DEVELOPMENT_PLAN.md#fase-7---configurazione-tailwind-css)
8. [**FASE 8** - Setup GSAP 3, ScrollTrigger e Lenis smooth scroll sincronizzato](plans/DEVELOPMENT_PLAN.md#fase-8---setup-gsap-e-librerie-di-animazione)
9. [**FASE 9** - Organizzazione asset locali e sequenza rally a 120 frame](plans/DEVELOPMENT_PLAN.md#fase-9---organizzazione-asset)
10. [**FASE 10** - Implementazione componenti UI base, layout e primitive di animazione](plans/DEVELOPMENT_PLAN.md#fase-10---implementazione-componenti-ui-base)
11. [**FASE 11** - Implementazione sezioni animate narrative (9 sezioni scroll-driven)](plans/DEVELOPMENT_PLAN.md#fase-11---implementazione-sezioni-animate)
12. [**FASE 12** - Integrazione Three.js per scene ed effetti 3D (ball rotation & particle field)](plans/DEVELOPMENT_PLAN.md#fase-12---integrazione-threejs-per-effetti-3d)
13. [**FASE 13** - Testing locale (lint, typecheck, build standalone e audit Lighthouse)](plans/DEVELOPMENT_PLAN.md#fase-13---testing-locale)
14. [**FASE 14** - Build Docker multi-stage e collaudo container standalone non-root](plans/DEVELOPMENT_PLAN.md#fase-14---build-e-test-docker)
15. [**FASE 15** - Deployment con Docker Compose (modalità standard e offline air-gapped)](plans/DEVELOPMENT_PLAN.md#fase-15---deployment-con-docker-compose)
16. [**FASE 16** - Validazione finale, collaudo offline end-to-end e documentazione `README.md`](plans/DEVELOPMENT_PLAN.md#fase-16---validazione-finale-e-documentazione)

---

## Appendici e Guide Operative

- [**Appendice A** - Checklist di validazione completa](plans/DEVELOPMENT_PLAN.md#appendice-a---checklist-di-validazione-completa)
- [**Appendice B** - Guida al Troubleshooting comune](plans/DEVELOPMENT_PLAN.md#appendice-b---troubleshooting-comune)
- [**Appendice C** - Comandi rapidi di gestione Docker e Docker Compose](plans/DEVELOPMENT_PLAN.md#appendice-c---comandi-utili-docker-e-docker-compose)
- [**Appendice D** - Note per il deployment in produzione e configurazione reverse proxy](plans/DEVELOPMENT_PLAN.md#appendice-d---note-per-il-deployment-in-produzione)
