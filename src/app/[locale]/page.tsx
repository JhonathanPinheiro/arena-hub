import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher/language-switcher";
import { TournamentCard } from "@/components/ui/TournamentCard/tournament-card";
import { MOCK_TOURNAMENTS } from "@/mocks/tournaments";
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
                    {MOCK_TOURNAMENTS.map((tournament) => (
                        <TournamentCard
                            key={tournament.id}
                            title={tTournaments(tournament.titleKey as string)}
                            date={tournament.date}
                            spots={tournament.spots}
                            status={tournament.status}
                            actionLabel={
                                tournament.status === 'open'
                                    ? tTournaments('actionOpenLabel')
                                    : tTournaments('actionLabel')
                            }
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}