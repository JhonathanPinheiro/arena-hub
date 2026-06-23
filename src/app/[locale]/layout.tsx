import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css'; // <-- Garanta que o CSS global está importado aqui!

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Aguarda os parâmetros do escopo do idioma de forma assíncrona
  const { locale } = await params;

  // Se o idioma não for suportado, joga 404
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Busca os JSONs de tradução no servidor
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}