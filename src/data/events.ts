export interface FestivalEvent {
  id: string;
  slug: string;
  number: string;
  name: string;
  subtitle?: string;
  category: string;
  mode: 'Offline' | 'Online' | 'Hybrid' | 'Format Under Review';
  summary: string;
  teamSize: string;
  eligibility: string;
  duration: string;
  venue: string;
  about: string[];
  format: string[];
  rules: string[];
  whatToBring: string[];
  judging: string[];
  isDarkTheme?: boolean;
}

export const EVENTS: FestivalEvent[] = [
  {
    id: '01',
    slug: 'innovation-sprint',
    number: '01',
    name: 'INNOVATION SPRINT',
    category: 'Innovation / Ideathon / Hackathon',
    mode: 'Hybrid',
    summary: 'Online ideation and concept submission followed by on-site prototype build, refinement, demo, and jury pitch.',
    teamSize: '2–4 members',
    eligibility: 'Grades IX – XII',
    duration: 'Online Preliminary + 4 Hours On-Site Finale',
    venue: 'Innovation Hub / Seminar Hall',
    about: [
      'Innovation Sprint is the flagship engineering and product crucible of Cyber Symphony 2026.',
      'Teams develop high-impact computational, hardware, or societal solutions, presenting tangible working prototypes to an industry jury.'
    ],
    format: [
      'Phase 1 (Online): Concept paper and architectural blueprint submission.',
      'Phase 2 (Offline): On-site sprint, functional demonstration, and pitch defense on 17 October 2026.'
    ],
    rules: [
      'All code and project assets must be authentic to the student delegation.',
      'Presentations capped at 5 minutes with 3 minutes of jury Q&A.'
    ],
    whatToBring: [
      'Laptops and hardware demonstrators',
      'Display adapters (HDMI)'
    ],
    judging: [
      'Technical Architecture & Feasibility (30%)',
      'Problem Significance (25%)',
      'Functional Execution (25%)',
      'Clarity of Defense (20%)'
    ]
  },
  {
    id: '02',
    slug: 'ui-ux-rumble',
    number: '02',
    name: 'UI/UX RUMBLE',
    category: 'Web Designing / UI-UX',
    mode: 'Offline',
    summary: 'Design and build a polished, responsive website from a given brief, with emphasis on UI/UX, creativity and presentation.',
    teamSize: '2 members',
    eligibility: 'Grades IX – XII',
    duration: '3 Hours',
    venue: 'Computer Laboratory Beta',
    about: [
      'A web designing competition where teams create a visually strong, responsive and user-friendly website based on a given theme or problem statement.',
      'Judging focuses on interface design, layout, usability, responsiveness, creativity and overall presentation.'
    ],
    format: [
      'On-site web designing sprint where teams design and develop a responsive website and interactive user interface responding to a brief revealed at the opening bell.'
    ],
    rules: [
      'Teams may use modern web stacks and design-to-web tooling (HTML, CSS, JavaScript/TypeScript, React, Tailwind CSS, or Webflow/Framer/Figma with live deploy).',
      'All visual designs and code must be authored authentically during the event hours.',
      'Pre-made website templates and downloaded theme packs are strictly prohibited.'
    ],
    whatToBring: [
      'Laptops configured with web browsers, development environments, and UI design tools'
    ],
    judging: [
      'Interface Design & Visual Aesthetics (30%)',
      'Layout & Multi-Device Responsiveness (25%)',
      'Usability & User Experience Logic (25%)',
      'Creativity, Originality & Presentation (20%)'
    ]
  },
  {
    id: '03',
    slug: 'framelock',
    number: '03',
    name: 'FRAMELOCK',
    category: 'Video Editing / Digital Media',
    mode: 'Format Under Review',
    summary: 'Cinematic storytelling, visual media narrative, and editorial post-production capturing the kinetic energy of the symposium.',
    teamSize: '1–2 members',
    eligibility: 'Grades VIII – XII',
    duration: 'Full Day Festival Coverage + Post-Production',
    venue: 'Media Lab & Campus Grounds',
    about: [
      'Framelock is the symposium’s visual media and documentary filmmaking arena.',
      'Participants produce a polished video edit capturing the atmosphere and competition intensities across campus.'
    ],
    format: [
      'Documentary assignment released on festival morning followed by timeline editing and color grading.'
    ],
    rules: [
      'Footage must be captured on campus during the festival hours.',
      'Generative AI replacement of footage is prohibited.'
    ],
    whatToBring: [
      'DSLR / Mirrorless Camera and storage media',
      'Editing laptop (Premiere Pro, DaVinci Resolve, Final Cut)'
    ],
    judging: [
      'Narrative Flow & Storytelling (35%)',
      'Cinematography & Composition (30%)',
      'Editing Rhythm & Sound Design (20%)',
      'Pacing & Color Grade (15%)'
    ]
  },
  {
    id: '04',
    slug: 'quizzard',
    number: '04',
    name: 'QUIZZARD',
    category: 'Technology Quiz',
    mode: 'Offline',
    summary: 'Rapid-fire computational trivia, computing history, silicon architecture, operating systems, and industry dynamics.',
    teamSize: '2 members',
    eligibility: 'Grades VIII – XII',
    duration: '2 Hours 30 Minutes',
    venue: 'Auditorium Gallery',
    about: [
      'Quizzard evaluates encyclopedic depth across computing history, hacker lore, operating systems, networking, and futuristic frontier technology.'
    ],
    format: [
      'Preliminary written elimination round followed by on-stage audiovisual finals with buzzer systems.'
    ],
    rules: [
      'No electronic devices permitted during quiz sessions.',
      'Quizmaster decisions are final and binding.'
    ],
    whatToBring: [
      'Writing instruments and delegation credentials'
    ],
    judging: [
      'Cumulative score across written prelims and stage finals'
    ]
  },
  {
    id: '05',
    slug: 'hyperstrike-pc',
    number: '05',
    name: 'HYPERSTRIKE PC',
    category: 'PC Gaming',
    mode: 'Offline',
    summary: 'High-stakes tactical PC esports tournament contested on dedicated high-refresh campus rigs. Game: TBA.',
    teamSize: '5 members',
    eligibility: 'Grades IX – XII',
    duration: 'Full Day Tournament Bracket',
    venue: 'Esports Arena Alpha',
    about: [
      'Hyperstrike PC delivers LAN esports competition with tournament-grade peripherals and zero-latency local routing.'
    ],
    format: [
      'Single-elimination bracket; game title and tactical rulebook to be announced (TBA).'
    ],
    rules: [
      'Standard competitive rulebook; any unauthorized software tampering incurs instant disqualification.'
    ],
    whatToBring: [
      'Personal peripherals permitted (Mouse, Keyboard, Headset) subject to hardware inspection'
    ],
    judging: [
      'Match victories and bracket progression'
    ]
  },
  {
    id: '06',
    slug: 'hyperstrike-mobile',
    number: '06',
    name: 'HYPERSTRIKE MOBILE',
    category: 'Mobile Gaming',
    mode: 'Offline',
    summary: 'Tactical squad-based mobile battle royale contested on high-speed campus Wi-Fi. Game: TBA.',
    teamSize: '4 members',
    eligibility: 'Grades IX – XII',
    duration: '3 Hours (Multi-Match Series)',
    venue: 'Esports Arena Beta',
    about: [
      'Precision mobile gunplay, tactical zone rotations, and disciplined squad communication in custom tournament lobbies.'
    ],
    format: [
      'Multi-match lobby series; game title and point matrix to be announced (TBA).'
    ],
    rules: [
      'Smartphones only. Emulators, tablets, and hardware triggers are prohibited.'
    ],
    whatToBring: [
      'Smartphones with game clients pre-updated',
      'Wired earphones and portable power banks'
    ],
    judging: [
      'Tournament points table (Placement + Kill points)'
    ]
  },
  {
    id: '07',
    slug: 'twisttriads',
    number: '07',
    name: 'TWISTTRIADS',
    category: 'Speedcubing',
    mode: 'Offline',
    summary: 'Official WCA-standard speedcubing triathlon spanning 2×2, 3×3, and Pyraminx disciplines with electronic StackMat timers.',
    teamSize: '1–3 members',
    eligibility: 'Grades VI – XII',
    duration: '2 Hours',
    venue: 'Mathematics & Spatial Arena',
    about: [
      'Twisttriads gathers the fastest speedcubers to battle across three classic twisty puzzle formats with certified StackMat timers.'
    ],
    format: [
      'Round 1: Average of 5 (Ao5) on 3×3×3.',
      'Round 2: 2×2×2 and Pyraminx speed heats.',
      'Finals: Head-to-head elimination bracket for top seeds.'
    ],
    rules: [
      'World Cube Association (WCA) guidelines strictly enforced.',
      '15-second inspection time limit with standard verbal warnings.'
    ],
    whatToBring: [
      'Tournament-legal speedcubes (2×2, 3×3, Pyraminx)'
    ],
    judging: [
      'Official average solve times and podium placement'
    ]
  },
  {
    id: '08',
    slug: 'flying-machine',
    number: '08',
    name: 'FLYING MACHINE',
    category: 'Engineering / Water Rocket',
    mode: 'Offline',
    summary: 'Aerodynamic staging, pressure calculation, and precision flight time challenge for custom-built water rockets. Rules: TBA.',
    teamSize: '2–3 members',
    eligibility: 'Grades VIII – XII',
    duration: '2 Hours 30 Minutes',
    venue: 'Main Athletic Grounds / Open Launch Range',
    about: [
      'Flying Machine is the symposium’s dedicated water rocket aerospace challenge.',
      'Teams engineer single or multi-stage pressurized water rockets to achieve maximum apogee and sustained air-time.'
    ],
    format: [
      'Two official launch attempts per delegation under standardized pressure limits. Rules: TBA.'
    ],
    rules: [
      'Rockets constructed strictly from non-metallic lightweight materials (PET bottles, corrugated plastic fins).',
      'Propulsion medium limited strictly to water and compressed air.',
      'Technical launch parameters and safety check rules: TBA.'
    ],
    whatToBring: [
      'Custom water rockets',
      'Spare fins, nose cones, and field assembly kits'
    ],
    judging: [
      'Flight Hang-Time and Apogee (60%)',
      'Aerodynamic Stability & Structural Integrity (40%)'
    ]
  },
  {
    id: '09',
    slug: 'nocturne',
    number: '09',
    name: 'NOCTURNE',
    subtitle: 'FOLLOW THE CLUE. BREAK THE PATTERN.',
    category: 'Cyber Hunt / Cryptic Hunt',
    mode: 'Online',
    summary: 'A layered online cryptic and cyber hunt featuring research, logic, hidden clues and selected CTF-style challenges including cryptography and reverse engineering.',
    teamSize: '1–3 members',
    eligibility: 'Open to Grades VIII – XII',
    duration: '24 Continuous Hours',
    venue: 'Online Platform (Discord & Dedicated Terminal)',
    about: [
      'Nocturne is an online cyber and cryptic hunt built around layered clues, internet research, hidden information, logic and puzzle-solving, with selected CTF-style elements such as cryptography, reverse engineering and other cybersecurity challenges woven into the hunt.',
      'Running continuously for 24 hours, delegations navigate esoteric clues, audio spectrograms, steganography, digital forensics, and lateral research problems.'
    ],
    format: [
      'Continuous 24-hour live scoreboard hunt featuring progressive puzzle tiers and selected CTF security challenges.'
    ],
    rules: [
      'Sharing flags, solutions, or clues between delegations results in immediate disqualification.',
      'Attacking or brute-forcing challenge infrastructure is strictly forbidden.'
    ],
    whatToBring: [
      'Computer with stable internet connection, cipher decoders, and cryptanalysis toolkits'
    ],
    judging: [
      'Dynamic point scoreboard with timestamps for tiebreakers'
    ],
    isDarkTheme: true
  },
  {
    id: '10',
    slug: 'robo-soccer',
    number: '10',
    name: 'ROBO SOCCER',
    category: 'Robotics / Robo Soccer',
    mode: 'Offline',
    summary: 'Fast-paced, head-to-head teleoperated robotic soccer tournament held within an enclosed pitch. Exact technical rules: TBA.',
    teamSize: '2–4 members',
    eligibility: 'Grades VIII – XII',
    duration: 'Tournament Knockout (Afternoon)',
    venue: 'Robotics Turf Arena',
    about: [
      'Robo Soccer pits agile student-built rovers against one another in a tactical football showdown.',
      'Delegations must engineer bots with responsive steering, chassis stability, and ball retention mechanisms.'
    ],
    format: [
      'Group stage fixtures followed by single-elimination knockouts. Technical specifications: TBA.'
    ],
    rules: [
      'Maximum bot dimensions and weight limits specified in tournament briefing (TBA).',
      'Ball enclosing mechanisms that prevent opponent challenge are prohibited.'
    ],
    whatToBring: [
      'Custom soccer bots and calibrated RF controllers',
      'Battery packs and repair toolkits'
    ],
    judging: [
      'Goals scored and tournament match progression'
    ]
  },
  {
    id: '11',
    slug: 'huddle-mania',
    number: '11',
    name: 'HUDDLE MANIA',
    category: 'Robotics / Engineering Challenge',
    mode: 'Offline',
    summary: 'High-torque terrestrial obstacle robotics tackling multi-surface bottlenecks, rough terrain, and agility traps. Rules: TBA.',
    teamSize: '2–3 members',
    eligibility: 'Grades VIII – XII',
    duration: '3 Hours',
    venue: 'Robotics Tactical Arena Alpha',
    about: [
      'Huddle Mania challenges roboticists to construct a rugged terrestrial mobile rover capable of maneuvering across chicanes, elevated ramps, friction traps, and physical bottlenecks.'
    ],
    format: [
      'Timed runs through an engineered course with designated checkpoint gates. Rules: TBA.'
    ],
    rules: [
      'Chassis dimensions and nominal power limits specified in technical briefing (TBA).'
    ],
    whatToBring: [
      'Robotics chassis, controllers, and pit crew toolkits'
    ],
    judging: [
      'Course completion time and checkpoint score'
    ]
  },
  {
    id: '12',
    slug: 'tech-crossfire',
    number: '12',
    name: 'TECH CROSSFIRE',
    category: 'Tech MUN / Digital Policy',
    mode: 'Offline',
    summary: 'A technology and digital-policy forum exploring AI governance, cybersecurity, privacy, digital rights and emerging technologies.',
    teamSize: '1–2 delegates',
    eligibility: 'Grades IX – XII',
    duration: '3 Hours 30 Minutes',
    venue: 'Committee Chamber / Conference Hall',
    about: [
      'Tech Crossfire is an inter-school technology parliament and digital-policy symposium.',
      'Delegates represent global institutions, nation-states, and industry bodies to debate AI ethics, algorithmic accountability, data privacy, and cyber sovereignty.'
    ],
    format: [
      'Opening statements followed by moderated caucus debate, crisis directive introduction, and policy resolution draft presentation.'
    ],
    rules: [
      'Standard parliamentary and MUN committee rules apply.',
      'Delegates must defend positions grounded in technological feasibility, international policy, and human rights frameworks.'
    ],
    whatToBring: [
      'Laptops/tablets for research and resolution drafting',
      'Policy background dossiers and credentials'
    ],
    judging: [
      'Policy Depth & Technological Analysis (35%)',
      'Argumentation & Rebuttal (30%)',
      'Diplomatic Collaboration & Resolution Craft (20%)',
      'Oratory & Decorum (15%)'
    ]
  }
];

export const getEventBySlug = (slug: string): FestivalEvent | undefined => {
  return EVENTS.find(
    (e) =>
      e.slug === slug ||
      (slug === 'ui-ux-rumble' && e.slug === 'ui-ux-rumble') ||
      (slug === 'web-forge' && e.slug === 'ui-ux-rumble') ||
      (slug === 'webforge' && e.slug === 'ui-ux-rumble') ||
      (slug === 'nocturne-3301' && e.slug === 'nocturne') ||
      (slug === 'nocturne' && e.slug === 'nocturne')
  );
};
