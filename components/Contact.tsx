import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';
import { Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const inputClasses = (fieldName: string) => `
    w-full bg-slate-900/60 border rounded-lg px-4 py-4 text-white placeholder-slate-500
    transition-all duration-300 ease-out outline-none
    ${focusedField === fieldName 
      ? 'border-teal-500 ring-1 ring-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
      : 'border-slate-800 hover:border-slate-600'}
  `;

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Info Side */}
          <div 
            className={`lg:col-span-5 flex flex-col justify-center transition-all duration-1000 ease-out-expo ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              {lang === 'CZ' ? (
                <>
                  Začněme tvořit <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Vaši budoucnost</span>
                </>
              ) : (
                <>
                  Let's Build <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">Your Future</span>
                </>
              )}
            </h2>
            
            <p className="text-xl text-slate-400 mb-12 leading-relaxed border-l-2 border-teal-500/30 pl-6">
              {CONTENT.contact.subheadline[lang]}
            </p>

            <div className="space-y-4">
              <a href={`mailto:${CONTENT.contact.info.email}`} className="group flex items-center gap-5 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 hover:bg-slate-900 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</div>
                  <div className="text-lg text-white font-medium group-hover:text-teal-300 transition-colors">{CONTENT.contact.info.email}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 ml-auto group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
              </a>

              <a href={`tel:${CONTENT.contact.info.phone.replace(/ /g, '')}`} className="group flex items-center gap-5 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/40 hover:bg-slate-900 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Phone</div>
                  <div className="text-lg text-white font-medium group-hover:text-teal-300 transition-colors">{CONTENT.contact.info.phone}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 ml-auto group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-2 text-slate-500 text-sm">
              <CheckCircle2 className="w-4 h-4 text-teal-500" />
              <span>{lang === 'CZ' ? 'Odpovídáme do 24 hodin' : 'We reply within 24 hours'}</span>
            </div>
          </div>

          {/* Form Side */}
          <div 
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ease-out-expo ${
               isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <div className="relative">
              {/* Glow behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-2xl shadow-2xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{CONTENT.contact.form.name[lang]}</label>
                      <input 
                        type="text" 
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{CONTENT.contact.form.company[lang]}</label>
                      <input 
                        type="text" 
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('company')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{CONTENT.contact.form.email[lang]}</label>
                      <input 
                        type="email" 
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{CONTENT.contact.form.phone[lang]}</label>
                      <input 
                        type="tel" 
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('phone')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{CONTENT.contact.form.service[lang]}</label>
                    <div className="relative">
                      <select 
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClasses('service')} appearance-none cursor-pointer`}
                      >
                        {CONTENT.contact.form.serviceOptions.map((opt, i) => (
                          <option key={i} value={opt[lang]} className="bg-slate-900 text-slate-200">{opt[lang]}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-teal-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{CONTENT.contact.form.message[lang]}</label>
                    <textarea 
                      rows={4} 
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClasses('message')} resize-none`}
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <Button fullWidth type="submit" className="h-14 text-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 shadow-[0_0_25px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transform hover:-translate-y-1 transition-all duration-300">
                      {CONTENT.contact.form.submit[lang]}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;