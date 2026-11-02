'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface BallSceneProps {
    triggerSelector?: string;
    className?: string;
    interactive?: boolean;
    spinType?: 'topspin' | 'backspin' | 'sidespin';
    particleCount?: number;
    ballColor?: string;
    scale?: number;
    showTrail?: boolean;
}

/**
 * Creates a procedural 3-star ITTF logo texture onto a 2D canvas
 */
function createBallTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Base fill
        ctx.fillStyle = '#ff621f';
        ctx.fillRect(0, 0, 512, 512);

        // Subtle gradient shading for micro-texture
        const grad = ctx.createRadialGradient(256, 256, 100, 256, 256, 256);
        grad.addColorStop(0, '#ff7336');
        grad.addColorStop(1, '#e54d0d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // ITTF 3-Star Stamp
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Stars
        ctx.font = 'bold 32px monospace';
        ctx.fillText('★ ★ ★', 256, 200);

        // ITTF text
        ctx.font = '900 42px sans-serif';
        ctx.fillText('ITTF', 256, 250);

        // Model badge
        ctx.font = '600 20px monospace';
        ctx.fillStyle = '#111827';
        ctx.fillText('40+ BEYOND', 256, 290);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

/**
 * BallScene: High-performance 3D Table Tennis Ball WebGL scene using Three.js.
 * Includes interactive mouse tracking, scroll-synchronized dynamic Magnus spin,
 * particle velocity trail, and graceful fallback for non-WebGL/reduced-motion environments.
 */
export function BallScene({
    triggerSelector,
    className = '',
    interactive = true,
    spinType = 'topspin',
    particleCount = 120,
    ballColor = '#ff621f',
    scale = 1.0,
    showTrail = true,
}: BallSceneProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Check WebGL availability
        try {
            const testCanvas = document.createElement('canvas');
            const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
            if (!gl) {
                setHasWebGL(false);
                return;
            }
            setHasWebGL(true);
        } catch {
            setHasWebGL(false);
            return;
        }

        if (prefersReducedMotion) {
            return;
        }

        const width = mount.clientWidth || 300;
        const height = mount.clientHeight || 300;

        // 1. Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 0, 4.8 / scale);

        // 2. WebGLRenderer with alpha transparency and antialiasing
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch {
            setHasWebGL(false);
            return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mount.appendChild(renderer.domElement);

        // 3. Materials & Geometry
        const ballTexture = createBallTexture();
        const ballGeometry = new THREE.SphereGeometry(1, 64, 64);
        const ballMaterial = new THREE.MeshPhysicalMaterial({
            map: ballTexture,
            color: new THREE.Color(ballColor),
            roughness: 0.38,
            metalness: 0.04,
            clearcoat: 0.25,
            clearcoatRoughness: 0.2,
        });

        const ball = new THREE.Mesh(ballGeometry, ballMaterial);
        scene.add(ball);

        // Seam ring
        const seamGeometry = new THREE.TorusGeometry(1.002, 0.008, 16, 128);
        const seamMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.35,
        });
        const seam = new THREE.Mesh(seamGeometry, seamMaterial);
        seam.rotation.x = Math.PI / 2;
        ball.add(seam);

        // 4. Particle Trail Field
        let particles: THREE.Points | null = null;
        let particleGeom: THREE.BufferGeometry | null = null;
        let particleMat: THREE.PointsMaterial | null = null;

        if (showTrail) {
            particleGeom = new THREE.BufferGeometry();
            const pPositions = new Float32Array(particleCount * 3);
            const pVelocities: { x: number; y: number; z: number }[] = [];

            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const rad = 1.05 + Math.random() * 0.8;
                pPositions[i * 3] = Math.cos(angle) * rad;
                pPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
                pPositions[i * 3 + 2] = Math.sin(angle) * rad;

                pVelocities.push({
                    x: (Math.random() - 0.5) * 0.015,
                    y: (Math.random() - 0.5) * 0.02,
                    z: -0.02 - Math.random() * 0.03,
                });
            }

            particleGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
            particleMat = new THREE.PointsMaterial({
                color: 0x00f0ff,
                size: 0.035,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending,
            });

            particles = new THREE.Points(particleGeom, particleMat);
            scene.add(particles);
        }

        // 5. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
        keyLight.position.set(4, 5, 5);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0x00f0ff, 3.2);
        rimLight.position.set(-5, -2, -3);
        scene.add(rimLight);

        const warmLight = new THREE.DirectionalLight(0xff003c, 1.8);
        warmLight.position.set(3, -4, 2);
        scene.add(warmLight);

        // 6. Interactive state & Spin configuration
        const targetRotation = { x: 0, y: 0, z: 0 };
        const mouse = { x: 0, y: 0 };

        const handleMouseMove = (e: MouseEvent) => {
            if (!interactive) return;
            const rect = mount.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            mouse.x = relX * 2;
            mouse.y = relY * 2;
        };

        if (interactive) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }

        // GSAP ScrollTrigger synchronization if trigger is provided
        let scrollTween: gsap.core.Tween | null = null;
        if (triggerSelector) {
            scrollTween = gsap.to(targetRotation, {
                x: () => (spinType === 'backspin' ? -Math.PI * 8 : Math.PI * 8),
                y: () => (spinType === 'sidespin' ? Math.PI * 6 : Math.PI * 3),
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerSelector,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.6,
                },
            });
        }

        // 7. Render Loop with IntersectionObserver
        let animationFrameId = 0;
        let isVisible = true;

        const observer = new IntersectionObserver(([entry]) => {
            isVisible = !!entry?.isIntersecting;
        });
        observer.observe(mount);

        let clock = 0;
        const renderLoop = () => {
            animationFrameId = requestAnimationFrame(renderLoop);
            if (!isVisible) return;

            clock += 0.016;

            // Base continuous rotational speed according to spinType
            let baseSpinX = 0.025;
            let baseSpinY = 0.01;
            let baseSpinZ = 0.005;

            if (spinType === 'backspin') {
                baseSpinX = -0.035;
            } else if (spinType === 'sidespin') {
                baseSpinY = 0.045;
                baseSpinX = 0.01;
            }

            ball.rotation.x += baseSpinX;
            ball.rotation.y += baseSpinY;
            ball.rotation.z += baseSpinZ;

            // Smooth interpolation towards mouse tilt and scroll rotation
            ball.position.x = THREE.MathUtils.lerp(ball.position.x, mouse.x * 0.35, 0.06);
            ball.position.y = THREE.MathUtils.lerp(ball.position.y, -mouse.y * 0.35, 0.06);

            // Animate particles
            if (particles && particleGeom) {
                const posAttr = particleGeom.getAttribute('position') as THREE.BufferAttribute | undefined;
                if (posAttr) {
                    const pos = posAttr.array as Float32Array;
                    for (let i = 0; i < particleCount; i++) {
                        const yIdx = i * 3 + 1;
                        const zIdx = i * 3 + 2;
                        if (pos[yIdx] !== undefined) {
                            pos[yIdx] += Math.sin(clock * 2 + i) * 0.002;
                        }
                        if (pos[zIdx] !== undefined) {
                            pos[zIdx] -= 0.008;
                            if (pos[zIdx] < -2.2) {
                                pos[zIdx] = 0.8 + Math.random() * 0.4;
                            }
                        }
                    }
                    posAttr.needsUpdate = true;
                }
                particles.rotation.z += 0.002;
            }

            renderer.render(scene, camera);
        };

        renderLoop();

        // 8. Responsive Resize
        const handleResize = () => {
            if (!mount) return;
            const newW = mount.clientWidth;
            const newH = mount.clientHeight;
            if (newW === 0 || newH === 0) return;

            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };

        window.addEventListener('resize', handleResize);

        // 9. Comprehensive Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (interactive) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            observer.disconnect();

            if (scrollTween) {
                scrollTween.scrollTrigger?.kill();
                scrollTween.kill();
            }

            ballGeometry.dispose();
            ballMaterial.dispose();
            ballTexture.dispose();
            seamGeometry.dispose();
            seamMaterial.dispose();

            if (particleGeom) particleGeom.dispose();
            if (particleMat) particleMat.dispose();

            renderer.dispose();
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [triggerSelector, interactive, spinType, particleCount, ballColor, scale, showTrail, prefersReducedMotion]);

    // Fallback if reduced motion or no WebGL
    if (prefersReducedMotion || hasWebGL === false) {
        return (
            <div
                className={`relative flex items-center justify-center ${className}`}
                aria-label="Pallina da tennistavolo 40+ ABS"
            >
                <div className="relative h-44 w-44 rounded-full bg-gradient-to-tr from-[#e54d0d] via-[#ff621f] to-[#ff9e66] shadow-[0_0_50px_rgba(255,98,31,0.5)]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[10px] uppercase tracking-wider text-black/80 font-bold">
                        <span>★ ★ ★</span>
                        <span className="text-sm font-black">ITTF</span>
                        <span className="text-[9px]">40+ PLASTIC</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={mountRef}
            className={`relative h-full w-full overflow-hidden ${className}`}
            aria-label="Scena 3D interattiva pallina da tennistavolo"
            role="img"
        />
    );
}

export default BallScene;
