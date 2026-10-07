import fizRoboticsLogo from '../assets/images/frslogo.webp';
import newsGgLogo from '../assets/images/newsgglogosponser5.png';
import genXyzLogo from '../assets/images/xyz2.png';
import codeCraftersLogo from '../assets/images/codecrafterslogo.png';
import ideaProofLogo from '../assets/images/ideaprooflogosponser1.png';
import everfernLogo from '../assets/images/everfernlogosponser4.png';

export interface Partner {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
  status: 'CONFIRMED' | 'ROBOTICS PARTNER' | 'SUPPORTING PARTNER' | 'IN DISCUSSION';
  url: string;
  logo: string;
}

export const MAJOR_ROBOTICS_PARTNER: Partner = {
  id: 'fiz-robotics-solutions',
  name: 'FIZ ROBOTIC SOLUTIONS',
  role: 'MAIN ROBOTICS PARTNER',
  category: 'Event Execution & Technical Assistance',
  description:
    'Supporting robotics event management, technical assistance and on-ground robotics support for Cyber Symphony 2026.',
  status: 'ROBOTICS PARTNER',
  url: 'https://fizrobotics.com',
  logo: fizRoboticsLogo,
};

export const SUPPORTING_PARTNERS: Partner[] = [
  {
    id: 'news-gg',
    name: 'news.gg',
    role: 'COMMUNITY & BROADCAST PARTNER',
    category: 'Tournament Broadcast & Bot Infrastructure',
    description: 'Providing Discord community tooling and automated tournament broadcast infrastructure.',
    status: 'SUPPORTING PARTNER',
    url: 'https://news.gg',
    logo: newsGgLogo,
  },
  {
    id: 'gen-xyz',
    name: 'GEN.xyz',
    role: 'DOMAIN & DIGITAL IDENTITY',
    category: 'Web Ecosystem & DNS Infrastructure',
    description: 'Supporting student innovators with dedicated .xyz domain support and web registry infrastructure.',
    status: 'SUPPORTING PARTNER',
    url: 'https://gen.xyz',
    logo: genXyzLogo,
  },
  {
    id: 'codecrafters',
    name: 'CodeCrafters',
    role: 'SYSTEMS ENGINEERING TRACKS',
    category: 'Advanced Computational Challenges',
    description: 'Advanced system programming challenge tracks and algorithmic implementation passes.',
    status: 'CONFIRMED',
    url: 'https://codecrafters.io',
    logo: codeCraftersLogo,
  },
  {
    id: 'ideaproof',
    name: 'IdeaProof',
    role: 'SUPPORTING PARTNER',
    category: 'Prototyping & Project Review',
    description: 'Technical guidance and project validation support for student engineering delegations.',
    status: 'SUPPORTING PARTNER',
    url: 'https://ideaproof.io',
    logo: ideaProofLogo,
  },
  {
    id: 'everfern',
    name: 'Everfern',
    role: 'SUPPORTING PARTNER',
    category: 'Ecosystem & Sustainability',
    description: 'Fostering ecological computing awareness and resource stewardship across participating schools.',
    status: 'SUPPORTING PARTNER',
    url: 'https://everfern.org',
    logo: everfernLogo,
  },
];

export const ALL_PARTNERS: Partner[] = [MAJOR_ROBOTICS_PARTNER, ...SUPPORTING_PARTNERS];
export const PARTNERS = ALL_PARTNERS;
