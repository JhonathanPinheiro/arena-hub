'use client';

import { useMemo } from 'react';
import { Match } from '@/types/tournament';
import { MatchCard } from '../MatchCard/match-card';

type Props = {
    matches: Match[];
};

export function TournamentBracket({ matches }: Props) {
    const rounds = useMemo(() => {
        const grouped: { [key: string]: Match[] } = {};

        matches.forEach((match) => {
            if (!grouped[match.tournamentRoundText]) {
                grouped[match.tournamentRoundText] = [];
            }
            grouped[match.tournamentRoundText].push(match);
        });

        return Object.entries(grouped).map(([title, matchesList]) => ({
            title,
            matches: matchesList,
        }));
    }, [matches]);

    return (
        <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
            <div className="flex gap-12 min-w-max items-center p-4">
                {rounds.map((round, roundIndex) => (
                    <div key={round.title} className="flex flex-col gap-6 items-center">
                        <h3 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 w-full text-center">
                            {round.title}
                        </h3>
                        <div
                            className="flex flex-col justify-around gap-8"
                            style={{ height: roundIndex > 0 ? `${roundIndex * 12}rem` : 'auto' }}
                        >
                            {round.matches.map((match) => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}