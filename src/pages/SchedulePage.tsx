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

        {/* Schedule Structure Blocks */}
        <div className="divide-y divide-[#151515]/10">
          {FESTIVAL_SCHEDULE.blocks.map((block, index) => (
            <div
              key={index}
              className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-3 font-mono text-xs text-[#325E7D] uppercase tracking-wider">
                STAGE 0{index + 1} · {block.timeSlot}
              </div>

              <div className="md:col-span-4">
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
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

        {/* Coordination Notice */}
        <div className="mt-28 p-8 md:p-12 border border-[#151515]/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <span className="font-mono text-xs text-[#325E7D] uppercase tracking-widest block mb-1">
              NOTE FOR SCHOOL COORDINATORS
            </span>
            <p className="text-sm text-[#575757]">
              Final minute-by-minute reporting schedules will be emailed directly to all registered teacher coordinators prior to 17 October 2026.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/register')}
            className="font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3 hover:bg-[#325E7D] transition-colors cursor-pointer shrink-0"
          >
            REGISTER DELEGATION ↗
          </button>
        </div>
      </div>
    </div>
  );
};
