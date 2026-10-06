import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FestivalRibbon } from './FestivalRibbon';
import { EVENTS } from '../data/events';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';
import brochurePdf from '../assets/Tcsbrochure.pdf?url';

import { BrochureViewer } from './BrochureViewer';

gsap.registerPlugin(ScrollTrigger);

interface BrochureSectionProps {
  onOpenFullBrochure?: () => void;
  hasEntered?: boolean;
}

export const BrochureSection: React.FC<BrochureSectionProps> = ({
  hasEntered = true,
}) => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [sheenCoords, setSheenCoords] = useState({ x: 45, y: 35 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const bookletRef = useRef<HTMLDivElement>(null);
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll Entrance: emerges from lower-right/center into rest position
  useEffect(() => {
    if (!hasEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !pinnedStageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Timeline (>= 769px)
      mm.add('(min-width: 769px)', () => {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedStageRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.35}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Ribbon settles behind booklet position
        masterTl.fromTo(
          ribbonWrapperRef.current,
          { yPercent: 70, opacity: 0 },
          { yPercent: 0, opacity: 0.85, ease: 'power2.out', duration: 0.4 },
          0
        );

        // 2. Physical booklet scroll entrance: comes from lower-center with rotation
        masterTl.fromTo(
          bookletRef.current,
          { y: 110, rotateZ: 6, rotateY: -14, rotateX: 6, opacity: 0, scale: 0.94 },
          { y: 0, rotateZ: -2.5, rotateY: 0, rotateX: 0, opacity: 1, scale: 1, ease: 'power2.out', duration: 0.65 },
          0.05
        );
      });

      // MOBILE: Natural flow entrance (<= 768px)
      mm.add('(max-width: 768px)', () => {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasEntered]);

  // Pointer perspective tilt (physical booklet response - desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const el = bookletRef.current;
    if (!el || isBrochureOpen) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setSheenCoords({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });

    const rotX = Math.max(-3, Math.min(3, -(y / (rect.height / 2)) * 2.6));
    const rotY = Math.max(-4, Math.min(4, (x / (rect.width / 2)) * 3.6));

    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      y: -10,
      scale: 1.025,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    const el = bookletRef.current;
    if (!el) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: -2.5,
      y: 0,
      scale: 1,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  // Handle escape key and body scroll lock when modal is open
  useEffect(() => {
    if (isBrochureOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBrochureOpen(false);
      }
    };

    if (isBrochureOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBrochureOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F5] text-[#151515] select-none border-t border-[#151515]/8 overflow-hidden"
    >
      {/* DESKTOP PINNED BROCHURE TIMELINE */}
      <div
        ref={pinnedStageRef}
        className="hidden md:flex relative w-full h-screen min-h-[660px] px-[var(--gutter-site)] py-14 flex-col justify-between max-w-[var(--content-max-width)] mx-auto"
      >
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-[#151515]/10 pb-4 z-20">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-1">
              THE CYBER SYMPHONY 2026
            </span>
            <h2
              className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              OFFICIAL BROCHURE
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="hover-underline text-xs font-mono uppercase tracking-widest font-semibold pb-1 text-[#1C4463] hover:text-[#151515] transition-colors cursor-pointer"
            >
              VIEW BROCHURE ↗
            </button>
            <a
              href={brochurePdf}
              download="The-Cyber-Symphony-2026-Brochure.pdf"
              className="hover-underline text-xs font-mono uppercase tracking-widest font-semibold pb-1 hover:text-[#1C4463] transition-colors cursor-pointer"
            >
              DOWNLOAD PDF ↓
            </a>
          </div>
        </div>

        {/* 2-Column Composition: Direct copy Left + Physical 3D Object Right */}
        <div className="my-auto py-4 grid grid-cols-12 gap-14 items-center z-20">
          {/* Left Column: Direct factual copy */}
          <div className="col-span-5 flex flex-col gap-6 max-w-[var(--body-max-width)]">
            <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#1C4463] leading-snug">
              Official regulations, schedule matrices, and scoring criteria.
            </p>
            <p className="text-sm sm:text-base text-[#575757] font-light leading-relaxed">
              The Cyber Symphony Official Brochure contains complete competition rules, event timetables, eligibility matrices, and delegation guidelines for participating schools.
            </p>
            <div className="pt-3 border-t border-black/10 flex flex-col gap-1.5 font-mono text-xs text-[#575757]">
              <span>17 OCTOBER 2026 · JAGRAN PUBLIC SCHOOL, NOIDA</span>
              <span>ORGANISED BY THE SYMPHONISERS</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsBrochureOpen(true)}
                className="btn-tactile px-6 py-3 bg-[#151515] text-[#FAF9F5] hover:bg-[#1C4463] text-xs font-mono uppercase tracking-widest rounded-[2px] cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>VIEW BROCHURE</span>
                <span>↗</span>
              </button>
              <a
                href={brochurePdf}
                download="The-Cyber-Symphony-2026-Brochure.pdf"
                className="btn-tactile px-6 py-3 border border-[#151515] hover:bg-black/5 text-[#151515] text-xs font-mono uppercase tracking-widest rounded-[2px] cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>DOWNLOAD PDF</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Physical 3D Brochure with Multi-Layered Paper Spine */}
          <div className="col-span-7 flex flex-col items-center justify-center relative perspective-1200">
            <div
              ref={bookletRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsBrochureOpen(true)}
              className="group relative transform-style-3d cursor-pointer select-none"
              style={{
                width: '320px',
                height: '440px',
                transform: 'rotateZ(-2.5deg)',
                willChange: 'transform',
              }}
              title="Click to view full official brochure"
            >
              {/* Physical Satin Bookmark Ribbon: Peeking out from top */}
              <div
                className="absolute -top-7 left-12 w-5 h-9 bg-[#1C4463] rounded-t-[1px] shadow-sm z-0 pointer-events-none transform -rotate-1 transition-transform group-hover:-translate-y-1"
                title="Satin Bookmark"
              />

              {/* Physical Satin Bookmark Ribbon: Dangling from bottom with swallowtail */}
              <div
                className="absolute -bottom-9 left-12 w-5 h-12 bg-[#1C4463] shadow-md z-0 pointer-events-none transform rotate-1 transition-transform group-hover:translate-y-1"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 82%, 0% 100%)',
                }}
              />

              {/* Paper Stack Edge Simulation (Multiple physical pages visible on right edge) */}
              <div
                className="absolute inset-0 rounded-[2px] pointer-events-none"
                style={{
                  boxShadow:
                    '2px 1px 0 #E2DDD2, 4px 2px 0 #D8D2C6, 6px 3px 0 #CDC7BA, 8px 4px 0 #C2BCAD, 10px 5px 0 #B7B1A1, 0 30px 65px -14px rgba(25, 32, 27, 0.32)',
                }}
              />

              {/* Physical Cover Face */}
              <div className="relative w-full h-full bg-[#F3F1EA] border border-black/15 p-8 flex flex-col justify-between overflow-hidden rounded-[2px] dog-ear-curl">
                {/* Subtle paper grain texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 1px, transparent 1px)',
                    backgroundSize: '8px 8px',
                  }}
                />

                {/* Specular lighting sheen layer reacting to pointer */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-30 mix-blend-overlay rounded-[2px]"
                  style={{
                    background: `radial-gradient(circle at ${sheenCoords.x}% ${sheenCoords.y}%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
                  }}
                />

                {/* Cover Top Header */}
                <div className="flex justify-between items-start text-[11px] font-mono tracking-widest text-[#575757] z-10">
                  <span>OFFICIAL BROCHURE</span>
                  <span>17.10.2026</span>
                </div>

                {/* Real Cyber Symphony Logo Crest on Cover */}
                <div className="my-auto py-4 flex flex-col items-start z-10">
                  <div className="mb-4">
                    <img
                      src={cyberSymphonyLogo}
                      alt="Cyber Symphony Logo"
                      className="w-14 h-14 object-contain filter drop-shadow-[0_4px_12px_rgba(0,196,255,0.2)]"
                    />
                  </div>

                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#325E7D] block mb-1.5 font-semibold">
                    FIELD MANUAL
                  </span>
                  <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]">
                    CYBER
                    <br />
                    SYMPHONY
                  </h3>
                  <p className="mt-3 font-serif-editorial italic text-base text-[#575757]">
                    Jagran Public School, Noida
                  </p>
                </div>

                {/* Cover Footer */}
                <div className="flex justify-between items-end text-[10px] font-mono tracking-widest text-[#575757] border-t border-black/10 pt-3 z-10">
                  <span>THE SYMPHONISERS</span>
                  <span className="text-[#325E7D] font-bold">CLICK TO OPEN PDF ↗</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[11px] font-mono tracking-widest text-[#888] uppercase">
              Official PDF Brochure · Click to View Full Document
            </p>
          </div>
        </div>

        {/* AMBIENT FESTIVAL RIBBON LAYER */}
        <div
          ref={ribbonWrapperRef}
          className="absolute top-[52%] right-[-6%] w-[68%] z-10 pointer-events-none transform -rotate-6"
        >
          <FestivalRibbon
            bgColor="bg-[#1C4463]"
            textColor="text-[#FAF9F5]"
            heightClass="h-9 sm:h-10"
            speed={36}
          />
        </div>

        {/* Bottom indicator */}
        <div className="flex justify-between items-center text-xs font-mono text-[#888] pt-3 border-t border-black/10 z-20">
          <span>THE SYMPHONISERS</span>
          <span>{EVENTS.length} ACTIVE COMPETITIONS</span>
        </div>
      </div>

      {/* MOBILE VERTICAL FLOW */}
      <div className="md:hidden px-[var(--gutter-site)] py-16 space-y-8">
        <div className="border-b border-[#151515]/10 pb-3">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-1">
            THE CYBER SYMPHONY 2026
          </span>
          <h3 className="font-display text-3xl font-extrabold uppercase">
            OFFICIAL BROCHURE
          </h3>
        </div>

        <div className="bg-[#F3F1EA] border border-black/10 p-6 space-y-4 rounded-[2px] paper-shadow">
          <div className="flex items-center gap-3">
            <img
              src={cyberSymphonyLogo}
              alt="Cyber Symphony Emblem"
              className="w-10 h-10 object-contain"
            />
            <div>
              <span className="font-mono text-[10px] text-[#325E7D] uppercase tracking-wider block">OFFICIAL BROCHURE</span>
              <h4 className="font-display text-xl font-bold uppercase leading-none">CYBER SYMPHONY 2026</h4>
            </div>
          </div>
          <p className="text-sm text-[#575757] font-light leading-relaxed">
            Complete event schedules, code of conduct, scoring rubrics, and delegation guidelines.
          </p>
          <div className="pt-2 flex flex-col gap-2.5 font-mono text-xs">
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="btn-tactile w-full py-3 bg-[#151515] text-[#FAF9F5] uppercase tracking-widest rounded-[2px] text-center cursor-pointer"
            >
              VIEW BROCHURE ↗
            </button>
            <a
              href={brochurePdf}
              download="The-Cyber-Symphony-2026-Brochure.pdf"
              className="btn-tactile w-full py-3 border border-current uppercase tracking-widest rounded-[2px] text-center"
            >
              DOWNLOAD PDF ↓
            </a>
          </div>
        </div>
      </div>

      {/* FULLSCREEN REAL PDF VIEWER MODAL */}
      <BrochureViewer isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
    </section>
  );
};
