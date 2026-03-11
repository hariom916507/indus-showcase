"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

/**
 * ScrollProgress
 * A thin, elegant progress bar at the bottom of the screen.
 * Inspired by the Firma template but refined to be thinner.
 */
export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    // Smooth the progress for that premium feel
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 h-[2px] bg-black origin-left z-[99999] pointer-events-none"
            style={{ scaleX }}
        />
    );
};
