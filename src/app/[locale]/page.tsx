import { LanguageSwitcher } from "@/src/components/ui/LanguageSwitcher/language-switcher";
import { TournamentCard } from "@/src/components/ui/TournamentCard/tournament-card";
import { useTranslations } from "next-intl";

export default function HomePage() {
    const tLanding = useTranslations('Landing')
    const tTournaments = useTranslations('Tournaments')

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8 md:p-16">
            <LanguageSwitcher />
            <section className="max-w-4xl mx-auto mb-16 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent mb-4">
                    {tLanding('title')}
                </h1>
                <p className="text-lg text-slate-400">
                    {tLanding('subtitle')}
                </p>
            </section>

            <section className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-slate-100">
                    {tTournaments('title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TournamentCard
                        title={tTournaments('items.valorant')}
                        date="28 de Junho, 19:00"
                        spots={{ current: 12, total: 32 }}
                        status="open"
                        actionLabel={tTournaments('actionOpenLabel')}
                    />

                    <TournamentCard
                        title={tTournaments('items.lol')}
                        date="Hoje, 20:30"
                        spots={{ current: 16, total: 16 }}
                        status="ongoing"
                        actionLabel={tTournaments('actionLabel')}
                    />
                </div>
            </section>
        </main>
    )
}