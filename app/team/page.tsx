"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM_MEMBERS } from "@/components/Team";
import { ArrowLeft, User, Mail, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

// Demo additional members
const DEMO_MEMBERS = [
    {
        name: "Alex Rivera",
        role: "Senior AI Researcher",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
        bio: ["Expert in LLM optimization.", "Previous experience at Tech Giants.", "PhD in Artificial Intelligence."],
        highlight: "AI Research"
    },
    {
        name: "Sarah Chen",
        role: "Product Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
        bio: ["User-centric design specialist.", "Focused on enterprise ERP interfaces.", "Award-winning UX designer."],
        highlight: "Design Lead"
    },
    {
        name: "Michael Smith",
        role: "Backend Engineer",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
        bio: ["Infrastructure & scalability expert.", "Loves Rust and Go.", "Cloud architecture certified."],
        highlight: "Core Systems"
    },
    {
        name: "Elena Rodriguez",
        role: "Quality Assurance",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        bio: ["Zero-bug policy advocate.", "Automated testing specialist.", "Ensuring smooth ERP deployments."],
        highlight: "Quality Hub"
    }
];

const ALL_MEMBERS = [...TEAM_MEMBERS, ...DEMO_MEMBERS];

const TeamMemberCard = ({ member, index }: { member: any, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex flex-col bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                <motion.img
                    src={member.image}
                    alt={member.name}
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full object-cover mix-blend-multiply transition-all grayscale group-hover:grayscale-0"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-[#0f172a] border border-white/50">
                        {member.highlight || "Specialist"}
                    </span>
                </div>

                {/* Info Overlay */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6"
                        >
                            <div className="flex gap-3">
                                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors">
                                    <Linkedin size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors">
                                    <Twitter size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors">
                                    <Mail size={14} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Title Section */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-red-500 transition-colors">{member.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{member.role}</p>
            </div>
        </motion.div>
    );
};

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Header />
            
            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 md:px-24">
                    {/* Hero Header */}
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <Link 
                                href="/"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#0f172a] transition-colors mb-8 group"
                            >
                                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                                <span>Back to Home</span>
                            </Link>
                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-[#0f172a] leading-[0.9] mb-6">
                                The innovators <br />
                                <span className="italic font-serif text-[#0f172a]/30">driving indas.</span>
                            </h1>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                                We're a team of engineers, designers, and industry veterans dedicated to 
                                building the first autonomous AI agent layer for enterprise ERP.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                                <User size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-[#0f172a]">{ALL_MEMBERS.length} Members</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collaborating globally</div>
                            </div>
                        </div>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ALL_MEMBERS.map((member, i) => (
                            <TeamMemberCard key={i} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
