import React from 'react';
import { getEventBySlug, EVENTS } from '../data/events';

interface EventDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectEvent: (slug: string) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectEvent,
}) => {
  const event = getEventBySlug(slug) || EVENTS[0];
  const isDark = event.isDarkTheme || event.slug === 'nocturne';

  const currentIndex = EVENTS.findIndex((e) => e.slug === event.slug);
  const prevEvent = currentIndex > 0 ? EVENTS[currentIndex - 1] : null;
  const nextEvent = currentIndex < EVENTS.length - 1 ? EVENTS[currentIndex + 1] : null;

  return (
    <div
      className={`w-full min-h-screen pt-32 pb-40 px-[5vw] transition-colors duration-700 ${
        isDark ? 'bg-[#19201B] text-[#FAF9F5]' : 'bg-[#FAF9F5] text-[#151515]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Back Link */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate('/programme')}
            className="text-xs font-mono tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 cursor-pointer"
          >
            ← RETURN TO ALL EVENTS
          </button>
        </div>

        {/* Header Block: Large Editorial Title */}
        <div className="border-b border-current/15 pb-12">
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest opacity-60 mb-4">
            <span>EVENT {event.number}</span>
            <span>·</span>
            <span>{event.category}</span>
          </div>

          <h1
            className="font-display font-extrabold uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: 'clamp(2.75rem, 8.5vw, 8rem)' }}
          >
            {event.name}
          </h1>

          {event.subtitle && (
            <p className="font-mono text-sm sm:text-base tracking-[0.3em] uppercase text-[#1BBBE8] mt-3">
              {event.subtitle}
            </p>
          )}

          <p className="mt-8 text-lg sm:text-xl font-light leading-relaxed max-w-3xl opacity-80">
            {event.summary}
          </p>
        </div>

        {/* Metadata Specification Grid: Unboxed, clean typography */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-b border-current/15 text-xs font-mono">
          <div>
            <span className="opacity-50 block uppercase tracking-wider mb-1">MODE</span>
            <span className="font-bold text-sm uppercase">{event.mode}</span>
          </div>
          <div>
            <span className="opacity-50 block uppercase tracking-wider mb-1">TEAM SIZE</span>
            <span className="font-bold text-sm uppercase">{event.teamSize}</span>
          </div>
          <div>
            <span className="opacity-50 block uppercase tracking-wider mb-1">ELIGIBILITY</span>
            <span className="font-bold text-sm uppercase">{event.eligibility}</span>
          </div>
          <div>
            <span className="opacity-50 block uppercase tracking-wider mb-1">VENUE</span>
            <span className="font-bold text-sm uppercase">{event.venue}</span>
          </div>
        </div>

        {/* Detail Sections: About, Format, Rules, What to bring, Judging */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Quick Spec Summary */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <span className="font-mono text-xs tracking-widest uppercase opacity-50 block mb-2">
                DURATION
              </span>
              <p className="font-display text-lg font-bold uppercase">{event.duration}</p>
            </div>

            <div>
              <span className="font-mono text-xs tracking-widest uppercase opacity-50 block mb-2">
                WHAT TO BRING
              </span>
              <ul className="flex flex-col gap-2 font-mono text-xs opacity-75">
                {event.whatToBring.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="opacity-40">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-xs tracking-widest uppercase opacity-50 block mb-2">
                EVALUATION CRITERIA
              </span>
              <ul className="flex flex-col gap-2 font-mono text-xs opacity-75">
                {event.judging.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="opacity-40">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Registration Anchor CTA */}
            <div className="pt-6 border-t border-current/15">
              <a
                href="/register"
                className={`block w-full py-4 px-6 text-xs font-mono uppercase tracking-widest font-semibold text-center transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#FAF9F5] text-[#19201B] hover:bg-[#1BBBE8]'
                    : 'bg-[#151515] text-[#FAF9F5] hover:bg-[#325E7D]'
                }`}
              >
                REGISTER DELEGATION FOR THIS EVENT ↗
              </a>
            </div>
          </div>

          {/* Right Column: About, Format & Rules */}
          <div className="lg:col-span-8 flex flex-col gap-12 font-body">
            {/* About */}
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">
                ABOUT THE EVENT
              </h2>
              <div className="space-y-4 text-base sm:text-lg font-light leading-relaxed opacity-85">
                {event.about.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="pt-8 border-t border-current/10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">
                CHALLENGE FORMAT
              </h2>
              <div className="space-y-3 font-mono text-xs sm:text-sm opacity-80">
                {event.format.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="opacity-40 font-bold">0{idx + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="pt-8 border-t border-current/10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-4">
                REGULATIONS & PROTOCOLS
              </h2>
              <ul className="space-y-2.5 font-mono text-xs sm:text-sm opacity-80">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="opacity-40">§</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Pagination */}
        <div className="pt-12 border-t border-current/15 flex justify-between items-center text-xs font-mono uppercase tracking-wider">
          {prevEvent ? (
            <button
              onClick={() => onSelectEvent(prevEvent.slug)}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity cursor-pointer"
            >
              <span>← {prevEvent.number} {prevEvent.name}</span>
            </button>
          ) : (
            <div />
          )}

          {nextEvent ? (
            <button
              onClick={() => onSelectEvent(nextEvent.slug)}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity cursor-pointer"
            >
              <span>{nextEvent.number} {nextEvent.name} →</span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
