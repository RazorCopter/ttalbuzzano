'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseImageSequenceOptions {
    frameCount: number;
    getFrameUrl: (index: number) => string;
    onProgress?: (progress: number) => void;
    autoDrawFirstFrame?: boolean;
}

export interface UseImageSequenceReturn {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    renderFrame: (index: number) => void;
    renderProgress: (progress: number) => void;
    isLoading: boolean;
    loadProgress: number; // 0 to 100
    isLoaded: boolean;
    currentFrame: number;
}

/**
 * Hook to preload an image sequence into memory and efficiently draw frames onto an HTML5 Canvas.
 * Supports aspect-ratio preserving cover/contain rendering and responsive devicePixelRatio scaling.
 */
export function useImageSequence({
    frameCount,
    getFrameUrl,
    onProgress,
    autoDrawFirstFrame = true,
}: UseImageSequenceOptions): UseImageSequenceReturn {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(1);

    // Draw a single image onto the canvas respecting canvas resolution and aspect ratio (contain)
    const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cw = canvas.width;
        const ch = canvas.height;

        ctx.clearRect(0, 0, cw, ch);

        const imgWidth = img.naturalWidth || img.width;
        const imgHeight = img.naturalHeight || img.height;

        if (imgWidth === 0 || imgHeight === 0) return;

        // Calculate aspect-ratio "cover" scaling
        const hRatio = cw / imgWidth;
        const vRatio = ch / imgHeight;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (cw - imgWidth * ratio) / 2;
        const centerShiftY = (ch - imgHeight * ratio) / 2;

        ctx.drawImage(
            img,
            0,
            0,
            imgWidth,
            imgHeight,
            centerShiftX,
            centerShiftY,
            imgWidth * ratio,
            imgHeight * ratio
        );
    }, []);

    const renderFrame = useCallback(
        (index: number) => {
            const clamped = Math.max(1, Math.min(frameCount, Math.round(index)));
            setCurrentFrame(clamped);

            const img = imagesRef.current[clamped - 1];
            if (img && img.complete) {
                drawImageToCanvas(img);
            }
        },
        [frameCount, drawImageToCanvas]
    );

    const renderProgress = useCallback(
        (progress: number) => {
            const clampedProgress = Math.max(0, Math.min(1, progress));
            const frameIndex = Math.min(
                frameCount,
                Math.floor(clampedProgress * (frameCount - 1)) + 1
            );
            renderFrame(frameIndex);
        },
        [frameCount, renderFrame]
    );

    // Preload image sequence
    useEffect(() => {
        let isMounted = true;
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        setIsLoading(true);
        setLoadProgress(0);
        setIsLoaded(false);

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = getFrameUrl(i);

            img.onload = () => {
                if (!isMounted) return;
                loadedCount++;
                const pct = Math.round((loadedCount / frameCount) * 100);
                setLoadProgress(pct);
                onProgress?.(pct);

                if (i === 1 && autoDrawFirstFrame) {
                    drawImageToCanvas(img);
                }

                if (loadedCount === frameCount) {
                    setIsLoading(false);
                    setIsLoaded(true);
                }
            };

            img.onerror = () => {
                if (!isMounted) return;
                loadedCount++;
                const pct = Math.round((loadedCount / frameCount) * 100);
                setLoadProgress(pct);

                if (loadedCount === frameCount) {
                    setIsLoading(false);
                    setIsLoaded(true);
                }
            };

            images.push(img);
        }

        imagesRef.current = images;

        return () => {
            isMounted = false;
        };
    }, [frameCount, getFrameUrl, onProgress, autoDrawFirstFrame, drawImageToCanvas]);

    // Handle high DPI resizing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            const currentImg = imagesRef.current[currentFrame - 1];
            if (currentImg && currentImg.complete) {
                drawImageToCanvas(currentImg);
            }
        };

        resizeCanvas();

        const ro = new ResizeObserver(() => {
            resizeCanvas();
        });
        ro.observe(canvas);

        return () => {
            ro.disconnect();
        };
    }, [currentFrame, drawImageToCanvas]);

    return {
        canvasRef,
        renderFrame,
        renderProgress,
        isLoading,
        loadProgress,
        isLoaded,
        currentFrame,
    };
}
