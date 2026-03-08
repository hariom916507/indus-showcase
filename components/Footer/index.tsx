"use client";

import Section from "@/components/Section";
import React from 'react';
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "FinBot-X", href: "#" },
        { label: "OpsCore", href: "#" },
        { label: "DataSense", href: "#" },
        { label: "NetGuard", href: "#" },
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Financial Services", href: "#" },
        { label: "Supply Chain", href: "#" },
        { label: "Retail Logistics", href: "#" },
        { label: "HR Automation", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Security", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-border/40 overflow-hidden">
      <Section id="footer" noReveal className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Brand Section */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-3xl font-black tracking-tight text-[#0f172a] mb-6 font-lexend">
              Indas <span className="italic">Analytics.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mb-10">
              The first autonomous AI agent layer designed specifically for enterprise ERP intelligence.
            </p>

            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4 }}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/50 text-slate-400 hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((column, i) => (
              <div key={i} className="flex flex-col gap-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#0f172a]">{column.title}</h4>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.href}
                        className="text-[15px] font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span>&copy; {currentYear} Indas Analytics</span>
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Systems Operational</span>
          </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
