"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Volume2, VolumeX, Maximize2 } from "lucide-react";

const SHORTS_VIDEOS = [
  "nWpTsWWtMXs", // 1
  "RuEyzNkKlDE", // 2
  "-tNuj_AuZvk", // 3
  "CiBb56MzTto", // 4
  "8Hf8KwTYhkk", // 5
  "-_nhVy0MySw", // 7
  "D_svGy_TRt4", // 9
  "zKrmv-0K6HI", // 10
  "CNqo6jdMWOM", // 11
  "ydN9cCPcvvc", // 13
  "XxEZBo6t-2U", // 14
  "1S9fSF9UptU", // 15
  "wlOg6yV13Ck", // 16
];

/**
 * EXACTLY 13 cards matching the reference screenshot layout.
 *
 * ┌────────────────────────────────────────────────────┐
 * │ L1(×2)  L2(×2)  L3(×1) L4(×1) | R1(×1) R2(×2) R3(×2) R4(×2) │
 * │                                                               │
 * │                 [Testimonials]                                │
 * │             Trusted by leaders                                │
 * │           from various industries                             │
 * │   Learn why professionals trust ... solutions                 │
 * │             [Explore More →]                                  │
 * └────────────────────────────────────────────────────┘
 *
 * All card top values ≤ 58%  →  cards cluster in UPPER half only.
 */

type CardDef = {
  top: string;
  left?: string;
  right?: string;
  w: number;
  ratio: "4/5" | "1/1";
  videoId?: string;
  photo?: string;
  delay: number;
};

// ── Column constants ──────────────────────────────────────────────────────────
const C = 130;   // uniform card width (px)
// 9 groups × 130px + 8 gaps × 12px = 1266px total
// Each group starts at: calc(50% - 633px + n * 142px)

// Vertical rhythm (% of section height)
// ↑ UP   pair: 2% / 30%   single: 2%
// ↓ DOWN pair: 10% / 34%  single: 18%
// CENTER card (group 5, DOWN): 18% — text appears just after its bottom

