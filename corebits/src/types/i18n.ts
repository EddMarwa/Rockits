export type Locale = 'en' | 'zh';

export type NavDict = {
  home: string;
  about: string;
  legal: string;
  announcements: string;
  contact: string;
};

export type FooterDict = {
  made: string;
  terms: string;
  privacy: string;
  kyc: string;
};

export type HeroDict = {
  headline: string;
  subheadline: string;
  cta: string;
};

export type CountdownDict = { label: string };

export type FeaturesDict = {
  title: string;
  secure: string;
  daily: string;
  registered: string;
  global: string;
};

export type TestimonialsDict = { title: string };

export type NotifyDict = {
  title: string;
  placeholder: string;
  button: string;
  success: string;
};

export type AboutDict = {
  title: string;
  mission: string;
  values: string;
  transparency: string;
  security: string;
  efficiency: string;
  global: string;
};

export type LegalDict = {
  title: string;
  text: string;
  certs: string;
  download: string;
  reports: string;
  date: string;
  description: string;
  walletProofs: string;
};

export type AnnouncementsDict = {
  title: string;
  comingSoon: string;
};

export type ContactDict = {
  title: string;
  name: string;
  email: string;
  message: string;
  submit: string;
  visit: string;
  address: string;
  follow: string;
};

export type RootDict = {
  nav: NavDict;
  hero: HeroDict;
  countdown: CountdownDict;
  features: FeaturesDict;
  testimonials: TestimonialsDict;
  notify: NotifyDict;
  footer: FooterDict;
  about: AboutDict;
  legal: LegalDict;
  announcements: AnnouncementsDict;
  contact: ContactDict;
};

