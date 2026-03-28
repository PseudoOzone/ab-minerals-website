export const locales = ['en', 'de', 'zh-CN', 'zh-TW', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ar: 'العربية',
};

export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  de: 'DE',
  'zh-CN': '简',
  'zh-TW': '繁',
  ar: 'ع',
};
