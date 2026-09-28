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
}

export const FESTIVAL_SCHEDULE: DaySchedule = {
  date: '17 October 2026',
  status: 'FULL PROGRAMME COMING SOON',
  note: 'Official minute-by-minute reporting schedules, reporting slots, and stage rotations are currently being synchronized with participating school boards. Final schedule will be dispatched directly to registered coordinators and published here.',
  blocks: [
    {
      phase: 'DELEGATION REPORTING & ACCREDITATION',
      timeSlot: 'Morning Slot TBA',
      description: 'Host registration desks open at the main reception foyer. Collection of badges, offline hall credentials, and safety tokens.'
    },
    {
      phase: 'OPENING SYMPOSIUM & BRIEFINGS',
      timeSlot: 'Morning Slot TBA',
      description: 'Official welcome address, safety protocol review, and mystery event briefing in the Main Auditorium.'
    },
    {
      phase: 'COMPETITION ROUNDS (PARALLEL TRACKS)',
      timeSlot: 'All-Day Schedule TBA',
      description: 'Parallel execution across Computer Labs Alpha & Beta, Robotics Arena, Innovation Hub, AV Studios, and Conference Halls.'
    },
    {
      phase: 'VALEDICTORY & PRIZE DISTRIBUTION',
      timeSlot: 'Late Afternoon Slot TBA',
      description: 'Finalist jury announcements, award conferral, and concluding ceremony in the Main Auditorium.'
    }
  ]
};
