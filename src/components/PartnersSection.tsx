import React from 'react';
import { MAJOR_ROBOTICS_PARTNER, SUPPORTING_PARTNERS } from '../data/partners';
import { FestivalRibbon } from './FestivalRibbon';

export const PartnersSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FAF9F5] text-[#151515] py-20 md:py-32 px-[var(--gutter-site)] border-t border-[#151515]/8 overflow-hidden">
      {/* Quiet horizontal strip at top of partners */}
      <div className="w-full mb-14 opacity-85">
        <FestivalRibbon
          bgColor="bg-[#1C4463]"
          textColor="text-[#FAF9F5]"
          heightClass="h-8 sm:h-9"
          speed={40}
        />
      </div>

      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Large Minimalist Header */}
        <div className="max-w-4xl mb-12 md:mb-16">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
            TECHNICAL ASSISTANCE & ECOSYSTEM PARTNERSHIPS
          </span>
          <h2
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
          >
            SUPPORTED BY
          </h2>
        </div>

        {/* 1. MAJOR ROBOTICS PARTNER: FIZ ROBOTIC SOLUTIONS FEATURED ROW */}
        <div className="border-y-2 border-[#151515] py-10 md:py-14 mb-16 bg-[#151515]/[0.02] px-6 sm:px-10 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Prominent Logo */}
            <div className="lg:col-span-5 flex flex-col items-start gap-3">
              <div className="h-14 sm:h-18 w-auto max-w-[280px] flex items-center">
                <img
                  src={MAJOR_ROBOTICS_PARTNER.logo}
                  alt="FIZ Robotic Solutions Logo"
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="font-mono text-xs tracking-[0.25em] text-[#1C4463] uppercase font-bold mt-2">
                MAIN ROBOTICS PARTNER
              </span>
            </div>

            {/* Right: Copy & Details */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#151515]">
                  {MAJOR_ROBOTICS_PARTNER.name}
                </h3>
                <span className="font-mono text-[11px] text-[#575757] tracking-wider uppercase">
                  · {MAJOR_ROBOTICS_PARTNER.category}
                </span>
              </div>
              <p className="font-body text-sm sm:text-base text-[#151515] leading-relaxed max-w-2xl">
                {MAJOR_ROBOTICS_PARTNER.description}
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 font-mono text-[10px] tracking-widest font-semibold uppercase bg-[#1C4463] text-[#FAF9F5]">
                  {MAJOR_ROBOTICS_PARTNER.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SECONDARY SECTION: WITH SUPPORT FROM */}
        <div className="pt-4">
          <div className="mb-8">
            <h3 className="font-mono text-xs tracking-[0.25em] uppercase font-bold text-[#575757]">
              WITH SUPPORT FROM
            </h3>
          </div>

          <div className="border-t border-[#151515]/15 divide-y divide-[#151515]/10">
            {SUPPORTING_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="py-7 md:py-9 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-black/[0.015] px-4 transition-colors duration-300"
              >
                {/* Logo & Identity */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <div className="h-9 sm:h-11 w-28 sm:w-36 flex items-center">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-[#151515] group-hover:text-[#1C4463] transition-colors">
                      {partner.name}
                    </h4>
                    <span className="font-mono text-[10px] text-[#575757] tracking-wider uppercase block">
                      {partner.role}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="text-xs sm:text-sm text-[#575757] group-hover:text-[#151515] leading-relaxed transition-colors">
                    {partner.description}
                  </p>
                </div>

                {/* Status */}
                <div className="md:col-span-3 flex md:justify-end items-center">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#575757] group-hover:text-[#151515] transition-colors font-medium">
                    {partner.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Contact Callout */}
        <div className="mt-14 pt-8 border-t border-[#151515]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#575757]">
          <span>INTERESTED IN COLLABORATING FOR CYBER SYMPHONY 2026?</span>
          <a
            href="mailto:contact@cybersynchronizer.tech?subject=Cyber%20Symphony%202026%20Partnership"
            className="hover-underline text-[#151515] font-semibold uppercase hover:text-[#1C4463] transition-colors"
          >
            REACH THE OUTREACH COMMITTEE ↗
          </a>
        </div>
      </div>
    </section>
  );
};
