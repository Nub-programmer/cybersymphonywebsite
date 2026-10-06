import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FestivalRibbon } from './FestivalRibbon';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onRegisterClick: () => void;
  hasEntered?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick, hasEntered = true }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLSpanElement>(null);
  const cyberRef = useRef<HTMLHeadingElement>(null);
  const symphonyRef = useRef<HTMLHeadingElement>(null);
  const cyberSpanRef = useRef<HTMLSpanElement>(null);
  const symphonySpanRef = useRef<HTMLSpanElement>(null);
  const logoRightRef = useRef<HTMLDivElement>(null);
  const emblemCardRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const metaTopRef = useRef<HTMLDivElement>(null);
  const metaBottomRef = useRef<HTMLDivElement>(null);
  const revealStatementRef = useRef<HTMLDivElement>(null);
  const ribbonWrapperRef = useRef<HTMLDivElement>(null);

  // Dynamic calculated fitting font size (in px) applied to BOTH lines
  const [fittedFontSize, setFittedFontSize] = useState<number | null>(null);

  // Auto-fit measurement calculation
  const calculateFittingSize = () => {
    const container = titleContainerRef.current;
    const cyberSpan = cyberSpanRef.current;
    const symphonySpan = symphonySpanRef.current;
    if (!container || !cyberSpan || !symphonySpan) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    // Available target width with 3% breathing margin to strictly prevent right-edge clipping
    const targetWidth = containerWidth * 0.97;

    // Get current font sizes and rendered text widths
    const currentCyberSize = parseFloat(window.getComputedStyle(cyberSpan).fontSize) || 100;
    const currentSymphonySize = parseFloat(window.getComputedStyle(symphonySpan).fontSize) || 100;

    const cyberWidth = cyberSpan.getBoundingClientRect().width || cyberSpan.scrollWidth;
    const symphonyWidth = symphonySpan.getBoundingClientRect().width || symphonySpan.scrollWidth;

    if (cyberWidth <= 0 || symphonyWidth <= 0) return;

    // Calculate maximum font size for each word
    const fitCyber = (targetWidth / cyberWidth) * currentCyberSize;
    const fitSymphony = (targetWidth / symphonyWidth) * currentSymphonySize;

    // Use narrower calculation for BOTH lines to preserve coherent typographic scale
    const optimalSize = Math.min(fitCyber, fitSymphony);

    // Clamp between comfortable limits: minimum 36px (small phone) and maximum 165px (ultrawide desktop)
    const clampedSize = Math.max(36, Math.min(165, Math.floor(optimalSize)));

    setFittedFontSize(clampedSize);
  };

  // Run fitting with ResizeObserver and font readiness
  useLayoutEffect(() => {
    calculateFittingSize();

    // Re-run once document fonts finish loading
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        calculateFittingSize();
      });
    }

    const container = titleContainerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        calculateFittingSize();
      });
      resizeObserver.observe(container);
    }

    const handleWindowResize = () => {
      calculateFittingSize();
    };
    window.addEventListener('resize', handleWindowResize, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Re-run fitting when loader finishes and hero becomes fully active
  useEffect(() => {
    if (hasEntered) {
      requestAnimationFrame(() => {
        calculateFittingSize();
      });
    }
  }, [hasEntered]);

  // Subtle pointer tilt & hover physics for Desktop Emblem Card (only when near top of page)
  useEffect(() => {
    const el = emblemCardRef.current;
    if (!el || typeof window === 'undefined') return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const qRotateX = gsap.quickTo(el, 'rotateX', { duration: 0.35, ease: 'power2.out' });
    const qRotateY = gsap.quickTo(el, 'rotateY', { duration: 0.35, ease: 'power2.out' });
    const qY = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' });
    const qScale = gsap.quickTo(el, 'scale', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Max tilt: rotateX ±1.5deg, rotateY ±2deg
      const rotX = Math.max(-1.5, Math.min(1.5, -(y / (rect.height / 2)) * 1.5));
      const rotY = Math.max(-2, Math.min(2, (x / (rect.width / 2)) * 2));

      qRotateX(rotX);
      qRotateY(rotY);
      qY(-4);
      qScale(1.03);
    };

    const handleMouseLeave = () => {
      qRotateX(0);
      qRotateY(0);
      qY(0);
      qScale(1);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // GSAP Deterministic Initial State & Scrub Timeline
  useEffect(() => {
    if (!hasEntered || !wrapperRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Explicitly initialise the elements before creating the ScrollTrigger
      // Deterministic base values at progress 0:
      gsap.set(theRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'transform',
      });
      gsap.set(cyberRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'transform',
      });
      gsap.set(symphonyRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'transform',
      });
      gsap.set(logoRightRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        clearProps: 'transform',
      });
      gsap.set(yearRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        clearProps: 'transform',
      });
      gsap.set([metaTopRef.current, metaBottomRef.current], {
        opacity: 1,
        y: 0,
      });

      // 2. Responsive matchMedia
      const mm = gsap.matchMedia();

      // DESKTOP: Master pinned timeline (>= 769px)
      mm.add('(min-width: 769px)', () => {
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: true, // Direct 1:1 scroll synchronization with zero lag catch-up
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 0–30%: HOLD STATE — Title, THE, Logo and 2026 remain 100% solid & fully visible
        masterTl.to({}, { duration: 0.28 }, 0);

        // 28–55%: Logo, Title, and 2026 smoothly transition away
        masterTl.to(
          logoRightRef.current,
          {
            y: -40,
            opacity: 0,
            scale: 0.96,
            ease: 'none',
            duration: 0.22,
          },
          0.28
        );
        masterTl.to(
          theRef.current,
          {
            y: -20,
            opacity: 0,
            ease: 'none',
            duration: 0.2,
          },
          0.28
        );
        masterTl.to(
          cyberRef.current,
          {
            x: -25,
            opacity: 0,
            ease: 'none',
            duration: 0.22,
          },
          0.28
        );
        masterTl.to(
          symphonyRef.current,
          {
            x: 25,
            opacity: 0,
            ease: 'none',
            duration: 0.22,
          },
          0.28
        );
        masterTl.to(
          [metaTopRef.current, metaBottomRef.current],
          {
            opacity: 0.2,
            ease: 'none',
            duration: 0.22,
          },
          0.28
        );

        // 55–80%: Statement reveals cleanly through negative space
        masterTl.fromTo(
          revealStatementRef.current,
          { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)', y: 20 },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0, ease: 'none', duration: 0.25 },
          0.55
        );

        // 75–100%: Festival Ribbon enters from lower-left
        masterTl.fromTo(
          ribbonWrapperRef.current,
          { yPercent: 180, xPercent: -15, opacity: 0, rotate: -2 },
          { yPercent: 0, xPercent: 0, opacity: 1, rotate: -1.5, ease: 'none', duration: 0.25 },
          0.75
        );
      });

      // MOBILE: Natural document scroll, lightweight entrance (<= 768px)
      mm.add('(max-width: 768px)', () => {
        gsap.set(
          [theRef.current, cyberRef.current, symphonyRef.current, logoRightRef.current, yearRef.current],
          { clearProps: 'all' }
        );

        gsap.fromTo(
          [metaTopRef.current, titleContainerRef.current, logoRightRef.current, metaBottomRef.current],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            clearProps: 'transform',
          }
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [hasEntered]);

  // Dynamic style applied to headings
  const headingStyle: React.CSSProperties = {
    fontSize: fittedFontSize ? `${fittedFontSize}px` : 'clamp(2.75rem, 8.2vw, 9.8rem)',
    lineHeight: 0.84,
    letterSpacing: '-0.04em',
  };

  return (
    <section
      ref={wrapperRef}
      className="relative w-full min-h-[100svh] md:h-screen md:min-h-[660px] flex flex-col justify-between px-[var(--gutter-site)] pt-20 sm:pt-24 pb-8 bg-[#FAF9F5] text-[#151515] select-none overflow-hidden"
    >
      <div className="w-full max-w-[var(--content-max-width)] mx-auto flex flex-col justify-between h-full">
        {/* Top Supporting Meta Row */}
        <div
          ref={metaTopRef}
          className="w-full flex justify-between items-start text-xs sm:text-sm tracking-wider uppercase font-body text-[#575757] pt-2 z-10"
        >
          <span className="font-medium tracking-widest text-[#151515]">
            JAGRAN PUBLIC SCHOOL, NOIDA
          </span>
          <span className="font-mono text-xs text-[#575757]">
            17 OCTOBER 2026
          </span>
        </div>

        {/* 
          Main Compositional Centerpiece: 
          Desktop 2-Part Composition:
          Left: minmax(0, 1fr) for Typography ("THE CYBER SYMPHONY")
          Right: clamp(180px, 19vw, 320px) for Official Emblem + 2026 Group
          Slight upward optical shift (-translate-y-3 sm:-translate-y-5)
        */}
        <div
          ref={posterRef}
          className="relative my-auto w-full grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_clamp(180px,19vw,320px)] items-center gap-6 lg:gap-10 z-10 py-4 sm:py-6 transform md:-translate-y-4"
        >
          {/* LEFT: TITLE COLUMN (min-width: 0 prevents flex/grid blowout) */}
          <div
            ref={titleContainerRef}
            className="hero-title min-w-0 w-full max-w-full flex flex-col justify-center"
          >
            {/* THE - Solid near-black, ~30–40% scale of CYBER line, aligned to left edge */}
            <div className="w-full max-w-full overflow-hidden">
              <span
                ref={theRef}
                className="hero-the font-display font-bold text-[#151515] uppercase block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 5rem)',
                  fontWeight: 700,
                  lineHeight: 0.85,
                  letterSpacing: '-0.045em',
                  marginBottom: '0.15em',
                  color: '#151515',
                  opacity: 1,
                }}
              >
                THE
              </span>
            </div>

            {/* CYBER ROW */}
            <div className="w-full max-w-full overflow-hidden">
              <h1
                ref={cyberRef}
                className="hero-title-line font-display font-extrabold text-[#151515] uppercase m-0 block whitespace-nowrap"
                style={headingStyle}
              >
                <span ref={cyberSpanRef} className="inline-block">
                  CYBER
                </span>
              </h1>
            </div>

            {/* SYMPHONY ROW - Exact same scale, guaranteed NEVER to clip */}
            <div className="w-full max-w-full overflow-hidden mt-1 sm:mt-2">
              <h1
                ref={symphonyRef}
                className="hero-title-line font-display font-extrabold text-[#151515] uppercase m-0 block whitespace-nowrap"
                style={headingStyle}
              >
                <span ref={symphonySpanRef} className="inline-block">
                  SYMPHONY
                </span>
              </h1>
            </div>
          </div>

          {/* RIGHT: OFFICIAL EMBLEM & 2026 GROUP */}
          <div
            ref={logoRightRef}
            className="hero-logo-wrap relative flex flex-col items-center justify-center bg-transparent [isolation:isolate] select-none mt-4 md:mt-0"
          >
            {/* Subtle atmospheric glow behind it */}
            <div
              className="absolute w-[135%] aspect-square rounded-full -z-10 pointer-events-none blur-[24px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(28, 160, 255, 0.10) 0%, rgba(31, 92, 255, 0.04) 40%, transparent 70%)',
              }}
            />

            {/* Emblem Image with hover physics */}
            <div
              ref={emblemCardRef}
              className="cursor-pointer will-change-transform transform-style-3d flex items-center justify-center bg-transparent"
            >
              <img
                src={cyberSymphonyLogo}
                alt="Cyber Symphony"
                className="hero-logo block w-[clamp(120px,37vw,180px)] md:w-[clamp(150px,15vw,230px)] h-auto object-contain bg-transparent border-0 shadow-none filter drop-shadow-[0_0_26px_rgba(28,160,255,0.10)] select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Elegant 2026 Serif Accent aligned directly underneath */}
            <div
              ref={yearRef}
              className="hero-year font-serif-editorial italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1C4463] select-none pointer-events-none mt-2"
            >
              2026
            </div>
          </div>

          {/* Masked reveal on scrub: BEYOND THE SCREEN */}
          <div
            ref={revealStatementRef}
            className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 pointer-events-none z-20"
          >
            <div className="bg-[#FAF9F5]/95 py-6 px-4">
              <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[#151515] uppercase leading-tight">
                BEYOND THE SCREEN.
                <br />
                <span className="font-serif-editorial italic text-3xl sm:text-5xl md:text-7xl text-[#1C4463]">
                  INTO THE COMPETITION.
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom Supporting Row */}
        <div
          ref={metaBottomRef}
          className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs tracking-wider uppercase font-body text-[#575757] border-t border-[#151515]/8 pt-4 z-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span className="font-medium text-[#151515]">INTER-SCHOOL TECHNOLOGY FESTIVAL</span>
            <span className="hidden sm:inline text-black/20">·</span>
            <span>ORGANISED BY THE SYMPHONISERS</span>
          </div>

          <a
            href="/register"
            className="btn-tactile hover-underline font-semibold text-[#151515] hover:text-[#1C4463] transition-colors cursor-pointer group flex items-center gap-1.5 min-h-[44px] sm:min-h-0"
          >
            <span>REGISTER YOUR SCHOOL</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* FESTIVAL RIBBON ENTERS FROM LOWER-LEFT DURING END OF HERO SCROLL (DESKTOP ONLY) */}
      <div
        ref={ribbonWrapperRef}
        className="hidden md:block absolute bottom-16 sm:bottom-20 -left-[10%] w-[125%] z-20 pointer-events-none opacity-0"
      >
        <FestivalRibbon
          bgColor="bg-[#1C4463]"
          textColor="text-[#FAF9F5]"
          heightClass="h-9 sm:h-11"
          speed={34}
        />
      </div>
    </section>
  );
};
