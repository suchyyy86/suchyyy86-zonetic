import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface TechStackProps {
  lang: Language;
}

interface TechBadgeProps {
  text: string;
  highlight?: boolean;
}

const TechBadge: React.FC<TechBadgeProps> = ({ text, highlight = false }) => (
  <div 
    className={`
      relative group/badge flex items-center justify-center px-6 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-default
      ${highlight 
          ? 'bg-teal-500/10 border-teal-500/50 text-teal-100 shadow-[0_0_15px_rgba(20,184,166,0.2)] scale-110 z-10' 
          : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:border-teal-500/30 hover:bg-slate-800/60 hover:text-teal-300'}
    `}
  >
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/20 to-indigo-500/20 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500" />
    <span className={`text-lg font-mono tracking-wide font-semibold whitespace-nowrap relative z-10 ${highlight ? 'text-teal-300' : ''}`}>
      {text}
    </span>
  </div>
);

const TechStack: React.FC<TechStackProps> = ({ lang }) => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Duplicate items to ensure smooth infinite loop
  const techItems = [...CONTENT.techStack.technologies, ...CONTENT.techStack.technologies, ...CONTENT.techStack.technologies, ...CONTENT.techStack.technologies];

  return (
    <section 
        ref={sectionRef} 
        className="relative py-24 bg-slate-950 overflow-hidden min-h-[600px] flex flex-col justify-center perspective-[1000px]"
    >
        {/* Hypnotic Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* Content Wrapper */}
        <div className="relative z-10 space-y-12">
            
            {/* Header */}
            <div 
                className={`text-center transition-all duration-1000 ease-out-expo ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
                }`}
            >
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                    {CONTENT.techStack.headline[lang]}
                </h2>
                <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto opacity-50" />
            </div>

            {/* --- 3D Data Highway --- */}
            <div className={`relative flex flex-col gap-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                
                {/* Lane 1: Top (Slow, Distant, Blurred, Non-interactive Background) */}
                <div className="relative transform-style-3d rotate-x-6 scale-90 opacity-30 blur-[2px] z-0 pointer-events-none select-none">
                    <div className="flex gap-6 animate-marquee-slow w-max">
                        {techItems.map((tech, i) => (
                            <TechBadge key={`l1-${i}`} text={tech} />
                        ))}
                    </div>
                </div>

                {/* Lane 2: Center (Fast, Close, Highlighted, Fully Interactive) */}
                <div className="relative transform-style-3d scale-110 z-20 py-4 my-2">
                    {/* Glowing rail lines */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
                    
                    <div className="flex gap-8 animate-marquee-fast hover:[animation-play-state:paused] w-max">
                        {techItems.map((tech, i) => (
                            <TechBadge key={`l2-${i}`} text={tech} highlight />
                        ))}
                    </div>
                </div>

                {/* Lane 3: Bottom (Medium, Distant, Reverse, Non-interactive Background) */}
                <div className="relative transform-style-3d -rotate-x-6 scale-90 opacity-30 blur-[2px] z-0 pointer-events-none select-none">
                    <div className="flex gap-6 animate-marquee-reverse w-max">
                        {techItems.map((tech, i) => (
                            <TechBadge key={`l3-${i}`} text={tech} />
                        ))}
                    </div>
                </div>

                {/* Side Fade Masks to create "Infinite Tunnel" look */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-30 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-30 pointer-events-none" />

            </div>
        </div>

      <style>{`
        .transform-style-3d {
            transform-style: preserve-3d;
        }
        .animate-marquee-slow {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee-fast {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default TechStack;