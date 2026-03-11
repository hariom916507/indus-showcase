"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

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

            gsap.to(stickyRef.current, {
                x: panelWidth - viewportWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: start,
                    end: end,
                    scrub: 1,
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
                        <LogoCard key={idx} src={logo} delay={0} />
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

                    {/* RIGHT SIDE: Logo Grid */}
                    <div className="w-[70%] h-full flex items-center justify-center relative p-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="grid grid-cols-4 gap-4 lg:gap-6 w-full place-items-center"
                            >
                                {(currentPage === 0 ? page1 : currentPage === 1 ? page2 : page3).map((logo, idx) => (
                                    <LogoCard key={`${currentPage}-${idx}`} src={logo} delay={idx * 0.04} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
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

function LogoCard({ src, delay }: { src: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            className="group relative w-full aspect-[4/3] flex items-center justify-center p-1 bg-white rounded-[32px] border border-slate-100 hover:border-slate-200 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer"
        >
            <img
                src={src}
                alt="Partner Logo"
                className="max-h-full max-w-full object-contain opacity-100 scale-[0.99] group-hover:scale-105 transition-all duration-700"
            />
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-slate-50/0 to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
}
