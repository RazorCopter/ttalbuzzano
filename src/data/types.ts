export interface Champion {
    id: string;
    name: string;
    country: string;
    titles: string;
    style: string;
    image: string;
}

export interface EquipmentSpec {
    label: string;
    value: string;
}

export interface EquipmentItem {
    id: string;
    name: string;
    description: string;
    specs: EquipmentSpec[];
    image: string;
}

export interface RallyFrameMetadata {
    frameIndex: number;
    ballSpeedKmh: number;
    spinRpm: number;
    impactZone?: string;
    timestampMs?: number;
}

export interface NavigationItem {
    label: string;
    href: `#${string}`;
}

export type NavItem = NavigationItem;

export interface Stat {
    value: number;
    suffix: string;
    label: string;
}

export interface HealthResponse {
    status: 'ok';
    service?: string;
    version?: string;
    uptime?: number;
    timestamp?: string;
}
