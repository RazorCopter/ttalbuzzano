import { HeroSection } from '@/components/sections/HeroSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { SpeedSection } from '@/components/sections/SpeedSection';
import { RallySequenceSection } from '@/components/sections/RallySequenceSection';
import { SpinSection } from '@/components/sections/SpinSection';
import { ChampionsSection } from '@/components/sections/ChampionsSection';
import { EquipmentSection } from '@/components/sections/EquipmentSection';
import { ArenaSection } from '@/components/sections/ArenaSection';
import { OutroSection } from '@/components/sections/OutroSection';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <IntroSection />
            <SpeedSection />
            <RallySequenceSection />
            <SpinSection />
            <ChampionsSection />
            <EquipmentSection />
            <ArenaSection />
            <OutroSection />
        </>
    );
}
