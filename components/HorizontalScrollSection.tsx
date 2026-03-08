"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Ensure GSAP works with Lenis
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollSectionProps {
    id?: string;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string; // Root section styles (e.g. background)
    contentClassName?: string; // Track/Cards container styles
}

/**
 * HorizontalScrollSection
 * Replicates the "Firma" template horizontal scroll behavior.
 * Pins exactly like a Framer-built section.
 */
const trackPaddingClass = "pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] md:pl-[max(6rem,calc((100vw-1280px)/2+6rem))] pr-[10vw]";

const HorizontalScrollSection = ({
    id,
    title,
    subtitle,
    children,
    className,
    contentClassName
}: HorizontalScrollSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const track = trackRef.current;
            const trigger = triggerRef.current;
            if (!track || !trigger) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const scrollDistance = track.scrollWidth - window.innerWidth;

                gsap.to(track, {
                    x: -scrollDistance,
                    ease: "none",
                    scrollTrigger: {
                        trigger: trigger,
                        pin: true,
                        scrub: 1,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id={id}
            className={cn("relative overflow-hidden w-full", className)}
        >
            <div
                ref={triggerRef}
                className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-24"
            >
                {/* Header - Aligned with the global 1280px grid */}
                <div className="w-full max-w-[1280px] mx-auto px-6 md:px-24 mb-16">
                    {title && (
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent italic">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Horizontal Track Container */}
                <div className="relative w-full">
                    <div
                        ref={trackRef}
                        className={cn(
                            "flex flex-col lg:flex-row gap-8 lg:gap-12 will-change-transform w-full lg:w-max h-full",
                            trackPaddingClass,
                            "px-6 lg:pr-[10vw]", // Ensure horizontal cards have room on desktop, vertical spacing on mobile
                            contentClassName
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HorizontalScrollSection;
