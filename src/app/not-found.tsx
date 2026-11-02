export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
            <span className="font-mono text-sm tracking-widest text-neon-red">
                [ ERRORE 404 // OUT OF BOUNDS ]
            </span>
            <h1 className="mt-4 text-giant font-display text-paper">FUORI DAL TAVOLO</h1>
            <p className="mt-4 max-w-md text-paper-muted">
                La traiettoria cercata è uscita dal campo di gara. Torna in partita per riprendere lo scambio.
            </p>
            <a
                href="/"
                className="mt-8 rounded-full border border-neon-red bg-neon-red/10 px-8 py-3 text-sm font-semibold tracking-wider text-paper uppercase transition-all hover:bg-neon-red hover:shadow-[0_0_20px_rgba(255,42,75,0.6)]"
            >
                Torna alla Battuta
            </a>
        </div>
    );
}
