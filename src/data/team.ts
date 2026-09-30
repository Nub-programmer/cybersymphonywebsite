export interface TeamMember {
  id: string;
  role: string;
  name: string;
  department: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department?: string;
}

export const TEACHER_IN_CHARGES: FacultyMember[] = [
  {
    id: 'tic-1',
    name: 'To Be Announced',
    role: 'Teacher In-Charge',
    department: 'Department of Computer Science & Technology',
  },
  {
    id: 'tic-2',
    name: 'To Be Announced',
    role: 'Faculty Coordinator',
    department: 'Department of Science & Innovation',
  },
];

export const SYMPHONISERS_LEADERSHIP: TeamMember[] = [
  {
    id: 'president',
    role: 'PRESIDENT',
    name: 'NAME TBA',
    department: 'Executive Council',
  },
  {
    id: 'vice-president',
    role: 'VICE PRESIDENT',
    name: 'NAME TBA',
    department: 'Executive Council',
  },
  {
    id: 'head-tech',
    role: 'HEAD OF TECHNOLOGY',
    name: 'NAME TBA',
    department: 'Systems & Infrastructure',
  },
  {
    id: 'head-cyber',
    role: 'HEAD OF CYBERSECURITY',
    name: 'NAME TBA',
    department: 'Cyber Operations',
  },
  {
    id: 'head-robotics',
    role: 'HEAD OF ROBOTICS',
    name: 'NAME TBA',
    department: 'Hardware & Mechatronics',
  },
  {
    id: 'head-development',
    role: 'HEAD OF DEVELOPMENT',
    name: 'NAME TBA',
    department: 'Software Engineering',
  },
  {
    id: 'head-design',
    role: 'HEAD OF DESIGN',
    name: 'NAME TBA',
    department: 'Creative & Visual Identity',
  },
  {
    id: 'head-events-1',
    role: 'HEAD OF EVENTS — I',
    name: 'NAME TBA',
    department: 'Event Operations',
  },
  {
    id: 'head-events-2',
    role: 'HEAD OF EVENTS — II',
    name: 'NAME TBA',
    department: 'Event Operations',
  },
  {
    id: 'head-media',
    role: 'HEAD OF MEDIA',
    name: 'NAME TBA',
    department: 'Documentation & Film',
  },
  {
    id: 'head-operations',
    role: 'HEAD OF OPERATIONS',
    name: 'NAME TBA',
    department: 'Logistics & Safety',
  },
  {
    id: 'head-outreach',
    role: 'HEAD OF OUTREACH',
    name: 'NAME TBA',
    department: 'Institutional Relations',
  },
];
