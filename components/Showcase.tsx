import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import { Monitor, Layout, Utensils, ArrowRight } from 'lucide-react';

interface ShowcaseProps {
  lang: Language;
  onNavigate: (projectId: string) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ lang, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const icons = [<Utensils key="1" size={40} />, <Layout key="2" size={40} />, <Monitor key="3" size={40} />];

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
    <section ref={sectionRef} id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`mb-16 text-center transition-all duration-1000 ease-out-expo ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{CONTENT.showcase.headline[lang]}</h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-400">{CONTENT.showcase.subheadline[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTENT.showcase.projects.map((project, index) => (
            <div 
              key={index}
              onClick={() => onNavigate(project.id)}
              className={`block group relative p-1 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-teal-500 hover:to-teal-700 transition-all duration-1000 ease-out-expo cursor-pointer`}
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)'
              }}
            >
              <div className="bg-slate-900 h-full rounded-xl p-8 flex flex-col transition-all duration-300 group-hover:bg-slate-850 relative overflow-hidden">
                
                {/* Arrow Icon Indication */}
                <div className="absolute top-8 right-8 text-white opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight size={24} />
                </div>

                <div className="w-16 h-16 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform duration-300 border border-teal-500/20">
                  {icons[index]}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-200 transition-colors">{project.title[lang]}</h3>
                <p className="text-slate-400 mb-6 flex-grow leading-relaxed group-hover:text-slate-300 transition-colors">
                  {project.description[lang]}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-slate-600 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;