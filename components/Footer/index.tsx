"use client";

import Section from "@/components/Section";
import React from 'react';
import { motion } from "framer-motion";
import { Linkedin, Youtube, Instagram, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

import { ContactForm } from "./ContactForm";

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
    <footer className="relative bg-white dark:bg-slate-950 overflow-hidden">
      {/* Colourful Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-50/20 via-white to-amber-50/20 -z-20" />

      <Section id="footer" noReveal containerClassName="max-w-none px-12 md:px-20" className="pt-10 pb-24 lg:pt-16 lg:pb-32">
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left side: Contact Form (~58%) */}
            <div className="lg:col-span-7 flex flex-col gap-14">
              <ContactForm />
            </div>

            {/* Right side: Redesigned Content Hierarchy */}
            <div className="lg:col-span-5 flex flex-col gap-16 pt-10 lg:pt-2 border-t lg:border-t-0 lg:border-l border-slate-100 pl-0 lg:pl-10 items-center lg:items-start text-center lg:text-left">

              {/* 1. Links Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-sm lg:max-w-none">
                {footerLinks.map((column, i) => (
                  <div key={i} className="flex flex-col gap-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-900">{column.title}</h4>
                    <ul className="flex flex-col gap-3">
                      {column.links.map((link, j) => (
                        <li key={j}>
                          <Link
                            href={link.href}
                            className="text-[13px] font-bold text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 2. Enterprise Statement */}
              <div className="max-w-sm">
                <p className="text-[15px] text-slate-500 font-medium leading-relaxed tracking-tight">
                  The first autonomous AI agent layer designed specifically for enterprise ERP intelligence.
                </p>
              </div>

              <div className="flex flex-col gap-0.2">
                {/* 3. Social Icons */}
                <div className="flex gap-4 relative z-10">
                  {[
                    { Icon: Linkedin, href: "https://www.linkedin.com/company/indas-analytics/" },
                    { Icon: Youtube, href: "https://www.youtube.com/@indasanalytics" },
                    { Icon: Instagram, href: "https://www.instagram.com/indasanalytics_pvt.ltd/" }
                  ].map(({ Icon, href }, i) => (
                    <motion.a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
                    >
                      <Icon size={18} strokeWidth={2.5} />
                    </motion.a>
                  ))}
                </div>

                {/* 4. Indas Analytics Logo (Bottom) */}
                <div className="opacity-90 hover:opacity-100 transition-opacity -mt-20 md:-mt-20">
                  <img
                    src="/images/indas-analytics-logo.png"
                    alt="Indas Analytics Logo"
                    className="h-80 md:h-[26rem] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <span>&copy; {currentYear} Indas Analytics</span>
              <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            </div>

            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Systems Operational</span>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
