import React, { useEffect } from 'react';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfcYhw3x6rOoA9qADShNm5Gx2H3VRuA6OcrvcpdV0zzIXfOQQ/viewform';

export const RegisterPage: React.FC<{ onNavigate?: (path: string) => void }> = () => {
  useEffect(() => {
    window.location.replace(FORM_URL);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#FAF9F5',
        color: '#151515',
        fontFamily: 'monospace',
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p
          style={{
            fontSize: '14px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Redirecting to registration…
        </p>
        <a
          href={FORM_URL}
          style={{
            fontSize: '12px',
            textDecoration: 'underline',
            color: '#325E7D',
            letterSpacing: '0.05em',
          }}
        >
          Click here if you are not redirected automatically ↗
        </a>
      </div>
    </main>
  );
};

export default RegisterPage;
