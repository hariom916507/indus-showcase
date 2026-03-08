"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { SERVICES_CONTENT } from "@/lib/constants";

import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const ServiceCard = ({ title, description, icon: Icon, index }: ServiceCardProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1, duration: 0.6, ease: "easeOut" }
      }
    }}
    className="group p-8 rounded-3xl bg-white dark:bg-slate-900 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 cursor-default"
  >
    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300 group-hover:text-white">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
);

const Services = () => {
  return (
    <Section id="services" fullHeight>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{SERVICES_CONTENT.header.title}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {SERVICES_CONTENT.header.subtitle}
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SERVICES_CONTENT.items.map((service, index) => (
          <ServiceCard key={index} {...service} index={index} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Services;
