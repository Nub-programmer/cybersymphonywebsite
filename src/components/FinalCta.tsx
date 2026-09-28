import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FestivalRibbon } from './FestivalRibbon';

gsap.registerPlugin(ScrollTrigger);

interface FinalCtaProps {
  onRegisterClick: () => void;
  hasEntered?: boolean;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onRegisterClick, hasEntered = true }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hasEntered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: ONE TIMELINE FOR FINAL CTA
      mm.add('(min-width: 768px)', () => {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        });

        // 1. Headline scale & presence
        masterTl.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0.7 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.4 },
          0
        );

        // 2. Festival Ribbon travels across beneath the metadata and settles
        masterTl.fromTo(
          ribbonWrapperRef.current,
          { xPercent: -60, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
          0.1
        );

        // 3. Register button appears last
        masterTl.fromTo(
          buttonRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 },
          0.5
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasEntered]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col justify-between px-[5vw] pt-20 pb-12 bg-[#FAF9F5] text-[#151515] select-none border-t border-[#151515]/8 overflow-hidden"
    >
      {/* Top Quiet Anchor */}
      <div className="w-full flex justify-between items-center font-mono text-xs text-[#575757] tracking-widest uppercase z-10">
        <span>CYBER SYMPHONY 2026</span>
        <span>FINAL CALL FOR DELEGATIONS</span>
      </div>

      {/* Centerpiece: Huge BRING YOUR SCHOOL */}
      <div className="my-auto max-w-5xl z-10">
        <h2
          ref={headlineRef}
          className="font-display font-extrabold uppercase tracking-[-0.035em] text-[#151515] leading-[0.92]"
          style={{ fontSize: 'clamp(2.75rem, 9.6vw, 9.8rem)' }}
        >
          BRING
          <br />
          YOUR
          <br />
          SCHOOL.
        </h2>
      </div>

      {/* FESTIVAL RIBBON LAYER: crosses beneath metadata and settles along bottom */}
      <div
        ref={ribbonWrapperRef}
        className="w-[120%] -ml-[10%] my-6 z-10"
      >
        <FestivalRibbon
          bgColor="bg-[#1C4463]"
          textColor="text-[#FAF9F5]"
          heightClass="h-10 sm:h-12"
          speed={28}
        />
      </div>

      {/* Bottom Quiet Info & Action */}
      <div
        ref={infoRef}
        className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4 border-t border-[#151515]/10 font-body z-10"
      >
        <div className="flex flex-col gap-1 text-xs tracking-widest uppercase font-mono text-[#575757]">
          <span className="text-[#151515] font-semibold">17 OCTOBER 2026</span>
          <span>JAGRAN PUBLIC SCHOOL, NOIDA</span>
        </div>

        <button
          ref={buttonRef}
          onClick={onRegisterClick}
          className="group inline-flex items-center gap-3 text-sm sm:text-base font-display font-bold uppercase tracking-wider text-[#151515] hover:text-[#325E7D] transition-colors cursor-pointer border-b-2 border-current pb-1"
        >
          <span>REGISTER YOUR SCHOOL</span>
          <span className="transform transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </button>
      </div>
    </section>
  );
};
