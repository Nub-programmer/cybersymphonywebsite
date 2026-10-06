export interface FestivalEvent {
  id: string;
  slug: string;
  number: string;
  name: string;
  subtitle?: string;
  category: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
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
    slug: 'quizzard',
    number: '01',
    name: 'QUIZZARD',
    category: 'AI / Technology Quiz',
    mode: 'Offline',
    summary: 'A high-stakes AI and technology quiz competition testing computational lore, frontier silicon, artificial intelligence, and digital history in teams of two.',
    teamSize: '2 members',
    eligibility: 'Grades VI – XII',
    duration: '09:30 AM – 11:00 AM',
    venue: 'Sr. AV Room / Big Hall, 3rd Floor',
    about: [
      'Quizzard evaluates encyclopedic depth across computing history, hacker lore, operating systems, AI advancements, and frontier technology.',
      'Teams of two face off across challenging multi-round trivia evaluating speed, depth, and factual precision.'
    ],
    format: [
      'Preliminary written elimination round followed by on-stage audiovisual finals with buzzer systems.'
    ],
    rules: [
      'Teams must consist of exactly 2 participants from Grades VI–XII.',
      'No electronic devices, smartphones, or smartwatches permitted during quiz sessions.',
      'Quizmaster decisions are final and binding.'
    ],
    whatToBring: [
      'Writing instruments and delegation credentials'
    ],
    judging: [
      'Cumulative score across written prelims and stage buzzer finals'
    ]
  },
  {
    id: '02',
    slug: 'innovation-spirit',
    number: '02',
    name: 'INNOVATION SPIRIT',
    category: 'Innovation / Hackathon',
    mode: 'Hybrid',
    summary: 'A hybrid innovation hackathon featuring an online preliminary round on HackerRank followed by an on-site prototype defense and refinement at school.',
    teamSize: '2 members',
    eligibility: 'Grades IX – XII',
    duration: '09:30 AM – 11:00 AM',
    venue: 'Sr. Art Room, 3rd Floor',
    about: [
      'Innovation Spirit is the symposium’s premier innovation and hackathon arena.',
      'Teams develop algorithmic and computational solutions, progressing from HackerRank preliminaries to on-site physical builds and jury defense.'
    ],
    format: [
      'Preliminary Round: Online algorithmic and problem-solving submission on HackerRank.',
      'Final Round: On-site build, refinement, working demo, and jury pitch on 17 October 2026.'
    ],
    rules: [
      'Teams must consist of 2 participants from Grades IX–XII.',
      'All code and solution artifacts must be authentic to the student delegation.',
      'Plagiarism or unauthorized boilerplate packages incur immediate disqualification.'
    ],
    whatToBring: [
      'Laptops and hardware components/demonstrators',
      'Display adapters (HDMI)'
    ],
    judging: [
      'Technical Architecture & Code Quality (30%)',
      'Problem Significance & Originality (25%)',
      'Functional Working Demo (25%)',
      'Clarity of Defense & Presentation (20%)'
    ]
  },
  {
    id: '03',
    slug: 'hyperstrike-pc',
    number: '03',
    name: 'HYPERSTRIKE PC',
    category: 'PC Gaming',
    mode: 'Offline',
    summary: 'An intense tactical PC esports tournament contested on tournament-grade campus rigs. Game title to be revealed shortly before the event.',
    teamSize: '1 member',
    eligibility: 'Grades VI – XII',
    duration: '09:30 AM – 11:00 AM',
    venue: 'ATAL Lab, 2nd Floor',
    about: [
      'HyperStrike PC brings together solo esports competitors on high-refresh campus gaming rigs.',
      'Game titles and bracket rules will be announced shortly before the competition.'
    ],
    format: [
      'Single-elimination knockout tournament bracket under tournament rules.'
    ],
    rules: [
      'Solo participant per delegation (Grades VI–XII).',
      'Use of unauthorized third-party software, scripts, or game modifications results in immediate disqualification.',
      'Decisions of the match referees are final.'
    ],
    whatToBring: [
      'Personal peripherals permitted (Mouse, Keyboard, Headset) subject to referee hardware inspection'
    ],
    judging: [
      'Match victories and knockout bracket progression'
    ]
  },
  {
    id: '04',
    slug: 'hyperstrike-mobile',
    number: '04',
    name: 'HYPERSTRIKE MOBILE',
    category: 'Mobile Gaming',
    mode: 'Offline',
    summary: 'High-octane mobile gaming showdown featuring BGMI and a second mystery title to be revealed prior to competition.',
    teamSize: '2 members',
    eligibility: 'Grades VI – XII',
    duration: '09:30 AM – 11:00 AM',
    venue: 'French Room',
    about: [
      'HyperStrike Mobile challenges duos in tactical battle royale combat over campus network lobbies.',
      'The event features BGMI alongside a second competitive title revealed prior to tournament kickoff.'
    ],
    format: [
      'Multi-round lobby matches with cumulative placement and elimination scoring.'
    ],
    rules: [
      'Teams of 2 players (Grades VI–XII).',
      'Smartphones only. Emulators, tablets, and external triggers are strictly prohibited.',
      'Pre-download and update all game clients prior to arrival.'
    ],
    whatToBring: [
      'Smartphones with BGMI and tournament games pre-installed',
      'Earphones/headphones and portable battery packs'
    ],
    judging: [
      'Tournament points table (Placement + Elimination points)'
    ]
  },
  {
    id: '05',
    slug: 'tech-crossfire',
    number: '05',
    name: 'TECH CROSSFIRE',
    category: 'Tech Debate',
    mode: 'Offline',
    summary: 'A technology debate competition where participants defend ideas using facts, logic and structured argument.',
    teamSize: '1 member',
    eligibility: 'Grades VI – XII',
    duration: '09:30 AM – 11:00 AM',
    venue: 'Robotics Lab',
    about: [
      'Tech Crossfire is the festival’s dedicated technology debate forum.',
      'Orators debate emerging frontiers in artificial intelligence, privacy, cyberspace governance, and digital society.'
    ],
    format: [
      'Constructive opening remarks, followed by rebuttals, cross-examination, and closing summaries.'
    ],
    rules: [
      'Solo speaker per delegation (Grades VI–XII).',
      'Arguments must be factual, logical, and strictly adhere to time limits.',
      'Respect opposing viewpoints; zero tolerance for personal remarks or unverified plagiarism.'
    ],
    whatToBring: [
      'Research dossiers, notes, and debate outlines'
    ],
    judging: [
      'Logical Argumentation & Factual Substance (35%)',
      'Rebuttal Depth & Cross-Examination (30%)',
      'Oratory, Decorum & Structure (20%)',
      'Adherence to Time & Debate Ethics (15%)'
    ]
  },
  {
    id: '06',
    slug: 'ui-ux-rumble',
    number: '06',
    name: 'UI/UX RUMBLE',
    category: 'Web Designing / UI-UX',
    mode: 'Offline',
    summary: 'A web and interface design challenge where participants create a polished UI/UX solution from a topic revealed on the spot.',
    teamSize: '1 member',
    eligibility: 'Grades VI – XII',
    duration: '11:00 AM – 12:30 PM',
    venue: 'Sr. Computer Lab, 2nd Floor',
    about: [
      'UI/UX Rumble is the festival’s premier web designing and user interface design sprint.',
      'Participants craft responsive, visually striking web interfaces and prototypes in Figma responding to a live topic given on the spot.'
    ],
    format: [
      'On-site design sprint: Topic revealed at the opening bell, followed by live Figma interface design and presentation.'
    ],
    rules: [
      'Solo participant per delegation (Grades VI–XII).',
      'Figma is provided on-site. Design must be authored authentically from scratch.',
      'Pre-built UI kits, downloaded templates, or copy-pasting existing sites is prohibited.'
    ],
    whatToBring: [
      'Laptops configured with Figma accounts and browsers'
    ],
    judging: [
      'Visual Aesthetics & Hierarchy (30%)',
      'User Experience & Usability (25%)',
      'Responsiveness & Layout Craft (25%)',
      'Creativity & Defense Presentation (20%)'
    ]
  },
  {
    id: '07',
    slug: 'framelock',
    number: '07',
    name: 'FRAMELOCK',
    category: 'Video Editing',
    mode: 'Offline',
    summary: 'A fast-paced video editing sprint where editors assemble a compelling sequence from raw footage clips provided on the spot.',
    teamSize: '1 member',
    eligibility: 'Grades VI – XII',
    duration: '11:00 AM – 12:30 PM',
    venue: 'ATAL Lab, 2nd Floor',
    about: [
      'FrameLock tests editorial rhythm, sound design, visual pacing, and narrative composition.',
      'Participants receive raw footage clips on the spot and must produce a finished video edit within the allotted time.'
    ],
    format: [
      'Footage clips distributed on-site; participants edit, color-grade, and export within 90 minutes using Filmora or CapCut.'
    ],
    rules: [
      'Solo editor per delegation (Grades VI–XII).',
      'Video clips provided on the spot must form the primary basis of the edit.',
      'Permitted software: Filmora, CapCut, Premiere Pro, or DaVinci Resolve.',
      'Pre-edited project templates or automated AI generators are prohibited.'
    ],
    whatToBring: [
      'Laptop pre-installed with editing software (Filmora, CapCut, etc.) and headphones'
    ],
    judging: [
      'Storytelling & Narrative Rhythm (35%)',
      'Pacing, Cuts & Transitions (25%)',
      'Audio Sync & Sound Design (20%)',
      'Color Grading & Visual Polish (20%)'
    ]
  },
  {
    id: '08',
    slug: 'twisttriads',
    number: '08',
    name: 'TWISTTRIADS',
    category: 'Speedcubing',
    mode: 'Offline',
    summary: 'Speedcubing triathlon contested across 2×2, 3×3, and Pyramid/Pyraminx cubes under standard solve protocols.',
    teamSize: '1 member',
    eligibility: 'Grades VI – XII',
    duration: '11:00 AM – 12:30 PM',
    venue: 'Sr. AV Room / Big Hall',
    about: [
      'TwistTriads brings speedcubers together across three iconic twister puzzles.',
      'Solvers compete in rapid rounds featuring 2×2, 3×3, and Pyramid/Pyraminx puzzles.'
    ],
    format: [
      'Sequential solve heats for 2×2, 3×3, and Pyraminx with official timing.'
    ],
    rules: [
      'Solo speedcuber per delegation (Grades VI–XII).',
      'WCA-standard inspection limits (15 seconds) enforced before each solve attempt.',
      'Cubes must be standard competition puzzles without electronic aids.'
    ],
    whatToBring: [
      'Competition-ready 2×2, 3×3, and Pyraminx cubes'
    ],
    judging: [
      'Cumulative solve times across all three cube disciplines'
    ]
  },
  {
    id: '09',
    slug: 'nocturne',
    number: '09',
    name: 'NOCTURNE',
    subtitle: 'FOLLOW THE CLUE. FIND THE NEXT.',
    category: 'Cryptic Hunt / Online Hunt',
    mode: 'Online',
    summary: 'A layered online hunt of clues, connections, research and lateral thinking.',
    teamSize: '2 members',
    eligibility: 'Grades VI – XII',
    duration: 'Online Schedule',
    venue: 'Online Platform',
    about: [
      'An online cryptic hunt built around layered clues, hidden connections, research, logic and lateral thinking. Participants progress through a sequence of puzzles by interpreting clues, discovering links and uncovering the next stage of the hunt.',
      'Teams unravel a progression of multi-layered mysteries, combining open-web research, lateral deduction, and deductive problem solving.'
    ],
    format: [
      'Sequential online puzzle progression with real-time leaderboard scoring.'
    ],
    rules: [
      'Teams must consist of 2 participants from Grades VI–XII.',
      'Allowed tools: Web browsers, search engines, analytical tools, logic scripts, and digital decoders.',
      'Sharing clues, colluding across school delegations, or attempting to compromise the host platform is strictly prohibited.'
    ],
    whatToBring: [
      'Laptop or workstation with a modern browser and stable internet connection'
    ],
    judging: [
      'Leaderboard score and timestamp tiebreakers'
    ],
    isDarkTheme: true
  },
  {
    id: '10',
    slug: 'manoeuvre',
    number: '10',
    name: 'MANOEUVRE',
    category: 'Robotics / Precision Task',
    mode: 'Offline',
    summary: 'A precision robotics challenge requiring teams to control a custom-built bot to grip, align and place objects accurately.',
    teamSize: '1–3 members',
    eligibility: 'Grades VI – XII',
    duration: '09:30 AM – 11:00 AM',
    venue: 'Basketball Court',
    about: [
      'Manoeuvre is a precision engineering and teleoperation robotics showdown.',
      'Teams must pilot a manually controlled custom bot that grips designated shapes and seats them into matching board grooves within time limits.'
    ],
    format: [
      'Timed arena run: Gripping shapes, navigating path constraints, and fitting pieces into target grooves.'
    ],
    rules: [
      'Teams of 1–3 members from Grades VI–XII.',
      'Bot must be manually controlled via wired or wireless RF/Bluetooth link.',
      'Bot dimensions and power limitations must satisfy marshal pre-check.'
    ],
    whatToBring: [
      'Custom gripper robot, controllers, spare battery packs, and repair kit'
    ],
    judging: [
      'Number of shapes placed accurately and elapsed course run time'
    ]
  },
  {
    id: '11',
    slug: 'robo-soccer',
    number: '11',
    name: 'ROBO SOCCER',
    category: 'Robotics',
    mode: 'Offline',
    summary: 'Fast-paced robotic soccer championship where teams compete in head-to-head matches using custom-controlled bots.',
    teamSize: '1–3 members',
    eligibility: 'Grades VI – XII',
    duration: '11:30 AM – 12:30 PM',
    venue: 'Basketball Court',
    about: [
      'Robo Soccer pits agile, high-torque student rovers against each other in an enclosed pitch.',
      'Teams must balance propulsion, ball handling, and defense in rapid-fire soccer rounds.'
    ],
    format: [
      'Group fixtures followed by knockout brackets in the arena.'
    ],
    rules: [
      'Teams of 1–3 members (Grades VI–XII).',
      'Bots must be controlled remotely. Entrapping or damaging opponent bots is prohibited.',
      'Standard soccer scoring and overtime penalty shootouts apply.'
    ],
    whatToBring: [
      'Soccer bots, radio transmitters, charged battery packs, and pit tools'
    ],
    judging: [
      'Goals scored and tournament bracket victories'
    ]
  },
  {
    id: '12',
    slug: 'flying-machine',
    number: '12',
    name: 'FLYING MACHINE',
    category: 'Water Rocket',
    mode: 'Offline',
    summary: 'Single-stage pressurized water rocket aerospace challenge engineered for maximum distance, trajectory stability, and launch accuracy.',
    teamSize: '1–3 members',
    eligibility: 'Grades VI – XII',
    duration: 'Playground Schedule',
    venue: 'Playground',
    about: [
      'Flying Machine is Cyber Symphony’s dedicated water rocket aerospace tournament.',
      'Teams design and launch a single-stage water rocket for maximum distance and trajectory accuracy.'
    ],
    format: [
      'Standardized pressurized launch attempts on the outdoor sports grounds.'
    ],
    rules: [
      'Teams of 1–3 members (Grades VI–XII).',
      'Specifically a single-stage water rocket competition (not aircraft or drones).',
      'Propulsion strictly limited to water and compressed air under marshal safety limits.',
      'Rockets must use non-metal lightweight fuselages and stable fin assemblies.'
    ],
    whatToBring: [
      'Water rocket models, launch adapters, spare fins, and assembly tools'
    ],
    judging: [
      'Launch distance, trajectory accuracy, and structural flight stability'
    ]
  }
];

