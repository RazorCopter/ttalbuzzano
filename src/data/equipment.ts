import type { EquipmentItem } from './types';
import { ASSETS } from '@/lib/assets';

export const equipmentData: EquipmentItem[] = [
    {
        id: 'racket-blade',
        name: 'Telaio Composito Carbonio',
        description: 'Strati di legno selezionato combinati con fibra di carbonio aramidico per massima rigidità e velocità reattiva.',
        specs: [
            { label: 'Peso', value: '88g ± 3g' },
            { label: 'Composizione', value: '5 strati legno + 2 strati ALC' },
            { label: 'Spessore', value: '5.8 mm' },
            { label: 'Elasticità', value: 'Rigido' },
        ],
        image: ASSETS.equipment.racket,
    },
    {
        id: 'rubber',
        name: 'Gomma Tensionata High-Tension',
        description: 'Superficie ad altissimo attrito con spugna densa porosa per imprimere rotazioni estreme fino a 9.000 RPM.',
        specs: [
            { label: 'Durezza Spugna', value: '40° Shore A' },
            { label: 'Spessore', value: '2.1 mm (Max)' },
            { label: 'Superficie', value: 'Inverted High Grip' },
            { label: 'Omologazione', value: 'ITTF Approved' },
        ],
        image: ASSETS.equipment.rubber,
    },
    {
        id: 'ball',
        name: 'Pallina Celluloide-Free 40+',
        description: 'Sfera in polimero ABS plastico senza saldatura per un rimbalzo perfettamente sferico e traiettoria stabile.',
        specs: [
            { label: 'Diametro', value: '40.0 - 40.5 mm' },
            { label: 'Peso', value: '2.72 g' },
            { label: 'Materiale', value: 'Polimero ABS 3-Star' },
            { label: 'Standard', value: 'ITTF 3-Star' },
        ],
        image: ASSETS.equipment.ball,
    },
    {
        id: 'table',
        name: 'Tavolo da Gara Ufficiale',
        description: 'Piano di rimbalzo rettificato in legno ad alta densità con superficie antiriflesso e telaio antivibrazioni.',
        specs: [
            { label: 'Dimensioni', value: '2.74 m × 1.525 m' },
            { label: 'Altezza Piano', value: '76 cm' },
            { label: 'Spessore Piano', value: '25 mm' },
            { label: 'Altezza Rete', value: '15.25 cm' },
        ],
        image: ASSETS.equipment.table,
    },
];
