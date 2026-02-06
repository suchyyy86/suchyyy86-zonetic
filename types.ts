export type Language = 'CZ' | 'EN';

export interface ContentSection {
  CZ: string;
  EN: string;
}

export interface NavLink {
  label: ContentSection;
  href: string;
}

export interface ProjectData {
  id: string;
  title: ContentSection;
  description: ContentSection;
  tags: string[];
}

export interface ServiceData {
  title: ContentSection;
  description: ContentSection;
  iconName: string;
}

export interface BenefitData {
  title: ContentSection;
  description: ContentSection;
}