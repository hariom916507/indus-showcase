"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "#hero" },
    { label: "PPA framework", href: "#framework" },
    { label: "Printpathshala", href: "#pathshala" },
    { label: "A PPC method", href: "#method" },
];

/**
 * 1. SideNav Component
 * This scrolls with the content (placed inside Hero panel).
 */
export const SideNav = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="absolute left-0 top-0 h-screen w-24 md:w-32 flex flex-col justify-center items-center gap-32 hidden lg:flex pointer-events-none z-[50] pl-3 md:pl-5">
            {mounted && (
                <>
                    {navItems.map((item, idx) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.4 + idx * 0.1,
                                duration: 1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="pointer-events-auto"
                        >
                            <Link
                                href={item.href}
                                className="text-[13px] font-black tracking-tight text-[#0f172a] hover:opacity-60 transition-all duration-300 whitespace-nowrap block rotate-[-90deg] origin-center uppercase"
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}

                    {/* Social Icons at the bottom of the scrollable sidebar */}
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 hidden lg:flex items-center gap-6 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="flex items-center gap-6"
                        >
                            <Link href="#" className="text-[#0f172a]/30 hover:text-[#0f172a] transition-all transform hover:scale-125">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-[#0f172a]/30 hover:text-[#0f172a] transition-all transform hover:scale-125">
                                <Globe size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
};

/**
 * 2. Main Header Component
 * This stays fixed at the top (Menu Button & Overlay).
 */
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100]">
            {mounted && (
                <>
                    {/* MENU TRIGGER (Top Right - Stable) */}
                    <div className="absolute top-0 right-0 p-6 md:p-10 pointer-events-auto z-[110]">
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex flex-col gap-[6px] p-4 group cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            <span className={cn("w-8 h-[2.5px] bg-[#0f172a] transition-all duration-300", isOpen && "rotate-45 translate-y-[8.5px]")} />
                            <span className={cn("w-8 h-[2.5px] bg-[#0f172a] transition-all duration-300", isOpen && "-rotate-45 -translate-y-[8.5px]")} />
                        </motion.button>
                    </div>

                    {/* Fullscreen Overlay Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-white z-[105] pointer-events-auto flex items-center justify-center"
                            >
                                <div className="flex flex-col gap-8 text-center">
                                    {navItems.map((item, idx) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-4xl md:text-7xl font-black text-[#0f172a] hover:text-[#ff2d55] transition-colors tracking-tighter"
                                            >
                                                {item.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};

export default Header;
