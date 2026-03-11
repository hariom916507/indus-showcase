"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HeroSection Redesign (Firma Aesthetic)
 * 
 * Features:
 * - Massive high-contrast branding ("INDAS ANALYTICS")
 * - Premium minimal subtext
 * - ERP Typography with SVG Video Mask (Vibrant)
 * - Cinematic spacing and vertical rhythm
 */
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reelVideoRef = useRef<HTMLVideoElement>(null);
  const [colorIndex, setColorIndex] = useState(0);

  // Soft premium colors that match the saturation of #ff2d55
  const accentColors = ["#ff2d55", "#FFB800", "#D946EF", "#0f172a"];

  const [isReelOpen, setIsReelOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const video = videoRef.current;
    if (!video) return;

    // Safe play helper — silently ignores AbortError (browser power-saving pause)
    const safePlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== "AbortError") {
            console.warn("Video playback error:", err);
          }
        });
      }
    };

    safePlay();

    // Resume video when the user returns to the tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        safePlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % accentColors.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle automatic playback when reel opens
  useEffect(() => {
    if (isReelOpen && reelVideoRef.current) {
      reelVideoRef.current.play().catch(err => {
        console.warn("Reel playback failed:", err);
      });
    }
  }, [isReelOpen]);

  return (
    <div className="relative w-full h-full bg-[#FAFAFA] flex flex-col items-start pt-13 lg:pt-20 overflow-hidden">

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-24 flex flex-col items-start text-left">

        {/* 1. BRANDING TITLES (Left Aligned & Smaller) */}
        <div className="flex flex-col items-start">
          {/* Line 1: Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[32px] md:text-[48px] lg:text-[60px] font-medium tracking-tight leading-[1.1] text-[#0f172a] pl-4 md:pl-18"
            style={{ fontFamily: '"Times New Roman", Times, ui-serif, Georgia, serif' }}
          >
            Indas <span className="relative inline-block text-[#0f172a]">
              Analytics
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-1 -right-4 w-2 h-2 bg-[#0f172a] rounded-full hidden lg:block"
              />
            </span>
          </motion.h1>

          {/* Line 2: Script-style / Elegant Serif */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-[-2px] md:mt-[-5px]"
          >
            <span className="text-[40px] md:text-[80px] lg:text-[100px] font-medium italic text-[#0f172a] tracking-tight leading-none pl-[20px] md:pl-[200px] inline-block" style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
              together.
            </span>
          </motion.div>
        </div>

        {/* 2. Subtext (Description - Left Aligned) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 pl-[20px] md:pl-[206px]"
        >
          <p className="text-[#64748b] text-xs md:text-sm lg:text-[15px] font-medium tracking-tight leading-relaxed max-w-xl">
            <span className="text-[#0f172a]">We help businesses find their voice.</span> <br className="hidden md:block" />
            Let&apos;s see how Printude AI can help you.
          </p>
        </motion.div>

        {/* 3. ERP Animated Video (Adjusted to Fit) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
          animate={mounted ? { scale: 1, opacity: 1, rotate: -5 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative w-full mt-10 md:mt-24 mb-16 md:mb-0",
            mounted && "group cursor-none"
          )}
          onClick={() => setIsReelOpen(true)}
          data-cursor={mounted ? "reel" : undefined}
        >
          <div className="relative aspect-[16/10] md:aspect-[16/6] w-full flex items-center justify-center overflow-visible scale-100 md:scale-[1.42] origin-center md:origin-left pointer-events-none">
            <svg
              viewBox="0 0 1000 300"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <mask id="hero-text-mask-firma" x="0" y="0" width="100%" height="100%">
                  <rect x="0" y="0" width="100%" height="100%" fill="black" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-black text-[350px] tracking-[-0.08em]"
                    fill="white"
                    style={{
                      fontFamily: "var(--font-geist-sans), sans-serif",
                      lineHeight: 1
                    }}
                  >
                    ERP
                  </text>
                </mask>
              </defs>

              <foreignObject
                mask="url(#hero-text-mask-firma)"
                width="100%"
                height="100%"
                x="0"
                y="0"
              >
                <div className="w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(1.05) contrast(1.1)" }}
                  >
                    <source src="/videos/erp-hero.mp4" type="video/mp4" />
                    <div className="w-full h-full bg-[#0f172a]/5" />
                  </video>
                </div>
              </foreignObject>
            </svg>
          </div>
        </motion.div>

      </div>

      {/* 4. FULL REEL MODAL (Firma Style) - Portal to escape GSAP transforms */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isReelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100000] bg-black flex items-center justify-center cursor-none"
              onClick={() => setIsReelOpen(false)}
              data-cursor="close"
            >
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full overflow-hidden flex items-center justify-center"
              >
                <video
                  ref={reelVideoRef}
                  autoPlay
                  controls={false}
                  muted={true} // High reliability for autoplay
                  loop
                  playsInline
                  className="w-auto h-auto min-w-full min-h-full object-cover pointer-events-none"
                >
                  <source src="/videos/erp-hero.mp4" type="video/mp4" />
                </video>

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Right Edge Blend Overlay */}
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-[5] pointer-events-none" />

      {/* Subtle Gradient Polish */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-pink-100/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] bg-indigo-100/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default Hero;
