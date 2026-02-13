import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

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
      const scrolled = window.scrollY > 20;
      setIsScrolled(prev => {
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleLang = () => {
    setLang(lang === 'CZ' ? 'EN' : 'CZ');
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer z-50 relative" onClick={() => onNavigate('#root')}>
              <img
                src="./images/zonetic_logo.png"
                alt="Zonetic Logo"
                className="h-10 w-auto" // Slightly larger logo for impact
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {CONTENT.header.menu.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-bold text-slate-300 hover:text-white transition-all duration-300 uppercase tracking-widest relative group"
                >
                  <span className="relative z-10">{item.label[lang]}</span>
                  {/* Hover Glow Effect */}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="absolute -inset-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 blur-sm"></span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
              >
                <Globe size={14} className="text-teal-500" />
                <span>{lang}</span>
              </button>
              <Button onClick={() => onNavigate('#contact')} className="shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.5)]">
                {CONTENT.header.cta[lang]}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden z-50 relative text-slate-200 hover:text-teal-400 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: -6 }}
                  className="absolute w-full h-0.5 bg-current transform transition-transform origin-center rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute w-full h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 6 }}
                  className="absolute w-full h-0.5 bg-current transform transition-transform origin-center rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Move to Portal to avoid z-index/transform issues */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[99] flex flex-col pt-28 px-8 md:hidden shadow-2xl"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <div className="flex flex-col h-full justify-between pb-12">
                <nav className="flex flex-col gap-6">
                  {CONTENT.header.menu.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      variants={itemVariants}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-4xl font-black text-white hover:text-teal-400 flex items-center justify-between group py-3 border-b border-white/5 tracking-tight"
                    >
                      {item.label[lang]}
                      <ArrowRight className="w-8 h-8 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-400" />
                    </motion.a>
                  ))}
                </nav>

                <motion.div variants={itemVariants} className="flex flex-col gap-8 mt-auto">
                  <div className="flex items-center justify-between py-6 border-t border-white/10">
                    <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Language</span>
                    <button
                      onClick={toggleLang}
                      className="flex items-center gap-3 text-white font-bold hover:text-teal-400 transition-colors bg-white/5 px-5 py-2.5 rounded-full border border-white/10"
                    >
                      <Globe size={18} className="text-teal-500" />
                      <span>{lang === 'CZ' ? 'Čeština' : 'English'}</span>
                    </button>
                  </div>

                  <Button fullWidth onClick={() => {
                    onNavigate('#contact');
                    setIsMobileMenuOpen(false);
                  }} className="h-16 text-xl font-bold shadow-lg shadow-teal-900/40">
                    {CONTENT.header.cta[lang]}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Header;