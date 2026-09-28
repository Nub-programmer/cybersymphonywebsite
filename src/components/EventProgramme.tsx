import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENTS } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

interface EventProgrammeProps {
  onSelectEvent: (slug: string) => void;
  onRegisterClick: () => void;
  hasEntered?: boolean;
}

export const EventProgramme: React.FC<EventProgrammeProps> = ({
  onSelectEvent,
  onRegisterClick,
  hasEntered = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIdxRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);

  const currentEvent = EVENTS[activeIndex];
  const isNocturne = currentEvent.slug === 'nocturne';

  // Desktop Scroll-driven Timeline for the 15-event programme
  useEffect(() => {
    if (!hasEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !pinnedStageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP ONLY: ONE PINNED STAGE, DURATION DERIVED FROM EVENTS.LENGTH
      mm.add('(min-width: 768px)', () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: pinnedStageRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * (EVENTS.length * 0.85)}`,
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const rawIdx = Math.floor(self.progress * EVENTS.length);
              const clamped = Math.min(EVENTS.length - 1, Math.max(0, rawIdx));
              if (clamped !== activeIdxRef.current) {
                activeIdxRef.current = clamped;
                setActiveIndex(clamped);
              }
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasEntered]);

  const handleSelectPoster = (idx: number) => {
    activeIdxRef.current = idx;
    setActiveIndex(idx);
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full transition-colors duration-700 ease-out select-none ${
        isNocturne ? 'bg-[#19201B] text-[#FAF9F5]' : 'bg-[#FAF9F5] text-[#151515]'
      }`}
    >
      {/* 1. CINEMATIC DESKTOP PINNED POSTER STAGE */}
      <div
        ref={pinnedStageRef}
        className="relative hidden md:flex w-full h-screen min-h-[660px] px-[var(--gutter-site)] py-14 flex-col justify-between overflow-hidden max-w-[var(--content-max-width)] mx-auto"
      >
        {/* Top Header Row of Poster */}
        <div className="w-full flex justify-between items-start border-b border-current/10 pb-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs tracking-widest uppercase opacity-60">
              OFFICIAL PROGRAMME · {activeIndex + 1} / {EVENTS.length}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold">
              {currentEvent.category}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span
              className={`text-xs font-mono tracking-widest uppercase px-2.5 py-1 ${
                isNocturne
                  ? 'text-[#1BBBE8]'
                  : currentEvent.mode === 'Hybrid'
                  ? 'text-[#325E7D]'
                  : 'text-[#575757]'
              }`}
            >
              {currentEvent.mode}
            </span>

            {/* Quick manual selection indicators */}
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              {EVENTS.map((ev, idx) => (
                <button
                  key={ev.id}
                  onClick={() => handleSelectPoster(idx)}
                  className={`w-6 h-6 flex items-center justify-center rounded-[1px] transition-all cursor-pointer ${
                    idx === activeIndex
                      ? 'border border-current font-bold'
                      : 'opacity-30 hover:opacity-100 hover:border-current/40'
                  }`}
                  aria-label={`Jump to event ${ev.number}`}
                >
                  {ev.number}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Giant Editorial Stage */}
        <div className="my-auto py-8 max-w-5xl">
          {/* Event Number */}
          <div className="overflow-hidden">
            <span className="font-mono text-xl sm:text-2xl tracking-widest block opacity-40">
              {currentEvent.number}
            </span>
          </div>

          {/* Event Title */}
          <div className="mt-2">
            <h3
              onClick={() => onSelectEvent(currentEvent.slug)}
              className="font-display font-extrabold tracking-tight uppercase leading-[0.95] cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 6.8rem)',
              }}
            >
              {currentEvent.name}
            </h3>
          </div>

          {/* Subtitle if Nocturne */}
          {currentEvent.subtitle && (
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-[#1BBBE8] mt-3">
              {currentEvent.subtitle}
            </p>
          )}

          {/* Summary */}
          <p className="mt-6 max-w-[var(--body-max-width)] text-base sm:text-lg md:text-xl font-light leading-relaxed opacity-85">
            {currentEvent.summary}
          </p>

          {/* Metadata Row: Clean editorial line */}
          <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono opacity-70">
            <span>DELEGATION: {currentEvent.teamSize}</span>
            <span>·</span>
            <span>ELIGIBILITY: {currentEvent.eligibility}</span>
            <span>·</span>
            <span>VENUE: {currentEvent.venue}</span>
          </div>

          {/* CTA Link to event detail */}
          <div className="mt-10">
            <button
              onClick={() => onSelectEvent(currentEvent.slug)}
              className="hover-underline inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest uppercase pb-1 hover:opacity-75 transition-opacity cursor-pointer"
            >
              <span>SPECIFICATIONS & RULEBOOK</span>
              <span className="inline-block transform transition-transform group-hover:translate-x-1">↗</span>
            </button>
          </div>
        </div>

        {/* Bottom Interactive Progress Bar */}
        <div className="w-full flex items-center justify-between pt-4 border-t border-current/10 text-xs font-mono">
          <span className="opacity-60">
            SCROLL TO EXPLORE ALL {EVENTS.length} ARENAS
          </span>
          <span className="opacity-60">
            EVENT {currentEvent.number} OF {EVENTS.length}
          </span>
        </div>
      </div>

      {/* 2. MOBILE CLEAN VERTICAL PRESENTATION (NO PINNING LOCK) */}
      <div className="md:hidden w-full px-[var(--gutter-site)] py-16 space-y-12">
        <div className="border-b border-current/10 pb-4">
          <span className="font-mono text-xs tracking-widest uppercase opacity-60">
            THE {EVENTS.length} ARENAS
          </span>
          <h3 className="font-display text-3xl font-extrabold uppercase mt-1">
            EVENT PROGRAMME
          </h3>
        </div>

        <div className="divide-y divide-current/10">
          {EVENTS.map((ev) => (
            <div
              key={ev.id}
              onClick={() => onSelectEvent(ev.slug)}
              className="py-8 flex flex-col gap-2 cursor-pointer transition-colors hover:bg-current/[0.02]"
            >
              <div className="flex items-center justify-between text-xs font-mono opacity-60">
                <span>{ev.number}</span>
                <span className="uppercase">{ev.mode}</span>
              </div>
              <h4 className="font-display text-2xl font-bold uppercase tracking-tight">
                {ev.name}
              </h4>
              <p className="text-xs font-mono text-[#325E7D] uppercase">
                {ev.category}
              </p>
              <p className="text-sm opacity-80 mt-1 line-clamp-2 font-light">
                {ev.summary}
              </p>
              <div className="pt-2 text-xs font-mono font-semibold hover-underline self-start">
                EXPLORE SPECIFICATIONS ↗
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PRACTICAL EVENT DIRECTORY FOR TEACHERS & COORDINATORS */}
      <div className="w-full px-[var(--gutter-site)] py-24 border-t border-current/10">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase opacity-50 block mb-2">
                INDEX FOR COORDINATORS
              </span>
              <h4 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight">
                PRACTICAL EVENT DIRECTORY
              </h4>
            </div>

            <button
              onClick={onRegisterClick}
              className="btn-tactile font-mono text-xs uppercase tracking-wider font-semibold border border-current px-5 py-2.5 rounded-[2px] hover:bg-current hover:text-white transition-all cursor-pointer self-start md:self-auto"
            >
              REGISTER SCHOOL DELEGATION ↗
            </button>
          </div>

          {/* Clean Rows: Refined hover interaction - translates name right 8-14px, darkens divider, shifts mode */}
          <div className="border-t border-current/15">
            {EVENTS.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event.slug)}
                className="group flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-current/10 hover:border-current/30 hover:bg-current/[0.025] transition-all duration-300 px-3 cursor-pointer select-none"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-xs opacity-40 w-6 shrink-0 transition-opacity group-hover:opacity-75">
                    {event.number}
                  </span>
                  <div className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-current">
                      {event.name}
                    </span>
                    {event.subtitle && (
                      <span className="ml-2 font-mono text-[11px] text-[#325E7D] uppercase tracking-wider">
                        ({event.subtitle})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-12 mt-3 md:mt-0 text-xs font-mono transition-transform duration-300 group-hover:translate-x-1">
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">{event.category}</span>
                  <span
                    className={`font-semibold ${
                      event.mode === 'Hybrid'
                        ? 'text-[#325E7D]'
                        : event.mode === 'Online'
                        ? 'text-[#1BBBE8]'
                        : 'opacity-80'
                    }`}
                  >
                    {event.mode}
                  </span>
                  <span className="opacity-60 hidden lg:inline">
                    {event.teamSize}
                  </span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1.5 opacity-60 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
