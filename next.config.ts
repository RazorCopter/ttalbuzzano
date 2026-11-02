import type { NextConfig } from 'next';

const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    images: {
        unoptimized: true,
    },
    async headers() {
        return [
            { source: '/:path*', headers: securityHeaders },
            {
                source: '/sequences/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/images/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }],
            },
        ];
    },
};

export default nextConfig;
