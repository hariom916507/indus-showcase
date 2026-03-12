"use client";

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import Image from "next/image";


if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ASSOCIATED_LOGOS = [
    "/Associated/Devtech.png",
    "/Associated/FAPGA.png",
    "/Associated/IMPA.png",
    "/Associated/MMS.png",
    "/Associated/Print Week Awards.png",
    "/Associated/Technova.png",
    "/Associated/Word Print Hub.png",
];

const CLIENT_LOGOS = [
    "/Clients Logo/Picture1.png",
    "/Clients Logo/Picture2.jpg",
    "/Clients Logo/Picture3.jpg",
    "/Clients Logo/Picture4.png",
    "/Clients Logo/Picture5.jpg",
    "/Clients Logo/Picture6.jpg",
    "/Clients Logo/Picture7.jpg",
    "/Clients Logo/Picture8.png",
    "/Clients Logo/Picture9.jpg",
    "/Clients Logo/Picture10.jpg",
    "/Clients Logo/Picture11.png",
    "/Clients Logo/Picture12.png",
    "/Clients Logo/Picture13.jpg",
    "/Clients Logo/Picture14.jpg",
    "/Clients Logo/Picture15.jpg",
    "/Clients Logo/Picture16.png",
    "/Clients Logo/Picture17.jpg",
    "/Clients Logo/Picture18.png",
    "/Clients Logo/Picture19.png",
    "/Clients Logo/Picture20.jpg",
    "/Clients Logo/Picture21.png",
    "/Clients Logo/Picture22.png",
];

const ALL_LOGOS = [...ASSOCIATED_LOGOS, ...CLIENT_LOGOS];

export default function Clients() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useLayoutEffect(() => {
        if (isMobile) return;

        let ctx = gsap.context(() => {
            if (!sectionRef.current || !stickyRef.current) return;

            const myPanel = sectionRef.current.closest('.horizontal-panel') as HTMLElement;
            if (!myPanel) return;

            const getStartIndex = () => {
                const panels = Array.from(document.querySelectorAll('.horizontal-panel'));
                const myIndex = panels.indexOf(myPanel);
                let start = 0;
                for (let i = 0; i < myIndex; i++) {
                    start += (panels[i] as HTMLElement).offsetWidth;
                }
                return start;
            };

            gsap.to(stickyRef.current, {
                x: () => {
                    const panelWidth = myPanel.offsetWidth;
                    const viewportWidth = window.innerWidth;
                    return (panelWidth - viewportWidth);
                },
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: () => getStartIndex(),
                    end: () => {
                        const start = getStartIndex();
                        const panelWidth = myPanel.offsetWidth;
                        const viewportWidth = window.innerWidth;
                        return start + (panelWidth - viewportWidth);
                    },
                    scrub: 0.5, // Tighter sync for snappier feel
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        setProgress(self.progress);
                    }
                }
            });
        });

        return () => ctx.revert();
    }, [isMobile]);




    // Split into 3 pages (Page 1: 12, Page 2: 12, Page 3: 5)
    const page1 = ALL_LOGOS.slice(0, 12);
    const page2 = ALL_LOGOS.slice(12, 24);
    const page3 = ALL_LOGOS.slice(24, 29);

    const currentPage = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;

    if (isMobile) {
        return (
            <div className="w-full bg-white py-20 px-6 flex flex-col gap-12">
                <div className="space-y-6">
                    <span className="inline-block px-4 py-1.5 bg-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white">
                        Global Collaborations
                    </span>
                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
                        Our <br />
                        <span className="text-slate-200">Partners</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-sm">
                        We are proud to collaborate with industry leaders and innovation pioneers worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {ALL_LOGOS.map((logo, idx) => (
                        <LogoCard key={idx} src={logo} delay={0} priority={idx < 4} />
                    ))}
                </div>

            </div>
        );
    }

    return (
        <div ref={sectionRef} className="relative w-[300vw] h-full bg-slate-50 overflow-hidden flex">
            {/* STICKY CONTAINER */}
            <div
                ref={stickyRef}
                className="absolute left-0 top-0 w-screen h-screen z-50 flex items-center overflow-hidden will-change-transform"
            >
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(241,245,249,1)_0%,rgba(255,255,255,1)_100%)]" />

                <div className="relative w-full h-full flex px-10 lg:px-16">

                    {/* LEFT SIDE: Content (Sticky logic) */}
                    <div className="w-[30%] h-full flex flex-col justify-between pt-20 pb-20 gap-6">
                        <div className="space-y-6 max-w-md">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-block px-6 py-2 bg-slate-900 rounded-full text-[12px] font-black uppercase tracking-[0.35em] text-white shadow-xl shadow-slate-900/10"
                            >
                                Global Collaborations
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-[3.0rem] font-black text-slate-950 tracking-tighter leading-[1.1] z-10 relative"
                            >
                                Our <br />
                                Partners
                            </motion.h2>
                        </div>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-4">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={`h-[2px] rounded-full transition-all duration-700 ${currentPage === i ? 'w-16 bg-slate-900' : 'w-4 bg-slate-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="w-[70%] h-full flex items-center justify-center relative p-2">
                        {[page1, page2, page3].map((page, pIdx) => (
                            <motion.div
                                key={pIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: currentPage === pIdx ? 1 : 0,
                                    y: currentPage === pIdx ? 0 : (currentPage < pIdx ? 20 : -20),
                                    scale: currentPage === pIdx ? 1 : 0.98,
                                    pointerEvents: currentPage === pIdx ? "auto" : "none"
                                }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="grid grid-cols-4 gap-4 lg:gap-6 w-full place-items-center absolute"
                            >
                                {page.map((logo, idx) => (
                                    <LogoCard
                                        key={`${pIdx}-${idx}`}
                                        src={logo}
                                        delay={currentPage === pIdx ? idx * 0.01 : 0}
                                        priority={true}
                                    />
                                ))}
                            </motion.div>
                        ))}
                    </div>



                </div>
            </div>

            {/* SPACERS FOR GSAP PROGRESS */}
            <div className="flex">
                <div className="w-screen h-screen flex-shrink-0" />
                <div className="w-screen h-screen flex-shrink-0" />
                <div className="w-screen h-screen flex-shrink-0" />
            </div>
        </div>
    );
}

function LogoCard({ src, delay, priority = false }: { src: string; delay: number; priority?: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            className="group relative w-full aspect-[4/3] flex items-center justify-center p-2 bg-white rounded-[24px] lg:rounded-[32px] border border-slate-100 hover:border-slate-200 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer"
        >
            <div className="relative w-4/5 h-4/5">
                <Image
                    src={src}
                    alt="Partner Logo"
                    fill
                    sizes="(max-width: 768px) 30vw, 15vw"
                    priority={priority}
                    className="object-contain opacity-100 scale-[0.95] group-hover:scale-105 transition-all duration-700"
                />
            </div>
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 rounded-[24px] lg:rounded-[32px] bg-gradient-to-br from-slate-50/0 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
}

