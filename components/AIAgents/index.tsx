"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import { MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/Interactions";
import { AGENTS_CONTENT } from "@/lib/constants";

const AgentCard = ({ agent, index }: { agent: typeof AGENTS_CONTENT.items[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Tilt intensity={10}>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8, y: 50 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: index * 0.1
            }
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-border/50 transition-all duration-500 hover:border-primary/30",
          isHovered ? cn("shadow-2xl shadow-primary/10", agent.glow) : "shadow-xl"
        )}
      >
        {/* Glow Effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("absolute inset-x-0 -bottom-2 h-1 bg-gradient-to-r rounded-full blur-md mx-12", agent.color)}
            />
          )}
        </AnimatePresence>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br", agent.color)}>
              <agent.icon size={28} />
            </div>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            </div>
          </div>

          {/* Identity */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold tracking-tight">{agent.name}</h3>
            <p className="text-sm font-semibold text-primary/80 uppercase tracking-widest">{agent.role}</p>
          </div>

          {/* Dynamic Description Window */}
          <div className="relative min-h-[4rem] mb-8 p-4 rounded-2xl bg-white dark:bg-slate-950/50 border border-border/50 transition-colors overflow-hidden">
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-sm">Hover to initialize agent link...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-medium leading-relaxed"
                >
                  {agent.description}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Metrics */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {Object.entries(agent.stats).map(([label, value]) => (
              <div key={label} className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">{label}</span>
                <span className="text-lg font-bold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

const AIAgents = () => {
  return (
    <Section id="aiagents" fullHeight className="bg-white dark:bg-slate-950">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <MessageSquare size={12} />
            <span>{AGENTS_CONTENT.header.badge}</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6">
            {AGENTS_CONTENT.header.title} <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">{AGENTS_CONTENT.header.highlight}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            {AGENTS_CONTENT.header.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {AGENTS_CONTENT.metrics.map((metric, i) => (
            <div key={i} className="flex-1 min-w-[120px] p-4 rounded-2xl bg-white dark:bg-slate-900 border border-border/50 text-center">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {AGENTS_CONTENT.items.map((agent, index) => (
          <AgentCard key={agent.id} agent={agent} index={index} />
        ))}
      </motion.div>
    </Section>
  );
};

export default AIAgents;
