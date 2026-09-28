import React, { useState } from 'react';

interface BrochurePageProps {
  onNavigate: (path: string) => void;
}

export const BrochurePage: React.FC<BrochurePageProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const spreads = [
    {
      pageNumber: '00',
      tag: 'COVER',
      title: 'CYBER SYMPHONY 2026',
      subtitle: 'OFFICIAL FIELD MANUAL & DELEGATION GUIDE',
      description: 'The complete compendium of regulations, judging frameworks, venue floorplans, and institutional arbitration policies.',
      content: [
        'Published by The Symphonisers Technology Society.',
        'Host Institution: Jagran Public School, Sector 47, Noida.',
        'Primary Verification Authority: Cyber Synchronizer Network.',
        'All visiting faculty coordinators receive this physical broadsheet upon accreditation.'
      ]
    },
    {
      pageNumber: '01',
      tag: 'SECTION I',
      title: 'FOUNDATIONAL ETHOS',
      subtitle: 'THE NATURE OF THE SYMPOSIUM',
      description: 'Cyber Symphony is designed as a sanctuary of authentic computational and physical engineering.',
      content: [
        'We value clean execution, mathematical insight, and robust system architecture over surface spectacle.',
        'Every competition track is curated by senior practitioners and alumni working in software, hardware, and digital law.',
        'Schools compete under an absolute pledge of academic and engineering integrity.'
      ]
    },
    {
      pageNumber: '02',
      tag: 'SECTION II',
      title: 'EVENT CODES',
      subtitle: 'SUMMARY SPECIFICATIONS',
      description: 'Eleven distinct arenas organized across algorithmic, mechatronic, and creative verticals.',
      content: [
        '01. Innovation Sprint (Hybrid) — Concept paper & physical defense',
        '02. Web Forge (Offline) — 3-hour live web development sprint',
        '03. Framelock (Format Under Review) — Video editing & digital media',
        '04. Quizzard (Offline) — Written prelims & live buzzer finals',
        '05. Hyperstrike PC (Offline) — Tactical PC esports arena (Game: TBA)',
        '06. Hyperstrike Mobile (Offline) — Mobile battle arena (Game: TBA)',
        '07. Twisttriads (Offline) — 2×2, 3×3, and Pyraminx WCA speedcubing',
        '08. Flying Machine (Offline) — Water rocket aerodynamics & launch (Rules: TBA)',
        '09. Nocturne 3301 (Online) — 24-hour cryptographic & cryptic hunt',
        '10. Robo Soccer (Offline) — Controlled robot football championship (Rules: TBA)',
        '11. Huddle Mania (Offline) — Terrestrial obstacle robotics bottleneck (Rules: TBA)'
      ]
    },
    {
      pageNumber: '03',
      tag: 'SECTION III',
      title: 'CAMPUS & PROTOCOLS',
      subtitle: 'ARRIVAL, BADGES & SAFETY',
      description: 'Campus coordination guidelines for visiting teachers and student delegations.',
      content: [
        'Delegations report to the main reception foyer at Jagran Public School, Sector 47, Noida.',
        'Faculty-in-charge must present the official school authorization letter during accreditation.',
        'All arena pits maintain dedicated electrical power points, high-speed Wi-Fi, and emergency first aid stations.'
      ]
    }
  ];

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `CYBER SYMPHONY 2026 — FIELD GUIDE\nJagran Public School, Noida\n17 October 2026\n\nOfficial Guide dispatched to registered delegations.`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Cyber_Symphony_2026_Brochure.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-32 pb-40 px-[5vw]">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="border-b border-[#151515]/10 pb-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
              PRINTED PUBLICATION
            </span>
            <h1
              className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 7.5rem)' }}
            >
              THE FIELD GUIDE.
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-sm tracking-widest uppercase text-[#1C4463]">
              17 OCTOBER 2026 · JAGRAN PUBLIC SCHOOL, NOIDA
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              className="font-mono text-xs uppercase tracking-widest font-semibold border border-current px-5 py-2.5 hover:bg-[#151515] hover:text-white transition-colors cursor-pointer"
            >
              DOWNLOAD COPY ↗
            </button>
            <button
              onClick={() => onNavigate('/register')}
              className="font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-5 py-2.5 hover:bg-[#325E7D] transition-colors cursor-pointer"
            >
              REGISTER SCHOOL ↗
            </button>
          </div>
        </div>

        {/* Booklet Spread Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Table of Contents & Pagination */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <span className="font-mono text-xs tracking-widest uppercase text-[#575757]">
              SECTIONS / SPREADS
            </span>
            <div className="flex flex-col divide-y divide-black/10 font-mono text-xs">
              {spreads.map((s, idx) => (
                <button
                  key={s.pageNumber}
                  onClick={() => setCurrentPage(idx)}
                  className={`py-4 text-left flex justify-between items-center transition-colors cursor-pointer ${
                    currentPage === idx
                      ? 'font-bold text-[#151515] bg-black/[0.03] px-3 -mx-3'
                      : 'text-[#888] hover:text-[#151515]'
                  }`}
                >
                  <span>{s.tag} — {s.title}</span>
                  <span>{s.pageNumber}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-black/10 text-xs font-mono text-[#888] leading-relaxed">
              Use the controls below or click any section to inspect the printed guide spreads.
            </div>
          </div>

          {/* Right: The Open Brochure Spread Simulation */}
          <div className="relative lg:col-span-8 bg-[#F3F1EA] border border-black/10 p-8 sm:p-14 min-h-[500px] flex flex-col justify-between shadow-sm overflow-hidden rounded-[2px] paper-shadow">
            {/* Satin ribbon bookmark peeking out */}
            <div className="absolute -top-3 right-14 w-4 h-10 bg-[#1C4463] rounded-t-[1px] shadow-sm pointer-events-none z-10" />

            {/* Subtle paper grain texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.03) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />

            {/* Left Edge Spine Crease Shadow */}
            <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none book-spine-crease opacity-40 z-10" />

            <div className="relative z-10">
              <div className="flex justify-between items-start font-mono text-xs uppercase tracking-widest text-[#575757] pb-6 border-b border-black/10">
                <span className="text-[#325E7D] font-bold">{spreads[currentPage].tag}</span>
                <span>SPREAD {spreads[currentPage].pageNumber} / 03</span>
              </div>

              <div className="py-10">
                <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#151515]">
                  {spreads[currentPage].title}
                </h2>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#325E7D] mt-2">
                  {spreads[currentPage].subtitle}
                </p>
                <p className="mt-6 text-base sm:text-lg text-[#575757] font-light leading-relaxed max-w-2xl">
                  {spreads[currentPage].description}
                </p>

                <div className="mt-8 space-y-3 font-mono text-xs text-[#333]">
                  {spreads[currentPage].content.map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#888]">·</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-between items-center pt-8 border-t border-black/10 font-mono text-xs">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 border border-current disabled:opacity-20 hover:bg-[#151515] hover:text-white transition-colors cursor-pointer"
              >
                ← PREVIOUS SPREAD
              </button>

              <button
                onClick={() => setCurrentPage(Math.min(spreads.length - 1, currentPage + 1))}
                disabled={currentPage === spreads.length - 1}
                className="px-4 py-2 border border-current disabled:opacity-20 hover:bg-[#151515] hover:text-white transition-colors cursor-pointer"
              >
                NEXT SPREAD →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
