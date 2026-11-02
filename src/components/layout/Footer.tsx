export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-ink py-12 text-center text-xs tracking-wider text-paper/50">
            <div className="container-x flex flex-col items-center justify-between gap-4 md:flex-row">
                <p>© {new Date().getFullYear()} TABLE TENNIS - BEYOND THE SPEED. Tutti i diritti riservati.</p>
                <p className="font-mono text-[10px] text-paper/40">
                    POWERED BY NEXT.JS 15 • GSAP • THREE.JS • TAILWIND CSS
                </p>
            </div>
        </footer>
    );
}
