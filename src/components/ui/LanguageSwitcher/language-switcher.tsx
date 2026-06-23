'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';

    router.push(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-850 hover:text-white transition-all shadow-md"
    >
      {locale === 'pt' ? '🇬🇧 Switch to English' : '🇧🇷 Mudar para Português'}
    </button>
  );
}