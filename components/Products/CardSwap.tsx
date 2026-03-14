"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, LayoutGrid, X, ArrowUpRight } from "lucide-react";
import { PRODUCT_DATA, ProductType } from "./data";

const TOTAL = PRODUCT_DATA.length;
const STACK_SIZE = 3;

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Single Card                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function ProductCard({ product, slot }: { product: ProductType; slot: number }) {
    const glowRgba = `${product.hex}20`;
    return (
        <motion.div
            layout
            layoutId={product.id}
            style={{
                zIndex: 40 - slot,
                position: "absolute",
                inset: 0,
                boxShadow: `0 ${30 + slot * 10}px ${70 + slot * 20}px -20px rgba(0,0,0,0.12), 0 10px 20px -10px rgba(0,0,0,0.05)`,
            }}
            initial={{ opacity: 0, y: 50, x: 0, scale: 0.9, rotate: 0 }}
            animate={{ scale: 1 - slot * 0.048, y: slot * 26, x: 0, rotate: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9, rotate: 0, transition: { duration: 0.4, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 260, damping: 28, delay: slot * 0.05 }}
            className="rounded-[40px] bg-white border border-slate-100 overflow-hidden flex items-center justify-center"
        >
            {slot > 0 && (
                <div
                    className="absolute inset-0 z-20 rounded-[40px]"
                    style={{ backdropFilter: `blur(${slot * 1.5}px)`, backgroundColor: `rgba(255,255,255,${slot * 0.05})` }}
                />
            )}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="font-black tracking-tighter leading-none uppercase whitespace-nowrap" style={{ fontSize: "8rem", color: product.hex, opacity: 0.04 }}>
                    {product.title.split(" ").pop()}
                </span>
            </div>
            <div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 340, height: 340, background: `radial-gradient(circle, ${glowRgba}, transparent 68%)`, filter: "blur(50px)" }}
            />
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 flex items-center justify-center w-full h-full p-8">
                <img src={product.image} alt={product.title} className="max-h-[84%] w-auto object-contain" style={{ filter: "drop-shadow(0 28px 56px rgba(0,0,0,0.13))" }} draggable={false} />
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Main Section                                                                */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function ProductCardSwap() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showGrid, setShowGrid] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const advance = useCallback(() => {
        if (showGrid) return;
        setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, [showGrid]);

    useEffect(() => {
        const id = setInterval(advance, 3000);
        return () => clearInterval(id);
    }, [advance]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowGrid(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Scroll lock for the main page when popup is open
    useEffect(() => {
        const root = document.documentElement;
        if (showGrid) {
            document.body.style.overflow = "hidden";
            root.style.overflow = "hidden";
            document.body.setAttribute("data-lenis-prevent", "true");
        } else {
            document.body.style.overflow = "";
            root.style.overflow = "";
            document.body.removeAttribute("data-lenis-prevent");
        }
        return () => {
            document.body.style.overflow = "";
            root.style.overflow = "";
            document.body.removeAttribute("data-lenis-prevent");
        };
    }, [showGrid]);

    const ap = PRODUCT_DATA[activeIndex];
    const stackProducts = Array.from({ length: STACK_SIZE }, (_, i) =>
        PRODUCT_DATA[(activeIndex + i) % TOTAL]
    );

    const handleSelectProduct = (index: number) => {
        setActiveIndex(index);
        setShowGrid(false);
    };

    const gridOverlay = (
        <AnimatePresence>
            {showGrid && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-12 lg:p-20"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* LIGHT SOFT BLUR BACKDROP */}
                    <motion.div
                        initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0)" }}
                        animate={{ backdropFilter: "blur(40px)", backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                        exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0)" }}
                        onClick={() => setShowGrid(false)}
                        className="absolute inset-0 cursor-zoom-out"
                    />

                    {/* CONTENT WRAPPER */}
                    <motion.div
                        initial={{ y: 60, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 60, opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="relative w-full max-w-7xl h-full flex flex-col z-[1000000] bg-white/60 border border-white/80 rounded-[48px] shadow-[0_40px_120px_rgba(0,0,0,0.08)] overflow-hidden"
                    >
                        {/* POPUP HEADER - FIXED AT TOP */}
                        <div className="p-8 md:p-12 border-b border-white/40 bg-white/20 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-8 bg-indigo-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-indigo-600">Product Directory</span>
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                                        All <span className="text-slate-300">Solutions.</span>
                                    </h2>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-50">
                                        <span className="text-2xl font-bold text-slate-900 tracking-tighter">{TOTAL}</span>
                                        <div className="h-6 w-[1px] bg-slate-100" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Catalog</span>
                                    </div>

                                    {/* EXPLICIT CLOSE OPTION */}
                                    <button
                                        onClick={() => setShowGrid(false)}
                                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:scale-105 active:scale-95 transition-all text-sm group"
                                    >
                                        <X size={18} className="transition-transform group-hover:rotate-90" />
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SCROLLABLE GRID AREA */}
                        <div 
                            className="flex-grow overflow-y-auto no-scrollbar p-8 md:p-12 relative"
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                            onScroll={(e) => e.stopPropagation()}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                                {PRODUCT_DATA.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.04 }}
                                        onClick={() => handleSelectProduct(i)}
                                        className="group relative flex flex-col bg-white rounded-[32px] border border-slate-100 overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)]"
                                    >
                                        {/* Image Hub */}
                                        <div className="relative h-[220px] flex items-center justify-center p-8 bg-slate-50/50 overflow-hidden">
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                                style={{ background: `radial-gradient(circle at center, ${product.hex}15, transparent 70%)` }}
                                            />
                                            <img 
                                                src={product.image} 
                                                alt={product.title} 
                                                className="max-h-full w-auto object-contain z-10 transition-transform duration-700 group-hover:scale-110"
                                                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
                                            />
                                        </div>

                                        {/* Info Hub */}
                                        <div className="p-8 flex flex-col flex-grow bg-white">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.hex }} />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: product.hex }}>{product.category}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{product.title}</h3>
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-6">{product.description}</p>
                                            
                                            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                                <span className="text-[9px] font-bold text-slate-300 group-hover:text-slate-900 transition-colors uppercase">Select solution</span>
                                                <div 
                                                    className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-800 group-hover:text-white transition-all shadow-sm"
                                                >
                                                    <ArrowUpRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div
            className="relative w-full h-full overflow-hidden"
            style={{ background: "linear-gradient(140deg, #F7F9FC 0%, #EDF0F7 100%)" }}
        >
            <div className="absolute inset-0 flex items-center">
                {/* Right Edge Blend Overlay */}
                <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent z-[50] pointer-events-none" />
                
                {/* Ambient glow */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={ap.id + "_glow"}
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ background: `radial-gradient(ellipse 50% 55% at 72% 50%, ${ap.hex}0D, transparent 70%)` }}
                    />
                </AnimatePresence>

                <div className="relative flex flex-col lg:flex-row w-full h-full px-6 md:px-16 lg:px-28 items-center gap-12 py-20 lg:py-0">

                    {/* ── INFO PANEL ── */}
                    <div className="w-full lg:w-[42%] flex flex-col justify-center shrink-0 relative z-10 order-2 lg:order-1">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="h-[2px] w-8 bg-slate-200" />
                            <span className="text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">Product Suite</span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={ap.id + "_info"}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="space-y-5"
                            >
                                <span className="block text-[12px] font-bold uppercase tracking-[0.45em]" style={{ color: ap.hex }}>
                                    {ap.category}
                                </span>
                                <h2 className="text-[32px] md:text-[56px] font-black text-slate-900 leading-[1.05] tracking-tighter">
                                    {ap.title}
                                </h2>
                                <p className="text-sm md:text-base font-medium text-slate-500 italic">{ap.tagline}</p>
                                <p className="text-[15px] md:text-[17px] text-slate-600 leading-relaxed max-w-[390px]">{ap.description}</p>

                                <ul className="space-y-3">
                                    {ap.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 text-[14px] md:text-[15px] font-medium">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${ap.hex}18` }}>
                                                <Check className="w-3 h-3" strokeWidth={3} style={{ color: ap.hex }} />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={{ x: 6, scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="mt-1 flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[15px] text-white w-fit"
                                    style={{ background: "#0F172A", boxShadow: "0 12px 40px rgba(0,0,0,0.16)" }}
                                >
                                    Explore Product →
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-10 flex flex-wrap items-center gap-3">
                            <span className="text-[13px] font-mono tabular-nums">
                                <span style={{ color: ap.hex }}>{String(activeIndex + 1).padStart(2, "0")}</span>
                                <span className="text-slate-300 mx-1">/</span>
                                <span className="text-slate-400">{String(TOTAL).padStart(2, "0")}</span>
                            </span>

                            <div className="w-[90px] h-[3px] bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    animate={{ width: `${((activeIndex + 1) / TOTAL) * 100}%` }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    style={{ background: ap.hex }}
                                />
                            </div>

                            <div className="flex gap-1.5 flex-wrap max-w-full lg:max-w-[150px]">
                                {PRODUCT_DATA.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className="h-[5px] rounded-full transition-all duration-300 cursor-pointer"
                                        style={{
                                            width: i === activeIndex ? 18 : 6,
                                            background: i === activeIndex ? ap.hex : "#CBD5E1",
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setShowGrid(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 text-[11px] font-black uppercase tracking-[0.35em] transition-all hover:scale-105 active:scale-95"
                                style={{ borderColor: ap.hex, color: ap.hex, background: `${ap.hex}0D` }}
                            >
                                <LayoutGrid size={13} strokeWidth={2.5} />
                                View All
                            </button>
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 h-[350px] md:h-full flex items-center justify-center relative order-1 lg:order-2" style={{ perspective: "1100px" }}>
                        <div className="relative scale-[0.6] min-[390px]:scale-[0.7] sm:scale-75 md:scale-100 origin-center" style={{ width: 480, height: 580 }}>
                            <AnimatePresence>
                                {stackProducts.map((product, slot) => (
                                    <ProductCard key={product.id} product={product} slot={slot} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* PORTAL FOR GRID OVERLAY */}
            {mounted && typeof document !== "undefined" && createPortal(gridOverlay, document.body)}
        </div>
    );
}
