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
    hideInfo = false,
}: {
    member: (typeof TEAM_MEMBERS)[0];
    index: number;
    hideInfo?: boolean;
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
                className="flex flex-col items-start w-full relative"
            >
                {/* Photo area */}
                <div
                    className="relative w-full overflow-hidden group"
                    style={{ height: hideInfo ? "clamp(250px, 40vh, 400px)" : "clamp(300px, 55vh, 580px)" }}
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
                        className="w-full h-full object-contain mix-blend-multiply transition-all"
                    />

                    {/* Plus Button Overlay (Visible only in Directory) */}
                    {hideInfo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl shadow-black/10"
                            >
                                <Plus size={24} className="text-slate-900" />
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Name + role tag */}
                {!hideInfo && (
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
                )}
            </motion.div>

            <MemberDetail member={member} isOpen={open} onClose={() => setOpen(false)} />
        </>
    );
};

const TEAM_CATEGORIES = [
    {
        id: "core",
        title: "Core Team",
        members: [
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
            }
        ]
    },
    {
        id: "developers",
        title: "Developers Team",
        members: [
            {
                name: "Ananya Iyer",
                firstName: "Ananya",
                lastName: "Iyer",
                role: "Backend Engineer",
                image: "/meet-our-team/4.png",
                bio: ["Expert in distributed systems.", "Passionate about API design.", "Cloud infrastructure specialist."],
                highlight: "Backend"
            },
            {
                name: "Vivin Thomas",
                firstName: "Vivin",
                lastName: "Thomas",
                role: "Frontend Developer",
                image: "/meet-our-team/5.png",
                bio: ["Building responsive and performant web interfaces.", "Specialist in React and modern CSS techniques.", "Passionate about clean code and animation."],
                highlight: "Frontend"
            },
            {
                name: "Sanya Malhotra",
                firstName: "Sanya",
                lastName: "Malhotra",
                role: "Full Stack Developer",
                image: "/meet-our-team/6.png",
                bio: ["End-to-end application development.", "Bridging the gap between UI and Backend.", "Performance optimization expert."],
                highlight: "Full Stack"
            }
        ]
    },
    {
        id: "implementation",
        title: "Implementation Team",
        members: [
            {
                name: "Abhishek",
                firstName: "Abhishek",
                lastName: "",
                role: "Implementation Expert",
                image: "/meet-our-team/Implementation%20Team/abhishek.png",
                bio: ["Specialist in enterprise deployments.", "Technical workflow optimization.", "Client success focused."],
                highlight: "Deployment"
            },
            {
                name: "Ankit",
                firstName: "Ankit",
                lastName: "",
                role: "Technical Consultant",
                image: "/meet-our-team/Implementation%20Team/ankit.png",
                bio: ["System integration specialist.", "Expert in ERP implementation.", "Advanced troubleshooting."],
                highlight: "Consulting"
            },
            {
                name: "Bablu",
                firstName: "Bablu",
                lastName: "",
                role: "Support Associate",
                image: "/meet-our-team/Implementation%20Team/bablu.png",
                bio: ["Maintaining high standards of service.", "User training and onboarding.", "Operational efficiency advocate."],
                highlight: "Service"
            },
            {
                name: "Durgesh",
                firstName: "Durgesh",
                lastName: "",
                role: "Project Coordinator",
                image: "/meet-our-team/Implementation%20Team/durgesh.png",
                bio: ["Managing complex project timelines.", "Resource allocation management.", "Stakeholder communication."],
                highlight: "Coordination"
            },
            {
                name: "Lalita",
                firstName: "Lalita",
                lastName: "",
                role: "Implementation Lead",
                image: "/meet-our-team/Implementation%20Team/lalita.png",
                bio: ["Overseeing large scale deployments.", "Strategic workflow design.", "Team performance mentor."],
                highlight: "Leadership"
            },
            {
                name: "Mahendra",
                firstName: "Mahendra",
                lastName: "",
                role: "Systems Engineer",
                image: "/meet-our-team/Implementation%20Team/mahendra.png",
                bio: ["Hardware and software sync expert.", "Edge computing integration.", "Network reliability."],
                highlight: "Systems"
            },
            {
                name: "Manish",
                firstName: "Manish",
                lastName: "",
                role: "Technical Support",
                image: "/meet-our-team/Implementation%20Team/manish.png",
                bio: ["Real-time production monitoring.", "Client-side support lead.", "Process excellence."],
                highlight: "Support"
            },
            {
                name: "Mohit",
                firstName: "Mohit",
                lastName: "",
                role: "Workflow Auditor",
                image: "/meet-our-team/Implementation%20Team/mohit.png",
                bio: ["Auditing printing process chains.", "Efficiency gap analysis.", "Automation consultant."],
                highlight: "Audit"
            },
            {
                name: "Parishek",
                firstName: "Parishek",
                lastName: "",
                role: "QA Lead",
                image: "/meet-our-team/Implementation%20Team/parishek.png",
                bio: ["Guardian of software reliability.", "Test automation specialist.", "Compliance management."],
                highlight: "Quality"
            },
            {
                name: "Rani",
                firstName: "Rani",
                lastName: "",
                role: "Technical Trainer",
                image: "/meet-our-team/Implementation%20Team/rani.png",
                bio: ["Expert in user experience training.", "Knowledge transfer lead.", "User satisfaction focused."],
                highlight: "Training"
            },
            {
                name: "Shubham",
                firstName: "Shubham",
                lastName: "",
                role: "Delivery Manager",
                image: "/meet-our-team/Implementation%20Team/shubham.png",
                bio: ["Ensuring timely project delivery.", "Client onboarding lead.", "Project lifecycle management."],
                highlight: "Delivery"
            },
            {
                name: "Sonali",
                firstName: "Sonali",
                lastName: "",
                role: "User Success Manager",
                image: "/meet-our-team/Implementation%20Team/sonali.png",
                bio: ["Dedicated to maximizing user value.", "Strategic account management.", "Client relationship lead."],
                highlight: "Success"
            },
            {
                name: "Surbhi",
                firstName: "Surbhi",
                lastName: "",
                role: "Solution Designer",
                image: "/meet-our-team/Implementation%20Team/surbhi.png",
                bio: ["Crafting custom ERP workflows.", "Requirement analysis expert.", "Product-market fit auditor."],
                highlight: "Design"
            },
            {
                name: "Yashkirthi",
                firstName: "Yashkirthi",
                lastName: "",
                role: "Deployment Architect",
                image: "/meet-our-team/Implementation%20Team/yashkirthi.png",
                bio: ["Architecting complex installations.", "Hybrid cloud infrastructure.", "Security & scalability lead."],
                highlight: "Architecture"
            }
        ]
    },
    {
        id: "sales",
        title: "Sales & Marketing Team",
        members: [
            {
                name: "Banvari",
                firstName: "Banvari",
                lastName: "",
                role: "Sales Executive",
                image: "/meet-our-team/Sales%20&%20Marketing%20Team/banvari.png",
                bio: ["Specialized in customer engagement.", "Driving regional sales growth.", "Expert in printing solutions."],
                highlight: "Sales"
            },
            {
                name: "Bhupendra",
                firstName: "Bhupendra",
                lastName: "",
                role: "Marketing Specialist",
                image: "/meet-our-team/Sales%20&%20Marketing%20Team/bhupendra.png",
                bio: ["Strategic marketing planning.", "Brand positioning expert.", "Market analysis and insights."],
                highlight: "Marketing"
            },
            {
                name: "Hemant",
                firstName: "Hemant",
                lastName: "",
                role: "Sales Lead",
                image: "/meet-our-team/Sales%20&%20Marketing%20Team/hemant.png",
                bio: ["Leading sales acquisition efforts.", "Strong relationship management.", "Industry workflow expert."],
                highlight: "Sales"
            },
            {
                name: "Manish",
                firstName: "Manish",
                lastName: "",
                role: "Growth Executive",
                image: "/meet-our-team/Sales%20&%20Marketing%20Team/manish.png",
                bio: ["Expanding market reach.", "Client success focused.", "Collaborative sales strategy."],
                highlight: "Growth"
            },
            {
                name: "Suyash",
                firstName: "Suyash",
                lastName: "",
                role: "Sales & Support",
                image: "/meet-our-team/Sales%20&%20Marketing%20Team/suyash.png",
                bio: ["Passionate about customer support.", "Solution-oriented approach.", "Expert in product demonstrations."],
                highlight: "Service"
            }
        ]
    }
];

