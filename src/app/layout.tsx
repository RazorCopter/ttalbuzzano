import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { displayFont, sansFont } from '@/lib/fonts';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: 'Table Tennis - Beyond the Speed',
    description: 'Un viaggio immersivo nel tennistavolo: velocità, spin, campioni e tecnologia.',
    keywords: [
        'table tennis',
        'tennistavolo',
        'ping pong',
        'spin',
        'speed',
        'champions',
        'ma long',
        'equipment',
    ],
    authors: [{ name: 'Table Tennis Beyond The Speed' }],
    openGraph: {
        title: 'Table Tennis - Beyond the Speed',
        description: 'Un viaggio immersivo nel tennistavolo: velocità, spin, campioni e tecnologia.',
        url: siteUrl,
        siteName: 'Table Tennis - Beyond the Speed',
        locale: 'it_IT',
        type: 'website',
        images: [
            {
                url: '/images/hero/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Table Tennis - Beyond the Speed',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Table Tennis - Beyond the Speed',
        description: 'Un viaggio immersivo nel tennistavolo: velocità, spin, campioni e tecnologia.',
        images: ['/images/hero/og-image.jpg'],
    },
};

export const viewport: Viewport = {
    themeColor: '#0a0a0c',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="it" className={`${displayFont.variable} ${sansFont.variable}`}>
            <body className="bg-ink text-paper font-sans antialiased selection:bg-neon-red selection:text-white">
                <SmoothScrollProvider>
                    <ScrollProgress />
                    <Header />
                    <main id="main" tabIndex={-1} className="relative z-10 flex min-h-screen flex-col">
                        {children}
                    </main>
                    <Footer />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
