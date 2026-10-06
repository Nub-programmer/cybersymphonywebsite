import React, { useEffect } from 'react';

const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/Ivu3yePs0Kd9h3VIQSQAUA';

export const WhatsAppPage: React.FC = () => {
  useEffect(() => {
    window.location.replace(WHATSAPP_COMMUNITY_URL);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] text-[#151515] flex items-center justify-center px-[var(--gutter-site)]">
      <div className="text-center">
        <p className="font-mono text-xs tracking-widest text-[#575757] uppercase mb-4">
          WHATSAPP COMMUNITY
        </p>
        <a
          href={WHATSAPP_COMMUNITY_URL}
          className="font-display text-2xl font-bold uppercase tracking-tight text-[#1C4463] hover:underline"
        >
          Continue to WhatsApp ↗
        </a>
      </div>
    </div>
  );
};
