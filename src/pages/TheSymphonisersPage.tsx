import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  TEACHER_IN_CHARGES,
  IT_DEPARTMENT_MEMBERS,
  SOCIETY_LEADERSHIP,
  EVENT_HEADS,
  SOCIAL_COMMUNITY_HEADS,
  COMMUNITY_LINKS,
} from '../data/team';
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
              The Symphonisers is the student Technology & STEM Society of Jagran Public School, Noida, bringing together students across programming, cryptic deduction, digital design, robotics, engineering, innovation, and computational sciences.
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

        {/* 1. FACULTY GUIDANCE: TEACHER IN-CHARGES */}
        <section className="pt-6 sm:pt-10 mb-16 sm:mb-20">
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
              The Symphonisers operates under the continuous mentorship and faculty supervision of Jagran Public School, Noida.
            </p>
          </div>

          {/* Clean Faculty Roster */}
          <div className="divide-y divide-[#151515]/10 border-b border-[#151515]/10">
            {TEACHER_IN_CHARGES.map((teacher, idx) => (
              <div
                key={teacher.id || idx}
                className="py-5 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-baseline hover:bg-black/[0.015] transition-colors px-2 sm:px-4"
              >
                <div className="md:col-span-7">
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#151515]">
                    {teacher.name}
                  </h3>
                </div>

                <div className="md:col-span-5 flex md:justify-end items-baseline">
                  <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-[#1C4463] bg-[#1C4463]/5 px-3 py-1.5 rounded-[2px] font-semibold">
                    {teacher.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. IT DEPARTMENT */}
        <section className="pt-4 sm:pt-8 mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#575757] block mb-2">
                TECHNICAL & COMPUTATIONAL SUPPORT
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                IT DEPARTMENT
              </h2>
            </div>
            <span className="font-mono text-xs text-[#575757] tracking-widest uppercase">
              {IT_DEPARTMENT_MEMBERS.length} FACULTY MEMBERS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {IT_DEPARTMENT_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="p-5 border border-[#151515]/10 bg-white/40 rounded-[2px] flex items-center justify-between"
              >
                <span className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-[#151515]">
                  {member.name}
                </span>
                <span className="font-mono text-[10px] text-[#575757] tracking-widest uppercase">
                  IT DEPT
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SOCIETY LEADERSHIP */}
        <section className="pt-4 sm:pt-8 mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#1C4463] font-semibold block mb-2">
                EXECUTIVE COUNCIL
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                SOCIETY LEADERSHIP
              </h2>
            </div>
            <span className="font-mono text-xs text-[#575757] tracking-widest uppercase">
              STUDENT EXECUTIVE COUNCIL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SOCIETY_LEADERSHIP.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 border border-[#151515]/15 bg-white/60 rounded-[2px] flex flex-col justify-between gap-6"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#1C4463] font-bold block mb-2">
                    OFFICIAL APPOINTMENT
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#151515]">
                    {item.role}
                  </h3>
                </div>

                <div className="pt-4 border-t border-[#151515]/10 flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-[#575757]">
                    {item.status}
                  </span>
                  <span className="font-mono text-[11px] text-[#888] uppercase">
                    TO BE ANNOUNCED
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#575757] font-mono tracking-wide">
            * The President and Vice President will be appointed from among the current student heads/in-charges of The Symphonisers.
          </p>
        </section>

        {/* 4. STUDENT IN-CHARGES / EVENT HEADS */}
        <section className="pt-4 sm:pt-8 mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#1C4463] font-semibold block mb-2">
                STUDENT IN-CHARGES
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                EVENT HEADS
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#575757] max-w-md font-light leading-relaxed">
              Student convenors and event leads overseeing event execution, technical specifications, and arena coordination.
            </p>
          </div>

          {/* Compact Two-Column Grid on Desktop, Single-Column on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {EVENT_HEADS.map((event, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 border border-[#151515]/10 bg-white/50 rounded-[2px] flex flex-col justify-between gap-4 hover:border-[#1C4463]/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#575757] block mb-1">
                      EVENT CONVENOR
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                      {event.eventName}
                    </h3>
                  </div>
                  {event.eventSlug && (
                    <button
                      onClick={() => onNavigate(`/events/${event.eventSlug}`)}
                      className="font-mono text-[11px] uppercase tracking-wider text-[#1C4463] hover:underline cursor-pointer shrink-0 pt-1"
                    >
                      VIEW EVENT ↗
                    </button>
                  )}
                </div>

                <div className="pt-3 border-t border-[#151515]/8">
                  <div className="flex flex-wrap items-center gap-2">
                    {event.heads.map((head, hIdx) => (
                      <span
                        key={hIdx}
                        className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#151515] bg-[#151515]/5 px-2.5 py-1 rounded-[2px] font-medium"
                      >
                        {head}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SOCIAL & COMMUNITY HEADS */}
        <section className="pt-4 sm:pt-8 mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#1C4463] font-semibold block mb-2">
                COMMUNITY ENGAGEMENT & OUTREACH
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                SOCIAL & COMMUNITY HEADS
              </h2>
            </div>
            <span className="font-mono text-xs text-[#575757] tracking-widest uppercase">
              POINTS OF CONTACT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {SOCIAL_COMMUNITY_HEADS.map((head, idx) => (
              <div
                key={idx}
                className="p-6 border border-[#151515]/12 bg-white/60 rounded-[2px] flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                    {head.name}
                  </h3>
                  <p className="font-mono text-xs text-[#1C4463] uppercase tracking-wider font-semibold mt-1">
                    {head.role}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#575757] bg-[#151515]/5 px-3 py-1.5 rounded-[2px] uppercase">
                  LEAD
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 border border-[#1C4463]/20 bg-[#1C4463]/[0.03] rounded-[2px]">
            <span className="font-mono text-xs tracking-widest uppercase text-[#1C4463] font-bold block mb-2">
              COMMUNITY SUPPORT
            </span>
            <p className="text-sm sm:text-base text-[#151515] leading-relaxed mb-3">
              Having trouble joining the Discord or WhatsApp community? Contact our Social & Community Heads, Atharv Negi and Akshat Parmar, through the official Cyber Symphony channels.
            </p>
            <p className="text-xs text-[#575757] font-mono leading-relaxed">
              For any issues related to the Cyber Symphony Discord server, WhatsApp community, announcements, or community access, please contact the Social & Community Heads through the official Cyber Symphony channels:
            </p>
            <div className="mt-3 pt-3 border-t border-[#1C4463]/15 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#575757] uppercase font-semibold">Official Email:</span>
              <a
                href={`mailto:${COMMUNITY_LINKS.email}`}
                className="text-[#1C4463] font-bold underline hover:opacity-80"
              >
                {COMMUNITY_LINKS.email}
              </a>
            </div>
          </div>
        </section>

        {/* 6. STAY CONNECTED */}
        <section className="pt-4 sm:pt-8 mb-20 sm:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 border-b border-[#151515]/10 pb-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#1C4463] font-semibold block mb-2">
                OFFICIAL PLATFORMS
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                STAY CONNECTED
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#575757] max-w-md font-light leading-relaxed">
              Latest updates, announcements, server roles, queries, and real-time event communication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Discord Link */}
            <a
              href={COMMUNITY_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-8 border-2 border-[#151515] bg-[#151515] text-[#FAF9F5] rounded-[2px] flex flex-col justify-between gap-6 hover:bg-[#1C4463] hover:border-[#1C4463] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs tracking-widest uppercase opacity-70">
                    DISCORD SERVER
                  </span>
                  <span className="font-mono text-sm transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                  JOIN DISCORD ↗
                </h3>
              </div>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-light">
                Official announcement broadcasts, team voice lounges, event briefings, and real-time coordinator helpdesk.
              </p>
            </a>

            {/* WhatsApp Community Link */}
            <a
              href={COMMUNITY_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 sm:p-8 border-2 border-[#151515] bg-white rounded-[2px] flex flex-col justify-between gap-6 hover:border-[#1C4463] transition-all cursor-pointer group text-[#151515]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs tracking-widest uppercase text-[#575757]">
                    WHATSAPP COMMUNITY
                  </span>
                  <span className="font-mono text-sm text-[#1C4463] transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#151515] group-hover:text-[#1C4463] transition-colors">
                  JOIN WHATSAPP COMMUNITY ↗
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#575757] leading-relaxed font-light">
                Direct updates for school teacher coordinators, schedule release notifications, and urgent festival notices.
              </p>
            </a>
          </div>
        </section>

        {/* Footer Navigation CTA */}
        <div className="pt-10 border-t border-[#151515]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <span className="font-mono text-xs text-[#575757] uppercase tracking-wider">
            REPRESENT YOUR SCHOOL AT CYBER SYMPHONY 2026
          </span>
          <a
            href="/register"
            className="btn-tactile font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3.5 hover:bg-[#1C4463] transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            REGISTER YOUR SCHOOL DELEGATION ↗
          </a>
        </div>
      </div>
    </div>
  );
};
