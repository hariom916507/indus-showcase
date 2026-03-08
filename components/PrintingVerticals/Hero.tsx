"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PrintingVerticals() {
    return (
        <section className="relative w-full h-full flex flex-row overflow-hidden bg-white">
            {/* Left side image - 40% width, top to bottom */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="w-[40%] h-full relative"
            >
                <img
                    src="/images/printing-verticals.jpg"
                    alt="Printing Production Vertical"
                    className="absolute inset-0 w-full h-full object-cover shadow-2xl"
                />
                {/* Subtle gradient overlay to blend into white */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/5 pointer-events-none" />
            </motion.div>

            {/* Right side - 60% blank white */}
            <div className="w-[60%] h-full bg-white" />
        </section>
    );
}
