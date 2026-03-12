"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export const TEAM_MEMBERS = [
    {
        name: "Parmeshvar Patidar",
        firstName: "Parmeshvar",
        lastName: "Patidar",
        role: "Founder of Indas Analytics",
        image: "/team/parmeshvar.png",
        bio: [
            "21+ Years with Printing Industry.",
            "Serving 350+ leading Brands.",
            "Architect of Indus Print ERP.",
            "Creator of PPA Framework.",
            "Advisory member at World Print Hub.",
            "770+ Knowledge Sharing Session.",
            "Author: 'The Profitable Press – A PPC Method'",
            "Author: 'Profitability through Productivity in Print'",
            "Author: 'Print Growth Chalisa'",
        ],
        highlight: "21+ Years Experience",
    },
    {
        name: "Sumeet Lad",
        firstName: "Sumeet",
        lastName: "Lad",
        role: "Chief Growth Officer",
        image: "/team/sumeet_new.png",
        bio: [
            "25+ Years in Printing & Packaging Industry.",
            "Brand Strategy & Business Consulting Expert.",
            "Creator of Growth & Brand Systemization Frameworks.",
            "Mentor to Brands for Visibility & Customer Trust.",
            "Driven by Design Thinking & Market Relevance.",
            "500+ Knowledge Sharing Sessions.",
        ],
        highlight: "Growth Expert",
    },
    {
        name: "Vikram Kumar",
        firstName: "Vikram",
        lastName: "Kumar",
        role: "Chief Technology & Compliance Officer",
        image: "/team/vikram.png",
        bio: [
            "12+ Years in Printing Industry.",
            "Print Process Automation & Workflow Expert.",
            "Printing ERP Consultant.",
            "Collaborated with 200+ Brands.",
            "Coordinator of PPA Framework.",
            "500+ Knowledge Sharing Sessions.",
            "Co-Author: 'Profitability through Productivity in Print'",
        ],
        highlight: "Tech & Logic",
    },
    {
        name: "Ritesh Bansal",
        firstName: "Ritesh",
        lastName: "Bansal",
        role: "Sales & Marketing",
        image: "/team/ritesh_cropped.png",
        bio: [
            "10+ Years with Printing Industry.",
            "Print Process Automation & Workflow Expert.",
            "Printing ERP & PPC Expert.",
            "Quality Officer & Sr. Planning Executive (4 Years).",
            "Collaborated with 85+ leading Brands.",
            "250+ Knowledge Sharing Sessions.",
            "Coordinator of PPA Framework.",
        ],
        highlight: "Execution Lead",
    },
];