const CARDS: CardDef[] = [
  // GROUP 1 – ↓ DOWN  2 cards  (far-left)
  { top: "10%", left: "calc(50% - 633px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[0], delay: 0.05 },
  { top: "38%", left: "calc(50% - 633px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[1], delay: 0.20 },

  // GROUP 2 – ↑ UP    2 cards
  { top: "2%", left: "calc(50% - 491px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[2], delay: 0.00 },
  { top: "30%", left: "calc(50% - 491px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[3], delay: 0.15 },

  // GROUP 3 – ↓ DOWN  1 card
  { top: "10%", left: "calc(50% - 349px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[4], delay: 0.10 },

  // GROUP 4 – ↑ UP    1 card
  { top: "2%", left: "calc(50% - 207px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[5], delay: 0.25 },

  // GROUP 5 – ↓ CENTER card
  { top: "10%", left: "calc(50% - 65px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[6], delay: 0.05 },

  // GROUP 6 – ↑ UP    1 card
  { top: "2%", left: "calc(50% + 77px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[7], delay: 0.25 },

  // GROUP 7 – ↓ DOWN  1 card
  { top: "10%", left: "calc(50% + 219px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[8], delay: 0.10 },

  // GROUP 8 – ↑ UP    2 cards
  { top: "2%", left: "calc(50% + 361px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[9], delay: 0.00 },
  { top: "30%", left: "calc(50% + 361px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[10], delay: 0.15 },

  // GROUP 9 – ↓ DOWN  2 cards  (far-right)
  { top: "10%", left: "calc(50% + 503px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[11], delay: 0.05 },
  { top: "38%", left: "calc(50% + 503px)", w: C, ratio: "4/5", videoId: SHORTS_VIDEOS[12], delay: 0.20 },
];

// ── Card component ────────────────────────────────────────────────────────────
function TestimonialCard({ card }: { card: CardDef }) {
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleFullscreen(e: React.MouseEvent) {
    e.stopPropagation();
    const el = cardRef.current as HTMLElement & {
      webkitRequestFullscreen?: () => void;
    };
    if (!el) return;
    if (!document.fullscreenElement) {
      (el.requestFullscreen?.() ?? (el as any).webkitRequestFullscreen?.());
    } else {
      document.exitFullscreen();
    }
  }

  const h = card.ratio === "4/5" ? Math.round(card.w * 1.25) : card.w;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
      animate={{ y: [0, -9, 0] }}
      // Note: whileInView initial/whileInView takes priority during entrance;
      // the loop animate kicks in after. Framer handles this correctly.
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={cardRef}
      style={{
        position: "absolute",
        top: card.top,
        left: card.left,
        right: card.right,
        width: card.w,
        height: h,
      }}
      className="rounded-[20px] overflow-hidden
                 shadow-[0_6px_28px_rgba(0,0,0,0.09)]
                 border border-black/[0.04] bg-white cursor-pointer"
    >
      {/* Content – plain div, no motion so image/video stays stable */}
      <div className="w-full h-full">
        {card.videoId ? (
          /* ── VIDEO ── */
          <div className="relative w-full h-full">
            {/* Thumbnail (disappears on hover) */}
            <img
              src={`https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`}
              alt="video thumbnail"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            />

            {/* Player – mounts only when hovered */}
            {hovered && (
              <iframe
                src={`https://www.youtube.com/embed/${card.videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${card.videoId}&controls=0&modestbranding=1&rel=0&disablekb=1`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                title="testimonial"
              />
            )}


            {/* Controls bar: mute + fullscreen */}
            {hovered && (
              <div className="absolute inset-x-0 bottom-0 z-20 flex justify-between items-center px-3 py-2
                              bg-gradient-to-t from-black/60 to-transparent text-white">
                <button
                  onClick={e => { e.stopPropagation(); setMuted(m => !m); }}
                  className="hover:scale-110 transition-transform"
                  title={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>
                <button
                  onClick={handleFullscreen}
                  className="hover:scale-110 transition-transform"
                  title="Fullscreen"
                >
                  <Maximize2 size={13} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── PHOTO ── */
          <img
            src={card.photo!}
            alt="client"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
          />
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <section className="w-full min-h-screen bg-white" />;

  return (
    <section className="relative w-full h-auto min-h-fit lg:min-h-screen bg-white overflow-hidden font-sans py-20 lg:py-0">
      {/* Left Edge Blend Overlay */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-[25] pointer-events-none" />

      {/* Subtle vertical grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden>
        <div className="relative w-full h-full flex justify-between px-8">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="h-full w-px border-l border-dashed border-black" />
          ))}
        </div>
      </div>

      {/* ── 13 CARDS ── (desktop only, upper zone) */}
      <div className="absolute inset-0 pointer-events-auto hidden lg:block overflow-hidden">
        {/* Responsive scaling container for intermediate screen sizes */}
        <div className="w-full h-full relative" style={{ 
          transform: 'scale(var(--testimonials-scale, 1))',
          transformOrigin: 'center 30%' 
        }}>
          {CARDS.map((card, i) => (
            <TestimonialCard key={i} card={card} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        :root {
          --testimonials-scale: 1;
        }
        @media (min-width: 1024px) and (max-width: 1380px) {
          :root {
            --testimonials-scale: 0.75;
          }
        }
        @media (min-width: 1381px) and (max-width: 1540px) {
          :root {
            --testimonials-scale: 0.85;
          }
        }
      `}</style>

      {/* ── MOBILE VIDEO SHELF ── */}
      <div className="relative z-20 lg:hidden w-full pt-10">
        <div className="flex gap-4 overflow-x-auto px-6 pb-10 no-scrollbar snap-x snap-mandatory">
          {SHORTS_VIDEOS.map((videoId, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[160px] aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-100 shadow-xl border border-black/5 snap-center relative group"
              onClick={() => {
                // For mobile, we can just open the video link or use a portal
                window.open(`https://www.youtube.com/shorts/${videoId}`, '_blank');
              }}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="testimonial"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CENTER CONTENT ── starts just after bottom of group-5 card */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 pointer-events-none pt-[5vh] lg:pt-[42vh]"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#f0f0f0] px-5 py-1.5 rounded-full mb-6 pointer-events-auto"
        >
          <span className="text-[13px] tracking-wide text-black/100">Testimonials</span>
        </motion.div>

        {/* Headlines */}
        <motion.hgroup
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
          style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}
        >
          <h1 className="text-[32px] md:text-[50px] font-bold tracking-tight text-[#111827] leading-[1.06]">
            Trusted by leaders
          </h1>
          <p className="text-[30px] md:text-[46px] font-bold tracking-tight text-[#94a3b8] leading-[1.06] mt-1">
            from various industries
          </p>
        </motion.hgroup>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-[15px] font-normal text-slate-700 leading-relaxed max-w-md tracking-[0.01em]"
          style={{ fontFamily: "var(--font-roboto), sans-serif" }}
        >
          Learn why professionals trust our solutions to complete their customer journeys.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="https://www.youtube.com/@indasanalytics"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 mb-10 bg-[#111827] text-white px-9 py-4 rounded-full
                     flex items-center gap-3 group pointer-events-auto
                     hover:bg-black transition-colors shadow-lg no-underline inline-flex"
        >
          <span className="text-[15px] font-medium">Explore More</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  );
}
