import React from 'react';
import { MAJOR_ROBOTICS_PARTNER, SUPPORTING_PARTNERS } from '../data/partners';

interface PartnersPageProps {
  onNavigate: (path: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-32 pb-40 px-[var(--gutter-site)]">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Header */}
        <div className="border-b border-[#151515]/10 pb-12 mb-16">
          <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
            TECHNICAL ASSISTANCE & ECOSYSTEM ALLIANCES
          </span>
          <h1
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
            style={{ fontSize: 'clamp(2.75rem, 8vw, 7.5rem)' }}
          >
            SUPPORTED BY
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#575757] font-light max-w-2xl leading-relaxed">
            Leading engineering platforms and industry partners empowering participating delegations with hardware mentorship, domain registries, and technical tournament infrastructure.
          </p>
        </div>

        {/* 1. MAJOR ROBOTICS PARTNER */}
        <div className="border-y-2 border-[#151515] py-12 md:py-16 mb-20 bg-[#151515]/[0.02] px-6 sm:px-12 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-start gap-4">
              <div className="h-16 sm:h-20 w-auto max-w-[320px] flex items-center">
                <img
                  src={MAJOR_ROBOTICS_PARTNER.logo}
                  alt="FIZ Robotic Solutions Logo"
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="font-mono text-xs tracking-[0.25em] text-[#1C4463] uppercase font-bold">
                MAIN ROBOTICS PARTNER
              </span>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-3">
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#151515]">
                {MAJOR_ROBOTICS_PARTNER.name}
              </h2>
              <p className="font-body text-base sm:text-lg text-[#151515] font-medium leading-relaxed max-w-2xl">
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

        {/* 2. WITH SUPPORT FROM */}
        <div className="mb-8">
          <h3 className="font-mono text-xs tracking-[0.25em] uppercase font-bold text-[#575757]">
            WITH SUPPORT FROM
          </h3>
        </div>

        <div className="divide-y divide-[#151515]/10 border-t border-[#151515]/10">
          {SUPPORTING_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center hover:bg-black/[0.015] transition-colors px-3"
            >
              {/* Partner Name, Logo & Role */}
              <div className="md:col-span-4 flex items-center gap-5">
                <div className="h-10 sm:h-12 w-28 sm:w-36 flex items-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="max-h-full max-w-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <div>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#151515] hover:text-[#1C4463] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{partner.name}</span>
                    <span className="text-xs font-normal">↗</span>
                  </a>
                  <span className="block font-mono text-[10px] text-[#575757] tracking-wider uppercase mt-0.5">
                    {partner.role}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-5">
                <p className="text-sm text-[#575757] font-light leading-relaxed">
                  {partner.description}
                </p>
              </div>

              {/* Status */}
              <div className="md:col-span-3 flex md:justify-end items-center">
                <span className="font-mono text-xs tracking-widest uppercase text-[#575757] font-medium">
                  {partner.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Contact Callout */}
        <div className="mt-28 p-8 md:p-14 bg-[#F3F1EA] border border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
              PARTNER WITH CYBER SYMPHONY
            </h3>
            <p className="text-sm sm:text-base text-[#575757] font-light mt-2 max-w-xl">
              We welcome technology companies, engineering platforms, and education organizations offering tangible support to high school student delegations.
            </p>
          </div>

          <a
            href="mailto:contact@cybersynchronizer.tech?subject=Cyber%20Symphony%20Partnership"
            className="btn-tactile px-6 py-3.5 bg-[#151515] text-[#FAF9F5] font-semibold text-xs tracking-widest uppercase hover:bg-[#1C4463] transition-colors whitespace-nowrap inline-flex items-center gap-2"
          >
            <span>DISCUSS SPONSORSHIP</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
