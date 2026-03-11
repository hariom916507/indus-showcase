"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Building2, Tag, BookOpen, Layers, Printer } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const VERTICAL_CARDS = [
    {
        title: "Packaging",
        description: "Premium structural design and production for high-end consumer goods. From luxury cosmetics to fragile electronics, we ensure protection meets presentation.",
        tagline: "Durability & Design Combined",
        bgWord: "PACKAGING",
        illustration: "/images/packaging-3d.png",
        icon: <Box className="w-8 h-8 text-indigo-600" />,
        accent: "text-indigo-600",
        glow: "rgba(99,102,241,0.15)"
    },
    {
        title: "Commercial",
        description: "High-volume precision printing for marketing collateral, brochures, and corporate identity. Consistent brand representation across every piece.",
        tagline: "Scale Your Business Presence",
        bgWord: "COMMERCIAL",
        illustration: "/images/commercial-3d.png",
        icon: <Building2 className="w-8 h-8 text-emerald-600" />,
        accent: "text-emerald-600",
        glow: "rgba(16,185,129,0.15)"
    },
    {
        title: "Flexo Labels",
        description: "Advanced label solutions for food, beverage, and pharmaceutical industries. Durable, vibrant, and perfectly finished for any surface.",
        tagline: "Stick with Quality",
        bgWord: "FLEXO",
        illustration: "/images/flexo-3d.png",
        icon: <Tag className="w-8 h-8 text-amber-600" />,
        accent: "text-amber-600",
        glow: "rgba(245,158,11,0.15)"
    },
    {
        title: "Publication",
        description: "Delivering high-quality magazines, books, and journals with professional binding and archival-grade paper selections.",
        tagline: "Stories Told in High Definition",
        bgWord: "PUBLICATION",
        illustration: "/images/publication-3d.png",
        icon: <BookOpen className="w-8 h-8 text-pink-600" />,
        accent: "text-pink-600",
        glow: "rgba(236,72,153,0.15)"
    },
    {
        title: "Corrugation",
        description: "Robust shipping and display solutions. Engineering strength into corrugated board for global supply chains and retail environments.",
        tagline: "The Backbone of Logistics",
        bgWord: "CORRUGATION",
        illustration: "/images/corrugation-3d.png",
        icon: <Layers className="w-8 h-8 text-violet-600" />,
        accent: "text-violet-600",
        glow: "rgba(139,92,246,0.15)"
    },
    {
        title: "Large Format",
        description: "Impactful wide-format solutions for billboards, banners, and fleet wraps. Extreme durability for outdoor environments.",
        tagline: "Bigger. Bolder. Brighter.",
        bgWord: "LARGE FORMAT",
        illustration: "/images/large-format-3d.png",
        icon: <Printer className="w-8 h-8 text-sky-600" />,
        accent: "text-sky-600",
        glow: "rgba(14,165,233,0.15)"
    }
];

