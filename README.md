# TABLE TENNIS — BEYOND THE SPEED

Experience scrollytelling interattiva ad alte prestazioni dedicata al mondo del tennistavolo professionistico, con rendering 3D hardware-accelerated, sequenze animate fluide a 60 FPS e architettura di produzione containerizzata Docker enterprise-grade.

---

## 📋 Indice

1. [Panoramica del Progetto](#-panoramica-del-progetto)
2. [Stack Tecnologico](#-stack-tecnologico)
3. [Requisiti di Sistema](#-requisiti-di-sistema)
4. [Avvio Rapido (Docker Compose)](#-avvio-rapido-docker-compose)
5. [Variabili d'Ambiente](#-variabili-dambiente)
6. [Gestione del Ciclo di Vita](#-gestione-del-ciclo-di-vita)
7. [Healthcheck e Monitoraggio](#-healthcheck-e-monitoraggio)
8. [Architettura di Sicurezza e Hardening](#-architettura-di-sicurezza-e-hardening)
9. [Deployment in Ambienti Offline / Air-Gapped](#-deployment-in-ambienti-offline--air-gapped)
10. [Aggiornamento e Rollback](#-aggiornamento-e-rollback)
11. [Pipeline e Gestione Asset](#-pipeline-e-gestione-asset)
12. [Sviluppo Locale](#-sviluppo-locale)
13. [Struttura del Repository](#-struttura-del-repository)
14. [Troubleshooting](#-troubleshooting)
15. [Licenze e Note Legali](#-licenze-e-note-legali)

---

## 🏓 Panoramica del Progetto

**TABLE TENNIS — BEYOND THE SPEED** è una piattaforma web visuale che racconta la fisica estrema, la velocità e la tecnica del tennistavolo d'élite attraverso un'esperienza narrativa continua guidata dallo scroll:

- **Hero & Intro**: impatto visivo cinematografico con typography cinetica e statistiche mondiali ([`src/components/sections/HeroSection.tsx`](src/components/sections/HeroSection.tsx:1) e [`src/components/sections/IntroSection.tsx`](src/components/sections/IntroSection.tsx:1)).
- **Spin & Speed Lab**: analisi vettoriale e comparazione cinetica fino a 180 km/h e 9.000 RPM ([`src/components/sections/SpeedSection.tsx`](src/components/sections/SpeedSection.tsx:1) e [`src/components/sections/SpinSection.tsx`](src/components/sections/SpinSection.tsx:1)).
- **Interactive 3D Ball Scene**: pallina da 40+ mm interattiva renderizzata via [`three`](https://threejs.org/) con controlli orbitali e fisica di rimbalzo ([`src/components/animations/three/BallScene.tsx`](src/components/animations/three/BallScene.tsx:1)).
- **Rally Image Sequence**: sequenza scrollytelling frame-by-frame a 120 frame sincronizzata con [`gsap.ScrollTrigger()`](src/components/sections/RallySequenceSection.tsx:1).
- **Equipment & Champions**: specifiche omologate ITTF e schede dei campioni mondiali ([`src/components/sections/EquipmentSection.tsx`](src/components/sections/EquipmentSection.tsx:1) e [`src/components/sections/ChampionsSection.tsx`](src/components/sections/ChampionsSection.tsx:1)).
- **Arena Immersion & Outro**: atmosfera da finale olimpica con audio toggle sintetico e call to action ([`src/components/sections/ArenaSection.tsx`](src/components/sections/ArenaSection.tsx:1) e [`src/components/sections/OutroSection.tsx`](src/components/sections/OutroSection.tsx:1)).

---

## 🛠 Stack Tecnologico

- **Framework**: [`Next.js`](https://nextjs.org/) (App Router, output standalone ottimizzato)
- **UI Runtime**: [`React 19`](https://react.dev/) & [`TypeScript`](https://www.typescriptlang.org/)
- **Styling**: [`Tailwind CSS`](https://tailwindcss.com/) v4
- **Smooth Scrolling**: [`@studio-freight/lenis`](https://github.com/darkroomengineering/lenis) integrato in [`src/components/layout/SmoothScrollProvider.tsx`](src/components/layout/SmoothScrollProvider.tsx:1)
- **Animation Engine**: [`gsap`](https://gsap.com/) & [`ScrollTrigger`](https://gsap.com/scrolltrigger)
- **3D Graphics**: [`three`](https://threejs.org/) & [`@types/three`](package.json:34)
- **Iconografia**: [`lucide-react`](package.json:28)
- **Containerizzazione**: [`Docker`](Dockerfile:1) multi-stage build & [`Docker Compose V2`](compose.yaml:1)

---

## 💻 Requisiti di Sistema

### Per Deployment Containerizzato (Consigliato)

- **Docker Engine**: versione `20.10.0+` o superiore
- **Docker Compose**: versione `V2.0.0+` (comando nativo `docker compose`)
- **Risorse allocate per il container**:
  - CPU: 1 core
  - RAM: 512 MB (limite massimo configurato nel compose)
  - Spazio su disco: ~350 MB per immagine runtime Alpine

### Per Esecuzione Locale senza Docker

- **Node.js**: `v20.x` LTS o `v22.x` LTS
- **npm**: `v10.x` o superiore

---

## 🚀 Avvio Rapido (Docker Compose)

Il deployment di produzione si esegue con un singolo comando:

```bash
docker compose up -d --build
```

Questo comando:

1. Esegue la build multi-stage definita in [`Dockerfile`](Dockerfile:1).
2. Isola le dipendenze in uno stage dedicato con cache npm (`dependencies`), compila l'applicazione con Next.js standalone (`builder`) e confeziona l'immagine finale su Alpine Linux (`runner`).
3. Avvia il container [`table-tennis-web`](compose.yaml:4) in background esponendo la porta `3000` (o il valore configurato in `HOST_PORT`).

L'applicazione sarà accessibile all'indirizzo:

```
http://localhost:3000
```

---

## ⚙️ Variabili d'Ambiente

È possibile configurare le variabili d'ambiente creando un file `.env` a partire dal template [`.env.example`](.env.example:1):

```bash
cp .env.example .env
```

| Variabile | Default | Fase | Descrizione |
| --- | --- | --- | --- |
| `APP_VERSION` | `1.0.0` | Build / Runtime | Tag dell'immagine e versione applicativa |
| `HOST_PORT` | `3000` | Compose | Porta pubblicata sull'host |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Build | URL canonico per metatag OpenGraph e SEO |
| `PORT` | `3000` | Runtime | Porta interna di ascolto del server Next.js |
| `HOSTNAME` | `0.0.0.0` | Runtime | Interfaccia di bind di rete |
| `NODE_ENV` | `production` | Runtime | Ambiente di runtime Node.js |
| `NEXT_TELEMETRY_DISABLED` | `1` | Build / Runtime | Disabilita la raccolta telemetria anonima Next.js |

---

## 🔄 Gestione del Ciclo di Vita

I comandi standard per gestire il container [`table-tennis-web`](compose.yaml:4):

| Operazione | Comando | Descrizione |
| --- | --- | --- |
| **Avvio / Rebuild** | `docker compose up -d --build` | Compila e avvia i container in background |
| **Arresto e Rimozione** | `docker compose down` | Ferma i container e rimuove la rete dedicata |
| **Riavvio del servizio** | `docker compose restart` | Riavvia il servizio preservando lo stato |
| **Visualizzazione Log** | `docker compose logs -f` | Esegue lo streaming dei log standard output/error |
| **Stato e Healthcheck** | `docker compose ps` | Mostra lo stato di esecuzione e di salute del container |
| **Pulizia risorse orfane** | `docker compose down --remove-orphans` | Rimuove container e volumi orfani |

---

## 💓 Healthcheck e Monitoraggio

L'applicazione espone un endpoint di monitoraggio HTTP implementato in [`src/app/api/health/route.ts`](src/app/api/health/route.ts:1):

```http
GET /api/health
```

### Risposta

```json
{
  "status": "ok"
}
```

HTTP Status Code: `200 OK`

### Monitoraggio Docker Healthcheck

Nel file [`compose.yaml`](compose.yaml:25) e nel [`Dockerfile`](Dockerfile:58), il container esegue periodicamente un controllo interno tramite `wget`:

- **Intervallo (`interval`)**: 30 secondi
- **Timeout (`timeout`)**: 5 secondi
- **Periodo di avvio (`start_period`)**: 20 secondi
- **Tentativi di recupero (`retries`)**: 3 fallimenti consecutivi prima di contrassegnare il container come `unhealthy`

---

## 🔒 Architettura di Sicurezza e Hardening

La configurazione del container e del codice adotta le best practice di sicurezza per ambienti di produzione:

1. **Esecuzione con Utente Non-Root**:
   - L'applicazione viene eseguita con l'utente di sistema `nextjs` (UID: `1001`, GID: `1001`), senza privilegi di root, come dichiarato in [`Dockerfile`](Dockerfile:45).
2. **Cap Drop Totale (`cap_drop: - ALL`)**:
   - Tutte le Linux Capabilities del kernel vengono revocate a livello di container ([`compose.yaml`](compose.yaml:39)).
3. **Restrizione No New Privileges**:
   - È attiva la direttiva `security_opt: [no-new-privileges:true]` per impedire qualsiasi escalation di permessi ([`compose.yaml`](compose.yaml:37)).
4. **Standalone Output Minimale**:
   - Il compilatore Next.js produce un bundle standalone che include esclusivamente i file necessari all'esecuzione in [`server.js`](.next/standalone/server.js:1). Il package manager `npm` e i moduli di sviluppo non vengono esportati nell'immagine finale.
5. **Security Headers HTTP**:
   - Configurato in [`next.config.ts`](next.config.ts:1):
     - `Content-Security-Policy` restrittiva con supporto WebGL (`unsafe-eval` per script shader THREE se necessario)
     - `X-Frame-Options: DENY` (prevenzione clickjacking)
     - `X-Content-Type-Options: nosniff` (prevenzione MIME sniffing)
     - `Referrer-Policy: strict-origin-when-cross-origin`
     - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 📦 Deployment in Ambienti Offline / Air-Gapped

Per distribuire l'applicazione in server isolati da Internet (senza accesso a Docker Hub / GitHub Registry):

### 1. Build ed esportazione (workstation connessa a Internet)

```bash
# Compilazione immagine di produzione
docker compose build

# Esportazione archivio tar compresso
docker save table-tennis-web:1.0.0 | gzip > table-tennis-web-1.0.0.tar.gz
```

### 2. Trasferimento file

Trasferire sul server target i file:

- `table-tennis-web-1.0.0.tar.gz`
- [`compose.yaml`](compose.yaml:1)
- [`.env.example`](.env.example:1) (da rinominare in `.env`)

### 3. Caricamento e avvio (server target air-gapped)

```bash
# Importazione dell'immagine nel demone Docker locale
docker load < table-tennis-web-1.0.0.tar.gz

# Avvio del container senza ricompilazione
docker compose up -d --no-build
```

---

## 🔁 Aggiornamento e Rollback

### Procedura di Aggiornamento

1. Modificare la versione desiderata in `.env` (es. `APP_VERSION=1.1.0`).
2. Eseguire la ricompilazione e riavvio:

   ```bash
   docker compose up -d --build
   ```

3. Rimuovere le vecchie immagini orfane:

   ```bash
   docker image prune -f
   ```

### Procedura di Rollback

In caso di anomalie, è possibile tornare istantaneamente alla versione precedente reimpostando `APP_VERSION` nel file `.env`:

```bash
# Impostare la versione precedente nel file .env (es. APP_VERSION=1.0.0)
docker compose up -d --no-build
```

---

## 🎨 Pipeline e Gestione Asset

Tutti gli asset multimediali sono ottimizzati per caricamenti ultra-rapidi:

- **Formati Immagine**: Standard WebP con fallback PNG ad alta risoluzione.
- **Rally Image Sequence**: Sequenza composta da frame WebP compressi memorizzati in [`public/sequences/rally/`](public/sequences/rally/).
- **Script di Generazione**: Lo script [`scripts/generate-assets.mjs`](scripts/generate-assets.mjs:1) consente la rigenerazione di placeholder procedurali e sequenze WebP per sviluppo e test offline.
- **Asset Registry**: Centralizzato e tipizzato in [`src/lib/assets.ts`](src/lib/assets.ts:1).

---

## 💻 Sviluppo Locale

Per eseguire il progetto in locale senza container:

```bash
# Installazione delle dipendenze
npm install

# Avvio del server di sviluppo (hot reload)
npm run dev

# Controllo tipi TypeScript
npm run typecheck

# Compilazione di produzione
npm run build

# Esecuzione del server standalone generato
node .next/standalone/server.js
```

---

## 📂 Struttura del Repository

```
├── .dockerignore                 # Esclusioni per il contesto di build Docker
├── .env.example                  # Template variabili d'ambiente
├── .gitignore                    # Regole di esclusione Git
├── compose.yaml                  # Definizione stack Docker Compose V2
├── Dockerfile                    # Multi-stage Dockerfile (dependencies, builder, runner)
├── next.config.ts                # Configurazione Next.js (standalone, headers, webp)
├── package.json                  # Dipendenze e script npm
├── tsconfig.json                 # Configurazione compilatore TypeScript
├── public/                       # Asset statici serviti alla root
│   ├── images/                   # Asset WebP (arena, champions, equipment, hero)
│   └── sequences/rally/          # Sequenza frame scrollytelling
├── scripts/                      # Script Node.js ausiliari (crawling e asset generator)
└── src/
    ├── app/                      # Next.js App Router
    │   ├── api/health/route.ts   # Endpoint healthcheck JSON
    │   ├── globals.css           # Token Tailwind CSS e stili custom
    │   ├── layout.tsx            # Root layout con metadata SEO e font
    │   └── page.tsx              # Single page scrollytelling principale
    ├── components/
    │   ├── animations/           # Componenti Three.js e transizioni
    │   ├── layout/               # Header con navigazione attiva e Footer
    │   ├── sections/             # Sezioni narrative (Hero, Speed, Spin, Arena, etc.)
    │   └── ui/                   # Design system riutilizzabile (Badge, Card, Marquee, etc.)
    ├── data/                     # Dati strutturati (champions, equipment, stats, navigation)
    ├── hooks/                    # Hook React (useImageSequence, useLenis, useMediaQuery, etc.)
    └── lib/                      # Costanti di progetto e registry asset
```

---

## 🔍 Troubleshooting

### Porta già occupata durante `docker compose up`

Se la porta `3000` è già in uso da un altro servizio, specificare una porta alternativa nel file [`.env`](.env.example:1) o tramite variabile d'ambiente:

```bash
HOST_PORT=8080 docker compose up -d
```

### Prestazioni GPU o preferenza movimento ridotto

L'applicazione implementa un degradamento controllato per dispositivi a basse prestazioni:

- Il canvas Three.js di [`src/components/animations/three/BallScene.tsx`](src/components/animations/three/BallScene.tsx:1) limita il `pixelRatio` a massimo `2.0` per preservare il carico GPU.
- Le sequenze grafiche in [`src/components/sections/RallySequenceSection.tsx`](src/components/sections/RallySequenceSection.tsx:1) utilizzano canvas 2D con rendering su [`window.requestAnimationFrame()`](src/components/sections/RallySequenceSection.tsx:1).
- Se l'utente ha impostato `prefers-reduced-motion: reduce`, le animazioni continue vengono automaticamente attenuate o disattivate tramite [`src/hooks/usePrefersReducedMotion.ts`](src/hooks/usePrefersReducedMotion.ts:1).

### Mancata risposta dell'Healthcheck

Verificare lo stato del container e i log di esecuzione con:

```bash
docker compose logs table-tennis-web
```

Assicurarsi che la variabile d'ambiente interna `PORT` rimanga impostata sul default `3000`.

---

## 📜 Licenze e Note Legali

- **Font**: Utilizza font open-source concessi sotto licenza SIL Open Font License (OFL).
- **Three.js**: Rilasciato sotto licenza MIT.
- **GSAP**: Utilizzato per finalità consentite dalla licenza standard GreenSock.
- **Dati Tecnici**: Regolamenti e parametri fisici derivati dalle specifiche ufficiali ITTF (International Table Tennis Federation).
