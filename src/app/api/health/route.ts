import { NextResponse } from 'next/server';
import type { HealthResponse } from '@/data/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export function GET(): NextResponse<HealthResponse> {
    return NextResponse.json(
        {
            status: 'ok',
        },
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        },
    );
}

export function HEAD(): Response {
    return new Response(null, {
        status: 200,
        headers: {
            'Cache-Control': 'no-store',
        },
    });
}
