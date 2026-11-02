'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect SSR-safe per evitare hydration warning.
 */
export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;
