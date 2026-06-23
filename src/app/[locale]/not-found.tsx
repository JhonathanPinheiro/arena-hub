'use client';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button/button';

// Optional: add a head component for SEO
import Head from 'next/head';

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations('NotFound');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex flex-col items-center justify-center p-6 text-white">
        <div className="bg-black bg-opacity-40 backdrop-blur-lg rounded-xl p-8 max-w-lg text-center shadow-xl">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            {t('description')}
          </p>
          <Button
            onClick={() => router.push('/')}
            variant="primary"
            size="lg"
            className="animate-pulse"
          >
            {t('backHome')}
          </Button>
        </div>
      </main>
    </>
  );
}
