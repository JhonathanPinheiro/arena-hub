import { Tournament } from "@/types/tournament";
import { Match } from '@/types/tournament';

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 'trn_01',
    titleKey: 'items.valorant',
    game: 'valorant',
    status: 'open',
    format: 'single_elimination',
    date: '28 de Junho, 19:00',
    spots: { current: 12, total: 32 },
    prizePool: 'R$ 5.000'
  },
  {
    id: 'trn_02',
    titleKey: 'items.lol',
    game: 'lol',
    status: 'ongoing',
    format: 'swiss',
    date: 'Hoje, 20:30',
    spots: { current: 16, total: 16 },
    prizePool: 'R$ 10.000'
  }
];


export const MOCK_BRACKET_TRN01: Match[] = [
  {
    id: 'm_1',
    nextMatchId: 'm_final',
    tournamentRoundText: 'Semifinal',
    state: 'DONE',
    teams: [
      { id: 't_1', name: 'LOUD', score: 2, isWinner: true },
      { id: 't_2', name: 'FURIA', score: 1 }
    ]
  },
  {
    id: 'm_2',
    nextMatchId: 'm_final',
    tournamentRoundText: 'Semifinal',
    state: 'DONE',
    teams: [
      { id: 't_3', name: 'Sentinels', score: 0 },
      { id: 't_4', name: 'Fnatic', score: 2, isWinner: true }
    ]
  },
  {
    id: 'm_final',
    nextMatchId: null,
    tournamentRoundText: 'Grande Final',
    state: 'SCHEDULED',
    teams: [
      { id: 't_1', name: 'LOUD' },
      { id: 't_4', name: 'Fnatic' }
    ]
  }
];