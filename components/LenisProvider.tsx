"use client";

import { useLayoutEffect, useRef, useEffect, Suspense } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useSearchParams } from "next/navigation";

function LenisManager({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useLayoutEffect(() => {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        if (typeof window !== "undefined") {
            // Helps smooth out touch/trackpad interactions especially on mobile
            ScrollTrigger.normalizeScroll(true);
        }

        // Initialize Lenis with refined settings for a "premium" smooth feel
        const lenis = new Lenis({
            duration: 1.5, // Slightly longer for more elegance
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.1, // A bit more responsive
            touchMultiplier: 1.5,
            syncTouch: true,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Connect Lenis to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // GSAP Ticker for smooth animation frame coordination
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll to top on route change to prevent jitter/jump
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        }
        // Refresh ScrollTrigger as layout might change
        const timer = setTimeout(() => {
            if (typeof window !== "undefined" && ScrollTrigger) {
                ScrollTrigger.refresh();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    return <>{children}</>;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <LenisManager>{children}</LenisManager>
        </Suspense>
    );
}
