import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FestivalStatement } from '../components/FestivalStatement';
import { EventProgramme } from '../components/EventProgramme';
import { ArchiveSection } from '../components/ArchiveSection';
import { BrochureSection } from '../components/BrochureSection';
import { PartnersSection } from '../components/PartnersSection';
import { SymphonisersAcknowledgement } from '../components/SymphonisersAcknowledgement';
import { FinalCta } from '../components/FinalCta';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectEvent: (slug: string) => void;
  hasEntered?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectEvent,
  hasEntered = true,
}) => {
  return (
    <div className="w-full">
      {/* 1. HERO POSTER VIEWPORT (One Master Timeline) */}
      <HeroSection
        onRegisterClick={() => onNavigate('/register')}
        hasEntered={hasEntered}
      />

      {/* 2. FESTIVAL STATEMENT & DISCIPLINES REORGANISATION (One Master Timeline) */}
      <FestivalStatement hasEntered={hasEntered} />

      {/* 3. EVENT PROGRAMME (One Pinned Master Timeline derived from events.length) */}
      <EventProgramme
        onSelectEvent={onSelectEvent}
        onRegisterClick={() => onNavigate('/register')}
        hasEntered={hasEntered}
      />

      {/* 4. PREVIOUS EDITION ARCHIVE (One Master Timeline & Behind-photo Ribbon) */}
      <ArchiveSection
        onViewFullArchive={() => onNavigate('/archive')}
        hasEntered={hasEntered}
      />

      {/* 5. IN PRINT / BROCHURE FIELD GUIDE (One Master Timeline) */}
      <BrochureSection
        onOpenFullBrochure={() => onNavigate('/brochure')}
        hasEntered={hasEntered}
      />

      {/* 6. PARTNERS (Quiet Horizontal Ribbon Strip) */}
      <PartnersSection />

      {/* 7. THE SYMPHONISERS ACKNOWLEDGEMENT */}
      <SymphonisersAcknowledgement onMeetSociety={() => onNavigate('/thesymphonisers')} />

      {/* 8. FINAL REGISTRATION CTA (One Master Timeline with Ribbon Settle) */}
      <FinalCta
        onRegisterClick={() => onNavigate('/register')}
        hasEntered={hasEntered}
      />
    </div>
  );
};
