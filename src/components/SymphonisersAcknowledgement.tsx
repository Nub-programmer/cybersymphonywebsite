import React from 'react';

interface SymphonisersAcknowledgementProps {
  onMeetSociety: () => void;
}

export const SymphonisersAcknowledgement: React.FC<SymphonisersAcknowledgementProps> = ({
  onMeetSociety,
}) => {
  return (
    <section className="relative w-full bg-[#FAF9F5] text-[#151515] py-20 md:py-32 px-[var(--gutter-site)] border-t border-[#151515]/8">
      <div className="max-w-[var(--content-max-width)] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
            STEWARDSHIP
          </span>
          <h3 className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#325E7D] mb-2 font-semibold">
            ORGANISED BY
          </h3>
          <h2
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
          >
            THE SYMPHONISERS
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#575757] leading-relaxed font-light max-w-[var(--body-max-width)]">
            The student Technology & STEM Society behind Cyber Symphony and Jagran Public School's participation in national competitions, open-source projects, and engineering initiatives.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3.5">
          <button
            onClick={onMeetSociety}
            className="btn-tactile hover-underline group inline-flex items-center gap-2 font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#151515] hover:text-[#325E7D] transition-colors cursor-pointer pb-1"
          >
            <span>MEET THE SOCIETY</span>
            <span className="transform transition-transform duration-200 group-hover:translate-x-1">
              ↗
            </span>
          </button>
          <span className="font-mono text-xs text-[#575757] uppercase tracking-wider">
            Jagran Public School, Noida
          </span>
        </div>
      </div>
    </section>
  );
};
