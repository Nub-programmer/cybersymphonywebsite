import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FestivalRibbon } from './FestivalRibbon';
import { EVENTS } from '../data/events';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';

gsap.registerPlugin(ScrollTrigger);

interface BrochureSectionProps {
  onOpenFullBrochure?: () => void;
  hasEntered?: boolean;
}

export const BrochureSection: React.FC<BrochureSectionProps> = ({
  onOpenFullBrochure,
  hasEntered = true,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [sheenCoords, setSheenCoords] = useState({ x: 45, y: 35 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const bookletRef = useRef<HTMLDivElement>(null);
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);

  const pages = [
    {
      pageNumber: '00',
      tag: 'FRONT COVER',
      title: 'CYBER SYMPHONY 2026',
      subtitle: 'THE OFFICIAL FIELD MANUAL & DELEGATION GUIDE',
      body: 'Published by The Symphonisers, Jagran Public School, Noida. Containing complete operational schedules, code of conduct, scoring rubrics, and delegation guidelines.',
    },
    {
      pageNumber: '01',
      tag: 'SECTION I : ETHOS',
      title: 'CRAFT OVER DECORATION',
      subtitle: 'PRINCIPLES OF THE 2026 SYMPOSIUM',
      body: 'Cyber Symphony is designed as a sanctuary of authentic computational and physical engineering. We value clean execution, mathematical insight, and robust system architecture over surface spectacle.',
    },
    {
      pageNumber: '02',
      tag: 'SECTION II : PROTOCOLS',
      title: 'DELEGATION INTEGRITY',
      subtitle: 'REPORTING, SAFETY & ARBITRATION',
      body: 'All participating student delegations must report with verified school authorization credentials. Host marshals maintain uncompromised safety standards across combat robotics and autonomous drone arenas.',
    },
    {
      pageNumber: '03',
      tag: 'SECTION III : CAMPUS MAP',
      title: 'ARENAS & COORDINATION',
      subtitle: 'FACILITIES & SAFETY PROTOCOLS',
      body: 'Parallel venues situated across Computer Labs Alpha & Beta, Robotics Arena, Innovation Hub, and Main Auditorium. Power distribution and field benches assigned to each verified school squad.',
    },
    {
      pageNumber: '04',
      tag: 'BACK COVER',
      title: 'JAGRAN PUBLIC SCHOOL',
      subtitle: 'SECTOR 47, NOIDA · 17 OCTOBER 2026',
      body: 'Inquiries regarding school delegations, jury coordination, and partner accommodations may be directed to contact@cybersynchronizer.tech.',
    },
  ];

  // GSAP Scroll Entrance: emerges from lower-right/center into rest position
  useEffect(() => {
    if (!hasEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !pinnedStageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, [hasEntered]);

  // Pointer perspective tilt (TechFoundry physical response)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = bookletRef.current;
    if (!el || isOpenModal) return;

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

  // Keyboard controls for booklet reading mode
  useEffect(() => {
    if (!isOpenModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        setIsOpenModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenModal, currentPage, isFlipping]);

  const handleNextPage = () => {
    if (isFlipping || currentPage >= pages.length - 1) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
      setIsFlipping(false);
    }, 420);
  };

  const handlePrevPage = () => {
    if (isFlipping || currentPage <= 0) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(0, prev - 1));
      setIsFlipping(false);
    }, 420);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `CYBER SYMPHONY 2026 — OFFICIAL FIELD GUIDE\nJagran Public School, Noida\nOrganised by The Symphonisers\nDate: 17 October 2026\nPrimary Domain: cybersynchronizer.tech\n\n12 CONFIRMED COMPETITIONS:\n01. Innovation Sprint (Hybrid)\n02. UI/UX Rumble (Web Designing / UI-UX, Offline)\n03. Framelock (Video Editing / Digital Media, Format Under Review)\n04. Quizzard (Technology Quiz, Offline)\n05. Hyperstrike PC (PC Gaming, Offline, Game: TBA)\n06. Hyperstrike Mobile (Mobile Gaming, Offline, Game: TBA)\n07. Twisttriads (Speedcubing: 2x2, 3x3, Pyraminx, Offline)\n08. Flying Machine (Water Rocket, Offline, Rules: TBA)\n09. Nocturne (Cyber Hunt / Cryptic Hunt, Online)\n10. Robo Soccer (Robotics / Robo Soccer, Offline, Rules: TBA)\n11. Huddle Mania (Obstacle Robotics, Offline, Rules: TBA)\n12. Tech Crossfire (Tech MUN / Digital Policy, Offline)\n\nRegistration: https://cybersynchronizer.tech/register`,
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Cyber_Symphony_2026_Field_Guide.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
              FIELD GUIDE
            </span>
            <h2
              className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              FIELD MANUAL
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleDownload}
              className="hover-underline text-xs font-mono uppercase tracking-widest font-semibold pb-1 hover:text-[#1C4463] transition-colors cursor-pointer"
            >
              DOWNLOAD GUIDE ↗
            </button>
          </div>
        </div>

        {/* 2-Column Composition: Small copy Left + Physical 3D Object Right */}
        <div className="my-auto py-4 grid grid-cols-12 gap-14 items-center z-20">
          {/* Left Column: Direct factual copy */}
          <div className="col-span-5 flex flex-col gap-6 max-w-[var(--body-max-width)]">
            <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#1C4463] leading-snug">
              Official regulations, schedule matrices, and scoring criteria.
            </p>
            <p className="text-sm sm:text-base text-[#575757] font-light leading-relaxed">
              The Cyber Symphony Field Guide contains complete operational schedules, code of conduct, scoring rubrics, and delegation guidelines for participating schools.
            </p>
            <div className="pt-3 border-t border-black/10 flex flex-col gap-1.5 font-mono text-xs text-[#575757]">
              <span>17 OCTOBER 2026 · JAGRAN PUBLIC SCHOOL, NOIDA</span>
              <span>ORGANISED BY THE SYMPHONISERS</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsOpenModal(true)}
                className="btn-tactile px-6 py-3 border border-[#151515] hover:bg-[#151515] hover:text-[#FAF9F5] text-xs font-mono uppercase tracking-widest rounded-[2px] cursor-pointer"
              >
                OPEN FIELD GUIDE READER ↗
              </button>
            </div>
          </div>

          {/* Right Column: Physical 3D Brochure with Multi-Layered Paper Spine */}
          <div className="col-span-7 flex flex-col items-center justify-center relative perspective-1200">
            <div
              ref={bookletRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsOpenModal(true)}
              className="group relative transform-style-3d cursor-pointer select-none"
              style={{
                width: '320px',
                height: '440px',
                transform: 'rotateZ(-2.5deg)',
                willChange: 'transform',
              }}
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

              {/* Physical Chapter Index Tabs along the right edge */}
              <div className="absolute -right-6 top-8 flex flex-col gap-2.5 z-20">
                {pages.map((p, idx) => (
                  <button
                    key={p.pageNumber}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage(idx);
                      setIsOpenModal(true);
                    }}
                    className="group/tab px-2 py-1 bg-[#E7E2D5] hover:bg-[#151515] hover:text-[#FAF9F5] border-r border-t border-b border-black/20 text-[9px] font-mono tracking-widest text-[#575757] rounded-r-[2px] shadow-sm transition-all duration-200 hover:translate-x-1 cursor-pointer"
                    title={`Jump to ${p.tag}`}
                  >
                    <span>{p.pageNumber}</span>
                  </button>
                ))}
              </div>

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
                  <span>OFFICIAL GUIDE</span>
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
                  <span className="text-[#325E7D] font-bold">CLICK TO READ SPREADS ↗</span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-[11px] font-mono tracking-widest text-[#888] uppercase">
              Physical A5 Broadside · Interactive Specular Linen Cover
            </p>
          </div>
        </div>

        {/* AMBIENT FESTIVAL RIBBON LAYER: sits behind booklet as subtle physical composition */}
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
            FIELD GUIDE
          </span>
          <h3 className="font-display text-3xl font-extrabold uppercase">
            FIELD MANUAL
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
              <span className="font-mono text-[10px] text-[#325E7D] uppercase tracking-wider block">A5 OFFICIAL FIELD GUIDE</span>
              <h4 className="font-display text-xl font-bold uppercase leading-none">CYBER SYMPHONY 2026</h4>
            </div>
          </div>
          <p className="text-sm text-[#575757] font-light leading-relaxed">
            48 pages of complete event schedules, code of conduct, scoring rubrics, and delegation guidelines.
          </p>
          <div className="pt-2 flex flex-col gap-2.5 font-mono text-xs">
            <button
              onClick={() => setIsOpenModal(true)}
              className="btn-tactile w-full py-3 bg-[#151515] text-[#FAF9F5] uppercase tracking-widest rounded-[2px]"
            >
              OPEN READER ↗
            </button>
            <button
              onClick={handleDownload}
              className="btn-tactile w-full py-3 border border-current uppercase tracking-widest rounded-[2px]"
            >
              DOWNLOAD GUIDE ↗
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Dedicated Reading State Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#19201B]/80 backdrop-blur-md transition-opacity duration-300">
          <div
            className="relative w-full max-w-4xl bg-[#FAF9F5] text-[#151515] shadow-2xl p-6 sm:p-12 border border-black/15 flex flex-col justify-between min-h-[520px] rounded-[2px]"
            role="dialog"
            aria-label="Brochure Booklet Reader"
          >
            {/* Modal Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/10 font-mono text-xs tracking-widest uppercase">
              <div className="flex items-center gap-3">
                <img
                  src={cyberSymphonyLogo}
                  alt="Cyber Symphony Logo"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-[#325E7D] font-bold">{pages[currentPage].tag}</span>
              </div>

              {/* Direct Chapter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {pages.map((p, idx) => (
                  <button
                    key={p.pageNumber}
                    onClick={() => {
                      setIsFlipping(true);
                      setTimeout(() => {
                        setCurrentPage(idx);
                        setIsFlipping(false);
                      }, 200);
                    }}
                    className={`px-2 py-1 text-[10px] tracking-wider transition-colors rounded-[1px] cursor-pointer ${
                      currentPage === idx
                        ? 'bg-[#151515] text-[#FAF9F5] font-bold'
                        : 'opacity-50 hover:opacity-100 hover:bg-black/5'
                    }`}
                  >
                    {p.pageNumber}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <span>SPREAD {pages[currentPage].pageNumber} / 04</span>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="btn-tactile font-bold text-base hover:opacity-60 cursor-pointer p-1"
                  aria-label="Close brochure modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Two-Page Book Spread Experience */}
            <div className="relative my-auto py-8">
              {/* Realistic book spine center crease shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 w-12 -ml-6 pointer-events-none book-spine-crease hidden md:block z-10" />

              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center transition-all duration-300 ${
                  isFlipping ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
                }`}
              >
              {/* Left Page (Click to go previous) */}
              <div
                onClick={handlePrevPage}
                className="cursor-pointer group p-4 border-r border-black/10 hidden md:flex flex-col justify-between h-full select-none"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest block mb-2">
                    PAGE {pages[Math.max(0, currentPage - 1)].pageNumber}
                  </span>
                  <h4 className="font-display text-xl font-bold uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                    {pages[Math.max(0, currentPage - 1)].title}
                  </h4>
                  <p className="mt-3 text-xs text-[#666] line-clamp-4 font-light">
                    {pages[Math.max(0, currentPage - 1)].body}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest mt-6 group-hover:text-[#151515]">
                  ← CLICK LEFT FOR PREVIOUS SPREAD
                </span>
              </div>

              {/* Right Page (Active Page, Click to go next) */}
              <div
                onClick={handleNextPage}
                className="cursor-pointer group flex flex-col justify-between h-full select-none"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#325E7D] uppercase tracking-widest block mb-2 font-semibold">
                    PAGE {pages[currentPage].pageNumber} · CURRENT SPREAD
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#151515] leading-tight">
                    {pages[currentPage].title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#325E7D] mt-2">
                    {pages[currentPage].subtitle}
                  </p>
                  <p className="mt-6 text-sm sm:text-base text-[#575757] leading-relaxed font-light">
                    {pages[currentPage].body}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest mt-6 group-hover:text-[#151515]">
                  CLICK RIGHT FOR NEXT SPREAD →
                </span>
              </div>
            </div>
          </div>

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-5 border-t border-black/10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="btn-tactile px-4 py-2 border border-current disabled:opacity-20 hover:bg-[#151515] hover:text-[#FAF9F5] rounded-[2px] transition-colors cursor-pointer"
                >
                  ← PREVIOUS
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pages.length - 1}
                  className="btn-tactile px-4 py-2 border border-current disabled:opacity-20 hover:bg-[#151515] hover:text-[#FAF9F5] rounded-[2px] transition-colors cursor-pointer"
                >
                  NEXT →
                </button>
              </div>

              <div className="flex items-center gap-5">
                <button
                  onClick={handleDownload}
                  className="hover-underline text-[#325E7D] uppercase tracking-wider font-semibold cursor-pointer"
                >
                  DOWNLOAD PDF ↗
                </button>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="hover-underline text-[#888] hover:text-[#151515] uppercase tracking-wider cursor-pointer"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
