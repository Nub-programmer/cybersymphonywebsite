import React, { useEffect } from 'react';

interface CompetitionResult {
  name: string;
  firstPlace: string;
  secondPlace: string;
}

const RESULTS: CompetitionResult[] = [
  {
    name: 'Manoeuvre (Robotics)',
    firstPlace: 'Puranchandra Vidya Niketan, Kanpur',
    secondPlace: 'Kulachi Hansraj Model School',
  },
  {
    name: 'Flying Machine',
    firstPlace: 'Puranchandra Vidya Niketan, Kanpur',
    secondPlace: 'Delhi Public School, R.K. Puram',
  },
  {
    name: 'Quizzard (AI Quiz)',
    firstPlace: 'Karl Huber School',
    secondPlace: 'Puranchandra Vidya Niketan, Kanpur',
  },
  {
    name: 'Hyperstrike Mobile',
    firstPlace: 'Vanasthali Public School',
    secondPlace: 'DAV Public School',
  },
  {
    name: 'Hyperstrike PC',
    firstPlace: 'Jagran Public School, Lucknow',
    secondPlace: 'Shri Chaitanya Techno School',
  },
  {
    name: 'Nocturne',
    firstPlace: 'St. Columbus School',
    secondPlace: 'Maharaja Agrasen School',
  },
  {
    name: 'Tech Crossfire',
    firstPlace: 'National Institute of Open Schooling (NIOS)',
    secondPlace: 'Delhi Public School, R.K. Puram',
  },
  {
    name: 'Twist Triads (Cube Solving)',
    firstPlace: 'Delhi Public School, R.K. Puram',
    secondPlace: 'Jaypee Public School, Noida',
  },
  {
    name: 'UI/UX Rumble',
    firstPlace: 'National Institute of Open Schooling (NIOS)',
    secondPlace: 'Puranchandra Vidya Niketan, Kanpur',
  },
  {
    name: 'Framelock (Video Editing)',
    firstPlace: 'National Institute of Open Schooling (NIOS)',
    secondPlace: 'DAV Public School',
  },
  {
    name: 'Robo Soccer',
    firstPlace: 'Jaypee Public School, Noida',
    secondPlace: 'Alpine Public School',
  },
  {
    name: 'Innovation Spirit',
    firstPlace: 'Jagran Public School, Lucknow',
    secondPlace: 'National Institute of Open Schooling (NIOS)',
  },
];

export const ResultsPage: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute('content');

    document.title = 'Results — TCS 2K26 | Cyber Symphony';
    description?.setAttribute(
      'content',
      'Results and overall standings from The Cyber Symphony 2K26 at Jagran Public School, Noida.',
    );

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) {
        description.setAttribute('content', previousDescription);
      }
    };
  }, []);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] px-[var(--gutter-site)] pt-32 pb-36 sm:pt-36 sm:pb-44">
      <div className="mx-auto max-w-[var(--content-max-width)]">
        <header className="border-b border-[#151515]/10 pb-12 sm:pb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-[#325E7D] uppercase">
            THE CYBER SYMPHONY · 2K26
          </span>
          <h1
            className="max-w-5xl font-display text-5xl leading-[0.92] font-extrabold tracking-[-0.05em] text-[#151515] sm:text-7xl lg:text-[clamp(4.5rem,9vw,9.5rem)]"
          >
            Results — TCS 2K26
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-relaxed font-light text-[#575757] sm:text-xl">
            Celebrating innovation, creativity, technical excellence, and sportsmanship at The Cyber Symphony
            2K26, Jagran Public School, Noida.
          </p>
        </header>

        <section aria-labelledby="overall-standings" className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden bg-[#19201B] px-6 py-8 text-[#FAF9F5] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-[#A9B09D]/20 sm:h-72 sm:w-72" aria-hidden="true" />
            <div className="absolute -right-4 -top-12 h-40 w-40 rounded-full border border-[#A9B09D]/10 sm:h-56 sm:w-56" aria-hidden="true" />
            <div className="relative">
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <span className="mb-3 block font-mono text-xs tracking-[0.22em] text-[#A9B09D] uppercase">
                    Overall recognition
                  </span>
                  <h2 id="overall-standings" className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
                    Overall Standings
                  </h2>
                </div>
                <span className="font-mono text-xs tracking-widest text-[#A9B09D] uppercase">
                  TCS 2K26 · FINAL RESULTS
                </span>
              </div>

              <div className="mt-10 grid gap-px border border-[#FAF9F5]/15 bg-[#FAF9F5]/15 sm:grid-cols-2">
                <div className="bg-[#19201B] p-6 sm:p-8">
                  <span className="font-mono text-xs tracking-[0.18em] text-[#1BBBE8] uppercase">Overall Trophy Winner</span>
                  <p className="mt-5 max-w-md font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
                    Puranchandra Vidya Niketan, Kanpur
                  </p>
                </div>
                <div className="bg-[#19201B] p-6 sm:p-8">
                  <span className="font-mono text-xs tracking-[0.18em] text-[#F1C4B0] uppercase">Second Runner-Up Overall</span>
                  <p className="mt-5 max-w-md font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
                    Delhi Public School, R.K. Puram
                  </p>
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-[#FAF9F5]/70 sm:text-base">
                Puranchandra Vidya Niketan, Kanpur, was awarded the Overall Trophy in recognition of its outstanding
                performance across the competitions. Delhi Public School, R.K. Puram, secured the position of Second
                Runner-Up Overall, earning recognition for its commendable performance at TCS 2K26.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="competition-results" className="mt-20 sm:mt-28">
          <div className="mb-8 flex flex-col justify-between gap-3 border-b border-[#151515]/10 pb-5 sm:flex-row sm:items-end">
            <div>
              <span className="mb-2 block font-mono text-xs tracking-[0.2em] text-[#575757] uppercase">The arenas</span>
              <h2 id="competition-results" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Competition Results
              </h2>
            </div>
            <span className="font-mono text-xs tracking-widest text-[#888] uppercase">{RESULTS.length} competitions</span>
          </div>

          <div className="divide-y divide-[#151515]/10 border-b border-[#151515]/10">
            {RESULTS.map((result, index) => (
              <article key={result.name} className="grid gap-6 py-7 sm:py-9 lg:grid-cols-[minmax(15rem,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
                <div className="flex items-start gap-4">
                  <span className="pt-1 font-mono text-xs text-[#888]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl leading-tight font-bold tracking-tight sm:text-2xl">{result.name}</h3>
                </div>
                <div className="border-l-2 border-[#1BBBE8] pl-4 sm:pl-5">
                  <span className="block font-mono text-[10px] tracking-[0.18em] text-[#325E7D] uppercase">First place</span>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-[#151515] sm:text-base">{result.firstPlace}</p>
                </div>
                <div className="border-l-2 border-[#F1C4B0] pl-4 sm:pl-5">
                  <span className="block font-mono text-[10px] tracking-[0.18em] text-[#875E4D] uppercase">Second place</span>
                  <p className="mt-2 text-sm leading-relaxed font-medium text-[#575757] sm:text-base">{result.secondPlace}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-2 font-mono text-xs tracking-wider text-[#888] uppercase sm:flex-row sm:justify-between">
          <span>Jagran Public School, Noida</span>
          <span>Celebrating every competitor</span>
        </footer>
      </div>
    </div>
  );
};
