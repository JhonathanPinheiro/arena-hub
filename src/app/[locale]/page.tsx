import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations('Landing')

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-center max-w-3xl">
                {t('title')}
            </h1>
            <p className="mt-4 text-lg text-slate-400 text-center">
                {t('subtitle')}
            </p>
        </main>
    )
}