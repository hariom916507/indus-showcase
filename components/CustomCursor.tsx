"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function CustomCursor() {
    const [cursorType, setCursorType] = useState('default');
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const cursorMode = target.getAttribute('data-cursor') || target.closest('[data-cursor]')?.getAttribute('data-cursor');

            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.getAttribute('role') === 'button';

            setCursorType(cursorMode || (isInteractive ? 'pointer' : 'default'));
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    const getCursorContent = () => {
        if (cursorType === 'reel') return "PLAY REEL";
        if (cursorType === 'close') return "CLOSE";
        if (cursorType === 'plus') return <Plus size={24} strokeWidth={2.5} className="text-white" />;
        return "";
    };

    const isHovered = cursorType !== 'default';
    const isSpecial = cursorType === 'reel' || cursorType === 'close' || cursorType === 'plus';

    return (
        <motion.div
            className="fixed top-0 left-0 bg-black rounded-full pointer-events-none z-[10000000] hidden md:flex items-center justify-center text-white font-bold text-[10px] uppercase text-center overflow-hidden whitespace-nowrap"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                x: "-50%",
                y: "-50%",
            }}
            initial={{
                width: 28,
                height: 28,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                opacity: 0
            }}
            animate={{
                width: cursorType === 'plus' ? 90 : (isSpecial ? 100 : (isHovered ? 60 : 28)),
                height: cursorType === 'plus' ? 90 : (isSpecial ? 100 : (isHovered ? 60 : 28)),
                backgroundColor: isHovered ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.8)",
                opacity: 1
            }}
            transition={{
                type: "spring",
                damping: 30,
                stiffness: 200,
                restDelta: 0.001
            }}
        >
            <AnimatePresence mode="wait">
                {isSpecial && (
                    <motion.span
                        key={cursorType}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="px-4"
                    >
                        {getCursorContent()}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
