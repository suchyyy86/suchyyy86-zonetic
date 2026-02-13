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
    headlineStart: { CZ: 'Architekti', EN: 'Architects of' },
    headlineAccent: { CZ: 'Vaší Digitální', EN: 'Your Digital' },
    headlineEnd: { CZ: 'Budoucnosti', EN: 'Future' },
    subheadline: {
      CZ: 'Stavíme digitální produkty, které definují trh. Rychlost, design a škálovatelnost bez kompromisů.',
      EN: 'We build digital products that define the market. Speed, design, and scalability without compromise.'
    },
    cta: { CZ: 'Spojit se s námi', EN: 'Get in touch' },
    ctaSecondary: { CZ: 'Prohlédnout demo', EN: 'View Demo' }
  },
  showcase: {
    headline: { CZ: 'Zonetic Lab', EN: 'Zonetic Lab' },
    subheadline: { CZ: 'Interaktivní technologická dema', EN: 'Interactive Technology Demos' },
    projects: [
      {
        id: 'eshop',
        title: { CZ: 'The Instant E-shop', EN: 'The Instant E-shop' },
        description: {
          CZ: 'Rychlost prodává. Zažijte okamžité načítání a plynulé animace. Headless architektura, která promění návštěvníky v zákazníky.',
          EN: 'Speed sells. Experience instant loading and smooth animations. Headless architecture that converts visitors into customers.'
        },
        tags: ['Headless', '3D Model', 'Performance']
      },
      {
        id: 'reservation',
        title: { CZ: 'Real-time Rezervace', EN: 'Real-time Reservations' },
        description: {
          CZ: 'Data vždy aktuální, všude a hned. Změna na mobilu se okamžitě projeví na desktopu. Žádné obnovování, žádné chyby.',
          EN: 'Data always current, everywhere, instantly. Changes on mobile reflect immediately on desktop. No refreshes, no errors.'
        },
        tags: ['Real-time', 'WebSocket', 'Cloud']
      },
      {
        id: 'ai-gen',
        title: { CZ: 'AI Generátor Obsahu', EN: 'AI Content Generator' },
        description: {
          CZ: 'Méně rutiny, více prodejů. Zadejte pár klíčových slov a nechte AI vytvořit atraktivní prodejní texty během vteřin.',
          EN: 'Less routine, more sales. Enter a few keywords and let AI create attractive sales copy in seconds.'
        },
        tags: ['AI', 'Automation', 'OpenAI']
      },
      {
        id: 'dashboard',
        title: { CZ: 'Interaktivní Dashboard', EN: 'Interactive Dashboard' },
        description: {
          CZ: 'Přehled nad firmou jedním pohledem. Čistý design a intuitivní ovládání pro vaše interní systémy a klientské zóny.',
          EN: 'Company overview at a glance. Clean design and intuitive controls for your internal systems and client zones.'
        },
        tags: ['UX/UI', 'Dashboard', 'Analytics']
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
          CZ: '*Kreativní strategie*. *Poutavý obsah*. Značka, kterou *nelze přehlédnout*.',
          EN: '*Creative strategy*. *Engaging content*. A brand that *cannot be overlooked*.'
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
        iconName: 'ai'
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
        iconName: 'server'
      }
    ] as ServiceData[]
  },
  benefits: {
    headline: { CZ: 'Proč Zonetic', EN: 'Why Zonetic' },
    items: [
      {
        title: { CZ: 'Agilní přístup', EN: 'Agile Approach' },
        description: { CZ: 'Dodáváme rychle a efektivně. Váš produkt dostaneme na trh v nejkratším možném čase, aniž bychom slevili z kvality.', EN: 'We deliver fast and efficiently. We get your product to market in the shortest possible time without compromising quality.' }
      },
      {
        title: { CZ: 'Vysoký poměr cena/výkon', EN: 'High Value/Cost Ratio' },
        description: { CZ: 'Špičková technologická řešení dostupná díky chytré optimalizaci vývoje.', EN: 'Top-tier technological solutions made accessible through smart development optimization.' }
      },
      {
        title: { CZ: 'Technologický Náskok', EN: 'Technological Edge' },
        description: { CZ: 'Stavíme na technologiích zítřka. AI, moderní frameworky a cloudová řešení integrujeme už dnes, aby váš byznys nezastarával, ale rostl.', EN: 'We build on the technologies of tomorrow. We integrate AI, modern frameworks, and cloud solutions today so your business doesn\'t age, but grows.' }
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