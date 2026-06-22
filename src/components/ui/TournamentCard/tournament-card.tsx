import { Badge } from "../Badge/badge";
import { Button } from "../Button/button";

export interface TournamentCardProps {
  title: string;
  date: string;
  spots: { current: number; total: number };
  status: 'open' | 'ongoing' | 'finished';
  onActionClick?: () => void;
  actionLabel?: string;
}

export function TournamentCard({
  title,
  date,
  spots,
  status,
  onActionClick,
  actionLabel = 'Ver Detalhes'
}: TournamentCardProps) {
  
  const statusMap = {
    open: { label: 'Inscrições Abertas', variant: 'success' as const },
    ongoing: { label: 'Em Andamento', variant: 'warning' as const },
    finished: { label: 'Finalizado', variant: 'neutral' as const }
  };

  const currentStatus = statusMap[status];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 max-w-sm flex flex-col justify-between shadow-xl text-white">
      <div>
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-xs text-slate-400 font-medium">{date}</span>
          <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-slate-100 mb-2 line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">
          <span className="font-medium text-slate-300">{spots.current}</span>
          <span>/</span>
          <span>{spots.total} times inscritos</span>
        </div>
      </div>

      <Button 
        variant={status === 'open' ? 'primary' : 'secondary'} 
        className="w-full"
        onClick={onActionClick}
      >
        {actionLabel}
      </Button>
    </div>
  );
}