"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUCCESS_STORIES_CONTENT } from "@/lib/constants";

const SuccessCard = ({ story, index }: { story: typeof SUCCESS_STORIES_CONTENT.items[0]; index: number }) => (
  <motion.div
    viewport={{ once: false, amount: 0.5 }}
    initial={{ scale: 0.95, opacity: 0.5 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative flex-shrink-0 w-full h-[60vh] md:h-[80vh] rounded-[30px] md:rounded-[40px] overflow-hidden group snap-center"
  >
    {/* Story Image */}
    <Image
      src={story.image}
      alt={story.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={index === 0}
      loading={index === 0 ? "eager" : "lazy"}
      className="object-cover group-hover:scale-105 transition-transform duration-1000"
    />

    {/* Gradient Overlay */}
    <div className={cn("absolute inset-0 bg-gradient-to-b transition-opacity duration-500", story.color, "opacity-60 group-hover:opacity-40")} />

    {/* Play Button Indicator */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
      <Play className="text-white fill-white" size={32} />
    </div>

    {/* Content Overlay */}
    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-[32px] max-w-xl">
        <div className="flex justify-between items-start mb-4">
          <span className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold uppercase tracking-wider">
            {story.metric}
          </span>
          <ArrowUpRight className="text-white opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-none">
          {story.title}
        </h3>
        <p className="text-lg text-white/80 leading-relaxed font-medium">
          {story.description}
        </p>
      </div>
    </div>
  </motion.div>
);

const SuccessStories = () => {
  return (
    <Section id="successstories" fullHeight>
      <div className="max-w-2xl mb-16">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">{SUCCESS_STORIES_CONTENT.header.badge}</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-4">
          {SUCCESS_STORIES_CONTENT.header.title} <span className="text-primary italic">{SUCCESS_STORIES_CONTENT.header.highlight}</span> {SUCCESS_STORIES_CONTENT.header.suffix}
        </h2>
      </div>

      <div className="flex flex-col gap-12 overflow-y-auto no-scrollbar snap-y snap-mandatory h-[85vh] pr-4">
        {SUCCESS_STORIES_CONTENT.items.map((story, index) => (
          <SuccessCard key={index} story={story} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default SuccessStories;
