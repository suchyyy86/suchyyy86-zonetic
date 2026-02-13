import React, { useState, Suspense, lazy } from 'react';
import { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';

// Lazy-load below-fold components for faster initial paint
const Services = lazy(() => import('./components/Services'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const WhyUs = lazy(() => import('./components/WhyUs'));
const Technologies = lazy(() => import('./components/Technologies'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  const [lang, setLang] = useState<Language>('CZ');

  const handleSectionNavigation = (href: string) => {
    // If it's the root/home link
    if (href === '#root') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // It's a section link (e.g. #services)
    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };



  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500/30 selection:text-teal-200">
      <Header
        lang={lang}
        setLang={setLang}
        onNavigate={handleSectionNavigation}
      />

      {/* Hero is fixed in the background (Z-Index 0) only on landing page */}
      <Hero lang={lang} />

      {/* 
        Main content wrapper. 
        - Z-Index 10 ensures it sits ON TOP of the fixed hero.
        - mt-[100vh] pushes it below the viewport initially so we see the full hero.
        - bg-slate-950 ensures it's opaque and covers the hero as it scrolls up.
      */}
      <div className="relative z-10 bg-slate-900 mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-slate-900/50">
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
          <Services lang={lang} />
          <FeaturedProjects lang={lang} />
          <WhyUs lang={lang} />
          <Technologies lang={lang} />
          <Contact lang={lang} />
          <Footer lang={lang} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;