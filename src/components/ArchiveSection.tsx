import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCHIVE_2025 } from '../data/archive';
import { FestivalRibbon } from './FestivalRibbon';

gsap.registerPlugin(ScrollTrigger);

interface ArchiveSectionProps {
  onViewFullArchive: () => void;
  hasEntered?: boolean;
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({
  onViewFullArchive,
  hasEntered = true,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const activeIdxRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !pinnedStageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: MASTER PINNED TIMELINE
      mm.add('(min-width: 768px)', () => {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedStageRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.6}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(
                ARCHIVE_2025.length - 1,
                Math.max(0, Math.floor(self.progress * ARCHIVE_2025.length))
              );
              if (idx !== activeIdxRef.current) {
                activeIdxRef.current = idx;
                setActivePhotoIdx(idx);
              }
            },
          },
        });

        // Ribbon translates across lower quadrant
        masterTl.fromTo(
          ribbonWrapperRef.current,
          { xPercent: 120, rotate: 2 },
          { xPercent: -20, rotate: -1.5, ease: 'none', duration: 0.5 },
          0
        );

        // Photo reveals with smooth mask
        masterTl.fromTo(
          photoContainerRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.98 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.015, ease: 'power2.out', duration: 0.35 },
          0.1
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasEntered]);

  const currentPhoto = ARCHIVE_2025[activePhotoIdx];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF9F5] text-[#151515] select-none border-t border-[#151515]/8 overflow-hidden"
    >
      {/* DESKTOP PINNED ARCHIVE TIMELINE */}
      <div
        ref={pinnedStageRef}
        className="hidden md:flex relative w-full h-screen min-h-[640px] px-[var(--gutter-site)] py-12 flex-col justify-between max-w-[var(--content-max-width)] mx-auto"
      >
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-[#151515]/10 pb-4 z-20">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-1">
              PAST EDITION · 2025
            </span>
            <h2
              className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              THE ARCHIVE
            </h2>
          </div>

          <button
            onClick={onViewFullArchive}
            className="hover-underline text-xs font-mono uppercase tracking-widest font-semibold pb-1 hover:text-[#1C4463] transition-colors cursor-pointer"
          >
            VIEW FULL 2025 ARCHIVE ↗
          </button>
        </div>

        {/* Center Stage: Left Info + Large Right Photography */}
        <div className="my-auto py-4 grid grid-cols-12 gap-12 items-center z-20">
          {/* Left Column: Neutral Label & Selectors */}
          <div className="col-span-5 flex flex-col gap-6 max-w-[var(--body-max-width)]">
            <div className="group">
              <span className="font-mono text-xs tracking-widest text-[#1C4463] uppercase">
                {currentPhoto.sublabel}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-2 text-[#151515] transition-transform duration-300 group-hover:translate-x-1">
                {currentPhoto.label}
              </h3>
              <p className="mt-3 font-mono text-xs text-[#575757] uppercase tracking-wider">
                Jagran Public School, Noida
              </p>
            </div>

            {/* Frame Selectors */}
            <div className="flex items-center gap-2 pt-3 border-t border-black/10 font-mono text-xs">
              {ARCHIVE_2025.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    activeIdxRef.current = idx;
                    setActivePhotoIdx(idx);
                  }}
                  className={`btn-tactile py-1 px-3 rounded-[1px] transition-all cursor-pointer ${
                    activePhotoIdx === idx
                      ? 'bg-[#151515] text-[#FAF9F5] font-bold'
                      : 'bg-transparent text-[#575757] hover:text-[#151515] hover:bg-black/5'
                  }`}
                >
                  {p.number}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: High-Impact Photography Window */}
          <div className="col-span-7 relative">
            <div
              ref={photoContainerRef}
              className="relative overflow-hidden bg-[#ECE8DF] aspect-[16/10] shadow-sm rounded-[2px] cursor-pointer group"
              onClick={onViewFullArchive}
            >
              <img
                src={currentPhoto.image}
                alt={currentPhoto.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex justify-between items-center text-xs font-mono text-[#575757] border-t border-[#151515]/10 pt-4 z-20">
          <span>0{activePhotoIdx + 1} / 0{ARCHIVE_2025.length} CHRONICLE FRAMES</span>
          <span>OCTOBER 2025 · RETROSPECTIVE</span>
        </div>
      </div>

      {/* MOBILE NATURAL VERTICAL RETROSPECTIVE */}
      <div className="md:hidden px-[var(--gutter-site)] py-16 flex flex-col gap-10">
        <div className="border-b border-[#151515]/10 pb-4">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-1">
            PAST EDITION · 2025
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
            THE ARCHIVE
          </h2>
        </div>

        <div className="space-y-12">
          {ARCHIVE_2025.map((photo) => (
            <div key={photo.id} className="flex flex-col gap-3">
              <div className="overflow-hidden bg-[#ECE8DF] aspect-[4/3] rounded-[2px] shadow-sm">
                <img
                  src={photo.image}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-baseline pt-2 border-b border-[#151515]/10 pb-1">
                <span className="font-display font-bold text-base uppercase text-[#151515]">
                  {photo.label}
                </span>
                <span className="font-mono text-[10px] text-[#575757] uppercase tracking-wider">
                  {photo.sublabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onViewFullArchive}
          className="btn-tactile w-full py-3.5 bg-[#151515] text-[#FAF9F5] font-mono text-xs uppercase tracking-widest font-semibold text-center mt-4"
        >
          VIEW FULL 2025 ARCHIVE ↗
        </button>
      </div>

      {/* Background Ribbon Layer */}
      <div
        ref={ribbonWrapperRef}
        className="hidden md:block absolute bottom-12 left-0 w-[140%] z-10 pointer-events-none opacity-80"
      >
        <FestivalRibbon
          bgColor="bg-[#1C4463]"
          textColor="text-[#FAF9F5]"
          heightClass="h-8 sm:h-9"
          speed={40}
        />
      </div>
    </section>
  );
};
