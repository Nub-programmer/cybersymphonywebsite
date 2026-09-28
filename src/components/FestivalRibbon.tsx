import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FestivalRibbonProps {
  className?: string;
  speed?: number; // duration in seconds for full loop (default ~34s for calm, slow movement)
  bgColor?: string;
  textColor?: string;
  heightClass?: string;
  text?: string[];
  style?: React.CSSProperties;
}

export const FestivalRibbon: React.FC<FestivalRibbonProps> = ({
  className = '',
  speed = 34,
  bgColor = 'bg-[#1C4463]',
  textColor = 'text-[#FAF9F5]',
  heightClass = 'h-10 sm:h-12',
  text = [
    'CYBER SYMPHONY 2026',
    '17 OCTOBER',
    'JAGRAN PUBLIC SCHOOL, NOIDA',
    'THE SYMPHONISERS',
    'PROGRAMME',
    '11 EVENTS',
  ],
  style,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !trackRef.current) return;

    // Continuous, calm, lightweight horizontal translation
    // Only animates transform (xPercent) on inner track
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [speed]);

  const phraseString = text.join('   ·   ') + '   ·   ';

  return (
    <div
      className={`ribbon-container relative overflow-hidden select-none whitespace-nowrap flex items-center ${bgColor} ${textColor} ${heightClass} ${className}`}
      style={{
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.08)',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Subtle physical printed tape texture via pure CSS */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 5px)',
        }}
      />

      {/* Continuously translating track */}
      <div ref={trackRef} className="ribbon-track flex shrink-0 items-center font-mono text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase will-change-transform">
        <span className="px-6">{phraseString}</span>
        <span className="px-6">{phraseString}</span>
      </div>
    </div>
  );
};
