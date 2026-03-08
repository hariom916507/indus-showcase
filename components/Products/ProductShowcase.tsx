"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ProductType } from "./types";

export function ProductPanel({ product }: { product: ProductType }) {
    return (
        <div className={`w-full h-full flex items-center relative overflow-hidden ${product.bg}`}>
            {/* LEFT SIDE (45%) */}
            <div className="w-[45%] h-full flex flex-col justify-center px-16 lg:px-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="space-y-2">
                        <span className={`text-[12px] font-bold uppercase tracking-[0.45em] ${product.accent}`}>
                            {product.category}
                        </span>
                        <h2 className="text-[72px] font-bold text-slate-900 leading-[1.1] tracking-tighter">
                            {product.title}
                        </h2>
                        <p className="text-xl font-medium text-slate-500 italic">
                            {product.tagline}
                        </p>
                    </div>

                    <p className="text-[20px] text-slate-600 leading-relaxed max-w-lg">
                        {product.description}
                    </p>

                    <ul className="space-y-4">
                        {product.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-4 text-slate-700 font-medium whitespace-nowrap">
                                <div className={`w-6 h-6 rounded-full ${product.accent.replace('text-', 'bg-')}/10 flex items-center justify-center flex-shrink-0`}>
                                    <Check className={`w-4 h-4 ${product.accent}`} />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <motion.button
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all w-fit"
                    >
                        Explore Product &rarr;
                    </motion.button>
                </motion.div>
            </div>

            {/* RIGHT SIDE (55%) */}
            <div className="w-[55%] h-full relative flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-black/[0.04] font-black tracking-tighter leading-none whitespace-nowrap z-0 origin-center uppercase"
                        style={{ fontSize: '18vw' }}
                    >
                        {product.title.split(' ').pop()}
                    </div>
                </div>

                <div
                    className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0"
                    style={{
                        background: `radial-gradient(circle, ${product.accent === 'text-slate-800' ? 'rgba(0,0,0,0.05)' : product.accent.replace('text-', 'rgba(').replace('-600', ',0.15)')}, transparent 70%)`
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 perspective-1000"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative drop-shadow-[0_50px_100px_rgba(0,0,0,0.15)]"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-[70vh] w-auto pointer-events-none"
                        />
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/10 blur-[40px] rounded-full -z-10" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
