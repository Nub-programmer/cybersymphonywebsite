import React, { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import brochurePdf from '../assets/Tcsbrochure.pdf?url';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface BrochurePageProps {
  onNavigate: (path: string) => void;
}

export const BrochurePage: React.FC<BrochurePageProps> = ({ onNavigate }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfWidth, setPdfWidth] = useState<number>(850);

  useEffect(() => {
    const updateWidth = () => {
      setPdfWidth(Math.min(window.innerWidth - 64, 900));
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#151515] pt-28 sm:pt-32 pb-24 px-[var(--gutter-site)]">
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Header */}
        <div className="border-b border-[#151515]/10 pb-8 sm:pb-12 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#575757] uppercase block mb-3">
              THE CYBER SYMPHONY 2026
            </span>
            <h1
              className="font-display font-extrabold uppercase tracking-tight text-[#151515] leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
            >
              OFFICIAL BROCHURE
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-sm tracking-widest uppercase text-[#1C4463]">
              17 OCTOBER 2026 · JAGRAN PUBLIC SCHOOL, NOIDA
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={brochurePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest font-semibold bg-[#151515] text-[#FAF9F5] px-5 py-3 hover:bg-[#1C4463] transition-colors cursor-pointer inline-flex items-center gap-1.5 rounded-[2px]"
            >
              <span>OPEN PDF DIRECTLY</span>
              <span>↗</span>
            </a>
            <a
              href={brochurePdf}
              download="The-Cyber-Symphony-2026-Brochure.pdf"
              className="font-mono text-xs uppercase tracking-widest font-semibold border border-[#151515] px-5 py-3 hover:bg-black/5 transition-colors cursor-pointer inline-flex items-center gap-1.5 rounded-[2px]"
            >
              <span>DOWNLOAD PDF</span>
              <span>↓</span>
            </a>
            <a
              href="/register"
              className="font-mono text-xs uppercase tracking-widest font-semibold border border-[#325E7D] text-[#325E7D] px-5 py-3 hover:bg-[#325E7D] hover:text-white transition-colors cursor-pointer rounded-[2px]"
            >
              REGISTER SCHOOL ↗
            </a>
          </div>
        </div>

        {/* Real Rendered PDF Document Container using react-pdf */}
        <div className="w-full bg-[#DEDDD9] border border-black/15 rounded-[2px] shadow-sm overflow-hidden flex flex-col">
          {/* Top Document Bar */}
          <div className="min-h-[48px] px-4 py-2.5 bg-[#F6F4EE] border-b border-black/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#151515] font-semibold uppercase tracking-wider">
                OFFICIAL FIELD MANUAL &amp; BROCHURE ({numPages > 0 ? `${numPages} PAGES` : 'PDF'})
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#575757]">
              <span>JAGRAN PUBLIC SCHOOL, NOIDA</span>
              <span>·</span>
              <span>17.10.2026</span>
            </div>
          </div>

          {/* Actual Rendered PDF Pages */}
          <div className="p-6 sm:p-12 flex flex-col items-center">
            <Document
              file={brochurePdf}
              onLoadSuccess={({ numPages: total }) => setNumPages(total)}
              loading={
                <div className="font-mono text-xs tracking-widest text-[#575757] uppercase py-24 text-center">
                  LOADING OFFICIAL BROCHURE…
                </div>
              }
              error={
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center font-mono text-xs">
                  <p className="text-red-700 font-semibold">Unable to render the brochure inside the browser canvas.</p>
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
              className="flex flex-col items-center gap-8 w-full"
            >
              {Array.from({ length: numPages }, (_, index) => (
                <div
                  className="brochurePage relative bg-white shadow-xl max-w-full"
                  key={`page-${index + 1}`}
                >
                  <span className="brochurePageNumber hidden sm:block">
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
          </div>

          {/* Bottom Bar with direct links */}
          <div className="p-3.5 bg-[#F6F4EE] border-t border-black/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-[#575757]">
              Official Cyber Symphony 2026 Document Publication
            </span>
            <div className="flex items-center gap-4">
              <a
                href={brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C4463] font-semibold uppercase tracking-wider hover:underline"
              >
                OPEN PDF DIRECTLY ↗
              </a>
              <a
                href={brochurePdf}
                download="The-Cyber-Symphony-2026-Brochure.pdf"
                className="text-[#151515] font-semibold uppercase tracking-wider hover:underline"
              >
                DOWNLOAD PDF ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
