import { Match } from '@/types/tournament';

type Props = {
    match: Match;
};

export function MatchCard({ match }: Props) {
    const [teamA, teamB] = match.teams;

    return (
        <div className="w-64 bg-slate-900 border border-slate-800 rounded-lg shadow-lg overflow-hidden transition-all hover:border-slate-700">
            <div className="px-3 py-1 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {match.tournamentRoundText}
                </span>
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide ${match.state === 'LIVE' ? 'bg-red-500/10 text-red-400 animate-pulse' :
                    match.state === 'DONE' ? 'bg-slate-800 text-slate-400' :
                        'bg-blue-500/10 text-blue-400'
                    }`}>
                    {match.state === 'LIVE' ? 'Ao Vivo' : match.state === 'DONE' ? 'Encerrado' : 'Agendado'}
                </span>
            </div>

            <div className="flex flex-col">
                <div className={`flex items-center justify-between px-3 py-2.5 border-b border-slate-800/50 ${teamA.isWinner ? 'bg-emerald-500/5' : ''}`}>
                    <span className={`text-xs truncate ${teamA.isWinner ? 'text-emerald-400 font-bold' : match.state === 'DONE' ? 'text-slate-500' : 'text-slate-200'}`}>
                        {teamA.name}
                    </span>
                    {teamA.score !== undefined && (
                        <span className={`text-xs font-mono font-bold px-1.5 ${teamA.isWinner ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {teamA.score}
                        </span>
                    )}
                </div>

                <div className={`flex items-center justify-between px-3 py-2.5 ${teamB.isWinner ? 'bg-emerald-500/5' : ''}`}>
                    <span className={`text-xs truncate ${teamB.isWinner ? 'text-emerald-400 font-bold' : match.state === 'DONE' ? 'text-slate-500' : 'text-slate-200'}`}>
                        {teamB.name}
                    </span>
                    {teamB.score !== undefined && (
                        <span className={`text-xs font-mono font-bold px-1.5 ${teamB.isWinner ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {teamB.score}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}