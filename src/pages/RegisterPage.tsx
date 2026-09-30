import React, { useState, useEffect } from 'react';
import { EVENTS } from '../data/events';
import {
  RegistrationPayload,
  loadRegistrationDraft,
  saveRegistrationDraft,
  submitRegistration,
  SubmissionResult,
} from '../services/registration';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

const INITIAL_PAYLOAD: RegistrationPayload = {
  school: {
    schoolName: '',
    address: '',
    city: '',
    state: '',
    website: '',
    officialEmail: '',
    phone: '',
  },
  coordinator: {
    fullName: '',
    designation: '',
    officialEmail: '',
    mobileNumber: '',
    isAuthorized: false,
  },
  selectedEventSlugs: ['innovation-sprint', 'ui-ux-rumble'],
  eventTeams: {},
};

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [payload, setPayload] = useState<RegistrationPayload>(INITIAL_PAYLOAD);
  const [draftSavedMessage, setDraftSavedMessage] = useState<string>('Draft saved.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load draft on mount
  useEffect(() => {
    const draft = loadRegistrationDraft();
    if (draft) {
      setPayload(draft);
    }
  }, []);

  // Autosave draft on payload change
  useEffect(() => {
    saveRegistrationDraft(payload);
    setDraftSavedMessage('Draft saved.');
    const timer = setTimeout(() => {
      // keep quiet
    }, 2000);
    return () => clearTimeout(timer);
  }, [payload]);

  // Ensure selected events have team structures
  const syncEventTeams = (selectedSlugs: string[]) => {
    const updatedTeams = { ...payload.eventTeams };
    selectedSlugs.forEach((slug) => {
      if (!updatedTeams[slug] || updatedTeams[slug].length === 0) {
        const ev = EVENTS.find((e) => e.slug === slug);
        const initialMembersCount = ev?.teamSize.includes('1') ? 1 : 2;
        updatedTeams[slug] = [
          {
            teamId: `${slug}-1`,
            teamName: `${ev?.name || 'Delegation'} Team 1`,
            members: Array.from({ length: initialMembersCount }).map(() => ({
              participantName: '',
              grade: 'Grade XI',
              section: 'A',
              email: '',
              phone: '',
            })),
          },
        ];
      }
    });
    return updatedTeams;
  };

  const handleToggleEvent = (slug: string) => {
    let nextSlugs: string[];
    if (payload.selectedEventSlugs.includes(slug)) {
      nextSlugs = payload.selectedEventSlugs.filter((s) => s !== slug);
    } else {
      nextSlugs = [...payload.selectedEventSlugs, slug];
    }
    const updatedTeams = syncEventTeams(nextSlugs);
    setPayload({
      ...payload,
      selectedEventSlugs: nextSlugs,
      eventTeams: updatedTeams,
    });
  };

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    if (!payload.school.schoolName.trim()) {
      setErrorMessage('School Name is required.');
      return false;
    }
    if (!payload.school.city.trim() || !payload.school.state.trim()) {
      setErrorMessage('City and State are required.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    if (!payload.coordinator.fullName.trim()) {
      setErrorMessage('Coordinator Full Name is required.');
      return false;
    }
    if (!payload.coordinator.designation.trim()) {
      setErrorMessage('Official Designation is required.');
      return false;
    }
    if (!payload.coordinator.officialEmail.trim() || !payload.coordinator.mobileNumber.trim()) {
      setErrorMessage('Official Email and Mobile Number are required.');
      return false;
    }
    if (!payload.coordinator.isAuthorized) {
      setErrorMessage('Please confirm authorization to register participants on behalf of your school.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    if (payload.selectedEventSlugs.length === 0) {
      setErrorMessage('Please select at least one event competition.');
      return false;
    }
    setPayload({
      ...payload,
      eventTeams: syncEventTeams(payload.selectedEventSlugs),
    });
    setErrorMessage(null);
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setErrorMessage(null);
    setStep((prev) => Math.min(5, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddTeam = (eventSlug: string) => {
    const currentList = payload.eventTeams[eventSlug] || [];
    const ev = EVENTS.find((e) => e.slug === eventSlug);
    const count = ev?.teamSize.includes('1') ? 1 : 2;

    const newTeam = {
      teamId: `${eventSlug}-${currentList.length + 1}`,
      teamName: `${ev?.name || 'Delegation'} Team ${currentList.length + 1}`,
      members: Array.from({ length: count }).map(() => ({
        participantName: '',
        grade: 'Grade XI',
        section: 'A',
      })),
    };

    setPayload({
      ...payload,
      eventTeams: {
        ...payload.eventTeams,
        [eventSlug]: [...currentList, newTeam],
      },
    });
  };

  const handleRemoveTeam = (eventSlug: string, teamIdx: number) => {
    const currentList = payload.eventTeams[eventSlug] || [];
    if (currentList.length <= 1) return;
    const updated = currentList.filter((_, idx) => idx !== teamIdx);
    setPayload({
      ...payload,
      eventTeams: {
        ...payload.eventTeams,
        [eventSlug]: updated,
      },
    });
  };

  const handleUpdateMember = (
    eventSlug: string,
    teamIdx: number,
    memberIdx: number,
    field: string,
    value: string
  ) => {
    const currentList = [...(payload.eventTeams[eventSlug] || [])];
    const team = { ...currentList[teamIdx] };
    const members = [...team.members];
    members[memberIdx] = {
      ...members[memberIdx],
      [field]: value,
    };
    team.members = members;
    currentList[teamIdx] = team;

    setPayload({
      ...payload,
      eventTeams: {
        ...payload.eventTeams,
        [eventSlug]: currentList,
      },
    });
  };

  const handleAddMemberToTeam = (eventSlug: string, teamIdx: number) => {
    const currentList = [...(payload.eventTeams[eventSlug] || [])];
    const team = { ...currentList[teamIdx] };
    team.members = [
      ...team.members,
      { participantName: '', grade: 'Grade XI', section: 'A' },
    ];
    currentList[teamIdx] = team;
    setPayload({
      ...payload,
      eventTeams: {
        ...payload.eventTeams,
        [eventSlug]: currentList,
      },
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await submitRegistration(payload);
      setSubmissionResult(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMessage('Submission failed. Please check your network and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Total participant calculation
  const totalParticipants = Object.values(payload.eventTeams).reduce(
    (acc, teams) =>
      acc +
      teams.reduce((tAcc, t) => tAcc + t.members.filter((m) => m.participantName.trim()).length, 0),
    0
  );

  if (submissionResult) {
    return (
      <div className="w-full bg-[#FAF9F5] text-[#151515] pt-36 pb-40 px-[5vw]">
        <div className="max-w-3xl mx-auto border-t border-[#151515]/20 pt-12">
          <span className="font-mono text-xs tracking-widest text-[#325E7D] uppercase block mb-3">
            REGISTRATION CONFIRMED
          </span>
          <h1
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
          >
            DELEGATION RECORDED.
          </h1>
          <p className="mt-6 text-lg text-[#575757] font-light leading-relaxed">
            {submissionResult.message}
          </p>

          <div className="my-10 p-8 bg-[#F3F1EA] border border-black/10 flex flex-col gap-4 font-mono text-xs">
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-[#888]">OFFICIAL REFERENCE NUMBER</span>
              <span className="font-bold text-base text-[#151515]">{submissionResult.referenceNumber}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-[#888]">REGISTERED SCHOOL</span>
              <span className="font-semibold text-[#151515]">{payload.school.schoolName}</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-[#888]">COORDINATOR</span>
              <span className="font-semibold text-[#151515]">{payload.coordinator.fullName} ({payload.coordinator.designation})</span>
            </div>
            <div className="flex justify-between border-b border-black/10 pb-3">
              <span className="text-[#888]">EVENTS CONTESTED</span>
              <span className="font-semibold text-[#151515]">{payload.selectedEventSlugs.length} Arenas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888]">SUBMISSION TIMESTAMP</span>
              <span>{new Date(submissionResult.timestamp).toLocaleString()}</span>
            </div>
          </div>

          <p className="text-sm text-[#575757] font-light leading-relaxed mb-8">
            An official delegation confirmation dossier has been queued for {payload.coordinator.officialEmail}. Host registration counters will verify this reference upon campus entry on 17 October 2026.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-6 py-3.5 hover:bg-[#325E7D] transition-colors cursor-pointer"
            >
              RETURN TO HOMEPAGE ↗
            </button>
            <button
              onClick={() => {
                setSubmissionResult(null);
                setStep(1);
                setPayload(INITIAL_PAYLOAD);
              }}
              className="font-mono text-xs uppercase tracking-widest font-semibold border border-current px-6 py-3.5 hover:bg-black/5 transition-colors cursor-pointer"
            >
              REGISTER ANOTHER SCHOOL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-32 pb-40 px-[5vw]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Block: Huge typography & subline */}
        <div className="border-b border-[#151515]/10 pb-12 mb-12">
          <div className="flex justify-between items-center mb-4 font-mono text-xs text-[#575757]">
            <span className="uppercase tracking-widest">
              SCHOOL DELEGATION ACCREDITATION
            </span>
            <span className="text-[#325E7D]">{draftSavedMessage}</span>
          </div>

          <h1
            className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.88]"
            style={{ fontSize: 'clamp(2.75rem, 8.5vw, 8rem)' }}
          >
            REGISTER
            <br />
            YOUR SCHOOL.
          </h1>

          <p className="mt-6 font-mono text-xs sm:text-sm tracking-widest uppercase text-[#325E7D]">
            One school. One coordinator. Multiple events.
          </p>
        </div>

        {/* 5-Step Process Indicator */}
        <div className="flex items-center justify-between border-b border-[#151515]/10 pb-4 mb-16 overflow-x-auto scrollbar-none font-mono text-xs uppercase tracking-wider">
          {[
            { num: 1, title: '01. School' },
            { num: 2, title: '02. Coordinator' },
            { num: 3, title: '03. Events' },
            { num: 4, title: '04. Participants' },
            { num: 5, title: '05. Review' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num < step) setStep(s.num);
              }}
              className={`py-1 px-3 whitespace-nowrap transition-colors cursor-pointer ${
                step === s.num
                  ? 'font-bold text-[#151515] border-b-2 border-[#151515]'
                  : step > s.num
                  ? 'text-[#151515] opacity-70 hover:opacity-100'
                  : 'text-[#888] cursor-not-allowed'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Error message banner if any */}
        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: SCHOOL */}
        {step === 1 && (
          <div className="max-w-3xl space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
              STEP 1 — INSTITUTION DETAILS
            </h2>

            <div className="space-y-6 font-body">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delhi Public School, R.K. Puram"
                  value={payload.school.schoolName}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      school: { ...payload.school, schoolName: e.target.value },
                    })
                  }
                  className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                  Campus Address
                </label>
                <input
                  type="text"
                  placeholder="Sector / Road / Locality"
                  value={payload.school.address}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      school: { ...payload.school, address: e.target.value },
                    })
                  }
                  className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Noida / New Delhi"
                    value={payload.school.city}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        school: { ...payload.school, city: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Uttar Pradesh"
                    value={payload.school.state}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        school: { ...payload.school, state: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    Official School Email
                  </label>
                  <input
                    type="email"
                    placeholder="info@school.edu.in"
                    value={payload.school.officialEmail}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        school: { ...payload.school, officialEmail: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    Phone / Board Landline
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 (120) 000-0000"
                    value={payload.school.phone}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        school: { ...payload.school, phone: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                  Official Website
                </label>
                <input
                  type="url"
                  placeholder="https://www.yourschool.edu.in"
                  value={payload.school.website}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      school: { ...payload.school, website: e.target.value },
                    })
                  }
                  className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: COORDINATOR */}
        {step === 2 && (
          <div className="max-w-3xl space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
              STEP 2 — TEACHER-IN-CHARGE / COORDINATOR
            </h2>
            <p className="text-sm text-[#575757] font-light">
              This faculty member or delegation head acts as the single official point of contact for festival correspondence, arena passes, and results arbitration.
            </p>

            <div className="space-y-6 font-body">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={payload.coordinator.fullName}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        coordinator: { ...payload.coordinator, fullName: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HOD Computer Science / PGT Tech"
                    value={payload.coordinator.designation}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        coordinator: { ...payload.coordinator, designation: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    placeholder="coordinator@school.edu.in"
                    value={payload.coordinator.officialEmail}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        coordinator: { ...payload.coordinator, officialEmail: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[#575757] mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={payload.coordinator.mobileNumber}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        coordinator: { ...payload.coordinator, mobileNumber: e.target.value },
                      })
                    }
                    className="w-full bg-transparent border border-black/20 p-3.5 text-base focus:border-[#151515] focus:outline-none rounded-none"
                  />
                </div>
              </div>

              {/* Authorization Checkbox */}
              <div className="pt-6 border-t border-black/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={payload.coordinator.isAuthorized}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        coordinator: {
                          ...payload.coordinator,
                          isAuthorized: e.target.checked,
                        },
                      })
                    }
                    className="mt-1 w-4 h-4 rounded-none accent-[#151515] cursor-pointer"
                  />
                  <span className="font-mono text-xs text-[#151515] leading-relaxed">
                    I am authorised to register participants on behalf of my school.
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EVENTS SELECTION */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
                  STEP 3 — SELECT COMPETITIONS
                </h2>
                <p className="text-sm text-[#575757] font-light mt-1">
                  Click to select or deselect events your school delegation will enter.
                </p>
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#325E7D]">
                {payload.selectedEventSlugs.length} EVENTS SELECTED
              </span>
            </div>

            {/* Clean List: NO CARDS, subtle color/background inversion */}
            <div className="divide-y divide-[#151515]/10 border-y border-[#151515]/10">
              {EVENTS.map((event) => {
                const isSelected = payload.selectedEventSlugs.includes(event.slug);
                return (
                  <div
                    key={event.id}
                    onClick={() => handleToggleEvent(event.slug)}
                    className={`p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors cursor-pointer select-none ${
                      isSelected
                        ? 'bg-[#151515] text-[#FAF9F5]'
                        : 'bg-transparent text-[#151515] hover:bg-black/[0.02]'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className={`font-mono text-xs ${isSelected ? 'opacity-60' : 'opacity-40'}`}>
                        {event.number}
                      </span>
                      <div>
                        <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight">
                          {event.name}
                        </h4>
                        <span className={`font-mono text-xs uppercase block mt-0.5 ${isSelected ? 'text-[#1BBBE8]' : 'text-[#575757]'}`}>
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-8 text-xs font-mono">
                      <span className={isSelected ? 'text-[#F1C4B0]' : 'text-[#888]'}>
                        {event.mode}
                      </span>
                      <span className={isSelected ? 'opacity-80' : 'opacity-60'}>
                        TEAM: {event.teamSize}
                      </span>
                      <span className="font-bold text-sm">
                        {isSelected ? '✓ SELECTED' : '+ ADD'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: PARTICIPANTS */}
        {step === 4 && (
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
                STEP 4 — PARTICIPANT & TEAM ROSTERS
              </h2>
              <p className="text-sm text-[#575757] font-light mt-1">
                Enter student details for the {payload.selectedEventSlugs.length} selected competitions. You can add or remove teams per event.
              </p>
            </div>

            {/* Dynamic Event Team Roster Blocks */}
            <div className="space-y-14">
              {payload.selectedEventSlugs.map((slug) => {
                const ev = EVENTS.find((e) => e.slug === slug);
                const teams = payload.eventTeams[slug] || [];

                return (
                  <div key={slug} className="border-t border-[#151515]/15 pt-8">
                    {/* Event Subheading */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="font-mono text-xs text-[#325E7D] uppercase tracking-widest">
                          EVENT {ev?.number} · {ev?.category}
                        </span>
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#151515]">
                          {ev?.name}
                        </h3>
                      </div>

                      <button
                        onClick={() => handleAddTeam(slug)}
                        className="font-mono text-xs uppercase tracking-wider font-semibold border border-current px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        + ADD TEAM
                      </button>
                    </div>

                    {/* Team Forms */}
                    <div className="space-y-8">
                      {teams.map((team, teamIdx) => (
                        <div key={team.teamId} className="bg-[#F3F1EA] p-6 sm:p-8 border border-black/10">
                          <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/10 font-mono text-xs">
                            <span className="font-bold uppercase tracking-wider text-[#151515]">
                              {team.teamName}
                            </span>
                            {teams.length > 1 && (
                              <button
                                onClick={() => handleRemoveTeam(slug, teamIdx)}
                                className="text-red-700 hover:underline uppercase tracking-wider cursor-pointer"
                              >
                                REMOVE TEAM
                              </button>
                            )}
                          </div>

                          {/* Member rows */}
                          <div className="space-y-6">
                            {team.members.map((member, memberIdx) => (
                              <div
                                key={memberIdx}
                                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end pt-2 border-t border-black/5 first:border-none first:pt-0"
                              >
                                <div className="sm:col-span-5">
                                  <label className="block font-mono text-[11px] uppercase text-[#575757] mb-1">
                                    Participant {memberIdx + 1} Name *
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Student Full Name"
                                    value={member.participantName}
                                    onChange={(e) =>
                                      handleUpdateMember(slug, teamIdx, memberIdx, 'participantName', e.target.value)
                                    }
                                    className="w-full bg-[#FAF9F5] border border-black/20 p-2.5 text-sm focus:border-[#151515] focus:outline-none"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block font-mono text-[11px] uppercase text-[#575757] mb-1">
                                    Class *
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. XI"
                                    value={member.grade}
                                    onChange={(e) =>
                                      handleUpdateMember(slug, teamIdx, memberIdx, 'grade', e.target.value)
                                    }
                                    className="w-full bg-[#FAF9F5] border border-black/20 p-2.5 text-sm focus:border-[#151515] focus:outline-none"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block font-mono text-[11px] uppercase text-[#575757] mb-1">
                                    Section
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. A"
                                    value={member.section}
                                    onChange={(e) =>
                                      handleUpdateMember(slug, teamIdx, memberIdx, 'section', e.target.value)
                                    }
                                    className="w-full bg-[#FAF9F5] border border-black/20 p-2.5 text-sm focus:border-[#151515] focus:outline-none"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block font-mono text-[11px] uppercase text-[#575757] mb-1">
                                    Email / Phone (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="contact@optional.com"
                                    value={member.email || ''}
                                    onChange={(e) =>
                                      handleUpdateMember(slug, teamIdx, memberIdx, 'email', e.target.value)
                                    }
                                    className="w-full bg-[#FAF9F5] border border-black/20 p-2.5 text-sm focus:border-[#151515] focus:outline-none"
                                  />
                                </div>
                              </div>
                            ))}

                            <div className="pt-2">
                              <button
                                onClick={() => handleAddMemberToTeam(slug, teamIdx)}
                                className="font-mono text-[11px] text-[#325E7D] uppercase tracking-wider hover:underline cursor-pointer"
                              >
                                + ADD MEMBER TO THIS SQUAD
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW */}
        {step === 5 && (
          <div className="max-w-3xl space-y-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#151515]">
                STEP 5 — REVIEW & SUBMIT
              </h2>
              <p className="text-sm text-[#575757] font-light mt-1">
                Verify institutional details, coordinator credentials, and participant lists before official transmission.
              </p>
            </div>

            {/* School Review */}
            <div className="py-6 border-t border-black/10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#325E7D]">
                  01 · INSTITUTION
                </span>
                <button onClick={() => setStep(1)} className="font-mono text-xs uppercase underline cursor-pointer">
                  EDIT
                </button>
              </div>
              <p className="font-display text-xl font-bold uppercase">{payload.school.schoolName || '—'}</p>
              <p className="text-xs font-mono text-[#575757] mt-1">
                {payload.school.city}, {payload.school.state} · {payload.school.officialEmail}
              </p>
            </div>

            {/* Coordinator Review */}
            <div className="py-6 border-t border-black/10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#325E7D]">
                  02 · FACULTY COORDINATOR
                </span>
                <button onClick={() => setStep(2)} className="font-mono text-xs uppercase underline cursor-pointer">
                  EDIT
                </button>
              </div>
              <p className="font-display text-xl font-bold uppercase">{payload.coordinator.fullName || '—'}</p>
              <p className="text-xs font-mono text-[#575757] mt-1">
                {payload.coordinator.designation} · {payload.coordinator.officialEmail} · {payload.coordinator.mobileNumber}
              </p>
            </div>

            {/* Events & Teams Review */}
            <div className="py-6 border-t border-black/10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#325E7D]">
                  03 · EVENTS & PARTICIPANTS ({payload.selectedEventSlugs.length} Arenas)
                </span>
                <button onClick={() => setStep(3)} className="font-mono text-xs uppercase underline cursor-pointer">
                  EDIT EVENTS
                </button>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {payload.selectedEventSlugs.map((slug) => {
                  const ev = EVENTS.find((e) => e.slug === slug);
                  const teams = payload.eventTeams[slug] || [];
                  return (
                    <div key={slug} className="p-4 bg-[#F3F1EA] border border-black/10">
                      <div className="flex justify-between font-bold text-[#151515] uppercase mb-2">
                        <span>{ev?.number} {ev?.name}</span>
                        <span>{ev?.mode}</span>
                      </div>
                      <div className="space-y-1 text-[#575757]">
                        {teams.map((t, idx) => (
                          <div key={idx}>
                            <span className="font-semibold">{t.teamName}: </span>
                            {t.members
                              .filter((m) => m.participantName.trim())
                              .map((m) => `${m.participantName} (${m.grade}-${m.section})`)
                              .join(', ') || 'No members listed'}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Stat */}
            <div className="p-6 bg-[#151515] text-[#FAF9F5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs uppercase">
              <div>
                <span className="text-[#A9B09D] block">SUMMARY OF DELEGATION</span>
                <span className="text-sm font-bold">{payload.selectedEventSlugs.length} Competitions · {totalParticipants} Active Participants</span>
              </div>
              <span>READY FOR DISPATCH</span>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="mt-16 pt-8 border-t border-[#151515]/10 flex justify-between items-center font-mono text-xs">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-6 py-3 border border-current uppercase tracking-wider hover:bg-black/5 transition-colors cursor-pointer"
            >
              ← PREVIOUS STEP
            </button>
          ) : (
            <button
              onClick={() => onNavigate('/')}
              className="text-[#888] hover:text-[#151515] uppercase tracking-wider cursor-pointer"
            >
              CANCEL
            </button>
          )}

          {step < 5 ? (
            <button
              onClick={handleNextStep}
              className="px-8 py-3.5 bg-[#151515] text-[#FAF9F5] uppercase tracking-widest font-bold hover:bg-[#325E7D] transition-colors cursor-pointer"
            >
              PROCEED TO {step === 1 ? 'COORDINATOR' : step === 2 ? 'EVENTS' : step === 3 ? 'PARTICIPANTS' : 'REVIEW'} →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-10 py-4 bg-[#151515] text-[#FAF9F5] uppercase tracking-widest font-extrabold hover:bg-[#325E7D] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'TRANSMITTING REGISTRATION...' : 'SUBMIT REGISTRATION ↗'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
