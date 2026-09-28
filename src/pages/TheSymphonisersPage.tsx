import React from 'react';
import { SYMPHONISERS_LEADERSHIP } from '../data/team';
import { FestivalRibbon } from '../components/FestivalRibbon';

interface TheSymphonisersPageProps {
  onNavigate: (path: string) => void;
}

export const TheSymphonisersPage: React.FC<TheSymphonisersPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-28 sm:pt-32 pb-36 px-[var(--gutter-site)] overflow-x-hidden">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Header Block: Large Typography Artpiece */}
        <div className="border-b border-[#151515]/10 pb-12 sm:pb-16 mb-12 sm:mb-16">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-4">
            STUDENT TECHNOLOGY & STEM SOCIETY
          </span>
          <h1
            className="font-display font-extrabold uppercase tracking-[-0.03em] text-[#151515] leading-[0.88] m-0"
            style={{ fontSize: 'clamp(2.5rem, 8.5vw, 8rem)' }}
          >
            THE
            <br />
            SYMPHONISERS
          </h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[#1C4463] font-bold">
                Technology & STEM Society
              </p>
              <p className="font-mono text-xs text-[#575757] uppercase tracking-wider mt-1">
                Jagran Public School, Noida
              </p>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-[#575757] font-light max-w-xl leading-relaxed">
              The Symphonisers is the student Technology & STEM Society of Jagran Public School, Noida, bringing together students across programming, cybersecurity, design, robotics, engineering, innovation and other technology disciplines.
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

        {/* Society Leadership Masthead: Pure Typography-First Editorial Section */}
        <div className="pt-8 sm:pt-12">
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
              12 ACTIVE APPOINTMENTS
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
