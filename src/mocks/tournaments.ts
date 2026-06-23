import { Tournament } from "@/types/tournament";

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