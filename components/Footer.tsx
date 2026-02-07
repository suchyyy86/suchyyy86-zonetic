import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
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
    <footer ref={sectionRef} className="bg-slate-950 border-t border-slate-900 py-12 overflow-hidden">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 transition-all duration-1000 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        <div className="flex items-center gap-2">
          <img
            src="./images/zonetic_logo.png"
            alt="Zonetic Logo"
            className="h-6 w-auto opacity-60"
          />
        </div>

        <div className="text-slate-500 text-sm">
          {CONTENT.footer.copyright[lang]}
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-slate-500 hover:text-teal-400 transition-colors"><Instagram size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;