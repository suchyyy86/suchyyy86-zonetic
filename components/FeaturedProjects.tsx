import React, { useState, useEffect, useRef } from 'react';
import { Language, ProjectData } from '../types';
import { CONTENT } from '../constants';
import { ShoppingBag, Calendar, Wand2, LayoutDashboard, Play } from 'lucide-react';

interface ShowcaseProps {
  lang: Language;
}

const icons = [
  <ShoppingBag key="1" className="w-8 h-8" />,
  <Calendar key="2" className="w-8 h-8" />,
  <Wand2 key="3" className="w-8 h-8" />,
  <LayoutDashboard key="4" className="w-8 h-8" />
];

const ProjectCard: React.FC<{ project: ProjectData; index: number; isVisible: boolean; lang: Language }> = ({ project, index, isVisible, lang }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`group relative h-full rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden transition-all duration-500 ease-out-quint hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-900/30 hover:-translate-y-2 cursor-pointer`}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Background Glow (Static) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Hover Gradient Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.15), transparent 40%)`
        }}
      />

      {/* Content */}
      <div className="relative p-8 sm:p-10 flex flex-col h-full z-10 text-left">

        <div className="flex justify-between items-start mb-8">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:rotate-3 group-hover:border-teal-500/30 group-hover:shadow-[0_0_30px_-10px_rgba(20,184,166,0.5)] transition-all duration-500 ease-out-quint">
            {icons[index] || icons[0]}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-200 transition-colors duration-300">{project.title[lang]}</h3>
          <p className="text-lg text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            {project.description[lang]}
          </p>
        </div>

        {/* Bottom Section: Tags & Call to Action */}
        <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300 flex items-center justify-between">

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800/50 text-slate-400 border border-slate-700/50 group-hover:border-teal-500/30 group-hover:text-teal-300 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Launch Demo CTA - Appears on Hover */}
          <div className="flex items-center gap-2 text-sm font-bold text-teal-400 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
            <span>{lang === 'CZ' ? 'Spustit Demo' : 'Launch Demo'}</span>
            <Play className="w-3 h-3 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects: React.FC<ShowcaseProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 bg-slate-950 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`mb-20 text-center transition-all duration-1000 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {/* Premium Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_-3px_rgba(20,184,166,0.3)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Live Demo
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            {CONTENT.showcase.headline[lang]}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">{CONTENT.showcase.subheadline[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTENT.showcase.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isVisible={isVisible} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;