'use client';

import { useTranslations } from 'next-intl';
import { MOCK_TOURNAMENTS } from '@/mocks/tournaments';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button/button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher/language-switcher';
import { Badge } from '@/components/ui/Badge/badge';
import { useParams } from 'next/navigation';

export default function TournamentDetailPage() {
  const { id } = useParams() as { id: string };
  const tTournaments = useTranslations('Tournaments');

  const tournament = MOCK_TOURNAMENTS.find((t) => t.id === id);

  if (!tournament) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-200">Torneio não encontrado</h1>
        <Link href="/">
          <Button variant="primary">Voltar para a Home</Button>
        </Link>
      </main>
    );
  }

  const statusMap = {
    open: { label: 'Inscrições Abertas', variant: 'success' as const },
    ongoing: { label: 'Em Andamento', variant: 'warning' as const },
    finished: { label: 'Finalizado', variant: 'neutral' as const },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 md:p-16 relative">
      <LanguageSwitcher />
      <div className="max-w-3xl mx-auto">
        <Link href="/">
          <Button variant="secondary" size="sm" className="mb-8">
            ← Voltar
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant={statusMap[tournament.status].variant}>
                {statusMap[tournament.status].label}
              </Badge>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                {tournament.game}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100">
              {tTournaments(tournament.titleKey as any)}
            </h1>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center min-w-[160px]">
            <span className="text-xs text-slate-400 uppercase font-medium">Premiação</span>
            <span className="text-xl font-bold text-emerald-400">{tournament.prizePool}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Informações Gerais</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Data de Início:</span>
                <span className="text-slate-200 font-medium">{tournament.date}</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Formato do Torneio:</span>
                <span className="text-slate-200 font-medium capitalize">
                  {tournament.format.replace('_', ' ')}
                </span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Vagas Preenchidas:</span>
                <span className="text-slate-200 font-medium">
                  {tournament.spots.current} / {tournament.spots.total} times
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-slate-200">Participe da Competição</h3>
              <p className="text-sm text-slate-400 mb-6">
                Garanta a vaga do seu time antes que as inscrições se encerrem. O capitão deve registrar todos os jogadores.
              </p>
            </div>
            <Button
              className="w-full"
              variant={tournament.status === 'open' ? 'primary' : 'secondary'}
              disabled={tournament.status !== 'open'}
            >
              {tournament.status === 'open' ? 'Registrar Meu Time' : 'Inscrições Encerradas'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}