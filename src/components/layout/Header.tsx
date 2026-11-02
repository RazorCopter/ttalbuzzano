import { navigationItems } from '@/data/navigation';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-md">
            <div className="container-x flex h-16 items-center justify-between">
                <a
                    href="#hero"
                    className="font-display text-lg tracking-wider text-paper hover:text-neon-red transition-colors"
                >
                    TABLE TENNIS <span className="text-neon-red">//</span> SPEED
                </a>
                <nav aria-label="Navigazione principale" className="hidden md:flex items-center gap-6">
                    {navigationItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-xs uppercase tracking-widest text-paper/70 hover:text-speed-cyan transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
