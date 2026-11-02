/**
 * Gestione dei font con fallback di sistema ad alte prestazioni.
 * Garantisce il funzionamento al 100% offline senza chiamate a Google Fonts o CDN esterne.
 */

export interface SystemFontConfig {
    variable: string;
    className: string;
}

export const displayFont: SystemFontConfig = {
    variable: 'font-display-var',
    className: 'font-display',
};

export const sansFont: SystemFontConfig = {
    variable: 'font-sans-var',
    className: 'font-sans',
};
