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