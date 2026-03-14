"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORK_ITEMS = [
  {
    id: 1,
    title: "Eco Packaging",
    category: "Sustainable Solutions",
    image: "/images/packaging-3d.png",
    width: "35vw",
    height: "100vh",
    top: "0",
    left: "20vw",
    z: 10
  },
  {
    id: 2,
    title: "Flexo Intelligence",
    category: "Automation",
    image: "/images/flexo-3d.png",
    width: "30vw",
    height: "60vh",
    top: "30vh",
    left: "80vw",
    z: 20
  },
  {
    id: 3,
    title: "Global Supply",
    category: "Logistics",
    image: "/images/corrugation-3d.png",
    width: "35vw",
    height: "80vh",
    top: "10vh",
    left: "140vw",
    z: 10
  },
  {
    id: 4,
    title: "Digital Print Hub",
    category: "Innovation",
    image: "/images/commercial-3d.png",
    width: "40vw",
    height: "100vh",
    top: "0",
    left: "200vw",
    z: 30
  },
  {
    id: 5,
    title: "Indas Analytics",
    category: "Data Science",
    image: "/images/publication-3d.png",
    width: "30vw",
    height: "70vh",
    top: "15vh",
    left: "270vw",
    z: 10
  },
  {
    id: 6,
    title: "Enterprise ERP",
    category: "Management",
    image: "/images/large-format-3d.png",
    width: "35vw",
    height: "90vh",
    top: "5vh",
    left: "340vw",
    z: 20
  },
  {
    id: 7,
    title: "3D Commercial",
    category: "Rendering",
    image: "/images/commercial-3d.png",
    width: "40vw",
    height: "100vh",
    top: "0",
    left: "410vw",
    z: 10
  }
];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth;
        const scrollAmount = totalWidth - window.innerWidth;

        // Horizontal Scroll
        gsap.to(track, {
          x: -scrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });

        // Parallax for Background Text
        gsap.to(bgTextRef.current, {
          x: -scrollAmount * 0.3, // Subtle movement
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 1,
            start: "top top",
            end: () => `+=${totalWidth}`,
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#F3F3F3] dark:bg-[#0A0A0A] selection:bg-black selection:text-white">
      <Header />

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-12 z-50 text-[10px] uppercase tracking-[0.4em] font-black text-slate-400/60 pointer-events-none">
        scroll / drag
      </div>

      <div ref={containerRef} className="lg:h-screen lg:overflow-hidden relative pb-32 lg:pb-0">
        {/* Massive Background Text */}
        <div
          ref={bgTextRef}
          className="absolute inset-y-0 left-0 flex lg:items-center h-full pointer-events-none z-0 px-6 lg:px-[10vw] max-lg:top-20"
        >
          <h1 className="text-[25vw] lg:text-[50vw] font-black leading-none text-black/[0.04] dark:text-white/[0.04] whitespace-nowrap uppercase select-none tracking-tighter">
            Selected Work
          </h1>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-full lg:w-[600vw] z-10 flex flex-col lg:block gap-12 lg:gap-0 px-6 pt-32 lg:px-0 lg:pt-0"
        >
          {WORK_ITEMS.map((item) => (
            <WorkItem key={item.id} item={item} />
          ))}

          {/* Final "Let's Talk" Section */}
          <div className="lg:absolute right-0 top-0 lg:w-[100vw] h-full flex flex-col justify-center lg:px-[10vw] mt-20 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="max-w-4xl"
            >
              <h2 className="text-[20vw] lg:text-[12vw] font-black leading-[0.9] text-black dark:text-white uppercase tracking-tighter">
                Let's <br /> Talk.
              </h2>
              <Link href="/#footer">
                <motion.div
                  whileHover={{ x: 30 }}
                  className="flex items-center gap-6 lg:gap-10 mt-10 lg:mt-20 group cursor-pointer"
                >
                  <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-black flex items-center justify-center text-white ring-12 ring-black/5 transition-all duration-500 group-hover:ring-black/10">
                    <ArrowUpRight className="w-8 h-8 lg:w-12 lg:h-12" />
                  </div>
                  <span className="text-xl lg:text-3xl font-black uppercase tracking-[0.1em] border-b-4 border-black/5 group-hover:border-black transition-all duration-500">
                    Start a project
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer is placed after the main scroll container in a normal layout if desired, 
          but for horizontal pages like this, sometimes it's better to have it as a final panel or just fixed.
          Here we keep it simple for now. */}
    </main>
  );
}

function WorkItem({ item }: { item: typeof WORK_ITEMS[0] }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="group cursor-none relative w-full h-[50vh] lg:absolute lg:w-[var(--desk-w)] lg:h-[var(--desk-h)] lg:top-[var(--desk-t)] lg:left-[var(--desk-l)]"
      style={{
        '--desk-w': item.width,
        '--desk-h': item.height,
        '--desk-t': item.top,
        '--desk-l': item.left,
        zIndex: item.z,
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden rounded-sm bg-slate-200">
        <motion.img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.05 }}
        />

        {/* Custom Hover Circle (Mobius Style) */}
        <motion.div
          animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white">
            <ArrowUpRight size={32} />
          </div>
        </motion.div>
      </div>

      {/* Info Overlay (Optional, but helps with UX) */}
      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">{item.category}</p>
      </div>
    </motion.div>
  );
}
