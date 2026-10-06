import React from 'react';
import { ARCHIVE_2025 } from '../data/archive';
import { FestivalRibbon } from '../components/FestivalRibbon';

interface ArchivePageProps {
  onNavigate: (path: string) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-28 sm:pt-32 pb-36 px-[var(--gutter-site)] overflow-x-hidden">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Intro Header */}
        <div className="border-b border-[#151515]/10 pb-12 sm:pb-16 mb-16 sm:mb-20">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
            PAST EDITION
          </span>
          <h1
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.88] m-0"
            style={{ fontSize: 'clamp(2.5rem, 8.5vw, 7.5rem)' }}
          >
            CYBER SYMPHONY
            <br />
            2025
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#575757] font-light max-w-2xl leading-relaxed">
            A visual archive of Cyber Symphony 2025 at Jagran Public School, Noida.
          </p>
        </div>

        {/* Visual Retrospective Sequence */}
        <div className="space-y-20 sm:space-y-28">
          {/* Item 01 */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl overflow-hidden bg-[#ECE8DF] aspect-[16/10] group rounded-[2px] shadow-sm">
              <img
                src={ARCHIVE_2025[0].image}
                alt="Cyber Symphony 2025 Archive"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
            <div className="w-full max-w-5xl flex justify-between items-baseline pt-4 border-b border-[#151515]/10 pb-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight uppercase text-[#151515]">
                {ARCHIVE_2025[0].label}
              </span>
              <span className="font-mono text-xs text-[#575757] tracking-widest uppercase">
                {ARCHIVE_2025[0].sublabel}
              </span>
            </div>
          </div>

          {/* Festival Ribbon Moment Between Images */}
          <div className="w-full my-8 overflow-hidden rounded-[2px] opacity-85">
            <FestivalRibbon
              bgColor="bg-[#1C4463]"
              textColor="text-[#FAF9F5]"
              heightClass="h-8 sm:h-9"
              speed={42}
            />
          </div>

          {/* Item 02 & 03: Balanced Two-Column Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {/* Item 02 */}
            <div className="flex flex-col">
              <div className="w-full overflow-hidden bg-[#ECE8DF] aspect-[4/3] group rounded-[2px] shadow-sm">
                <img
                  src={ARCHIVE_2025[1].image}
                  alt="Cyber Symphony 2025 Archive"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                />
              </div>
              <div className="flex justify-between items-baseline pt-4 border-b border-[#151515]/10 pb-2">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase text-[#151515]">
                  {ARCHIVE_2025[1].label}
                </span>
                <span className="font-mono text-[11px] text-[#575757] tracking-wider uppercase">
                  {ARCHIVE_2025[1].sublabel}
                </span>
              </div>
            </div>

            {/* Item 03 */}
            <div className="flex flex-col">
              <div className="w-full overflow-hidden bg-[#ECE8DF] aspect-[4/3] group rounded-[2px] shadow-sm">
                <img
                  src={ARCHIVE_2025[2].image}
                  alt="Twisttriads Archive"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                />
              </div>
              <div className="flex justify-between items-baseline pt-4 border-b border-[#151515]/10 pb-2">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight uppercase text-[#151515]">
                  {ARCHIVE_2025[2].label}
                </span>
                <span className="font-mono text-[11px] text-[#575757] tracking-wider uppercase">
                  {ARCHIVE_2025[2].sublabel}
                </span>
              </div>
            </div>
          </div>

          {/* Item 04: Panoramic / Wide Stage Finale */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl overflow-hidden bg-[#ECE8DF] aspect-[16/9] group rounded-[2px] shadow-sm">
              <img
                src={ARCHIVE_2025[3].image}
                alt="Cyber Symphony 2025 Archive"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
            <div className="w-full max-w-5xl flex justify-between items-baseline pt-4 border-b border-[#151515]/10 pb-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight uppercase text-[#151515]">
                {ARCHIVE_2025[3].label}
              </span>
              <span className="font-mono text-xs text-[#575757] tracking-widest uppercase">
                {ARCHIVE_2025[3].sublabel} · JAGRAN PUBLIC SCHOOL, NOIDA
              </span>
            </div>
          </div>
        </div>

        {/* Retrospective Footer CTA */}
        <div className="mt-28 sm:mt-36 pt-12 border-t border-[#151515]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <span className="font-mono text-xs text-[#575757] uppercase tracking-wider">
            JOIN US FOR CYBER SYMPHONY 2026
          </span>
          <a
            href="/register"
            className="btn-tactile font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3.5 hover:bg-[#1C4463] transition-colors cursor-pointer w-full sm:w-auto text-center"
          >
            REGISTER SCHOOL DELEGATION ↗
          </a>
        </div>
      </div>
    </div>
  );
};