export const getEventBySlug = (slug: string): FestivalEvent | undefined => {
  return EVENTS.find(
    (e) =>
      e.slug === slug ||
      (slug === 'quizzard' && e.slug === 'quizzard') ||
      (slug === 'innovation-spirit' && e.slug === 'innovation-spirit') ||
      (slug === 'innovation-sprint' && e.slug === 'innovation-spirit') ||
      (slug === 'hyperstrike-pc' && e.slug === 'hyperstrike-pc') ||
      (slug === 'hyperstrike-mobile' && e.slug === 'hyperstrike-mobile') ||
      (slug === 'tech-crossfire' && e.slug === 'tech-crossfire') ||
      (slug === 'ui-ux-rumble' && e.slug === 'ui-ux-rumble') ||
      (slug === 'web-forge' && e.slug === 'ui-ux-rumble') ||
      (slug === 'webforge' && e.slug === 'ui-ux-rumble') ||
      (slug === 'framelock' && e.slug === 'framelock') ||
      (slug === 'twisttriads' && e.slug === 'twisttriads') ||
      (slug === 'nocturne' && e.slug === 'nocturne') ||
      (slug === 'nocturne-3301' && e.slug === 'nocturne') ||
      (slug === 'manoeuvre' && e.slug === 'manoeuvre') ||
      (slug === 'huddle-mania' && e.slug === 'manoeuvre') ||
      (slug === 'robo-soccer' && e.slug === 'robo-soccer') ||
      (slug === 'flying-machine' && e.slug === 'flying-machine')
  );
};
