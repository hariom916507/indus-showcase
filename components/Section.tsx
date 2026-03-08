"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
    id?: string;
    className?: string; // For background colors/patterns
    containerClassName?: string;
    children: React.ReactNode;
    as?: React.ElementType;
    initial?: "hidden" | "visible";
    noReveal?: boolean;
    fullHeight?: boolean;
}

const Section = ({
    id,
    className,
    containerClassName,
    children,
    as: Component = "section",
    noReveal = false,
    fullHeight = false
}: SectionProps) => {
    // Use a string-based approach or fallback to div if 'as' is provided
    const Tag = motion[Component as keyof typeof motion] || motion.section;

    return (
        <Tag
            id={id}
            initial={noReveal ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
                }
            }}
            className={cn(
                "relative w-full overflow-hidden flex flex-col items-center",
                fullHeight ? "h-full py-0" : "py-32 border-b border-border/40",
                className
            )}
        >
            <div className={cn("w-full max-w-[1280px] px-6 md:px-24", containerClassName)}>
                {children}
            </div>
        </Tag>
    );
};

export default Section;
