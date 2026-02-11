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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'glass-panel py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer z-50 relative" onClick={() => onNavigate('#root')}>
              <img
                src="./images/zonetic_logo.png"
                alt="Zonetic Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {CONTENT.header.menu.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors uppercase tracking-wider relative group"
                >
                  {item.label[lang]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
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
              className="md:hidden z-50 relative text-slate-200 hover:text-teal-400 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                  className="absolute w-full h-0.5 bg-current transform transition-transform origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute w-full h-0.5 bg-current"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                  className="absolute w-full h-0.5 bg-current transform transition-transform origin-center"
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
              className="fixed inset-0 bg-slate-950 z-[99] flex flex-col pt-24 px-6 md:hidden"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <div className="flex flex-col h-full justify-between pb-10">
                <nav className="flex flex-col gap-6">
                  {CONTENT.header.menu.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      variants={itemVariants}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-3xl font-bold text-white hover:text-teal-400 flex items-center justify-between group py-2 border-b border-slate-800/50"
                    >
                      {item.label[lang]}
                      <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-400" />
                    </motion.a>
                  ))}
                </nav>

                <motion.div variants={itemVariants} className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center justify-between py-4 border-t border-slate-800">
                    <span className="text-slate-400 text-sm uppercase tracking-wider">Language</span>
                    <button
                      onClick={toggleLang}
                      className="flex items-center gap-2 text-white font-medium hover:text-teal-400 transition-colors bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800"
                    >
                      <Globe size={18} />
                      <span>{lang === 'CZ' ? 'Čeština' : 'English'}</span>
                    </button>
                  </div>

                  <Button fullWidth onClick={() => {
                    onNavigate('#contact');
                    setIsMobileMenuOpen(false);
                  }} className="h-14 text-lg">
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