"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/**
 * GlobalHorizontalScroll
 * Transforms the entire page into a horizontal experience.
 * Works by pinning the container and translating the track.
 */
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalHorizontalScroll({ children }: { children: React.ReactNode }) {
    const componentRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = React.useState(false);

    // Support horizontal wheel/trackpad scrolling
    React.useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Only intercept if we're on desktop and primarily scrolling horizontally
            if (window.innerWidth >= 1024 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                // Manually scroll the window vertically by the deltaX amount
                // Lenis will pick this up and smooth it out
                window.scrollBy({
                    top: e.deltaX,
                    behavior: 'auto'
                });
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const slider = sliderRef.current;
            if (!slider) return;

            const panels = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
            if (panels.length === 0) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const totalWidth = slider.scrollWidth;
                const scrollAmount = totalWidth - window.innerWidth;

                gsap.to(slider, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: componentRef.current,
                        pin: true,
                        scrub: 0.5, // Snappier feel
                        start: "top top",
                        end: () => `+=${slider.scrollWidth - window.innerWidth}`,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    },
                });
            });

            mm.add("(max-width: 1023px)", () => {
                // Ensure no horizontal transform on mobile
                gsap.set(slider, { x: 0 });
            });

            // Perform multiple refreshes to ensure all layout shifts are captured
            const t1 = setTimeout(() => {
                ScrollTrigger.refresh();
                setIsReady(true);
            }, 100);

            const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                mm.revert();
            };


        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={componentRef} className="relative overflow-hidden bg-white">
            <div
                ref={sliderRef}
                className={cn(
                    "flex lg:flex-row flex-col w-full lg:w-max will-change-transform transition-opacity duration-700",
                    isReady ? "opacity-100" : "opacity-0"
                )}
            >
                {children}
            </div>
        </div>

    );
}

/**
 * Helper component to wrap each section
 */
export const HorizontalPanel = ({
    children,
    className,
    id
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) => {
    return (
        <div
            id={id}
            className={cn(
                "horizontal-panel w-full lg:w-screen h-auto lg:h-screen flex-shrink-0 overflow-hidden bg-white dark:bg-slate-950",
                className
            )}
        >
            {/* Ensure content remains centered in its max-width container within the 100vw panel */}
            <div className="w-full lg:h-full flex flex-col justify-center py-10 lg:py-0">
                {children}
            </div>
        </div>
    );
};
