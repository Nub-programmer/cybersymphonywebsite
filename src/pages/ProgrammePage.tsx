import React, { useState } from 'react';
import { EVENTS } from '../data/events';

interface ProgrammePageProps {
  onSelectEvent: (slug: string) => void;
  onRegisterClick: () => void;
}

export const ProgrammePage: React.FC<ProgrammePageProps> = ({
  onSelectEvent,
  onRegisterClick,
}) => {
  const [filterMode, setFilterMode] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = EVENTS.filter((ev) => {
    const matchesMode =
      filterMode === 'ALL' ||
      (filterMode === 'OFFLINE' && ev.mode === 'Offline') ||
      (filterMode === 'ONLINE' && ev.mode === 'Online') ||
      (filterMode === 'HYBRID' && ev.mode === 'Hybrid');

    const matchesSearch =
      ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesMode && matchesSearch;
  });

  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-32 pb-40 px-[5vw]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="border-b border-[#151515]/10 pb-12 mb-16">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
            COMPETITIVE CALENDAR
          </span>
          <h1
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7.5rem)' }}
          >
            THE PROGRAMME
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#575757] font-light max-w-2xl leading-relaxed">
            Competitive arenas spanning algorithmic engineering, tactical robotics, web development, visual media, and cryptic deduction.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#151515]/10">
          {/* Functional Mode Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: `All ${EVENTS.length} Arenas` },
              { id: 'OFFLINE', label: 'Offline' },
              { id: 'ONLINE', label: 'Online' },
              { id: 'HYBRID', label: 'Hybrid' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterMode(btn.id)}
                className={`text-xs font-mono tracking-wider uppercase px-4 py-2 transition-all cursor-pointer ${
                  filterMode === btn.id
                    ? 'bg-[#151515] text-[#FAF9F5]'
                    : 'bg-transparent text-[#575757] hover:text-[#151515] border border-black/10'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#151515]/20 py-2 text-xs font-mono placeholder:text-[#888] focus:border-[#151515] focus:outline-none"
            />
          </div>
        </div>

        {/* Event List: Editorial rows */}
        <div className="divide-y divide-[#151515]/10">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event.slug)}
              className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline hover:bg-black/[0.02] transition-colors px-2 cursor-pointer"
            >
              {/* Event Number & Title */}
              <div className="lg:col-span-5 flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-sm text-[#888] w-6 shrink-0">
                  {event.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515] group-hover:text-[#325E7D] transition-colors">
                    {event.name}
                  </h3>
                  {event.subtitle && (
                    <span className="font-mono text-xs tracking-wider text-[#325E7D] uppercase block mt-1">
                      {event.subtitle}
                    </span>
                  )}
                  <span className="font-mono text-xs text-[#575757] uppercase block mt-1">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Summary Description */}
              <div className="lg:col-span-5">
                <p className="text-sm text-[#575757] font-light leading-relaxed">
                  {event.summary}
                </p>
                <div className="flex items-center gap-4 mt-2 font-mono text-[11px] text-[#888]">
                  <span>TEAM: {event.teamSize}</span>
                  <span>·</span>
                  <span>{event.eligibility}</span>
                </div>
              </div>

              {/* Mode & Arrow */}
              <div className="lg:col-span-2 flex items-center justify-between lg:justify-end gap-4 font-mono text-xs">
                <span
                  className={`uppercase tracking-wider ${
                    event.mode === 'Hybrid'
                      ? 'text-[#325E7D] font-semibold'
                      : event.mode === 'Online'
                      ? 'text-[#1BBBE8] font-semibold'
                      : 'text-[#575757]'
                  }`}
                >
                  {event.mode}
                </span>
                <span className="text-base transform transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="py-24 text-center font-mono text-xs text-[#888] uppercase tracking-wider">
              No matching competitions found for “{searchQuery}”.
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-10 border-t border-[#151515]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-mono text-xs text-[#575757]">
            READY TO REGISTER YOUR SCHOOL DELEGATION?
          </span>
          <button
            onClick={onRegisterClick}
            className="font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3 hover:bg-[#325E7D] transition-colors cursor-pointer"
          >
            GO TO REGISTRATION PORTAL ↗
          </button>
        </div>
      </div>
    </div>
  );
};
