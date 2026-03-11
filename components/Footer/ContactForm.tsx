import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Youtube, Linkedin } from "lucide-react";

export const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="relative group w-full">
            {/* Massive Ambient Glow / Backdrop Flare */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-slate-200/60 via-blue-100/40 to-slate-300/50 blur-[100px] opacity-80 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="relative w-full bg-white rounded-[40px] 
                shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15),0_20px_40px_-20px_rgba(0,0,0,0.1),0_0_1px_rgba(0,0,0,0.05)] 
                hover:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.2),0_25px_50px_-20px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.1)]
                overflow-hidden border border-slate-100/80 flex flex-col lg:flex-row divide-x divide-slate-100 transition-shadow duration-500">
                {/* Left Section: Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col h-full"
                            >
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Contact Us</h2>
                                    <p className="text-slate-500 text-sm font-medium">We&apos;d love to hear from you. Send us a message.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <div className="relative flex flex-col pt-2">
                                        <input
                                            required
                                            type="text"
                                            placeholder=" "
                                            className="peer w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all duration-300 font-medium text-slate-900 text-sm shadow-sm"
                                        />
                                        <label className="absolute left-6 top-[26px] -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-slate-900 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-slate-700">
                                            Full Name
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative flex flex-col pt-2">
                                            <input
                                                required
                                                type="email"
                                                placeholder=" "
                                                className="peer w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all duration-300 font-medium text-slate-900 text-sm shadow-sm"
                                            />
                                            <label className="absolute left-6 top-[26px] -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-slate-900 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-slate-700">
                                                Email
                                            </label>
                                        </div>
                                        <div className="relative flex flex-col pt-2">
                                            <input
                                                type="tel"
                                                placeholder=" "
                                                className="peer w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all duration-300 font-medium text-slate-900 text-sm shadow-sm"
                                            />
                                            <label className="absolute left-6 top-[26px] -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-slate-900 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-slate-700">
                                                Phone
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative flex flex-col pt-2">
                                        <textarea
                                            required
                                            placeholder=" "
                                            rows={4}
                                            className="peer w-full px-6 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-300 resize-none text-sm shadow-sm"
                                        ></textarea>
                                        <label className="absolute left-6 top-[26px] -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-2 peer-focus:text-slate-900 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-slate-700">
                                            Message
                                        </label>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        disabled={isSubmitting}
                                        className="mt-2 group/btn"
                                    >
                                        <div className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-slate-900/10 group-hover/btn:bg-black group-hover/btn:shadow-slate-900/20">
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                            {!isSubmitting && <Send size={14} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />}
                                        </div>
                                    </motion.button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-20 h-full"
                            >
                                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 text-emerald-500 shadow-inner">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Message Sent!</h3>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                                    Thank you for reaching out. <br />
                                    Our team will get back to you shortly.
                                </p>
                                <motion.button 
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                    Send another message
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Section: Contact Information */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col items-center lg:items-start justify-center bg-slate-50/50 backdrop-blur-sm">
                    <div className="max-w-xs mx-auto lg:mx-0 w-full">
                        <h3 className="text-2xl font-bold text-slate-900 mb-12 tracking-tight">Contact Information</h3>

                        <div className="flex flex-col gap-10 mb-14">
                            <ContactLinkItem
                                icon={<MapPin size={22} className="text-slate-900" />}
                                title="Visit Us"
                                text="Plot No 50, Vishwadarshan, PU/4 Commercial A.B Road Indore"
                            />
                            <ContactLinkItem
                                icon={<Mail size={22} className="text-slate-900" />}
                                title="Email Us"
                                text="wecare@indasanalytics.in"
                            />
                            <ContactLinkItem
                                icon={<Phone size={22} className="text-slate-900" />}
                                title="Call Us"
                                text="+91 9352403323"
                            />
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center lg:justify-start gap-4">
                            {[
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/indas-analytics/" },
                                { Icon: Youtube, href: "https://www.youtube.com/@indasanalytics" },
                                { Icon: Instagram, href: "https://www.instagram.com/indasanalytics_pvt.ltd/" }
                            ].map(({ Icon, href }, idx) => (
                                <motion.a
                                    key={idx}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactLinkItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
    <div className="flex flex-col gap-3 group/item cursor-default">
        <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center transition-all group-hover/item:scale-110 group-hover/item:border-slate-900 border border-slate-200 shadow-sm">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-400">{title}</span>
                <span className="text-slate-900 font-bold text-sm mt-0.5 tracking-tight group-hover/item:translate-x-1 transition-transform">{text}</span>
            </div>
        </div>
    </div>
);




