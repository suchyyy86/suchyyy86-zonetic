import React, { useState, useEffect, useRef } from 'react';
import { Language, ServiceData } from '../types';
import { CONTENT } from '../constants';
import { Code, Share2, Server, PenTool, Sparkles, HelpCircle, MousePointerClick } from 'lucide-react';

interface ServicesProps {
  lang: Language;
}

const iconMap: Record<string, React.ReactNode> = {
  'code': <Code className="w-8 h-8" />,
  'share': <Share2 className="w-8 h-8" />,
  'server': <Server className="w-8 h-8" />,
  'design': <PenTool className="w-8 h-8" />
};

interface ServiceCardProps {
  service: ServiceData;
  index: number;
  isVisible: boolean;
  lang: Language;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, isVisible, lang, isActive, onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const renderDescription = (text: string) => {
    return text.split('*').map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="text-teal-400 font-semibold">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-active={isActive}
      className={`
        group relative h-[420px] rounded-3xl bg-slate-900/40 border border-white/5 overflow-hidden
        transition-all duration-700 ease-out-quint cursor-pointer
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/20 hover:border-teal-500/30
        data-[active=true]:scale-[1.02] data-[active=true]:shadow-2xl data-[active=true]:shadow-teal-900/20 data-[active=true]:border-teal-500/30
      `}
      style={{
        transitionDelay: `${index * 150 + 200}ms`, // Slower start (200ms) + bigger gap between cards
        transitionDuration: '1500ms', // Super smooth slow motion
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', // Smooth quintic ease-out
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0) scale(1) rotate(0deg)'
          : 'translateY(60px) scale(0.9) rotate(2deg)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* --- Idle State: Subtle Breathing Background --- */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-0 group-data-[active=true]:opacity-0 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 via-transparent to-purple-500/5 animate-pulse-slow" />
      </div>

      {/* --- Hover State: Dynamic Spotlight --- */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 group-data-[active=true]:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(20, 184, 166, 0.15), transparent 40%)`
        }}
      />

      <div className="relative h-full p-8 flex flex-col z-10">
        {/* Header: Icon & Title */}
        <div className="relative z-20">

          {/* Badge Container - Fixed to Top Right */}
          <div className="absolute top-0 right-0 z-30 pointer-events-none">

            <div className={`
                flex items-center justify-center
                w-10 h-10 rounded-full border border-white/10 bg-slate-800/50 backdrop-blur-md
                transition-all duration-500 ease-out-quint
                group-hover:bg-teal-500/10 group-hover:border-teal-500/20 group-hover:text-teal-300
                group-data-[active=true]:bg-teal-500/10 group-data-[active=true]:border-teal-500/20 group-data-[active=true]:text-teal-300
            `}>
              {/* Icon Wrapper (Morphs) */}
              <div className="relative w-full h-full flex items-center justify-center">
                <HelpCircle className={`
                    w-5 h-5 text-slate-400 absolute transition-all duration-500
                    scale-100 rotate-0 opacity-100
                    group-hover:scale-50 group-hover:-rotate-180 group-hover:opacity-0
                    group-data-[active=true]:scale-50 group-data-[active=true]:-rotate-180 group-data-[active=true]:opacity-0
                 `} />
                <Sparkles className={`
                    w-5 h-5 absolute transition-all duration-500
                    scale-50 rotate-180 opacity-0
                    group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100
                    group-data-[active=true]:scale-100 group-data-[active=true]:rotate-0 group-data-[active=true]:opacity-100
                 `} />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className={`
              p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-400
              transition-all duration-500 ease-out-quint
              group-hover:bg-teal-500 group-hover:border-teal-400 group-hover:text-slate-950 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-teal-500/20
              group-data-[active=true]:bg-teal-500 group-data-[active=true]:border-teal-400 group-data-[active=true]:text-slate-950 group-data-[active=true]:scale-110 group-data-[active=true]:rotate-3 group-data-[active=true]:shadow-lg group-data-[active=true]:shadow-teal-500/20
            `}>
              {iconMap[service.iconName]}
            </div>
          </div>

          {/* Title - Hides on Hover */}
          <div className="h-16 flex items-end"> {/* Fixed height container to prevent layout jump if necessary, but absolute works too */}
            <h3 className={`
                text-2xl font-bold text-white mb-2 transition-all duration-300
                group-hover:opacity-0 group-hover:-translate-y-4 group-hover:pointer-events-none
                group-data-[active=true]:opacity-0 group-data-[active=true]:-translate-y-4 group-data-[active=true]:pointer-events-none
              `}>
              {service.title[lang]}
            </h3>
          </div>
        </div>

        {/* Content Area: Description vs Benefits */}
        <div className="relative flex-grow mt-2">

          {/* Default State: Description */}
          <p className={`
            text-slate-400 text-lg leading-loose
            absolute inset-0
            transition-all duration-500 ease-out-quint
            delay-300 group-hover:delay-0 group-data-[active=true]:delay-0
            group-hover:opacity-0 group-hover:-translate-y-4
            group-data-[active=true]:opacity-0 group-data-[active=true]:-translate-y-4
          `}>
            {renderDescription(service.description[lang])}
          </p>

          {/* Hover State: Benefits List */}
          <div className={`
            absolute inset-0 flex flex-col justify-center
            transition-all duration-500 ease-out-quint 
            delay-0 group-hover:delay-300 group-data-[active=true]:delay-300
            opacity-0 translate-y-8 
            group-hover:opacity-100 group-hover:translate-y-0
            group-data-[active=true]:opacity-100 group-data-[active=true]:translate-y-0
          `}>

            {/* New Heading */}
            <h4 className="text-teal-400 text-base font-bold uppercase tracking-wide mb-6">
              {lang === 'CZ' ? 'Přínos pro váš byznys' : 'Impact on your business'}
            </h4>

            {/* Benefits List */}
            <ul className="space-y-5">
              {service.benefits[lang].map((benefit, i) => (
                <li key={i} className="group/benefit flex items-start text-teal-100 text-base font-medium leading-normal">
                  <span className="mr-3 inline-block transform-gpu origin-center group-hover/benefit:scale-125 transition-transform duration-300 cursor-default text-lg select-none">
                    {/* The benefit string already contains the emoji */}
                    {benefit.split(' ')[0]}
                  </span>
                  <span className="opacity-90 pt-0.5">
                    {benefit.substring(benefit.indexOf(' ') + 1)}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>

        <div
          className={`
            absolute bottom-6 left-1/2 -translate-x-1/2
            transition-all duration-500
            ${isActive || isHovered ? 'scale-50' : 'scale-100'}
          `}
          style={{ opacity: isActive || isHovered ? 0 : 1 }}
        >
          <div className="animate-bounce-slow text-slate-600">
            <MousePointerClick className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
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

  const handleCardClick = (index: number) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="services" className="py-32 bg-slate-950 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-teal-900/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`
          text-center mb-24 max-w-3xl mx-auto
          transition-all duration-1000 ease-out-expo
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            {CONTENT.services.headline[lang]}
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {CONTENT.services.subheadline[lang]}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {CONTENT.services.items.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isVisible={isVisible}
              lang={lang}
              isActive={activeCardIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;