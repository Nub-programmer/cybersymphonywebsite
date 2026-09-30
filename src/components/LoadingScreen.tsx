import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ambientAudio } from '../audio/ambientAudio';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Lock scrolling while loading screen is active
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let isMounted = true;
    const startTime = Date.now();
    const MIN_DURATION = 1800; // ms

    // Preload fonts and critical images
    const preloadAssets = async () => {
      const promises: Promise<unknown>[] = [];

      // 1. Fonts ready
      if (typeof document !== 'undefined' && 'fonts' in document) {
        promises.push(document.fonts.ready);
      }

      // 2. Main Logo decode
      const logoImg = new Image();
      logoImg.src = cyberSymphonyLogo;
      promises.push(
        new Promise((resolve) => {
          if (logoImg.complete) {
            if ('decode' in logoImg) {
              logoImg.decode().then(resolve).catch(resolve);
            } else {
              resolve(true);
            }
          } else {
            logoImg.onload = () => resolve(true);
            logoImg.onerror = () => resolve(true);
          }
        })
      );

      // 3. Minimum display timer
      const minTimerPromise = new Promise((resolve) => setTimeout(resolve, MIN_DURATION));
      promises.push(minTimerPromise);

      await Promise.allSettled(promises);
    };

    // Smooth entry timeline for loading screen elements
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.92, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        progressContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );

    // Initial smooth progress bar translation from 0 to 75%
    gsap.to(progressBarRef.current, {
      width: '75%',
      duration: 1.4,
      ease: 'power1.out',
    });

    // Wait for assets and minimum delay
    preloadAssets().then(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        if (!isMounted) return;

        // Finish progress bar to 100%
        gsap.to(progressBarRef.current, {
          width: '100%',
          duration: 0.5,
          ease: 'power1.inOut',
          onComplete: () => {
            if (!isMounted) return;

            // Outro sequence: logo shifts slightly up, background wipes upward
            const exitTl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = prevOverflow || '';
                setIsCompleted(true);
                onLoaded();
                // Attempt non-intrusive ambient audio playback
                ambientAudio.autoPlayWithFallback();
              },
            });

            exitTl
              .to(progressBarRef.current, {
                opacity: 0,
                duration: 0.25,
                ease: 'power1.out',
              })
              .to(
                [logoRef.current, titleRef.current],
                {
                  y: -20,
                  opacity: 0,
                  duration: 0.55,
                  ease: 'power2.in',
                },
                '-=0.1'
              )
              .to(
                containerRef.current,
                {
                  yPercent: -100,
                  duration: 0.85,
                  ease: 'power3.inOut',
                },
                '-=0.2'
              );
          },
        });
      }, remainingTime);
    });

    return () => {
      isMounted = false;
      document.body.style.overflow = prevOverflow || '';
    };
  }, [onLoaded]);

  if (isCompleted) return null;

  return (
    <aside
      ref={containerRef}
      aria-label="Loading Cyber Symphony"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0F1412] text-[#FAF9F5] select-none pointer-events-auto"
      style={{
        opacity: 1,
        visibility: 'visible',
      }}
    >
      <div className="flex flex-col items-center max-w-sm px-6 w-full text-center">
        {/* Official Cyber Symphony Logo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-8 flex items-center justify-center">
          <img
            ref={logoRef}
            src={cyberSymphonyLogo}
            alt="Cyber Symphony Emblem"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_30px_rgba(0,196,255,0.22)]"
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#FAF9F5]/90 mb-8"
        >
          CYBER SYMPHONY 2026
        </h1>

        {/* Minimalist Thin Progress Track */}
        <div
          ref={progressContainerRef}
          className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative"
        >
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 bottom-0 w-0 bg-gradient-to-r from-[#00C4FF] to-[#FAF9F5] transition-all"
            style={{ width: '8%' }}
          />
        </div>
      </div>
    </aside>
  );
};
