import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (href: string) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'CZ' ? 'EN' : 'CZ');
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('#root')}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-500">
              <path d="M10 10H30L10 30H30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="28" cy="12" r="3" fill="currentColor" />
              <circle cx="12" cy="28" r="3" fill="currentColor" />
            </svg>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold tracking-tighter text-white leading-none">Zonetic</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {CONTENT.header.menu.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors uppercase tracking-wider"
              >
                {item.label[lang]}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm font-medium"
            >
              <Globe size={16} />
              <span>{lang}</span>
            </button>
            <Button onClick={() => onNavigate('#contact')}>
              {CONTENT.header.cta[lang]}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-200 hover:text-teal-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-panel border-t border-slate-800 p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 shadow-2xl">
          {CONTENT.header.menu.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-lg font-medium text-slate-300 hover:text-teal-400 py-2 border-b border-slate-800/50"
            >
              {item.label[lang]}
            </a>
          ))}
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-400 text-sm">Language / Jazyk</span>
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-teal-400 font-bold"
            >
              <Globe size={18} />
              <span>{lang}</span>
            </button>
          </div>
          <Button fullWidth onClick={() => {
            onNavigate('#contact');
            setIsMobileMenuOpen(false);
          }}>
            {CONTENT.header.cta[lang]}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;