export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department?: string;
}

export interface ITDepartmentMember {
  id: string;
  name: string;
  role?: string;
}

export interface SocietyLeader {
  role: string;
  status: string;
}

export interface EventInCharge {
  eventName: string;
  eventSlug?: string;
  heads: string[];
}

export interface CommunityHead {
  name: string;
  role: string;
}

export const TEACHER_IN_CHARGES: FacultyMember[] = [
  {
    id: 'tic-1',
    name: 'Ms. Vineeta Somni',
    role: 'Teacher In-Charge',
  },
  {
    id: 'tic-2',
    name: 'Mr. Sanjeev Kumar',
    role: 'Teacher In-Charge',
  },
  {
    id: 'tic-3',
    name: 'Mr. Deepak Chauhan',
    role: 'Teacher In-Charge, Robotics',
  },
];

export const IT_DEPARTMENT_MEMBERS: ITDepartmentMember[] = [
  { id: 'it-1', name: 'Ms. Akriti Saxena' },
  { id: 'it-2', name: 'Ms. Anamika Srivastava' },
  { id: 'it-3', name: 'Mr. Sandeep Kumar' },
  { id: 'it-4', name: 'Ms. Premlata Negi' },
  { id: 'it-5', name: 'Mr. Mahak Singh' },
];

export const SOCIETY_LEADERSHIP: SocietyLeader[] = [
  {
    role: 'President',
    status: 'TO BE DECIDED',
  },
  {
    role: 'Vice President',
    status: 'TO BE DECIDED',
  },
];

export const EVENT_HEADS: EventInCharge[] = [
  {
    eventName: 'Innovation Spirit',
    eventSlug: 'innovation-spirit',
    heads: ['Atharv Negi', 'Akshat Parmar'],
  },
  {
    eventName: 'Nocturne',
    eventSlug: 'nocturne',
    heads: ['Atharv Negi', 'Akshat Parmar'],
  },
  {
    eventName: 'HyperStrike PC',
    eventSlug: 'hyperstrike-pc',
    heads: ['Bhavishya', 'Arnav Bisht'],
  },
  {
    eventName: 'Tech Crossfire',
    eventSlug: 'tech-crossfire',
    heads: ['Pratik Srivastava', 'Ishmeet Kaur Kalsi', 'Vaishnavi Bharthwal'],
  },
  {
    eventName: 'HyperStrike Mobile',
    eventSlug: 'hyperstrike-mobile',
    heads: ['Sharansh Gautam', 'Shivam Jha'],
  },
  {
    eventName: 'Robotics Events',
    heads: [
      'Swapnta',
      'Pradhumaya Singh',
      'Arnav Tripathi',
      'Ishan Sachan',
      'Md Aaman Khair',
      'Arth Sharma',
    ],
  },
  {
    eventName: 'Quizzard',
    eventSlug: 'quizzard',
    heads: ['Anvi Verma', 'Varnika Shukla'],
  },
  {
    eventName: 'UI/UX Rumble',
    eventSlug: 'ui-ux-rumble',
    heads: ['Shourya Srivastava', 'Shrinidhi Jha'],
  },
  {
    eventName: 'FrameLock',
    eventSlug: 'framelock',
    heads: ['Prabhav Singh', 'Arnav Verma'],
  },
  {
    eventName: 'Twist Triads',
    eventSlug: 'twisttriads',
    heads: ['Riddhi', 'Daksh Chauhan'],
  },
];

export const SOCIAL_COMMUNITY_HEADS: CommunityHead[] = [
  {
    name: 'Atharv Negi',
    role: 'Social & Community Head',
  },
  {
    name: 'Akshat Parmar',
    role: 'Social & Community Head',
  },
];

export const COMMUNITY_LINKS = {
  discord: 'https://discord.gg/7zedz2wyG7',
  whatsapp: 'https://chat.whatsapp.com/Ivu3yePs0Kd9h3VIQSQAUA',
  email: 'thecybersymphony@gmail.com',
};
