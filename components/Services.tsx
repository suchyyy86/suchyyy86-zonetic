import React, { useState, useEffect, useRef } from 'react';
import { Language, ServiceData } from '../types';
import { CONTENT } from '../constants';
import { Code, Share2, Server, PenTool, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  lang: Language;
}

const iconMap: Record<string, React.ReactNode> = {
  'code': <Code className="w-6 h-6" />,
  'share': <Share2 className="w-6 h-6" />,
  'server': <Server className="w-6 h-6" />,
  'design': <PenTool className="w-6 h-6" />
};

interface ServiceCardProps {
  service: ServiceData;
  index: number;
  isVisible: boolean;
  lang: Language;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isVisible, lang }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative h-full rounded-2xl bg-slate-900/40 border border-slate-800/60 overflow-hidden
        transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/20
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        backdropFilter: 'blur(4px)'
      }}
    >
      {/* 1. Spotlight Effect (Mouse Follower) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.08), transparent 40%)`
        }}
      />

      {/* 2. Border Spotlight */}
      <div
         className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
         style={{
           background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.4), transparent 40%)`,
           maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
           maskComposite: 'exclude',
           WebkitMaskComposite: 'xor',
           padding: '1px'
         }}
      />

      {/* 3. Subtle Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative p-8 h-full flex flex-col z-10">
        {/* Icon Header */}
        <div className="flex justify-between items-start mb-6">
            <div className="
                p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 
                group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:text-slate-950 group-hover:scale-110 group-hover:rotate-3
                transition-all duration-300 shadow-lg
            ">
                {iconMap[service.iconName]}
            </div>
            
            {/* Arrow Icon that appears */}
            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-400">
                <ArrowUpRight className="w-5 h-5" />
            </div>
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-200 transition-colors">
            {service.title[lang]}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors flex-grow">
            {service.description[lang]}
        </p>

        {/* Bottom Line Indicator */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal-500 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ lang }) => {
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
    <section ref={sectionRef} id="services" className="py-32 bg-slate-950 relative overflow-hidden">
      
      {/* --- Background Decorations --- */}
      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      
      {/* 2. Central Glow Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div 
          className={`text-center mb-20 max-w-3xl mx-auto transition-all duration-1000 ease-out-expo ${
             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
             <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
             {CONTENT.services.tag[lang]}
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            {CONTENT.services.headline[lang]}
          </h2>
          
          <p className="text-lg text-slate-400 leading-relaxed">
             {CONTENT.services.subheadline[lang]}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.services.items.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service} 
              index={index} 
              isVisible={isVisible} 
              lang={lang} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;