/* ─── Detail Modal ─────────────────────────────────────────── */
const MemberDetail = ({
    member,
    isOpen,
    onClose,
}: {
    member: (typeof TEAM_MEMBERS)[0];
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Also stop Lenis
            document.body.setAttribute("data-lenis-prevent", "true");
        }
        return () => {
            // Only unlock if we aren't in another modal (handled by parent sync usually)
            // But for safety, we'll just unset it. The parent useEffect will re-lock if needed.
            document.body.style.overflow = "unset";
            document.body.removeAttribute("data-lenis-prevent");
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000000] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Card Container */}
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto"
                            style={{ maxHeight: "90vh" }}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Photo panel */}
                            <div className="w-full md:w-2/5 bg-[#F3F3F3] flex items-end justify-center overflow-hidden min-h-[320px]">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>

                            {/* Text panel */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                                <span className="text-red-500 font-bold uppercase tracking-[0.25em] text-[10px] mb-3 block">
                                    {member.highlight}
                                </span>
                                <h2
                                    className="text-2xl md:text-3xl font-extrabold text-[#0f172a] mb-2 tracking-tight leading-tight"
                                    style={{ fontFamily: "var(--font-lexend), sans-serif" }}
                                >
                                    {member.name}
                                </h2>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 pb-6 border-b border-slate-100 leading-relaxed">
                                    {member.role}
                                </p>

                                <ul className="space-y-4">
                                    {member.bio.map((point, i) => (
                                        <li key={i} className="flex gap-4">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{point}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

/* ─── Single Card ──────────────────────────────────────────── */
const MemberCard = ({
    member,
    index,
}: {
    member: (typeof TEAM_MEMBERS)[0];
    index: number;
}) => {
    const [hovered, setHovered] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start w-full"
            >
                {/* Photo area */}
                <div
                    className="relative w-full overflow-hidden cursor-none group"
                    style={{ height: "clamp(300px, 55vh, 580px)" }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setOpen(true)}
                    data-cursor="plus"
                >
                    {/* Image — mix-blend-multiply removes white bg on white section */}
                    <motion.img
                        src={member.image}
                        alt={member.name}
                        initial={{ filter: "grayscale(1)" }}
                        animate={{
                            scale: hovered ? 1.05 : 1,
                            filter: hovered ? "grayscale(0)" : "grayscale(1)"
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </div>

                {/* Name + role tag */}
                <div className="mt-5 pl-1">
                    <h3
                        className="text-sm md:text-lg lg:text-[1.1rem] font-bold text-[#0f172a] tracking-tight leading-[1.2] mb-1"
                        style={{ fontFamily: "var(--font-lexend), sans-serif" }}
                    >
                        {member.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                        {member.role}
                    </p>
                </div>
            </motion.div>

            <MemberDetail member={member} isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
};

const ALL_TEAM_MEMBERS = [
    {
        name: "Aarav Sharma",
        firstName: "Aarav",
        lastName: "Sharma",
        role: "Head of Operations",
        image: "/meet-our-team/1.png",
        bio: ["Strategic planning and execution leader.", "Expert in cross-functional team management.", "Optimizing operational efficiency for scale."],
        highlight: "Operations"
    },
    {
        name: "Ishita Gupta",
        firstName: "Ishita",
        lastName: "Gupta",
        role: "Senior Product Designer",
        image: "/meet-our-team/2.png",
        bio: ["Crafting intuitive and elegant user experiences.", "Leading design systems for enterprise solutions.", "Visual storytelling and brand identity expert."],
        highlight: "Design"
    },
    {
        name: "Rohan Mehra",
        firstName: "Rohan",
        lastName: "Mehra",
        role: "Solutions Architect",
        image: "/meet-our-team/3.png",
        bio: ["Designing scalable cloud-native architectures.", "Full-stack development specialist.", "Ensuring robust and secure system integrity."],
        highlight: "Architecture"
    },
    {
        name: "Ananya Iyer",
        firstName: "Ananya",
        lastName: "Iyer",
        role: "Marketing Strategist",
        image: "/meet-our-team/4.png",
        bio: ["Driving brand awareness through data-driven insights.", "Expert in digital growth and customer engagement.", "Creative campaign lead."],
        highlight: "Marketing"
    },
    {
        name: "Vivin Thomas",
        firstName: "Vivin",
        lastName: "Thomas",
        role: "QA & Compliance Lead",
        image: "/meet-our-team/5.png",
        bio: ["Maintaining highest standards of software quality.", "Implementation of automated testing frameworks.", "Process excellence advocate."],
        highlight: "Quality"
    },
    {
        name: "Sanya Malhotra",
        firstName: "Sanya",
        lastName: "Malhotra",
        role: "Client Relations Manager",
        image: "/meet-our-team/6.png",
        bio: ["Building long-term partnerships with leading brands.", "Dedicated to client success and satisfaction.", "Expert in strategic communication."],
        highlight: "Partnerships"
    },
    {
        name: "Arjun Reddy",
        firstName: "Arjun",
        lastName: "Reddy",
        role: "Data Scientist",
        image: "/meet-our-team/7.png",
        bio: ["Unlocking insights through advanced analytics.", "Machine learning and predictive modeling expert.", "Optimizing business outcomes with data."],
        highlight: "Data Science"
    },
    {
        name: "Kiara Advani",
        firstName: "Kiara",
        lastName: "Advani",
        role: "UX Researcher",
        image: "/meet-our-team/8.png",
        bio: ["Deeply understanding user needs and behaviors.", "Conducting qualitative and quantitative studies.", "Informing product strategy through research."],
        highlight: "UX Research"
    },
    {
        name: "Kabir Singh",
        firstName: "Kabir",
        lastName: "Singh",
        role: "Frontend Developer",
        image: "/meet-our-team/9.png",
        bio: ["Building responsive and performant web interfaces.", "Specialist in React and modern CSS techniques.", "Passionate about clean code and animation."],
        highlight: "Frontend"
    },
    {
        name: "Nisha Varma",
        firstName: "Nisha",
        lastName: "Varma",
        role: "HR & Culture Lead",
        image: "/meet-our-team/10.png",
        bio: ["Nurturing a high-performance team culture.", "Talent acquisition and retention specialist.", "Empowering people for professional growth."],
        highlight: "Culture"
    }
];

/* ─── Section ──────────────────────────────────────────────── */
const Team = () => {
    const [showFullDirectory, setShowFullDirectory] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll lock for the main page when popup is open
    useEffect(() => {
        const root = document.documentElement;
        if (showFullDirectory) {
            document.body.style.overflow = "hidden";
            root.style.overflow = "hidden";
            document.body.setAttribute("data-lenis-prevent", "true");
        } else {
            document.body.style.overflow = "";
            root.style.overflow = "";
            document.body.removeAttribute("data-lenis-prevent");
        }
        return () => {
            document.body.style.overflow = "";
            root.style.overflow = "";
            document.body.removeAttribute("data-lenis-prevent");
        };
    }, [showFullDirectory]);

    const teamDirectoryOverlay = (
        <AnimatePresence>
            {showFullDirectory && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999999] flex items-center justify-center p-2 md:p-6 lg:p-10"
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                >
                    {/* LIGHT SOFT BLUR BACKDROP */}
                    <motion.div
                        initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0)" }}
                        animate={{ backdropFilter: "blur(40px)", backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                        exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(255, 255, 255, 0)" }}
                        onClick={() => setShowFullDirectory(false)}
                        className="absolute inset-0 cursor-zoom-out touch-none"
                        onWheel={(e) => e.stopPropagation()}
                    />

                    {/* CONTENT WRAPPER */}
                    <motion.div
                        initial={{ y: 60, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 60, opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="relative w-full max-w-[1500px] h-full flex flex-col z-[1000000] bg-white/60 border border-white/80 rounded-[48px] shadow-[0_40px_120px_rgba(0,0,0,0.08)] overflow-hidden"
                    >
                        {/* POPUP HEADER - FIXED AT TOP */}
                        <div className="p-8 md:p-12 border-b border-white/40 bg-white/20 backdrop-blur-sm">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-8 bg-red-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.45em] text-red-600">Company Directory</span>
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                                        The <span className="text-slate-300">Innovators.</span>
                                    </h2>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-50">
                                        <span className="text-2xl font-bold text-slate-900 tracking-tighter">{ALL_TEAM_MEMBERS.length}</span>
                                        <div className="h-6 w-[1px] bg-slate-100" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Collaborators</span>
                                    </div>

                                    {/* EXPLICIT CLOSE OPTION */}
                                    <button
                                        onClick={() => setShowFullDirectory(false)}
                                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:scale-105 active:scale-95 transition-all text-sm group"
                                    >
                                        <X size={18} className="transition-transform group-hover:rotate-90" />
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SCROLLABLE GRID AREA */}
                        <div 
                            className="flex-grow overflow-y-auto no-scrollbar p-8 md:p-12 relative"
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                            onScroll={(e) => e.stopPropagation()}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
                                {ALL_TEAM_MEMBERS.map((member, i) => (
                                    <MemberCard key={i} member={member} index={i} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <section
            id="team"
            className="relative bg-[#FAFAFA] w-full min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 overflow-hidden"
        >
            {/* Left Edge Blend Overlay */}
            <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#FAFAFA] to-transparent z-[20] pointer-events-none" />
            {/* Section Header */}
            <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <h2
                        className="text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.85] text-[#0f172a]"
                    >
                        <span
                            className="block font-extrabold uppercase text-[0.3em] tracking-[0.5em] text-red-500 mb-3 ml-1"
                            style={{ fontFamily: "var(--font-lexend), sans-serif" }}
                        >
                            Our Leadership
                        </span>
                        <span
                            className="block font-bold"
                            style={{ fontFamily: "var(--font-lexend), sans-serif" }}
                        >
                            The people
                        </span>
                        <span
                            className="block font-medium italic mt-1"
                            style={{
                                fontFamily: "var(--font-playfair), serif",
                                marginLeft: "0.2em"
                            }}
                        >
                            behind it.
                        </span>
                    </h2>
                </div>
                <p className="hidden md:block text-slate-400 font-medium italic text-sm max-w-xs leading-relaxed">
                    "The visionaries, architects, and pillars redefining print intelligence through automation."
                </p>
            </div>

            {/* 4-Column Grid + Side CTA */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
                {/* The Leadership Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-14 flex-grow">
                    {TEAM_MEMBERS.map((member, i) => (
                        <MemberCard key={i} member={member} index={i} />
                    ))}
                </div>

                {/* Meet Our Team Side CTA */}
                <div className="flex-shrink-0 flex items-center justify-center lg:pt-0">
                    <button
                        onClick={() => setShowFullDirectory(true)}
                        className="group relative flex items-center gap-3 bg-[#0f172a] text-white px-10 py-5 rounded-full font-bold text-sm tracking-tight hover:bg-black transition-all shadow-2xl shadow-slate-900/20 whitespace-nowrap"
                    >
                        <span>Meet Our Team</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
                    </button>
                </div>
            </div>

            {/* PORTAL FOR TEAM DIRECTORY OVERLAY */}
            {mounted && typeof document !== "undefined" && createPortal(teamDirectoryOverlay, document.body)}
        </section>
    );
};

export default Team;
