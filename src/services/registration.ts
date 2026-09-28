export interface SchoolDetails {
  schoolName: string;
  address: string;
  city: string;
  state: string;
  website: string;
  officialEmail: string;
  phone: string;
}

export interface CoordinatorDetails {
  fullName: string;
  designation: string;
  officialEmail: string;
  mobileNumber: string;
  isAuthorized: boolean;
}

export interface TeamMemberEntry {
  participantName: string;
  grade: string;
  section: string;
  email?: string;
  phone?: string;
}

export interface EventTeamEntry {
  teamId: string;
  teamName: string;
  members: TeamMemberEntry[];
}

export interface RegistrationPayload {
  id?: string;
  createdAt?: string;
  school: SchoolDetails;
  coordinator: CoordinatorDetails;
  selectedEventSlugs: string[];
  eventTeams: Record<string, EventTeamEntry[]>; // keyed by eventSlug
}

const STORAGE_KEY = 'cs2026_delegation_registration_draft_v1';
const SUBMISSIONS_KEY = 'cs2026_delegation_submissions_v1';

export function loadRegistrationDraft(): RegistrationPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveRegistrationDraft(data: RegistrationPayload): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function clearRegistrationDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export interface SubmissionResult {
  success: boolean;
  referenceNumber: string;
  timestamp: string;
  message: string;
}

export async function submitRegistration(payload: RegistrationPayload): Promise<SubmissionResult> {
  // Simulate network latency for realistic UX, ready for Firebase/Supabase/REST replacement
  await new Promise((resolve) => setTimeout(resolve, 800));

  const referenceNumber = `CS26-${Math.floor(100000 + Math.random() * 900000)}`;
  const timestamp = new Date().toISOString();

  const storedPayload: RegistrationPayload = {
    ...payload,
    id: referenceNumber,
    createdAt: timestamp
  };

  try {
    const existing = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
    existing.push(storedPayload);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existing));
    clearRegistrationDraft();
  } catch {
    // local fallback
  }

  return {
    success: true,
    referenceNumber,
    timestamp,
    message: 'Your school delegation registration has been officially recorded.'
  };
}