const ALL_TEAM_MEMBERS_FLAT = TEAM_CATEGORIES.flatMap(cat => cat.members);

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
                        transition={{ type: "spring", damping: 35, stiffness: 180 }}
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
                                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                                        The <span className="text-slate-300">Innovators.</span>
                                    </h2>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-50">
                                        <span className="text-2xl font-bold text-slate-900 tracking-tighter">{ALL_TEAM_MEMBERS_FLAT.length}</span>
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

                            {/* CATEGORY JUMP LINKS */}
                            <div className="flex items-center gap-2 mt-8 overflow-x-auto no-scrollbar py-1">
                                {TEAM_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            const el = document.getElementById(`team-section-${cat.id}`);
                                            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-white/50 border border-white/80 text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:bg-white hover:text-red-500 transition-all shadow-sm"
                                    >
                                        {cat.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SCROLLABLE GRID AREA */}
                        <div
                            className="flex-grow overflow-y-auto no-scrollbar p-8 md:p-12 relative"
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                            onScroll={(e) => e.stopPropagation()}
                        >
                            <div className="space-y-16 pb-20">
                                {TEAM_CATEGORIES.map((category) => (
                                    <div key={category.id} id={`team-section-${category.id}`} className="space-y-6 scroll-mt-10">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                                                {category.title}
                                            </h3>
                                            <div className="flex-grow h-[1px] bg-slate-100" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{category.members.length} Members</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
                                            {category.members.map((member, i) => (
                                                <MemberCard key={i} member={member} index={i} hideInfo />
                                            ))}
                                        </div>
                                    </div>
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
