import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FestivalRibbon } from './FestivalRibbon';
import { EVENTS } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

interface FestivalStatementProps {
  hasEntered?: boolean;
}

export const FestivalStatement: React.FC<FestivalStatementProps> = ({ hasEntered = true }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statementStageRef = useRef<HTMLDivElement>(null);
  const disciplinesStageRef = useRef<HTMLDivElement>(null);
  const events11StageRef = useRef<HTMLDivElement>(null);
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);

  const disciplines = [
    'INNOVATION',
    'WEB DEVELOPMENT',
    'DIGITAL MEDIA',
    'TECHNOLOGY QUIZ',
    'PC GAMING',
    'MOBILE GAMING',
    'SPEEDCUBING',
    'WATER ROCKET',
    'CYBERSECURITY',
    'ROBO SOCCER',
    'OBSTACLE ROBOTICS',
  ];

  useEffect(() => {
    if (!hasEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: ONE MASTER PINNED TIMELINE FOR DISCIPLINES → 11 EVENTS
      mm.add('(min-width: 768px)', () => {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 2.2}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Initial setup
        gsap.set(disciplinesStageRef.current, { opacity: 0, pointerEvents: 'none' });
        gsap.set(events11StageRef.current, { opacity: 0, pointerEvents: 'none' });
        gsap.set(ribbonWrapperRef.current, { yPercent: 40, rotate: 0, opacity: 0.9 });

        // 0–28%: Statement stage active. Ribbon sits near bottom.
        masterTl.to(
          ribbonWrapperRef.current,
          { yPercent: 10, rotate: 1.5, ease: 'none', duration: 0.28 },
          0
        );

        // 28–38%: Statement fades out; Disciplines stage fades in
        masterTl.to(
          statementStageRef.current,
          { opacity: 0, y: -30, ease: 'power2.in', duration: 0.1 },
          0.28
        );
        masterTl.to(
          disciplinesStageRef.current,
          { opacity: 1, pointerEvents: 'auto', ease: 'power2.out', duration: 0.1 },
          0.33
        );

        // 38–60%: Disciplines gather/converge toward center. Ribbon positions across lower-third.
        masterTl.to(
          '.discipline-tag',
          { scale: 0.95, letterSpacing: '-0.02em', ease: 'power1.inOut', duration: 0.22 },
          0.38
        );
        masterTl.to(
          ribbonWrapperRef.current,
          { yPercent: -40, rotate: -3.5, scale: 1.05, ease: 'power1.inOut', duration: 0.22 },
          0.38
        );

        // 60–80%: Ribbon travels upward as a physical wipe across disciplines
        masterTl.to(
          ribbonWrapperRef.current,
          { yPercent: -220, rotate: -1.5, ease: 'power2.inOut', duration: 0.2 },
          0.6
        );
        masterTl.to(
          disciplinesStageRef.current,
          { opacity: 0, y: -40, ease: 'power2.in', duration: 0.15 },
          0.65
        );

        // 75–90%: Behind the ribbon, 11 EVENTS appears with immense impact
        masterTl.to(
          events11StageRef.current,
          { opacity: 1, pointerEvents: 'auto', y: 0, ease: 'power2.out', duration: 0.15 },
          0.75
        );

        // 90–100%: Ribbon leaves screen at the top, leaving pure 11 EVENTS
        masterTl.to(
          ribbonWrapperRef.current,
          { yPercent: -400, opacity: 0, ease: 'power2.in', duration: 0.1 },
          0.9
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasEntered]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAF9F5] text-[#151515] select-none overflow-hidden flex flex-col justify-center px-[var(--gutter-site)]"
    >
      <div className="relative w-full max-w-[var(--content-max-width)] mx-auto min-h-[80vh] flex flex-col justify-center">
        {/* STAGE 1: FESTIVAL STATEMENT */}
        <div
          ref={statementStageRef}
          className="w-full flex flex-col justify-between py-12 md:py-16"
        >
          <div className="max-w-5xl">
            <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-4">
              CYBER SYMPHONY 2026 · FESTIVAL STATEMENT
            </span>
            <h2
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-[0.96] text-[#151515]"
              style={{
                fontSize: 'clamp(2.5rem, 6.8vw, 6.8rem)',
              }}
            >
              BEYOND THE SCREEN.
              <br />
              <span className="font-serif-editorial italic font-normal text-[#1C4463] lowercase">
                into the
              </span>{' '}
              COMPETITION.
            </h2>
          </div>

          <div className="mt-16 sm:mt-24 md:mt-32 max-w-[var(--body-max-width)] md:ml-auto md:mr-12 flex flex-col gap-3 text-left">
            <p className="font-body text-lg sm:text-xl md:text-2xl text-[#151515] leading-relaxed font-light">
              Cyber Symphony is the inter-school technology festival of Jagran Public School, Noida.
            </p>
            <p className="font-mono text-xs sm:text-sm tracking-widest text-[#575757] uppercase">
              17 October 2026 · One Day · Eleven Disciplines
            </p>
          </div>
        </div>

        {/* STAGE 2: DISCIPLINES MATRIX */}
        <div
          ref={disciplinesStageRef}
          className="relative md:absolute md:inset-0 flex flex-col justify-center py-12 md:py-0 md:opacity-0"
        >
          <div className="max-w-5xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#575757] block mb-8">
              COMPETITIVE SPECTRUM
            </span>

            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-14 gap-y-4 sm:gap-y-6">
              {disciplines.map((item, idx) => (
                <span
                  key={item}
                  className="discipline-tag font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#151515] uppercase transition-colors hover:text-[#1C4463] select-none"
                >
                  {item}
                  {idx < disciplines.length - 1 && (
                    <span className="ml-6 sm:ml-10 md:ml-14 font-light text-[#151515]/20 select-none">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STAGE 3: 11 EVENTS REVEAL */}
        <div
          ref={events11StageRef}
          className="relative md:absolute md:inset-0 flex flex-col justify-center py-12 md:py-0 md:opacity-0"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#151515]/10">
            <div className="flex items-baseline gap-4 sm:gap-8">
              <span
                className="font-display font-extrabold text-[#151515] leading-none tracking-tight"
                style={{ fontSize: 'clamp(4.5rem, 13vw, 12rem)' }}
              >
                {EVENTS.length}
              </span>
              <span className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1C4463] uppercase">
                EVENTS
              </span>
            </div>

            <p className="max-w-[var(--body-max-width)] text-sm sm:text-base text-[#575757] leading-relaxed font-light mb-4">
              Curated across ideation sprints, web development, video editing, robotics, gaming, water rockets, speedcubing, and cryptographic hunt.
            </p>
          </div>
        </div>
      </div>

      {/* AMBIENT FESTIVAL RIBBON LAYER */}
      <div
        ref={ribbonWrapperRef}
        className="absolute bottom-10 left-[-15%] w-[130%] z-20 pointer-events-none"
      >
        <FestivalRibbon
          bgColor="bg-[#1C4463]"
          textColor="text-[#FAF9F5]"
          heightClass="h-10 sm:h-12"
          speed={30}
        />
      </div>
    </section>
  );
};
