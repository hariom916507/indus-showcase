"use client";

import React from "react";
import Section from "@/components/Section";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { USE_CASES_CONTENT } from "@/lib/constants";

const UseCaseCard = ({ item }: { item: typeof USE_CASES_CONTENT.items[0] }) => (
  <div className="flex-shrink-0 w-full md:w-[400px] p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-border/50 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:border-primary/30 shadow-sm">
    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10", item.color)} />

    <div>
      <div className={cn("w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-border/50 flex items-center justify-center mb-6", item.iconColor)}>
        <item.icon size={28} />
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed italic">
        {item.description}
      </p>
    </div>

    <div className="mt-8 flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all cursor-pointer">
      Learn More <ArrowRight size={18} />
    </div>
  </div>
);

const UseCases = () => {
  return (
    <Section id="usecases" fullHeight className="bg-white dark:bg-slate-950">
      <div className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">{USE_CASES_CONTENT.header.badge}</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-4">
            {USE_CASES_CONTENT.header.title} <span className="text-primary">{USE_CASES_CONTENT.header.highlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
            {USE_CASES_CONTENT.header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {USE_CASES_CONTENT.items.map((useCase, index) => (
            <UseCaseCard key={index} item={useCase} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default UseCases;
