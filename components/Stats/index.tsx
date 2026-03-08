"use client";

import React from "react";
import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import { STATS_CONTENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Premium SaaS "Results & Impact" Section
 * Replaces the basic stats display with a powerful, modern, and visually rich layout.
 */
const Stats = () => {
  return (
    <section id="stats" className="relative w-full bg-white transition-colors duration-500 pb-20 md:pb-32 overflow-hidden min-h-[85vh] flex items-center">

      {/* 1. ENHANCED RAINBOW LIGHT BACKGROUND - Vibrant and Fluid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.75]">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-15%] w-[80%] h-[80%] bg-pink-200/50 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 80, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-15%] w-[70%] h-[70%] bg-indigo-200/60 blur-[170px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[5%] w-[55%] h-[55%] bg-amber-200/50 blur-[160px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 70, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] left-[10%] w-[50%] h-[50%] bg-emerald-200/50 blur-[140px] rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 w-full pt-10 md:pt-16">

        {/* 2. SECTION HEADER (Minimalist & Left Aligned) */}
        <div className="flex flex-col items-start text-left mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl antialiased"
          >
            <h2
              className="text-[10px] md:text-[15px] lg:text-[20px] tracking-[-0.01em] leading-[1.4] text-[#0f172a] font-lexend"
            >
              <span className="font-bold font-lexend">Some numbers we&apos;re proud of</span> — <span className="text-[#64748b] font-normal font-lexend">not for bragging, but because they reflect real partnerships and real results.</span>
            </h2>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-full" />
              <span className="text-sm md:text-base font-bold text-[#0f172a] border-b-2 border-[#0f172a] pb-0.5 group-hover:pb-1 transition-all">
                Let&apos;s work together
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* 3. ALIGNED & FLOATING STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 md:gap-y-16">
          {STATS_CONTENT.map((stat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.2,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col items-center md:items-start"
              >
                {/* FLOATING ANIMATION WRAPPER */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5 + (idx % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.3
                  }}
                  className="w-full flex flex-col items-center md:items-start"
                >
                  {/* Handwritten Number */}
                  <div
                    className="text-[60px] md:text-[80px] lg:text-[96px] leading-none text-[#0f172a] select-none italic font-medium"
                    style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                  >
                    <div className="flex items-baseline">
                      <Counter value={stat.value} />
                      <span className="text-[0.6em] ml-[-0.05em]">{stat.suffix}</span>
                    </div>
                  </div>

                  {/* Label Below */}
                  <div className="mt-2 text-center md:text-left">
                    <p className="text-[17px] md:text-[20px] font-medium text-[#0f172a] leading-tight font-lexend">
                      {stat.label}
                    </p>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-[#94a3b8] mt-2 font-lexend opacity-70">
                      {idx === 0 && "Across Global Enterprises"}
                      {idx === 1 && "Dedicated AI Experts"}
                      {idx === 2 && "Global Presence"}
                      {idx === 3 && "Industry Knowledge"}
                      {idx === 4 && "Active Monthly Scale"}
                      {idx === 5 && "Consultations Weekly"}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Stats;
