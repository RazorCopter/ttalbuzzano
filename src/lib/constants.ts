export const SITE_CONFIG = {
    name: 'Table Tennis - Beyond the Speed',
    shortName: 'TT Beyond The Speed',
    description: 'Un viaggio immersivo nel tennistavolo: velocità, spin, campioni e tecnologia.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    sections: [
        'hero',
        'intro',
        'speed',
        'rally',
        'spin',
        'champions',
        'equipment',
        'arena',
        'outro',
    ] as const,
    rallySequence: {
        frameCount: 120,
        folder: '/sequences/rally',
        prefix: 'frame_',
        extension: '.webp',
    },
};
