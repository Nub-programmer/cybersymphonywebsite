import React from 'react';
import { FESTIVAL_INFO } from '../data/socials';
import { EVENTS } from '../data/events';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';

interface FooterProps {
  onNavigate: (path: string) => void;
  isDarkTheme?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDarkTheme = false }) => {
  const bg = isDarkTheme ? 'bg-[#19201B] text-[#FAF9F5]' : 'bg-[#F3F1EA] text-[#151515]';
  const border = isDarkTheme ? 'border-[#FAF9F5]/10' : 'border-[#151515]/10';
  const mutedText = isDarkTheme ? 'text-[#A9B09D]' : 'text-[#575757]';

  return (
    <footer className={`w-full py-16 px-[5vw] border-t ${border} ${bg} font-body`}>
      <div className="max-w-[1360px] mx-auto flex flex-col justify-between gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Brand Column with official logo */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={cyberSymphonyLogo}
                alt="Cyber Symphony Emblem"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight leading-none">
                  CYBER SYMPHONY 2026
                </span>
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${mutedText} mt-1`}>
                  Jagran Public School, Noida
                </span>
              </div>
            </div>
            <p className={`text-sm ${mutedText} leading-relaxed max-w-md font-light`}>
              The inter-school technology festival of Jagran Public School, Noida. Organised by The Symphonisers Technology & STEM Society.
            </p>
            <p className="font-mono text-xs text-[#888]">
              {FESTIVAL_INFO.hostAddress}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <span className="font-semibold text-current mb-1">NAVIGATION</span>
            <button onClick={() => onNavigate('/')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('/programme')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              Programme ({EVENTS.length} Events)
            </button>
            <button onClick={() => onNavigate('/archive')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              2025 Archive
            </button>
            <button onClick={() => onNavigate('/brochure')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              Field Guide Brochure
            </button>
            <button onClick={() => onNavigate('/the-symphonisers')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              The Symphonisers
            </button>
            <button onClick={() => onNavigate('/partners')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              Partners
            </button>
            <button onClick={() => onNavigate('/schedule')} className="text-left opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              Schedule
            </button>
          </div>

          {/* Registration & Inquiries */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <span className="font-semibold text-current mb-1">COORDINATION</span>
            <a
              href="/register"
              className="text-left font-bold text-[#325E7D] hover:underline cursor-pointer"
            >
              Register School Delegation ↗
            </a>
            <a
              href={`mailto:${FESTIVAL_INFO.email}`}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              {FESTIVAL_INFO.email}
            </a>
            <span className="opacity-50">
              cybersynchronizer.tech
            </span>
          </div>
        </div>

        {/* Bottom Bar: Quiet and authentic */}
        <div className={`pt-8 border-t ${border} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono opacity-50`}>
          <span>© 2026 CYBER SYMPHONY · JAGRAN PUBLIC SCHOOL, NOIDA</span>
          <span>CURATED BY THE SYMPHONISERS</span>
        </div>
      </div>
    </footer>
  );
};
