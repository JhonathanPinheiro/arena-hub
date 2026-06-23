'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments';
import { GameType, TournamentStatus } from '@/types/tournament';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/language-switcher';
import { TournamentCard } from '@/components/ui/TournamentCard/tournament-card';
import { Button } from '@/components/ui/Button/button';

export default function HomePage() {
    const tLanding = useTranslations('Landing');
    const tTournaments = useTranslations('Tournaments');

    const [activeGame, setActiveGame] = useState<GameType | null>(null);
    const [activeStatus, setActiveStatus] = useState<TournamentStatus | null>(null);

    const filteredTournaments = MOCK_TOURNAMENTS.filter((tournament) => {
        const matchesGame = activeGame ? tournament.game === activeGame : true;
        const matchesStatus = activeStatus ? tournament.status === activeStatus : true;
        return matchesGame && matchesStatus;
    });

    return (
        <main className="min-h-screen bg-slate-950 text-white p-8 md:p-16 relative">
            <LanguageSwitcher />

            <section className="max-w-4xl mx-auto mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent mb-4">
                    {tLanding('title')}
                </h1>
                <p className="text-lg text-slate-400">
                    {tLanding('subtitle')}
                </p>
            </section>

            <section className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 items-center justify-between border-b border-slate-800 pb-6">
                <div className="flex gap-2">
                    <Button
                        onClick={() => setActiveGame(null)}
                        variant={activeGame === null ? 'primary' : 'secondary'}
                        size="sm"
                    >
                        Todos os Jogos
                    </Button>
                    <Button
                        onClick={() => setActiveGame('valorant')}
                        variant={activeGame === 'valorant' ? 'primary' : 'secondary'}
                        size="sm"
                    >
                        Valorant
                    </Button>
                    <Button
                        onClick={() => setActiveGame('lol')}
                        variant={activeGame === 'lol' ? 'primary' : 'secondary'}
                        size="sm"
                    >
                        League of Legends
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() => setActiveStatus(null)}
                        variant={activeStatus === null ? 'primary' : 'secondary'}
                        size="sm"
                    >
                        Todos os Status
                    </Button>
                    <Button
                        onClick={() => setActiveStatus('open')}
                        variant={activeStatus === 'open' ? 'primary' : 'secondary'}
                        size="sm"
                    >
                        Inscrições Abertas
                    </Button>
                </div>
            </section>

            <section className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-slate-100">
                    {tTournaments('title')}
                </h2>

                {filteredTournaments.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                        Nenhum torneio encontrado com os filtros selecionados.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredTournaments.map((tournament) => (
                            <TournamentCard
                                key={tournament.id}
                                title={tTournaments(tournament.titleKey as any)}
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
                )}
            </section>
        </main>
    );
}