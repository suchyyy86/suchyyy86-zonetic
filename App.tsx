import React, { useState } from 'react';
import { Language } from './types';
import { CONTENT } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Services from './components/Services';
import Benefits from './components/Benefits';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

type ViewState = 'landing' | 'project';

function App() {
  const [lang, setLang] = useState<Language>('CZ');
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const handleNavigateProject = (projectId: string) => {
    setActiveProjectId(projectId);
    setCurrentView('project');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentView('landing');
    setActiveProjectId(null);
  };

  const handleSectionNavigation = (href: string) => {
    // If it's the root/home link
    if (href === '#root') {
      if (currentView !== 'landing') {
        setCurrentView('landing');
        setActiveProjectId(null);
        window.scrollTo(0, 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // It's a section link (e.g. #services)
    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      
      if (currentView !== 'landing') {
        // If we are on detail page, go to landing first
        setCurrentView('landing');
        setActiveProjectId(null);
        
        // Wait for render cycle to ensure DOM elements exist
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // We are already on landing page
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const activeProject = activeProjectId 
    ? CONTENT.showcase.projects.find(p => p.id === activeProjectId) || CONTENT.showcase.projects[0]
    : CONTENT.showcase.projects[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500/30 selection:text-teal-200">
      <Header 
        lang={lang} 
        setLang={setLang} 
        onNavigate={handleSectionNavigation}
      />
      
      {currentView === 'landing' ? (
        <>
          {/* Hero is fixed in the background (Z-Index 0) only on landing page */}
          <Hero lang={lang} />
          
          {/* 
            Main content wrapper. 
            - Z-Index 10 ensures it sits ON TOP of the fixed hero.
            - mt-[100vh] pushes it below the viewport initially so we see the full hero.
            - bg-slate-950 ensures it's opaque and covers the hero as it scrolls up.
          */}
          <div className="relative z-10 bg-slate-900 mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-slate-900/50">
            <Showcase lang={lang} onNavigate={handleNavigateProject} />
            <Services lang={lang} />
            <Benefits lang={lang} />
            <TechStack lang={lang} />
            <Contact lang={lang} />
            <Footer lang={lang} />
          </div>
        </>
      ) : (
        // Detailed Project View
        <div className="relative z-10 bg-slate-950">
          <ProjectDetail 
            project={activeProject} 
            lang={lang} 
            onBack={handleBack} 
          />
          <Footer lang={lang} />
        </div>
      )}
    </div>
  );
}

export default App;