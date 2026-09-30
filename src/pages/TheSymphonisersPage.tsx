import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SYMPHONISERS_LEADERSHIP, TEACHER_IN_CHARGES } from '../data/team';
import { FestivalRibbon } from '../components/FestivalRibbon';
import theSymphonisersLogo from '../assets/images/thesymphoniserslogo.png';

interface TheSymphonisersPageProps {
  onNavigate: (path: string) => void;
}

export const TheSymphonisersPage: React.FC<TheSymphonisersPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theSpanRef = useRef<HTMLSpanElement>(null);
  const symphonisersSpanRef = useRef<HTMLSpanElement>(null);

  const [fittedFontSize, setFittedFontSize] = useState<number | null>(null);

  const calculateFittingSize = () => {
    const container = containerRef.current;
    const symphonisersSpan = symphonisersSpanRef.current;
    if (!container || !symphonisersSpan) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    // Available target width with 4% breathing margin to strictly prevent right-edge clipping
    const targetWidth = containerWidth * 0.96;

    const currentSize = parseFloat(window.getComputedStyle(symphonisersSpan).fontSize) || 100;
    const renderedWidth = symphonisersSpan.getBoundingClientRect().width || symphonisersSpan.scrollWidth;

    if (renderedWidth <= 0) return;

    const fitSize = (targetWidth / renderedWidth) * currentSize;
    // Clamp between comfortable limits: minimum 32px (small phone) and maximum 140px (ultrawide desktop)
    const clampedSize = Math.max(32, Math.min(140, Math.floor(fitSize)));

    setFittedFontSize(clampedSize);
  };

  useLayoutEffect(() => {
    calculateFittingSize();

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        calculateFittingSize();
      });
    }

    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        calculateFittingSize();
      });
      resizeObserver.observe(container);
    }

    const handleResize = () => calculateFittingSize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const headingStyle: React.CSSProperties = {
    fontSize: fittedFontSize ? `${fittedFontSize}px` : 'clamp(2.5rem, 7.5vw, 7.5rem)',
    lineHeight: 0.88,
    letterSpacing: '-0.04em',
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-28 sm:pt-32 pb-36 px-[var(--gutter-site)] overflow-x-hidden">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Header Block: Large Typography Artpiece with Responsive Auto-Fit & Club Identity */}
        <div className="border-b border-[#151515]/10 pb-12 sm:pb-16 mb-12 sm:mb-16">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-4">
            STUDENT TECHNOLOGY & STEM SOCIETY · FOUNDING CHARTER
          </span>

          <div ref={containerRef} className="min-w-0 w-full max-w-full">
            {/* THE */}
            <div className="w-full max-w-full overflow-hidden">
              <h1
                className="font-display font-extrabold uppercase text-[#151515] m-0 block whitespace-nowrap"
                style={headingStyle}
              >
                <span ref={theSpanRef} className="inline-block">
                  THE
                </span>
              </h1>
            </div>

            {/* SYMPHONISERS - Zero clipping across all screen widths */}
            <div className="w-full max-w-full overflow-hidden mt-1 sm:mt-2">
              <h1
                className="font-display font-extrabold uppercase text-[#151515] m-0 block whitespace-nowrap"
                style={headingStyle}
              >
                <span ref={symphonisersSpanRef} className="inline-block">
                  SYMPHONISERS
                </span>
              </h1>
            </div>
          </div>

          {/* Club Identity, Emblem, and Mission Summary */}
          <div className="mt-10 sm:mt-12 flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6 border-t border-[#151515]/8">
            {/* Official Society Emblem and Hierarchy */}
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center shrink-0 bg-white/60 p-2 border border-black/5 rounded-sm shadow-sm">
                <img
                  src={theSymphonisersLogo}
                  alt="The Symphonisers Official Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                />
              </div>

              <div className="flex flex-col">
                <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                  THE SYMPHONISERS
                </h2>
                <p className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#1C4463] font-semibold mt-0.5">
                  Technology & STEM Society
                </p>
                <p className="font-mono text-xs text-[#575757] uppercase tracking-wider mt-0.5">
                  Jagran Public School, Noida
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#575757] font-light max-w-xl leading-relaxed">
              The Symphonisers is the year-round student Technology & STEM Society of Jagran Public School, Noida, bringing together students across programming, cybersecurity, digital policy, design, robotics, engineering, innovation, and computational disciplines.
            </p>
          </div>
        </div>

        {/* Ambient Subtle Festival Ribbon Transition */}
        <div className="w-full my-12 sm:my-16 overflow-hidden rounded-[2px] opacity-90">
          <FestivalRibbon
            bgColor="bg-[#1C4463]"
            textColor="text-[#FAF9F5]"
            heightClass="h-8 sm:h-9"
            speed={38}
          />
        </div>

        {/* SECTION 1: TEACHER IN-CHARGES (Faculty Guidance) */}
        <div className="pt-6 sm:pt-10 mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#1C4463] font-semibold block mb-2">
                FACULTY GUIDANCE
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                TEACHER IN-CHARGES
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#575757] max-w-md font-light leading-relaxed">
              The Symphonisers operates under the guidance and supervision of the faculty of Jagran Public School, Noida.
            </p>
          </div>

          {/* Clean Faculty Roster */}
          <div className="divide-y divide-[#151515]/10 border-b border-[#151515]/10">
            {TEACHER_IN_CHARGES.map((teacher, idx) => (
              <div
                key={teacher.id || idx}
                className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-baseline hover:bg-black/[0.015] transition-colors px-2 sm:px-4"
              >
                <div className="md:col-span-7">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                    {teacher.role}
                  </h3>
                  {teacher.department && (
                    <span className="font-mono text-[11px] text-[#575757] uppercase tracking-wider block mt-1">
                      {teacher.department}
                    </span>
                  )}
                </div>

                <div className="md:col-span-5 flex md:justify-end items-baseline">
                  <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#575757] bg-[#151515]/5 px-3 py-1.5 rounded-[2px] font-medium">
                    {teacher.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: STUDENT LEADERSHIP & DEPARTMENT HEADS */}
        <div className="pt-4 sm:pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#575757] block mb-2">
                EXECUTIVE COUNCIL & DEPARTMENT HEADS
              </span>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#151515]">
                SOCIETY LEADERSHIP
              </h2>
            </div>
            <span className="font-mono text-xs text-[#575757] tracking-widest uppercase">
              {SYMPHONISERS_LEADERSHIP.length} ACTIVE APPOINTMENTS
            </span>
          </div>

          {/* Clean Editorial Masthead Rows with Alternating Rhythms on Desktop */}
          <div className="divide-y divide-[#151515]/10 border-b border-[#151515]/10">
            {SYMPHONISERS_LEADERSHIP.map((member, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={member.id}
                  className={`py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-baseline hover:bg-black/[0.015] transition-colors px-2 sm:px-4 ${
                    isEven ? 'md:bg-transparent' : 'md:bg-[#151515]/[0.01]'
                  }`}
                >
                  {/* Large Role Typography */}
                  <div className="md:col-span-7">
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#151515]">
                      {member.role}
                    </h3>
                    <span className="font-mono text-[11px] text-[#1C4463] uppercase tracking-wider block mt-1">
                      {member.department}
                    </span>
                  </div>

                  {/* Name Placeholder */}
                  <div className="md:col-span-5 flex md:justify-end items-baseline">
                    <span className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#575757] bg-[#151515]/5 px-3 py-1.5 rounded-[2px] font-medium">
                      {member.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation CTA */}
        <div className="mt-24 sm:mt-32 pt-10 border-t border-[#151515]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <span className="font-mono text-xs text-[#575757] uppercase tracking-wider">
            REPRESENT YOUR SCHOOL AT CYBER SYMPHONY 2026
          </span>
          <button
            onClick={() => onNavigate('/register')}
            className="btn-tactile font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3.5 hover:bg-[#1C4463] transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            REGISTER YOUR SCHOOL DELEGATION ↗
          </button>
        </div>
      </div>
    </div>
  );
};
