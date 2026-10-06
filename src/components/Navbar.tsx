import React, { useState, useEffect } from 'react';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDarkTheme?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  isDarkTheme = false,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Programme', path: '/programme', isExternal: false },
    { label: 'Schedule', path: '/schedule', isExternal: false },
    { label: 'Brochure', path: '/brochure', isExternal: false },
    { label: 'Archive', path: '/archive', isExternal: false },
    { label: 'The Symphonisers', path: '/thesymphonisers', isExternal: false },
    { label: 'Partners', path: '/partners', isExternal: false },
    { label: 'Discord', path: 'https://discord.gg/7zedz2wyG7', isExternal: true },
    { label: 'WhatsApp', path: 'https://chat.whatsapp.com/Ivu3yePs0Kd9h3VIQSQAUA', isExternal: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? isDarkTheme
              ? 'bg-[#19201B]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-sm'
              : 'bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#151515]/8 py-3 shadow-sm'
            : isDarkTheme
            ? 'bg-transparent py-4 sm:py-5'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="w-full max-w-[var(--content-max-width)] mx-auto px-[var(--gutter-site)] flex items-center justify-between">
          {/* Official Cyber Symphony Logo Lockup */}
          <button
            onClick={() => onNavigate('/')}
            className="group flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer transition-opacity duration-300 hover:opacity-100 opacity-95 focus-visible:outline-none shrink-0"
            aria-label="Cyber Symphony 2026 Home"
          >
            <img
              src={cyberSymphonyLogo}
              alt="Cyber Symphony Emblem"
              className="w-7 h-7 sm:w-9 sm:h-9 object-contain filter drop-shadow-[0_2px_10px_rgba(0,196,255,0.2)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className={`font-display font-extrabold text-xs sm:text-base tracking-tight leading-none uppercase ${
                  isDarkTheme ? 'text-[#FAF9F5]' : 'text-[#151515]'
                }`}
              >
                CYBER SYMPHONY
              </span>
              <span
                className={`font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-0.5 ${
                  isDarkTheme ? 'text-[#FAF9F5]/60' : 'text-[#575757]'
                }`}
              >
                2026 · EDITION
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-medium tracking-wider uppercase font-body">
            {navLinks.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative py-1 inline-flex items-center gap-1 cursor-pointer transition-colors duration-200 ${
                      isDarkTheme
                        ? 'text-[#FAF9F5]/80 hover:text-[#00C4FF]'
                        : 'text-[#575757] hover:text-[#1C4463]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] opacity-70">↗</span>
                  </a>
                );
              }

              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`relative py-1 cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? isDarkTheme
                        ? 'text-[#00C4FF] font-semibold'
                        : 'text-[#1C4463] font-semibold'
                      : isDarkTheme
                      ? 'text-[#FAF9F5]/80 hover:text-[#FAF9F5]'
                      : 'text-[#575757] hover:text-[#151515]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[1.5px] ${
                        isDarkTheme ? 'bg-[#00C4FF]' : 'bg-[#1C4463]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Area: Register CTA on desktop / MENU toggle on mobile */}
          <div className="flex items-center gap-3">
            <a
              href="/register"
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer ${
                isDarkTheme
                  ? 'bg-[#00C4FF] text-[#111412] hover:bg-[#FAF9F5]'
                  : 'bg-[#151515] text-[#FAF9F5] hover:bg-[#1C4463]'
              }`}
            >
              <span>Register</span>
              <span className="font-mono text-xs">↗</span>
            </a>

            {/* Mobile MENU Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-sm border font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isDarkTheme
                  ? 'border-white/20 text-[#FAF9F5] hover:bg-white/10'
                  : 'border-black/15 text-[#151515] hover:bg-black/5'
              }`}
              aria-label="Toggle Menu"
            >
              <span>{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu: Clean Full Screen Experience */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 backdrop-blur-2xl transition-all duration-300 ${
            isDarkTheme ? 'bg-[#19201B]/98 text-[#FAF9F5]' : 'bg-[#FAF9F5]/98 text-[#151515]'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#575757] block mb-2">
              NAVIGATION MENU
            </span>
            {navLinks.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-left font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight py-2.5 border-b flex items-center justify-between transition-colors ${
                      isDarkTheme
                        ? 'border-white/10 text-[#FAF9F5] hover:text-[#00C4FF]'
                        : 'border-[#151515]/10 text-[#151515] hover:text-[#1C4463]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-lg opacity-70">↗</span>
                  </a>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(item.path);
                  }}
                  className={`text-left font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight py-2.5 border-b transition-colors ${
                    isDarkTheme ? 'border-white/10 text-[#FAF9F5]' : 'border-[#151515]/10 text-[#151515]'
                  } ${currentPath === item.path ? (isDarkTheme ? 'text-[#00C4FF]' : 'text-[#1C4463]') : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-black/10">
            <a
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full py-4 text-center font-mono text-xs uppercase tracking-widest font-bold rounded-sm ${
                isDarkTheme ? 'bg-[#00C4FF] text-[#111412]' : 'bg-[#151515] text-[#FAF9F5]'
              }`}
            >
              REGISTER SCHOOL DELEGATION ↗
            </a>
            <div className="text-center font-mono text-[10px] text-[#575757] uppercase tracking-wider pt-2">
              17 OCTOBER 2026 · JAGRAN PUBLIC SCHOOL, NOIDA
            </div>
          </div>
        </div>
      )}
    </>
  );
};
