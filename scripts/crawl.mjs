import { writeFile } from 'node:fs/promises';

async function crawlAll() {
    const pages = [
        '/home',
        '/la-scuola',
        '/i-corsi',
        '/atleti',
        '/attivita',
        '/contatti',
        '/video-lezioni',
        '/news-eventi'
    ];

    const results = {};

    for (const p of pages) {
        try {
            const url = `https://www.ttalbuzzano.it${p}`;
            const res = await fetch(url, {
                headers: { 'User-Agent': 'Mozilla/5.0' },
                redirect: 'follow'
            });
            const html = await res.text();
            const text = html
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                .replace(/<[^>]+>/g, '\n')
                .split('\n')
                .map(s => s.trim())
                .filter(s => s.length > 2);
            results[p] = text;
            console.log(`Fetched ${p}: ${text.length} lines`);
        } catch (e) {
            console.error(`Error fetching ${p}:`, e.message);
        }
    }

    await writeFile('scripts/crawled_data.json', JSON.stringify(results, null, 2), 'utf-8');
    console.log('Saved to scripts/crawled_data.json');
}

crawlAll();
