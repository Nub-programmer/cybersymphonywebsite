import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import cyberSymphonyLogo from '../assets/images/thecybersymphonylogoweb.png';
import brochurePdf from '../assets/Tcsbrochure.pdf?url';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface BrochureViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureViewer: React.FC<BrochureViewerProps> = ({ isOpen, onClose }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfWidth, setPdfWidth] = useState<number>(850);

  useEffect(() => {
    const updateWidth = () => {
      setPdfWidth(Math.min(window.innerWidth - 32, 900));
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="brochureViewer">
      <header className="brochureViewerHeader">
        <div className="brochureViewerTitle flex items-center gap-3">
          <img src={cyberSymphonyLogo} alt="Cyber Symphony" className="w-7 h-7 object-contain" />
          <span className="font-mono text-xs sm:text-sm tracking-wider uppercase font-semibold text-[#151515]">
            THE CYBER SYMPHONY 2026 — OFFICIAL BROCHURE
          </span>
        </div>

        <div className="brochureViewerActions flex items-center gap-4 sm:gap-6 font-mono text-xs">
          <a
            href={brochurePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline text-[#1C4463] uppercase tracking-wider font-semibold cursor-pointer inline-flex items-center gap-1"
          >
            OPEN PDF ↗
          </a>

          <a
            href={brochurePdf}
            download="The-Cyber-Symphony-2026-Brochure.pdf"
            className="hover-underline text-[#151515] uppercase tracking-wider font-semibold cursor-pointer hidden sm:inline-flex items-center gap-1"
          >
            DOWNLOAD ↓
          </a>

          <button
            onClick={onClose}
            className="btn-tactile font-mono text-xs uppercase tracking-widest font-bold px-3 py-1.5 border border-black/25 hover:bg-[#151515] hover:text-[#FAF9F5] rounded-[2px] transition-colors cursor-pointer"
          >
            CLOSE ×
          </button>
        </div>
      </header>

      <main className="brochurePages">
        <Document
          file={brochurePdf}
          onLoadSuccess={({ numPages: total }) => setNumPages(total)}
          loading={
            <div className="brochureLoading font-mono text-xs tracking-widest text-[#575757] uppercase py-24 text-center">
              LOADING OFFICIAL BROCHURE…
            </div>
          }
          error={
            <div className="brochureError flex flex-col items-center justify-center py-20 gap-4 text-center font-mono text-xs">
              <p className="text-red-700 font-semibold">Unable to render the brochure.</p>
              <a
                href={brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#1C4463] uppercase tracking-wider font-bold"
              >
                OPEN PDF DIRECTLY ↗
              </a>
            </div>
          }
        >
          {Array.from({ length: numPages }, (_, index) => (
            <div className="brochurePage" key={`page-${index + 1}`}>
              <span className="brochurePageNumber">
                {String(index + 1).padStart(2, '0')}
              </span>

              <Page
                pageNumber={index + 1}
                width={pdfWidth}
                renderTextLayer={false}
                renderAnnotationLayer={true}
              />
            </div>
          ))}
        </Document>
      </main>
    </div>
  );
};