export default function VerticalsStack() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const scrollRange = useRef({ start: 0, end: 0 });
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        let ctx = gsap.context(() => {
            if (!sectionRef.current || !stickyRef.current) return;

            const panels = Array.from(document.querySelectorAll('.horizontal-panel'));
            const myPanel = sectionRef.current.closest('.horizontal-panel') as HTMLElement;
            if (!myPanel) return;

            const myIndex = panels.indexOf(myPanel);
            let start = 0;
            for (let i = 0; i < myIndex; i++) {
                start += (panels[i] as HTMLElement).offsetWidth;
            }

            const panelWidth = myPanel.offsetWidth;
            const viewportWidth = window.innerWidth;
            const end = start + (panelWidth - viewportWidth);

            scrollRange.current = { start, end };

            // Use a proper GSAP tween with scrub matching global lag (1) to eliminate shaking
            gsap.to(stickyRef.current, {
                x: panelWidth - viewportWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: start,
                    end: end,
                    scrub: 1, // MATCHED to global scrub for stability
                    onUpdate: (self) => {
                        setProgress(self.progress);
                    }
                }
            });
        });

        return () => ctx.revert();
    }, [isMobile]);

    if (isMobile) {
        return (
            <div className="w-full bg-white py-20 px-6 flex flex-col gap-20">
                <div className="space-y-6">
                    <span className="inline-block px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 border border-slate-200">
                        Specialized Verticals
                    </span>
                    <h2 className="text-6xl font-bold text-slate-900 tracking-tighter leading-[0.8]">
                        Printing <br />
                        <span className="text-slate-300 italic font-serif">Solutions</span>
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium max-w-sm">
                        Robust engineering meets creative precision across our industrial printing spectrum.
                    </p>
                </div>

                <div className="flex flex-col gap-24">
                    {VERTICAL_CARDS.map((card, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center">
                            {/* Card Decoration */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-50"
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    background: `radial-gradient(circle, ${card.glow}, transparent 70%)`,
                                    filter: 'blur(60px)',
                                    zIndex: 0
                                }}
                            />

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-8 border border-slate-50">
                                    {card.icon}
                                </div>
                                <img
                                    src={card.illustration}
                                    alt={card.title}
                                    className="h-40 w-auto mb-6 drop-shadow-2xl"
                                />
                                <span className={`text-[10px] font-bold tracking-[0.4em] uppercase ${card.accent} mb-3`}>
                                    {card.tagline}
                                </span>
                                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                                    {card.title}
                                </h3>
                                <p className="text-slate-600 text-base leading-relaxed max-w-xs font-medium">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="relative w-full h-full bg-white overflow-hidden flex">

            {/* STICKY CONTAINER */}
            <div
                ref={stickyRef}
                className="absolute left-0 top-0 w-screen h-screen z-50 flex overflow-hidden will-change-transform"
            >
                {/* Left side (40%) - Image Area */}
                <div className="w-[40vw] h-full relative z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.2)] overflow-hidden">
                    <img
                        src="/images/printing-verticals.jpg"
                        alt="Production"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-white/10" />

                    <div className="absolute inset-x-12 top-20">
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white border border-white/20">
                                Specialized Verticals
                            </span>
                            <h2 className="text-[5.5rem] font-bold text-white tracking-tighter leading-[0.8]">
                                Printing <br />
                                <span className="text-white/30 italic font-serif">Solutions</span>
                            </h2>
                        </div>
                    </div>

                    <div className="absolute bottom-20 left-12 right-12">
                        <div className="bg-black/20 backdrop-blur-3xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
                            <p className="text-white/80 text-lg leading-relaxed font-medium">
                                Robust engineering meets creative precision across our industrial printing spectrum.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side (60%) - Card Stack Area */}
                <div className="w-[60vw] h-full relative bg-slate-50 flex items-center justify-center p-20 z-10">
                    <div className="relative w-full max-w-2xl h-[80vh] flex items-center justify-center">
                        {VERTICAL_CARDS.map((card, idx) => (
                            <StackingCard
                                key={idx}
                                card={card}
                                index={idx}
                                globalProgress={progress}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* SPACER ELEMENTS */}
            <div className="flex flex-nowrap h-full">
                {VERTICAL_CARDS.map((_, i) => (
                    <div key={i} className="w-[100vw] h-screen flex-shrink-0" />
                ))}
            </div>
        </div>
    );
}

function StackingCard({ card, index, globalProgress }: { card: any, index: number, globalProgress: number }) {
    const threshold = 1 / VERTICAL_CARDS.length;

    let y = "100%";
    let scale = 1;
    let opacity = 0;
    let filter = "none";

    if (index === 0) {
        y = "0%";
        opacity = 1;
    } else {
        const start = (index - 0.5) * threshold;
        const end = index * threshold;
        const p = Math.max(0, Math.min(1, (globalProgress - start) / (end - start)));
        y = `${100 - (p * 100)}%`;
        opacity = p > 0 ? 1 : 0;
    }

    const currentActiveIndex = Math.floor(globalProgress / threshold);
    if (index === currentActiveIndex) {
        const localProg = (globalProgress % threshold) / threshold;
        scale = 1 - (localProg * 0.05);
        opacity = 1;
        filter = "none";
    } else if (index < currentActiveIndex) {
        scale = 0.95;
        opacity = 1;
        filter = "none";
    }

    return (
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
                zIndex: 10 + index,
                y,
                scale,
                opacity,
                filter,
                transformOrigin: "center bottom"
            }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
            {/* AMBIENT GLOW */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{
                    width: '600px',
                    height: '600px',
                    background: `radial-gradient(circle, ${card.glow}, transparent 70%)`,
                    filter: 'blur(100px)',
                    zIndex: -1
                }}
            />

            {/* CARD CONTAINER */}
            <motion.div
                className="relative w-full h-[90%] bg-gradient-to-b from-white to-[#f8fafc] rounded-[64px] p-12 shadow-[0_40px_120px_rgba(0,0,0,0.08)] border border-black/[0.05] flex flex-col items-center text-center justify-center pointer-events-auto"
                whileHover={{
                    scale: 1.02,
                    boxShadow: "0 60px 140px rgba(0,0,0,0.12)"
                }}
                transition={{ duration: 0.4 }}
            >
                {/* LARGE BACKGROUND WORD CONTAINER (with its own overflow control) */}
                <div className="absolute inset-0 rounded-[64px] overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-black/[0.02] font-extrabold tracking-tighter leading-none whitespace-nowrap z-0"
                        style={{ fontSize: '12vw' }}
                    >
                        {card.bgWord}
                    </div>
                </div>

                {/* FLOATING ICON BADGE - Straddling the top edge */}
                <motion.div
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-[100px] h-[100px] rounded-[32px] bg-white flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-50 border border-slate-50"
                    animate={{
                        y: [0, -10, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {card.icon}
                </motion.div>

                {/* INDUSTRY ILLUSTRATION */}
                <div className="h-48 flex items-center justify-center mb-6 relative z-10">
                    <img
                        src={card.illustration}
                        alt={card.title}
                        className="max-h-full w-auto opacity-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                    />
                </div>

                <span className={`text-[10px] font-bold tracking-[0.45em] uppercase ${card.accent} mb-4 relative z-10`}>
                    {card.tagline}
                </span>

                <h3 className="text-6xl font-extrabold text-slate-900 tracking-tight mb-4 leading-none relative z-10">
                    {card.title}
                </h3>

                <p className="text-lg text-slate-600 max-w-sm leading-relaxed mb-10 font-medium relative z-10">
                    {card.description}
                </p>

                {/* PROGRESS INDICATOR */}
                <div className="absolute bottom-10 inset-x-0 flex justify-center gap-3 z-10">
                    {VERTICAL_CARDS.map((_, i) => {
                        const isActive = i === currentActiveIndex;
                        return (
                            <div
                                key={i}
                                className={`h-[6px] rounded-full transition-all duration-700 ${isActive
                                    ? `w-[40px] ${card.accent.replace('text-', 'bg-')} shadow-[0_0_15px_rgba(0,0,0,0.2)]`
                                    : 'w-[12px] bg-black/5'
                                    }`}
                            />
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}
