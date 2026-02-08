import { NavLink, ProjectData, ServiceData, BenefitData, ContentSection } from './types';

export const CONTENT = {
  header: {
    cta: { CZ: 'Nezávazná konzultace', EN: 'Free Consultation' },
    menu: [
      { label: { CZ: 'Služby', EN: 'Services' }, href: '#services' },
      { label: { CZ: 'Projekty', EN: 'Projects' }, href: '#projects' },
      { label: { CZ: 'O nás', EN: 'About' }, href: '#why-us' },
      { label: { CZ: 'Kontakt', EN: 'Contact' }, href: '#contact' },
    ] as NavLink[]
  },
  hero: {
    badge: { CZ: 'INOVACE PRO ROK 2026', EN: 'INNOVATION FOR 2026' },
    headlineStart: { CZ: 'Architekti', EN: 'Architects of' },
    headlineAccent: { CZ: 'Vaší Digitální', EN: 'Your Digital' },
    headlineEnd: { CZ: 'Budoucnosti', EN: 'Future' },
    subheadline: {
      CZ: 'Strategická dominance díky spojení technologické preciznosti, agilního vývoje a maximální nákladové efektivity. Definujeme nové standardy stability.',
      EN: 'Strategic dominance through the fusion of technological precision, agile development, and maximum cost efficiency. We define new standards of stability.'
    },
    cta: { CZ: 'Spojit se s námi', EN: 'Get in touch' }
  },
  showcase: {
    headline: { CZ: 'Naše Standardy', EN: 'Our Standards' },
    subheadline: { CZ: 'Vybrané technologické koncepty', EN: 'Selected Technological Concepts' },
    projects: [
      {
        id: 'hostinec',
        title: { CZ: 'Hostinec U Tří Lip: Gastro UX', EN: 'The Three Lindens: Gastro UX' },
        description: {
          CZ: 'Redesign webu pro moderní českou gastronomii. 100% Mobile-first zážitek, HTML jídelní lístek místo PDF pro perfektní SEO a storytelling, který plní stoly.',
          EN: 'Web redesign for modern Czech cuisine. 100% Mobile-first experience, HTML menu instead of PDF for perfect SEO, and storytelling that fills tables.'
        },
        tags: ['HORECA', 'Local SEO', 'Mobile-First']
      },
      {
        id: 'saas',
        title: { CZ: 'Projekt B: SaaS Dashboard Core', EN: 'Project B: SaaS Dashboard Core' },
        description: {
          CZ: 'Komplexní webová aplikace s intuitivním UX pro správu podnikových dat. Čistý kód zajišťující stabilitu i při vysoké zátěži.',
          EN: 'Complex web application with intuitive UX for enterprise data management. Clean code ensuring stability even under high load.'
        },
        tags: ['SaaS', 'B2B', 'React']
      },
      {
        id: 'corporate',
        title: { CZ: 'Projekt C: Corporate Identity 2.0', EN: 'Project C: Corporate Identity 2.0' },
        description: {
          CZ: 'Interaktivní korporátní prezentace zaměřená na budování autority značky. Animace s nulovým dopadem na výkon zařízení.',
          EN: 'Interactive corporate presentation focused on building brand authority. Animations with zero impact on device performance.'
        },
        tags: ['Branding', 'Motion', 'Corporate']
      }
    ] as ProjectData[]
  },
  services: {
    tag: { CZ: 'CO NABÍZÍME', EN: 'WHAT WE OFFER' },
    headline: { CZ: 'Co nabízíme?', EN: 'What We Offer?' },
    subheadline: {
      CZ: 'Nabízíme špičková řešení v klíčových oblastech online světa. Vyberte si konkrétní službu, kterou váš projekt právě potřebuje.',
      EN: 'We offer cutting-edge solutions across key areas of the digital world. Select the specific service your project requires.'
    },
    items: [
      {
        title: { CZ: 'Výkonné weby & aplikace', EN: 'Performance Webs & Apps' },
        description: {
          CZ: '*Unikátní design*. *Bezchybný kód*. Aplikace, které *prodávají*.',
          EN: '*Unique design*. *Flawless code*. Apps that *sell*.'
        },
        benefits: {
          CZ: ['💎 Silná digitální identita', '🤝 Okamžitá důvěra klientů', '📈 Proměna návštěvníků v partnery'],
          EN: ['💎 Strong digital identity', '🤝 Instant client trust', '📈 Converting visitors into partners']
        },
        iconName: 'code'
      },
      {
        title: { CZ: 'Digitální růst & Obsah', EN: 'Digital Growth & Content' },
        description: {
          CZ: 'Obsah, který není jen vidět, ale *skutečně prodává*.',
          EN: 'Content that isn\'t just seen, but *effectively sells*.'
        },
        benefits: {
          CZ: ['🔥 Stabilní přísun poptávek', '❤️ Komunita věrných zákazníků', '🏆 Dominantní postavení na trhu'],
          EN: ['🔥 Steady stream of leads', '❤️ Loyal customer community', '🏆 Dominant market position']
        },
        iconName: 'share'
      },
      {
        title: { CZ: 'AI & Automatizace procesů', EN: 'AI & Process Automation' },
        description: {
          CZ: '*Méně rutiny*, *více zisku*. Nechte technologie *pracovat za vás*.',
          EN: '*Less routine*, *more profit*. Let *technology work for you*.'
        },
        benefits: {
          CZ: ['⚡ Radikální snížení nákladů', '✅ Eliminace lidských chyb', '🚀 Škálovatelnost byznysu'],
          EN: ['⚡ Radical cost reduction', '✅ Elimination of human errors', '🚀 Business scalability']
        },
        iconName: 'server'
      },
      {
        title: { CZ: 'Managed Cloud & Support', EN: 'Managed Cloud & Support' },
        description: {
          CZ: '*Maximální rychlost*, *nulové výpadky*. Vaše data *v bezpečí*.',
          EN: '*Maximum speed*, *zero downtime*. Your data *safe*.'
        },
        benefits: {
          CZ: ['🛡️ Nulové výpadky příjmů', '🔒 Maximální bezpečnost dat', '🧘 Absolutní klid pro podnikání'],
          EN: ['🛡️ Zero revenue downtime', '🔒 Maximum data security', '🧘 Total peace of mind']
        },
        iconName: 'design'
      }
    ] as ServiceData[]
  },
  benefits: {
    headline: { CZ: 'Proč Zonetic', EN: 'Why Zonetic' },
    items: [
      {
        title: { CZ: 'Agilní přístup', EN: 'Agile Approach' },
        description: { CZ: 'Garantujeme rychlost doručení díky efektivním procesům bez zbytečné byrokracie.', EN: 'We guarantee delivery speed thanks to efficient processes without unnecessary bureaucracy.' }
      },
      {
        title: { CZ: 'Vysoký poměr cena/výkon', EN: 'High Value/Cost Ratio' },
        description: { CZ: 'Špičková technologická řešení dostupná díky chytré optimalizaci vývoje.', EN: 'Top-tier technological solutions made accessible through smart development optimization.' }
      },
      {
        title: { CZ: 'Technologická preciznost', EN: 'Technological Precision' },
        description: { CZ: 'Moderní tech-stack zajišťující bezchybný chod na iPhonech, Androidech i desktopu.', EN: 'Modern tech-stack ensuring flawless operation on iPhones, Androids, and desktops.' }
      }
    ] as BenefitData[]
  },
  techStack: {
    headline: { CZ: 'Náš Tech Stack', EN: 'Our Tech Stack' },
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS', 'Tailwind', 'Figma', 'Meta Business Suite', 'PostgreSQL', 'Docker']
  },
  contact: {
    headline: { CZ: 'Začněme tvořit Vaši budoucnost', EN: "Let's Build Your Future" },
    subheadline: {
      CZ: 'Máte vizi? My máme technologii. Napište nám a společně posuneme Vaše podnikání o úroveň výš.',
      EN: 'You have the vision? We have the technology. Contact us and together we will take your business to the next level.'
    },
    form: {
      name: { CZ: 'Jméno', EN: 'Name' },
      company: { CZ: 'Firma', EN: 'Company' },
      email: { CZ: 'E-mail', EN: 'E-mail' },
      phone: { CZ: 'Telefon', EN: 'Phone' },
      service: { CZ: 'Typ služby', EN: 'Service Type' },
      serviceOptions: [
        { CZ: 'Webový vývoj', EN: 'Web Development' },
        { CZ: 'Digitální design', EN: 'Digital Design' },
        { CZ: 'Správa sociálních sítí', EN: 'Social Media Management' },
        { CZ: 'Hosting a domény', EN: 'Hosting & Domains' }
      ],
      message: { CZ: 'Zpráva', EN: 'Message' },
      submit: { CZ: 'Odeslat poptávku', EN: 'Submit Inquiry' }
    },
    info: {
      email: 'hello@zoneticgroup.com',
      phone: '+420 123 456 789'
    }
  },
  footer: {
    copyright: { CZ: '© 2026 Zonetic. Všechna práva vyhrazena.', EN: '© 2026 Zonetic. All rights reserved.' }
  }
};