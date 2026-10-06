import React from 'react';
import { FESTIVAL_SCHEDULE } from '../data/schedule';

interface SchedulePageProps {
  onNavigate: (path: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-32 pb-40 px-[5vw]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="border-b border-[#151515]/10 pb-12 mb-16">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
            FESTIVAL TIMELINE · 17 OCTOBER 2026
          </span>
          <h1
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7.5rem)' }}
          >
            {FESTIVAL_SCHEDULE.status}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#575757] font-light max-w-2xl leading-relaxed">
            {FESTIVAL_SCHEDULE.note}
          </p>
        </div>

        {/* Section 1: Detailed Event Timetable from Final Brochure */}
        <div className="mb-24">
          <div className="flex items-center justify-between pb-6 border-b border-[#151515]/15 mb-8">
            <span className="font-mono text-xs tracking-widest uppercase text-[#1C4463] font-semibold">
              COMPETITION TIMETABLE & VENUE MATRIX
            </span>
            <span className="font-mono text-xs text-[#888] uppercase">
              12 ACTIVE DISCIPLINES
            </span>
          </div>

          <div className="divide-y divide-[#151515]/10">
            {FESTIVAL_SCHEDULE.events.map((item, idx) => (
              <div
                key={idx}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-black/[0.015] px-2 transition-colors"
              >
                {/* Event Name & Category */}
                <div className="md:col-span-5 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#888] w-6 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                      {item.event}
                    </h3>
                    <span className="font-mono text-xs text-[#575757] tracking-wider uppercase block mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Time Slot */}
                <div className="md:col-span-3 font-mono text-xs text-[#1C4463] font-semibold tracking-wider uppercase">
                  {item.timeSlot}
                </div>

                {/* Venue & Format */}
                <div className="md:col-span-4 flex flex-col md:items-end justify-center font-mono text-xs">
                  <span className="text-[#151515] font-medium">{item.venue}</span>
                  <span className="text-[#888] uppercase text-[11px] mt-0.5">{item.format}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: General Festival Day Flow */}
        <div className="pt-12 border-t border-[#151515]/10">
          <div className="flex items-center justify-between pb-6 border-b border-[#151515]/15 mb-8">
            <span className="font-mono text-xs tracking-widest uppercase text-[#575757]">
              GENERAL SYMPOSIUM PROTOCOLS
            </span>
            <span className="font-mono text-xs text-[#888] uppercase">
              CAMPUS FLOW
            </span>
          </div>

          <div className="divide-y divide-[#151515]/10">
            {FESTIVAL_SCHEDULE.blocks.map((block, index) => (
              <div
                key={index}
                className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-3 font-mono text-xs text-[#325E7D] uppercase tracking-wider font-semibold">
                  {block.timeSlot}
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                    {block.phase}
                  </h3>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-[#575757] font-light leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coordination Notice */}
        <div className="mt-24 p-8 md:p-12 border border-[#151515]/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="font-mono text-xs text-[#325E7D] uppercase tracking-widest font-semibold block mb-1">
              NOTE FOR SCHOOL COORDINATORS
            </span>
            <p className="text-sm text-[#575757] max-w-xl">
              Registration opens 3 October 2026 and closes 12 October 2026. Reporting badges and teacher coordinator packs will be handed over at reception during morning accreditation.
            </p>
          </div>

          <a
            href="/register"
            className="font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3.5 hover:bg-[#325E7D] transition-colors cursor-pointer shrink-0"
          >
            REGISTER DELEGATION ↗
          </a>
        </div>
      </div>
    </div>
  );
};
