import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { ProgrammePage } from './pages/ProgrammePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ArchivePage } from './pages/ArchivePage';
import { BrochurePage } from './pages/BrochurePage';
import { TheSymphonisersPage } from './pages/TheSymphonisersPage';
import { PartnersPage } from './pages/PartnersPage';
import { SchedulePage } from './pages/SchedulePage';
import { RegisterPage } from './pages/RegisterPage';
import { initLenis, destroyLenis, scrollToTop, refreshScroll } from './utils/scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isPageTransitioning, setIsPageTransitioning] = useState<boolean>(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Safe ScrollTrigger refresh after fonts and window loads
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        refreshScroll();
      });
    }
    const handleLoad = () => {
      refreshScroll();
    };
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Sync with browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      scrollToTop();
      refreshScroll();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path === '/register') {
      window.location.href = '/register';
      return;
    }
    if (path === currentPath) return;

    setIsPageTransitioning(true);
    setTimeout(() => {
      setCurrentPath(path);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', path);
      }
      scrollToTop();
      setTimeout(() => {
        setIsPageTransitioning(false);
        refreshScroll();
      }, 100);
    }, 280);
  };

  const handleEnterCompleted = () => {
    setHasEntered(true);
    // Correct sequence: intro transition -> final layout -> requestAnimationFrame -> ScrollTrigger.refresh()
    requestAnimationFrame(() => {
      refreshScroll();
    });
  };

  // Check if current page requires dark atmosphere (Nocturne)
  const isDarkPage = currentPath === '/events/nocturne';

  const renderCurrentView = () => {
    if (currentPath === '/programme') {
      return (
        <ProgrammePage
          onSelectEvent={(slug) => navigateTo(`/events/${slug}`)}
          onRegisterClick={() => navigateTo('/register')}
        />
      );
    }
    if (currentPath.startsWith('/events/')) {
      const slug = currentPath.replace('/events/', '');
      return (
        <EventDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onSelectEvent={(newSlug) => navigateTo(`/events/${newSlug}`)}
        />
      );
    }
    if (currentPath === '/archive') {
      return <ArchivePage onNavigate={navigateTo} />;
    }
    if (currentPath === '/brochure') {
      return <BrochurePage onNavigate={navigateTo} />;
    }
    if (currentPath === '/the-symphonisers') {
      return <TheSymphonisersPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/partners') {
      return <PartnersPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/schedule') {
      return <SchedulePage onNavigate={navigateTo} />;
    }
    if (currentPath === '/register') {
      return <RegisterPage onNavigate={navigateTo} />;
    }
    return (
      <HomePage
        onNavigate={navigateTo}
        onSelectEvent={(slug) => navigateTo(`/events/${slug}`)}
        hasEntered={hasEntered}
      />
    );
  };

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-700 ${
        isDarkPage ? 'bg-[#19201B] text-[#FAF9F5]' : 'bg-[#FAF9F5] text-[#151515]'
      }`}
    >
      {/* LOADING SCREEN: Cinematic auto-preloading screen with upward wipe */}
      {!hasEntered && <LoadingScreen onLoaded={handleEnterCompleted} />}

      {/* FIXED NAVBAR */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        isDarkTheme={isDarkPage}
      />

      {/* 
        MAIN VIEWPORT WRAPPER:
        Strict rule: MUST NOT have transform, filter, or perspective on this ancestor 
        so that pinned ScrollTrigger elements retain exact position: fixed coordinates!
      */}
      <main
        className={`w-full transition-opacity duration-300 ease-out ${
          isPageTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderCurrentView()}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={navigateTo} isDarkTheme={isDarkPage} />
    </div>
  );
}
