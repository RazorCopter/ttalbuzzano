import type { Champion } from './types';
import { ASSETS } from '@/lib/assets';

export const championsData: Champion[] = [
    {
        id: 'ma-long',
        name: 'Ma Long',
        country: 'CHN',
        titles: '5x Oro Olimpico, 3x Campione del Mondo',
        style: 'Right-hand shakehand, attacking all-round',
        image: ASSETS.champions.maLong,
    },
    {
        id: 'jan-ove-waldner',
        name: 'Jan-Ove Waldner',
        country: 'SWE',
        titles: 'Oro Olimpico 1992, 2x Campione del Mondo',
        style: 'Right-hand shakehand, creative playmaker',
        image: ASSETS.champions.janOveWaldner,
    },
    {
        id: 'fan-zhendong',
        name: 'Fan Zhendong',
        country: 'CHN',
        titles: 'Oro Olimpico 2024, 2x Campione del Mondo',
        style: 'Right-hand shakehand, explosive backhand loop',
        image: ASSETS.champions.fanZhendong,
    },
    {
        id: 'timo-boll',
        name: 'Timo Boll',
        country: 'GER',
        titles: '2x Coppa del Mondo, 8x Campione Europeo',
        style: 'Left-hand shakehand, heavy topspin attack',
        image: ASSETS.champions.timoBoll,
    },
    {
        id: 'ding-ning',
        name: 'Ding Ning',
        country: 'CHN',
        titles: '3x Oro Olimpico, 3x Campione del Mondo',
        style: 'Left-hand shakehand, squat serve specialist',
        image: ASSETS.champions.dingNing,
    },
    {
        id: 'wang-chuqin',
        name: 'Wang Chuqin',
        country: 'CHN',
        titles: 'Oro Olimpico Doppio Misto 2024, Campione del Mondo',
        style: 'Left-hand shakehand, high-speed offensive',
        image: ASSETS.champions.wangChuqin,
    },
];
