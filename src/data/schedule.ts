export interface EventScheduleItem {
  event: string;
  category: string;
  timeSlot: string;
  venue: string;
  format?: string;
}

export interface ScheduleBlock {
  phase: string;
  timeSlot: string;
  description: string;
}

export interface DaySchedule {
  date: string;
  status: string;
  note: string;
  blocks: ScheduleBlock[];
  events: EventScheduleItem[];
}

export const FESTIVAL_SCHEDULE: DaySchedule = {
  date: '17 October 2026',
  status: 'OFFICIAL FESTIVAL TIMETABLE',
  note: 'Synchronized directly with the official brochure. Host campus venues are assigned at Jagran Public School, Sector 47, Noida.',
  blocks: [
    {
      phase: 'DELEGATION ACCREDITATION & REPORTING',
      timeSlot: '08:30 AM – 09:15 AM',
      description: 'Host registration desks open at the main reception foyer. Collection of badges, hall credentials, and delegation safety briefing.'
    },
    {
      phase: 'STAGE 1: MORNING COMPETITIVE TRACKS',
      timeSlot: '09:30 AM – 11:00 AM',
      description: 'Parallel execution across Quizzard, Innovation Spirit, HyperStrike PC & Mobile, Tech Crossfire, and Manoeuvre.'
    },
    {
      phase: 'STAGE 2: MID-DAY COMPETITIVE TRACKS',
      timeSlot: '11:00 AM – 12:30 PM',
      description: 'UI/UX Rumble, FrameLock, TwistTriads, and Robo Soccer across computer labs, robotics court, and AV halls.'
    },
    {
      phase: 'OUTDOOR & EXTENDED TRACKS',
      timeSlot: 'All-Day Schedule',
      description: 'Flying Machine at Playground; Nocturne operating continuously online.'
    },
    {
      phase: 'VALEDICTORY & PRIZE CONFERRAL',
      timeSlot: '01:30 PM – 03:00 PM',
      description: 'Final score announcements, trophy distribution, and valedictory address in the Main Auditorium.'
    }
  ],
  events: [
    {
      event: 'Quizzard',
      category: 'AI / Technology Quiz',
      timeSlot: '09:30 AM – 11:00 AM',
      venue: 'Sr. AV Room / Big Hall, 3rd Floor',
      format: 'Offline'
    },
    {
      event: 'Innovation Spirit',
      category: 'Innovation / Hackathon',
      timeSlot: '09:30 AM – 11:00 AM',
      venue: 'Sr. Art Room, 3rd Floor',
      format: 'Online/Offline'
    },
    {
      event: 'HyperStrike PC',
      category: 'PC Gaming',
      timeSlot: '09:30 AM – 11:00 AM',
      venue: 'ATAL Lab, 2nd Floor',
      format: 'Offline'
    },
    {
      event: 'HyperStrike Mobile',
      category: 'Mobile Gaming',
      timeSlot: '09:30 AM – 11:00 AM',
      venue: 'French Room',
      format: 'Offline'
    },
    {
      event: 'Tech Crossfire',
      category: 'Tech Debate',
      timeSlot: '09:30 AM – 11:00 AM',
      venue: 'Robotics Lab',
      format: 'Offline'
    },
    {
      event: 'Manoeuvre',
      category: 'Robotics / Precision Task',
      timeSlot: '09:30 AM – 11:00 AM',
      venue: 'Basketball Court',
      format: 'Offline'
    },
    {
      event: 'UI/UX Rumble',
      category: 'Web Designing / UI-UX',
      timeSlot: '11:00 AM – 12:30 PM',
      venue: 'Sr. Computer Lab, 2nd Floor',
      format: 'Offline'
    },
    {
      event: 'FrameLock',
      category: 'Video Editing',
      timeSlot: '11:00 AM – 12:30 PM',
      venue: 'ATAL Lab, 2nd Floor',
      format: 'Offline'
    },
    {
      event: 'TwistTriads',
      category: 'Speedcubing',
      timeSlot: '11:00 AM – 12:30 PM',
      venue: 'Sr. AV Room / Big Hall',
      format: 'Offline'
    },
    {
      event: 'Robo Soccer',
      category: 'Robotics',
      timeSlot: '11:30 AM – 12:30 PM',
      venue: 'Basketball Court',
      format: 'Offline'
    },
    {
      event: 'Flying Machine',
      category: 'Water Rocket',
      timeSlot: 'Playground Schedule',
      venue: 'Playground',
      format: 'Offline'
    },
    {
      event: 'Nocturne',
      category: 'Cryptic Hunt / Online Hunt',
      timeSlot: 'Online',
      venue: 'Online Platform',
      format: 'Online'
    }
  ]
};
