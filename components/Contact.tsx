import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';
import { Mail, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  lang: Language;
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  message: boolean;
}

const ERROR_MESSAGES = {
  name: { CZ: 'Jméno je povinné', EN: 'Name is required' },
  emailRequired: { CZ: 'E-mail je povinný', EN: 'Email is required' },
  emailInvalid: { CZ: 'Neplatný formát e-mailu', EN: 'Invalid email format' },
  message: { CZ: 'Zpráva je povinná', EN: 'Message is required' },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: CONTENT.contact.form.serviceOptions[0][lang],
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    message: false,
  });

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

  // Validation function
  const validateField = (field: keyof FormErrors, value: string): string | undefined => {
    switch (field) {
      case 'name':
        return value.trim() === '' ? ERROR_MESSAGES.name[lang] : undefined;
      case 'email':
        if (value.trim() === '') return ERROR_MESSAGES.emailRequired[lang];
        if (!emailRegex.test(value)) return ERROR_MESSAGES.emailInvalid[lang];
        return undefined;
      case 'message':
        return value.trim() === '' ? ERROR_MESSAGES.message[lang] : undefined;
      default:
        return undefined;
    }
  };

  // Validate all required fields
  const validateForm = (): boolean => {
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);
    return !nameError && !emailError && !messageError;
  };

  const isFormValid = validateForm();

  // Handle input change
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Re-validate if field was touched
    if (field in touched && touched[field as keyof TouchedFields]) {
      const error = validateField(field as keyof FormErrors, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle field blur
  const handleBlur = (field: keyof FormData) => {
    setFocusedField(null);

    if (field === 'name' || field === 'email' || field === 'message') {
      setTouched(prev => ({ ...prev, [field]: true }));
      const error = validateField(field, formData[field]);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all required fields
    setTouched({ name: true, email: true, message: true });

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    setErrors(newErrors);

    if (isFormValid) {
      // Form is valid - you could handle submission here
      console.log('Form submitted:', formData);
    }
  };

  const inputClasses = (fieldName: string, hasError?: boolean) => `
    w-full bg-slate-900/60 border rounded-lg px-4 py-4 text-white placeholder-slate-500
    transition-all duration-300 ease-out outline-none
    ${hasError
      ? 'border-red-500 ring-1 ring-red-500/50'
      : focusedField === fieldName
        ? 'border-teal-500 ring-1 ring-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.15)]'
        : 'border-slate-800 hover:border-slate-600'}
  `;

  const RequiredLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
      {children} <span className="text-red-400">*</span>
    </label>
  );

  const OptionalLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
      {children}
    </label>
  );

  const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => (
    message ? (
      <p className="text-red-400 text-xs mt-1.5 ml-1 flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {message}
      </p>
    ) : null
  );

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-slate-950 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Info Side */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center transition-all duration-1000 ease-out-expo ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
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
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
          >
            <div className="relative">
              {/* Glow behind form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-2xl shadow-2xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <RequiredLabel>{CONTENT.contact.form.name[lang]}</RequiredLabel>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => handleBlur('name')}
                        className={inputClasses('name', touched.name && !!errors.name)}
                      />
                      <ErrorMessage message={touched.name ? errors.name : undefined} />
                    </div>
                    <div className="space-y-2">
                      <OptionalLabel>{CONTENT.contact.form.company[lang]}</OptionalLabel>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('company')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <RequiredLabel>{CONTENT.contact.form.email[lang]}</RequiredLabel>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => handleBlur('email')}
                        className={inputClasses('email', touched.email && !!errors.email)}
                      />
                      <ErrorMessage message={touched.email ? errors.email : undefined} />
                    </div>
                    <div className="space-y-2">
                      <OptionalLabel>{CONTENT.contact.form.phone[lang]}</OptionalLabel>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('phone')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <OptionalLabel>{CONTENT.contact.form.service[lang]}</OptionalLabel>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
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
                    <RequiredLabel>{CONTENT.contact.form.message[lang]}</RequiredLabel>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => handleBlur('message')}
                      className={`${inputClasses('message', touched.message && !!errors.message)} resize-none`}
                    ></textarea>
                    <ErrorMessage message={touched.message ? errors.message : undefined} />
                  </div>

                  <div className="pt-2">
                    <Button
                      fullWidth
                      type="submit"
                      disabled={!isFormValid}
                      className={`h-14 text-lg transition-all duration-300 ${isFormValid
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 shadow-[0_0_25px_rgba(20,184,166,0.3)] hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] transform hover:-translate-y-1'
                        : 'bg-slate-700 cursor-not-allowed opacity-60'
                        }`}
                    >
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