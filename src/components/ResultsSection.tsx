import React from 'react';

interface ResultsSectionProps {
  onExploreResults: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ onExploreResults }) => {
  return (
    <section className="w-full border-t border-[#151515]/8 bg-[#FAF9F5] px-[var(--gutter-site)] py-20 text-[#151515] sm:py-28">
      <div className="mx-auto grid max-w-[var(--content-max-width)] gap-10 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-span-8">
          <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-[#325E7D] uppercase">
            THE RESULTS ARE IN
          </span>
          <h2
            className="font-display font-extrabold leading-[0.9] tracking-[-0.045em] text-[#151515]"
            style={{ fontSize: 'clamp(3.25rem, 8vw, 8rem)' }}
          >
            Results 2K26
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed font-light text-[#575757] sm:text-lg">
            The competition is concluded. Discover the winners who defined this edition of Cyber Symphony.
          </p>
        </div>

        <div className="md:col-span-4 md:flex md:justify-end">
          <button
            type="button"
            onClick={onExploreResults}
            className="group inline-flex min-h-[44px] items-center gap-3 border-b-2 border-[#151515] pb-2 font-mono text-xs font-semibold tracking-[0.16em] text-[#151515] uppercase transition-colors hover:border-[#325E7D] hover:text-[#325E7D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#325E7D] focus-visible:ring-offset-4"
          >
            <span>Explore Results</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
