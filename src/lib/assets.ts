/**
 * Type-safe path constants for all local static assets.
 * Guarantees zero reliance on external CDNs and complete offline capability.
 */

export const ASSETS = {
    hero: {
        bg: '/images/hero/hero-bg.webp',
        player: '/images/hero/hero-player.webp',
        ogImage: '/images/hero/og-image.jpg',
    },
    champions: {
        maLong: '/images/champions/champion-01.webp',
        janOveWaldner: '/images/champions/champion-02.webp',
        fanZhendong: '/images/champions/champion-03.webp',
        timoBoll: '/images/champions/champion-04.webp',
        dingNing: '/images/champions/champion-05.webp',
        wangChuqin: '/images/champions/champion-06.webp',
    },
    equipment: {
        racket: '/images/equipment/racket.webp',
        rubber: '/images/equipment/rubber.webp',
        ball: '/images/equipment/ball.webp',
        table: '/images/equipment/table.webp',
    },
    arena: {
        wide: '/images/arena/arena-wide.webp',
        crowd: '/images/arena/arena-crowd.webp',
        lights: '/images/arena/arena-lights.webp',
    },
    effects: {
        noise: '/images/effects/noise.png',
        motionBlur: '/images/effects/motion-blur.webp',
        ballTrail: '/images/effects/ball-trail.webp',
    },
    sequences: {
        rally: {
            folder: '/sequences/rally',
            prefix: 'frame_',
            extension: '.webp',
            frameCount: 120,
            getFramePath: (index: number): string => {
                const clamped = Math.max(1, Math.min(120, Math.round(index)));
                const padded = String(clamped).padStart(4, '0');
                return `/sequences/rally/frame_${padded}.webp`;
            },
        },
    },
} as const;

export type Assets = typeof ASSETS;
