import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

async function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

async function generateHeroAssets() {
    const heroDir = path.join(PUBLIC_DIR, 'images', 'hero');
    await ensureDir(heroDir);

    // 1. hero-bg.webp (2560x1440)
    const heroBgSvg = `
    <svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="gradCenter" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stop-color="#141c2e" />
                <stop offset="50%" stop-color="#0a0e17" />
                <stop offset="100%" stop-color="#05070b" />
            </radialGradient>
            <radialGradient id="spotCyan" cx="30%" cy="30%" r="50%">
                <stop offset="0%" stop-color="rgba(0, 240, 255, 0.22)" />
                <stop offset="100%" stop-color="rgba(0, 240, 255, 0)" />
            </radialGradient>
            <radialGradient id="spotOrange" cx="75%" cy="65%" r="55%">
                <stop offset="0%" stop-color="rgba(255, 77, 0, 0.25)" />
                <stop offset="100%" stop-color="rgba(255, 77, 0, 0)" />
            </radialGradient>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="2560" height="1440" fill="url(#gradCenter)"/>
        <rect width="2560" height="1440" fill="url(#spotCyan)"/>
        <rect width="2560" height="1440" fill="url(#spotOrange)"/>
        <rect width="2560" height="1440" fill="url(#grid)" opacity="0.7"/>
        <circle cx="1280" cy="720" r="480" fill="none" stroke="rgba(0, 240, 255, 0.15)" stroke-width="1.5" stroke-dasharray="8 12"/>
        <circle cx="1280" cy="720" r="320" fill="none" stroke="rgba(255, 77, 0, 0.15)" stroke-width="1"/>
    </svg>`;

    await sharp(Buffer.from(heroBgSvg))
        .webp({ quality: 85 })
        .toFile(path.join(heroDir, 'hero-bg.webp'));

    // 2. hero-player.webp (1400x1800 silhouette with dynamic neon glow)
    const heroPlayerSvg = `
    <svg width="1400" height="1800" viewBox="0 0 1400 1800" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff4d00" />
                <stop offset="100%" stop-color="#ff8c00" />
            </linearGradient>
            <linearGradient id="playerGrad" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stop-color="#00f0ff" />
                <stop offset="40%" stop-color="#0a192f" />
                <stop offset="100%" stop-color="#030712" />
            </linearGradient>
            <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="rgba(0, 240, 255, 0.45)" />
                <stop offset="100%" stop-color="rgba(0, 240, 255, 0)" />
            </radialGradient>
        </defs>
        <circle cx="780" cy="520" r="380" fill="url(#glowG)" />
        <!-- Stylized Table Tennis Athlete in forehand smash pose -->
        <g transform="translate(100, 100)">
            <!-- Head & Torso -->
            <path d="M 620 320 Q 640 250 690 260 Q 740 270 730 350 Q 710 410 660 400 Z" fill="#111827" stroke="#00f0ff" stroke-width="3" />
            <path d="M 640 400 L 520 620 L 480 920 L 680 940 L 760 620 L 710 410 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
            <!-- Extended Left Arm (Balance) -->
            <path d="M 520 620 Q 400 590 320 680 Q 280 720 260 780" fill="none" stroke="#00f0ff" stroke-width="24" stroke-linecap="round" />
            <!-- Dynamic Right Arm with Racket smash -->
            <path d="M 740 550 Q 860 480 920 420 Q 980 360 1020 310" fill="none" stroke="#ff4d00" stroke-width="28" stroke-linecap="round" />
            <!-- Racket Head -->
            <ellipse cx="1060" cy="270" rx="90" ry="110" transform="rotate(-35 1060 270)" fill="url(#bladeGrad)" stroke="#fff" stroke-width="4" />
            <rect x="990" y="330" width="30" height="90" rx="8" transform="rotate(-35 990 330)" fill="#78350f" stroke="#f97316" stroke-width="2" />
            <!-- Glowing ball at impact -->
            <circle cx="1160" cy="210" r="32" fill="#fff" />
            <circle cx="1160" cy="210" r="45" fill="none" stroke="#ff4d00" stroke-width="8" opacity="0.8" />
            <circle cx="1160" cy="210" r="65" fill="none" stroke="#00f0ff" stroke-width="3" stroke-dasharray="6 6" />
            <!-- Motion kinetic lines -->
            <path d="M 850 360 Q 1040 280 1250 180" fill="none" stroke="#00f0ff" stroke-width="6" opacity="0.8" stroke-dasharray="16 10" />
            <path d="M 880 400 Q 1070 320 1280 220" fill="none" stroke="#ff4d00" stroke-width="4" opacity="0.6" stroke-dasharray="20 12" />
            <!-- Legs (Athletic Stance) -->
            <path d="M 480 920 L 380 1260 L 320 1550" fill="none" stroke="#1e293b" stroke-width="38" stroke-linecap="round" />
            <path d="M 680 940 L 760 1280 L 880 1560" fill="none" stroke="#334155" stroke-width="38" stroke-linecap="round" />
            <path d="M 380 1260 L 320 1550" fill="none" stroke="#00f0ff" stroke-width="4" opacity="0.5" />
            <path d="M 760 1280 L 880 1560" fill="none" stroke="#ff4d00" stroke-width="4" opacity="0.5" />
        </g>
    </svg>`;

    await sharp(Buffer.from(heroPlayerSvg))
        .webp({ quality: 85 })
        .toFile(path.join(heroDir, 'hero-player.webp'));

    // 3. og-image.jpg (1200x630)
    const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#05070b"/>
                <stop offset="50%" stop-color="#0f172a"/>
                <stop offset="100%" stop-color="#020617"/>
            </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#ogBg)"/>
        <rect x="40" y="40" width="1120" height="550" rx="16" fill="none" stroke="rgba(0, 240, 255, 0.3)" stroke-width="2"/>
        <text x="100" y="240" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="64" fill="#ffffff" letter-spacing="4">
            TABLE TENNIS
        </text>
        <text x="100" y="320" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="52" fill="#00f0ff" letter-spacing="6">
            BEYOND THE SPEED
        </text>
        <text x="100" y="400" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="24" fill="#94a3b8">
            116 km/h - 9.000 RPM - Extreme Spin and Precision
        </text>
        <circle cx="950" cy="315" r="140" fill="none" stroke="#ff4d00" stroke-width="4" stroke-dasharray="12 12"/>
        <circle cx="950" cy="315" r="80" fill="#ff4d00" opacity="0.8"/>
        <circle cx="950" cy="315" r="28" fill="#ffffff"/>
    </svg>`;

    await sharp(Buffer.from(ogSvg))
        .jpeg({ quality: 90 })
        .toFile(path.join(heroDir, 'og-image.jpg'));

    console.log('Hero assets generated.');
}

async function generateChampionsAssets() {
    const championsDir = path.join(PUBLIC_DIR, 'images', 'champions');
    await ensureDir(championsDir);

    const champions = [
        { id: 'champion-01', name: 'MA LONG', country: 'CHN', titles: '5x Olympic Gold', color: '#ff4d00', accent: '#fbbf24' },
        { id: 'champion-02', name: 'JAN-OVE WALDNER', country: 'SWE', titles: 'The Mozart of TT', color: '#00f0ff', accent: '#3b82f6' },
        { id: 'champion-03', name: 'FAN ZHENDONG', country: 'CHN', titles: 'Olympic Gold 2024', color: '#ec4899', accent: '#f43f5e' },
        { id: 'champion-04', name: 'TIMO BOLL', country: 'GER', titles: '2x World Cup Champion', color: '#10b981', accent: '#059669' },
        { id: 'champion-05', name: 'DING NING', country: 'CHN', titles: '3x Olympic Gold', color: '#a855f7', accent: '#d946ef' },
        { id: 'champion-06', name: 'WANG CHUQIN', country: 'CHN', titles: 'Olympic Mixed Gold 2024', color: '#f59e0b', accent: '#ef4444' },
    ];

    for (const c of champions) {
        const svg = `
        <svg width="1200" height="1600" viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0a0f1d"/>
                    <stop offset="60%" stop-color="#06080e"/>
                    <stop offset="100%" stop-color="#020305"/>
                </linearGradient>
                <radialGradient id="lightGrad" cx="50%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="${c.color}" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="${c.color}" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <rect width="1200" height="1600" fill="url(#bgGrad)"/>
            <rect width="1200" height="1600" fill="url(#lightGrad)"/>
            
            <!-- Technical aesthetic grid -->
            <line x1="80" y1="80" x2="1120" y2="80" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <line x1="80" y1="1520" x2="1120" y2="1520" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
            <circle cx="600" cy="560" r="320" fill="none" stroke="${c.color}" stroke-width="2" stroke-dasharray="10 14" opacity="0.6"/>
            <circle cx="600" cy="560" r="240" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity="0.4"/>

            <!-- Stylized Champion Portrait Silhouette -->
            <g transform="translate(600, 560)">
                <!-- Back glow -->
                <circle cx="0" cy="-60" r="140" fill="${c.color}" opacity="0.2" filter="blur(20px)"/>
                <!-- Head -->
                <path d="M -70 -160 C -70 -260 70 -260 70 -160 C 70 -90 50 -60 0 -50 C -50 -60 -70 -90 -70 -160 Z" fill="#1e293b" stroke="${c.color}" stroke-width="3"/>
                <!-- Neck and Shoulder Athletic Stance -->
                <path d="M -50 -60 L -180 60 L -240 280 L 240 280 L 180 60 L 50 -60 Z" fill="#0f172a" stroke="${c.accent}" stroke-width="2.5"/>
                <!-- Racket overlay -->
                <ellipse cx="140" cy="110" rx="95" ry="120" fill="${c.color}" opacity="0.85" transform="rotate(25 140 110)"/>
                <circle cx="140" cy="110" r="30" fill="#ffffff" opacity="0.9"/>
            </g>
    
            <!-- Typography and Badges inside card -->
            <rect x="80" y="110" width="140" height="48" rx="8" fill="rgba(255,255,255,0.05)" stroke="${c.color}" stroke-width="1.5"/>
            <text x="150" y="142" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" fill="${c.color}" text-anchor="middle" letter-spacing="3">${c.country}</text>
    
            <text x="100" y="1280" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="74" fill="#ffffff" letter-spacing="2">
                ${c.name}
            </text>
            <text x="100" y="1360" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="34" fill="${c.accent}">
                ${c.titles}
            </text>
            <line x1="100" y1="1400" x2="360" y2="1400" stroke="${c.color}" stroke-width="4"/>
            <text x="100" y="1460" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="22" fill="#64748b" letter-spacing="4">
                LEGENDARY STATUS - ELITE PRO
            </text>
        </svg>`;

        await sharp(Buffer.from(svg))
            .webp({ quality: 85 })
            .toFile(path.join(championsDir, `${c.id}.webp`));
    }
    console.log('Champions assets generated.');
}

async function generateEquipmentAssets() {
    const equipDir = path.join(PUBLIC_DIR, 'images', 'equipment');
    await ensureDir(equipDir);

    const items = [
        {
            file: 'racket.webp',
            draw: `
                <!-- Racket Blade + Inverted Rubbers -->
                <ellipse cx="800" cy="650" rx="360" ry="430" fill="#dc2626" stroke="#991b1b" stroke-width="16" />
                <ellipse cx="800" cy="650" rx="340" ry="410" fill="none" stroke="#f87171" stroke-width="4" stroke-dasharray="16 12" />
                <!-- Carbon layer line -->
                <ellipse cx="800" cy="650" rx="320" ry="390" fill="none" stroke="#00f0ff" stroke-width="2" opacity="0.6"/>
                <!-- Handle -->
                <path d="M 720 1020 L 710 1440 Q 800 1470 890 1440 L 880 1020 Z" fill="#1e293b" stroke="#475569" stroke-width="8" />
                <rect x="745" y="1100" width="110" height="240" rx="12" fill="#0f172a" stroke="#00f0ff" stroke-width="3" />
                <text x="800" y="1230" font-family="system-ui, sans-serif" font-size="26" font-weight="900" fill="#00f0ff" text-anchor="middle" letter-spacing="4">CARBON</text>
            `,
        },
        {
            file: 'rubber.webp',
            draw: `
                <!-- High-Tension Sponge & Pimples Cross-section / Surface -->
                <rect x="300" y="400" width="1000" height="800" rx="40" fill="#090d16" stroke="#00f0ff" stroke-width="6" />
                <!-- Top Rubber Layer (Black High Friction) -->
                <rect x="360" y="460" width="880" height="320" rx="20" fill="#171717" stroke="#38bdf8" stroke-width="4" />
                <text x="800" y="630" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#38bdf8" text-anchor="middle" letter-spacing="6">TENSOR GRIP 40°</text>
                <!-- Orange Porous Sponge Layer -->
                <rect x="360" y="820" width="880" height="320" rx="20" fill="#ea580c" stroke="#f97316" stroke-width="4" />
                <text x="800" y="990" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#fff" text-anchor="middle" letter-spacing="6">SPRING SPONGE 2.1mm</text>
            `,
        },
        {
            file: 'ball.webp',
            draw: `
                <!-- 40+ ABS Seamless Ball -->
                <defs>
                    <radialGradient id="ballShade" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="60%" stop-color="#e2e8f0"/>
                        <stop offset="90%" stop-color="#94a3b8"/>
                        <stop offset="100%" stop-color="#475569"/>
                    </radialGradient>
                </defs>
                <circle cx="800" cy="800" r="420" fill="url(#ballShade)" stroke="#cbd5e1" stroke-width="4"/>
                <text x="800" y="740" font-family="system-ui, sans-serif" font-size="58" font-weight="900" fill="#f97316" text-anchor="middle" letter-spacing="4">PRO 3-STAR</text>
                <text x="800" y="820" font-family="system-ui, sans-serif" font-size="46" font-weight="900" fill="#1e293b" text-anchor="middle" letter-spacing="8">ITTF 40+</text>
                <text x="800" y="880" font-family="system-ui, sans-serif" font-size="28" font-weight="700" fill="#64748b" text-anchor="middle">POLY SEAMLESS</text>
                <circle cx="800" cy="800" r="480" fill="none" stroke="#ff4d00" stroke-width="2" stroke-dasharray="12 16" opacity="0.6"/>
            `,
        },
        {
            file: 'table.webp',
            draw: `
                <!-- ITTF Competition Table -->
                <defs>
                    <linearGradient id="tableSurface" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#1e3a8a"/>
                        <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                </defs>
                <!-- Isometric style table top -->
                <polygon points="800,450 1350,750 800,1050 250,750" fill="url(#tableSurface)" stroke="#ffffff" stroke-width="8"/>
                <!-- Center Line -->
                <line x1="525" y1="600" x2="1075" y2="900" stroke="#ffffff" stroke-width="4"/>
                <!-- Net Post & Net -->
                <polygon points="785,380 815,380 815,1080 785,1080" fill="#00f0ff" opacity="0.5" stroke="#00f0ff" stroke-width="4"/>
                <line x1="800" y1="380" x2="800" y2="1080" stroke="#ffffff" stroke-width="6" stroke-dasharray="8 8"/>
                <!-- Under-carriage structure -->
                <polygon points="250,750 250,820 800,1120 800,1050" fill="#0b1120"/>
                <polygon points="1350,750 1350,820 800,1120 800,1050" fill="#020617"/>
                <line x1="450" y1="920" x2="450" y2="1280" stroke="#334155" stroke-width="22" stroke-linecap="round"/>
                <line x1="1150" y1="920" x2="1150" y2="1280" stroke="#334155" stroke-width="22" stroke-linecap="round"/>
                <line x1="800" y1="1120" x2="800" y2="1360" stroke="#475569" stroke-width="24" stroke-linecap="round"/>
            `,
        },
    ];

    for (const item of items) {
        const svg = `
        <svg width="1600" height="1600" viewBox="0 0 1600 1600" xmlns="http://www.w3.org/2000/svg">
            <rect width="1600" height="1600" fill="none"/>
            ${item.draw}
        </svg>`;

        await sharp(Buffer.from(svg))
            .webp({ quality: 85, alphaQuality: 100 })
            .toFile(path.join(equipDir, item.file));
    }
    console.log('Equipment assets generated.');
}

async function generateArenaAssets() {
    const arenaDir = path.join(PUBLIC_DIR, 'images', 'arena');
    await ensureDir(arenaDir);

    // 1. arena-wide.webp (2560x1440)
    const wideSvg = `
    <svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="stadiumDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#020408"/>
                <stop offset="40%" stop-color="#09101d"/>
                <stop offset="100%" stop-color="#030509"/>
            </linearGradient>
            <radialGradient id="centerShowcase" cx="50%" cy="60%" r="50%">
                <stop offset="0%" stop-color="rgba(0, 240, 255, 0.3)"/>
                <stop offset="50%" stop-color="rgba(15, 23, 42, 0.4)"/>
                <stop offset="100%" stop-color="rgba(2, 4, 8, 0)"/>
            </radialGradient>
        </defs>
        <rect width="2560" height="1440" fill="url(#stadiumDark)"/>
        <rect width="2560" height="1440" fill="url(#centerShowcase)"/>
        
        <!-- Overhead LED Truss Rigging -->
        <line x1="200" y1="180" x2="2360" y2="180" stroke="#334155" stroke-width="8"/>
        <line x1="300" y1="230" x2="2260" y2="230" stroke="#1e293b" stroke-width="6"/>
        
        <!-- Spotlight Beams -->
        <polygon points="600,180 300,1100 900,1100" fill="rgba(0, 240, 255, 0.08)"/>
        <polygon points="1960,180 1660,1100 2260,1100" fill="rgba(255, 77, 0, 0.08)"/>
        <polygon points="1280,180 880,1150 1680,1150" fill="rgba(255, 255, 255, 0.07)"/>

        <!-- Competition Red Flooring Podium -->
        <polygon points="400,1250 880,820 1680,820 2160,1250" fill="#991b1b" stroke="#ef4444" stroke-width="3" opacity="0.8"/>
        <!-- Table at center of arena -->
        <polygon points="1120,860 1440,860 1400,940 1160,940" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
    </svg>`;

    await sharp(Buffer.from(wideSvg))
        .webp({ quality: 85 })
        .toFile(path.join(arenaDir, 'arena-wide.webp'));

    // 2. arena-crowd.webp (2560x1440 crowd silhouette bokeh)
    const crowdSvg = `
    <svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
        <rect width="2560" height="1440" fill="transparent"/>
        <g opacity="0.35">
            <!-- Spectators silhouettes with camera flashes -->
            ${Array.from({ length: 60 }).map((_, i) => {
        const cx = (i * 44) + Math.random() * 20;
        const cy = 400 + Math.random() * 300;
        const r = 2 + Math.random() * 5;
        const flash = Math.random() > 0.6 ? `<circle cx="${cx}" cy="${cy}" r="${r * 2}" fill="#ffffff" opacity="0.8"/>` : '';
        return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#38bdf8" opacity="0.5"/>${flash}`;
    }).join('\n')}
        </g>
    </svg>`;

    await sharp(Buffer.from(crowdSvg))
        .webp({ quality: 85 })
        .toFile(path.join(arenaDir, 'arena-crowd.webp'));

    // 3. arena-lights.webp (2560x1440 stadium floodlights overlay)
    const lightsSvg = `
    <svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="lightFlareL" cx="20%" cy="15%" r="30%">
                <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.8"/>
                <stop offset="50%" stop-color="#00f0ff" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="lightFlareR" cx="80%" cy="15%" r="30%">
                <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.8"/>
                <stop offset="50%" stop-color="#ff4d00" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
            </radialGradient>
        </defs>
        <rect width="2560" height="1440" fill="transparent"/>
        <rect width="2560" height="1440" fill="url(#lightFlareL)"/>
        <rect width="2560" height="1440" fill="url(#lightFlareR)"/>
    </svg>`;

    await sharp(Buffer.from(lightsSvg))
        .webp({ quality: 85 })
        .toFile(path.join(arenaDir, 'arena-lights.webp'));

    console.log('Arena assets generated.');
}

async function generateEffectsAssets() {
    const fxDir = path.join(PUBLIC_DIR, 'images', 'effects');
    await ensureDir(fxDir);

    // 1. noise.png (512x512 subtle noise tile)
    const noiseSvg = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"/>
        </filter>
        <rect width="512" height="512" filter="url(#noiseFilter)"/>
    </svg>`;

    await sharp(Buffer.from(noiseSvg))
        .png()
        .toFile(path.join(fxDir, 'noise.png'));

    // 2. motion-blur.webp (1920x1080 horizontal speed streaks)
    const blurSvg = `
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="streak" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(0, 240, 255, 0)"/>
                <stop offset="50%" stop-color="rgba(0, 240, 255, 0.6)"/>
                <stop offset="100%" stop-color="rgba(255, 77, 0, 0)"/>
            </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="none"/>
        <line x1="200" y1="320" x2="1600" y2="320" stroke="url(#streak)" stroke-width="4"/>
        <line x1="400" y1="540" x2="1850" y2="540" stroke="url(#streak)" stroke-width="8"/>
        <line x1="100" y1="780" x2="1500" y2="780" stroke="url(#streak)" stroke-width="3"/>
        <line x1="300" y1="920" x2="1750" y2="920" stroke="url(#streak)" stroke-width="6"/>
    </svg>`;

    await sharp(Buffer.from(blurSvg))
        .webp({ quality: 85 })
        .toFile(path.join(fxDir, 'motion-blur.webp'));

    // 3. ball-trail.webp (1920x1080 parabolic neon trajectory)
    const trailSvg = `
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="trailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ff4d00" stop-opacity="0.1"/>
                <stop offset="70%" stop-color="#ff8c00" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#00f0ff" stop-opacity="1"/>
            </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="none"/>
        <path d="M 150 780 Q 750 180 1250 680 T 1820 420" fill="none" stroke="url(#trailGrad)" stroke-width="12" stroke-linecap="round"/>
        <path d="M 150 780 Q 750 180 1250 680 T 1820 420" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    </svg>`;

    await sharp(Buffer.from(trailSvg))
        .webp({ quality: 85 })
        .toFile(path.join(fxDir, 'ball-trail.webp'));

    console.log('Effects assets generated.');
}

async function generateRallySequence() {
    const seqDir = path.join(PUBLIC_DIR, 'sequences', 'rally');
    await ensureDir(seqDir);

    const totalFrames = 120;
    console.log(`Generating ${totalFrames} rally frames...`);

    // We simulate a high-speed ping pong rally over 120 frames across a table
    // 2 bounces, 2 strokes (Player 1 smash -> Player 2 counter loop)
    for (let i = 1; i <= totalFrames; i++) {
        const t = (i - 1) / (totalFrames - 1); // 0 to 1

        let ballX, ballY, spinAngle = t * 360 * 12, speedKmh = 116;

        // Path piecewise simulation:
        // Shot 1: 0 to 0.48: from Left (x=240, y=520) arched over net down to bounce at (x=1150, y=740), rising to (x=1680, y=500)
        // Shot 2: 0.48 to 1.0: counter return towards left bounce at (x=680, y=740) ending at (x=200, y=480)
        if (t <= 0.48) {
            const st = t / 0.48;
            if (st < 0.7) {
                // descending towards right bounce
                const subT = st / 0.7;
                ballX = 240 + subT * (1150 - 240);
                // Parabola reaching high apex then dropping to table
                ballY = 520 - Math.sin(subT * Math.PI) * 160 + (subT * (740 - 520));
                speedKmh = Math.round(116 - subT * 18);
            } else {
                // rising after right table bounce
                const subT = (st - 0.7) / 0.3;
                ballX = 1150 + subT * (1680 - 1150);
                ballY = 740 - Math.sin(subT * Math.PI * 0.5) * 240;
                speedKmh = Math.round(98 + subT * 10);
            }
        } else {
            const st = (t - 0.48) / 0.52;
            if (st < 0.65) {
                // returning to left bounce
                const subT = st / 0.65;
                ballX = 1680 - subT * (1680 - 680);
                ballY = 500 - Math.sin(subT * Math.PI) * 180 + (subT * (740 - 500));
                speedKmh = Math.round(108 - subT * 16);
            } else {
                // rising from left bounce
                const subT = (st - 0.65) / 0.35;
                ballX = 680 - subT * (680 - 200);
                ballY = 740 - Math.sin(subT * Math.PI * 0.5) * 260;
                speedKmh = Math.round(92 + subT * 8);
            }
        }

        const frameNum = String(i).padStart(4, '0');
        const svg = `
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bgG" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#030712"/>
                    <stop offset="60%" stop-color="#0a1224"/>
                    <stop offset="100%" stop-color="#020409"/>
                </linearGradient>
                <radialGradient id="ballGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#ffffff"/>
                    <stop offset="70%" stop-color="#f97316"/>
                    <stop offset="100%" stop-color="#c2410c"/>
                </radialGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#bgG)"/>
            
            <!-- Table Tennis Table in 3D Isometric Perspective -->
            <polygon points="400,740 1520,740 1680,890 240,890" fill="#1e3a8a" stroke="#ffffff" stroke-width="4"/>
            <!-- Table Center Line -->
            <line x1="960" y1="740" x2="960" y2="890" stroke="#ffffff" stroke-width="3" opacity="0.9"/>
            <!-- Table Net -->
            <polygon points="954,640 966,640 966,890 954,890" fill="rgba(0, 240, 255, 0.4)" stroke="#00f0ff" stroke-width="2"/>
            <line x1="960" y1="640" x2="960" y2="890" stroke="#fff" stroke-dasharray="4 4" stroke-width="2"/>

            <!-- Motion Kinetic Trail behind ball -->
            <line x1="${ballX - 40}" y1="${ballY + 10}" x2="${ballX}" y2="${ballY}" stroke="#00f0ff" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
            <line x1="${ballX - 80}" y1="${ballY + 20}" x2="${ballX - 40}" y2="${ballY + 10}" stroke="#ff4d00" stroke-width="4" stroke-linecap="round" opacity="0.4"/>

            <!-- Ping Pong Ball (40+ mm) -->
            <circle cx="${ballX}" cy="${ballY}" r="22" fill="url(#ballGrad)"/>
            <!-- Spin Marker on Ball -->
            <line x1="${ballX - 12}" y1="${ballY}" x2="${ballX + 12}" y2="${ballY}" stroke="#ffffff" stroke-width="3" transform="rotate(${spinAngle} ${ballX} ${ballY})"/>

            <!-- Telemetry overlay HUD -->
            <rect x="80" y="80" width="340" height="100" rx="12" fill="rgba(6, 11, 25, 0.75)" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1.5"/>
            <text x="110" y="122" font-family="system-ui, monospace" font-size="20" font-weight="700" fill="#00f0ff" letter-spacing="2">VELOCITY: ${speedKmh} KM/H</text>
            <text x="110" y="154" font-family="system-ui, monospace" font-size="16" font-weight="600" fill="#94a3b8">FRAME ${frameNum} / 0120 - 9.200 RPM</text>
        </svg>`;

        await sharp(Buffer.from(svg))
            .webp({ quality: 80 })
            .toFile(path.join(seqDir, `frame_${frameNum}.webp`));
    }
    console.log('Rally sequence 120 frames generated.');
}

async function run() {
    try {
        await generateHeroAssets();
        await generateChampionsAssets();
        await generateEquipmentAssets();
        await generateArenaAssets();
        await generateEffectsAssets();
        await generateRallySequence();
        console.log('ALL ASSETS GENERATED SUCCESSFULLY!');
    } catch (err) {
        console.error('Error generating assets:', err);
        process.exit(1);
    }
}

run();
