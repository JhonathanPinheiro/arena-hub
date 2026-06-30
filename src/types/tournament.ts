export type GameType = 'valorant' | 'lol' | 'cs2';
export type TournamentStatus = 'open' | 'ongoing' | 'finished';
export type TournamentFormat = 'single_elimination' | 'double_elimination' | 'swiss';

export interface Tournament {
    id: string;
    titleKey: string;
    game: GameType;
    status: TournamentStatus;
    format: TournamentFormat;
    date: string;
    spots: {
        current: number;
        total: number;
    };
    prizePool: string;
}

export interface MatchTeam {
    id: string;
    name: string;
    score?: number;
    isWinner?: boolean;
}

export interface Match {
    id: string;
    nextMatchId?: string | null;
    tournamentRoundText: string;
    state: 'SCHEDULED' | 'LIVE' | 'DONE';
    teams: [MatchTeam, MatchTeam];
}

export interface TournamentBracket {
    rounds: {
        title: string;
        matches: Match[];
    }[];
}