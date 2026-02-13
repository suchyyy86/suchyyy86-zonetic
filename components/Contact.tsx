import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';
import Button from './Button';
import { Mail, Phone, ArrowRight, Clock } from 'lucide-react';

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
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  company: boolean;
  email: boolean;
  phone: boolean;
  service: boolean;
  message: boolean;
}

const ERROR_MESSAGES = {
  name: { CZ: 'Jméno je povinné', EN: 'Name is required' },
  emailRequired: { CZ: 'E-mail je povinný', EN: 'Email is required' },
  emailInvalid: { CZ: 'Neplatný formát e-mailu', EN: 'Invalid email format' },
  service: { CZ: 'Vyberte službu', EN: 'Please select a service' },
  message: { CZ: 'Zpráva je povinná', EN: 'Message is required' },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    company: false,
    email: false,
    phone: false,
    service: false,
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
      case 'service':
        return value.trim() === '' ? ERROR_MESSAGES.service[lang] : undefined;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Re-validate if field was touched
    if (name in touched && touched[name as keyof TouchedFields]) {
      const error = validateField(name as keyof FormErrors, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setFocusedField(null);
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate on blur for required fields
    if (['name', 'email', 'message'].includes(name)) {
      const error = validateField(name as keyof FormErrors, formData[name as keyof FormData]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Touch all required fields
    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      service: true,
      message: true
    });

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every(err => err === undefined)) {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      // Reset form or show success message here
      alert(lang === 'CZ' ? 'Děkujeme za zprávu!' : 'Thank you for your message!');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: CONTENT.contact.form.serviceOptions[0][lang],
        message: '',
      });
      setTouched({
        name: false,
        company: false,
        email: false,
        phone: false,
        service: false,
        message: false,
      });
    }
    setIsSubmitting(false);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* Info Side */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center transition-all duration-1000 ease-out-expo ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              {lang === 'CZ' ? (
                <>
                  Máte vizi?<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                    My máme technologii.
                  </span>
                </>
              ) : (
                <>
                  Have a vision?<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                    We have the technology.
                  </span>
                </>
              )}
            </h2>

            <p className="relative text-xl text-slate-400 mb-12 leading-relaxed pl-6 py-2">
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-teal-500 to-transparent rounded-full" />
              {CONTENT.contact.subheadline[lang]}
            </p>

            <div className="space-y-6">
              <a href={`mailto:${CONTENT.contact.info.email}`} className="group flex items-center gap-5 p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Email</div>
                  <div className="text-lg text-white font-medium group-hover:text-teal-300 transition-colors">{CONTENT.contact.info.email}</div>
                </div>
              </a>

              <a href={`tel:${CONTENT.contact.info.phone.replace(/ /g, '')}`} className="group flex items-center gap-5 p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Phone</div>
                  <div className="text-lg text-white font-medium group-hover:text-teal-300 transition-colors">{CONTENT.contact.info.phone}</div>
                </div>
              </a>
            </div>

            <div className="mt-12 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-200 text-sm font-semibold shadow-lg shadow-teal-900/20 hover:bg-teal-500/20 transition-all">
              <Clock className="w-5 h-5 text-teal-400 animate-pulse" />
              <span>{lang === 'CZ' ? 'Odpovídáme do 24 hodin' : 'We reply within 24 hours'}</span>
            </div>
          </div>

          {/* Form Side */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ease-out-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="relative">
                  <RequiredLabel>{CONTENT.contact.form.name[lang]}</RequiredLabel>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={handleBlur}
                    className={inputClasses('name', touched.name && !!errors.name)}
                    placeholder={CONTENT.contact.form.placeholders.name[lang]}
                  />
                  <ErrorMessage message={touched.name ? errors.name : undefined} />
                </div>
                <div className="relative">
                  <OptionalLabel>{CONTENT.contact.form.company[lang]}</OptionalLabel>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={handleBlur}
                    className={inputClasses('company', touched.company && !!errors.company)}
                    placeholder={CONTENT.contact.form.placeholders.company[lang]}
                  />
                  <ErrorMessage message={touched.company ? errors.company : undefined} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="relative">
                  <RequiredLabel>{CONTENT.contact.form.email[lang]}</RequiredLabel>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={handleBlur}
                    className={inputClasses('email', touched.email && !!errors.email)}
                    placeholder={CONTENT.contact.form.placeholders.email[lang]}
                  />
                  <ErrorMessage message={touched.email ? errors.email : undefined} />
                </div>
                <div className="relative">
                  <OptionalLabel>{CONTENT.contact.form.phone[lang]}</OptionalLabel>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={handleBlur}
                    className={inputClasses('phone', touched.phone && !!errors.phone)}
                    placeholder={CONTENT.contact.form.placeholders.phone[lang]}
                  />
                  <ErrorMessage message={touched.phone ? errors.phone : undefined} />
                </div>
              </div>

              <div className="mb-8 relative">
                <RequiredLabel>{CONTENT.contact.form.service[lang]}</RequiredLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {CONTENT.contact.form.serviceOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, service: option[lang] }));
                        setTouched(prev => ({ ...prev, service: true }));
                        setErrors(prev => ({ ...prev, service: undefined }));
                      }}
                      className={`
                        p-4 rounded-xl text-left transition-all duration-300 border text-sm font-medium
                        ${formData.service === option[lang]
                          ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-300'}
                      `}
                    >
                      {option[lang]}
                    </button>
                  ))}
                </div>
                <ErrorMessage message={errors.service} />
              </div>

              <div className="mb-10 relative">
                <RequiredLabel>{CONTENT.contact.form.message[lang]}</RequiredLabel>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={handleBlur}
                  className={inputClasses('message', touched.message && !!errors.message)}
                  placeholder={CONTENT.contact.form.placeholders.message[lang]}
                />
                <ErrorMessage message={touched.message ? errors.message : undefined} />
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                className="h-16 text-lg font-bold shadow-lg shadow-teal-900/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scanning...
                  </span>
                ) : (
                  CONTENT.contact.form.submit[lang]
                )}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;