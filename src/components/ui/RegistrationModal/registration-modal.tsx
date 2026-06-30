'use client';

import { useState, useEffect } from 'react';
import { X, UserPlus, Shield } from 'lucide-react';
import { TeamRegistration, Player } from '@/types/tournament';
import { Button } from '../Button/button';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    tournamentName: string;
    onSubmit: (data: TeamRegistration) => void;
};

export function RegistrationModal({ isOpen, onClose, tournamentName, onSubmit }: Props) {
    // Estado inicial do formulário seguindo a nossa tipagem profissional
    const [teamName, setTeamName] = useState('');
    const [captainName, setCaptainName] = useState('');
    const [captainEmail, setCaptainEmail] = useState('');

    // Inicializa o array com 5 jogadores vazios (padrão de line-up de eSports)
    const [players, setPlayers] = useState<Player[]>(
        Array(5).fill(null).map((_, i) => ({ nickname: '', gameId: '' }))
    );

    const [errors, setErrors] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    // Atualiza um jogador específico dentro do array dinâmico
    const handlePlayerChange = (index: number, field: keyof Player, value: string) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            [field]: value,
        };
        setPlayers(updatedPlayers);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null);

        // Validações básicas de negócio
        if (!teamName.trim() || !captainName.trim() || !captainEmail.trim()) {
            setErrors('Por favor, preencha todos os dados da equipe e do capitão.');
            return;
        }

        // Valida se pelo menos os nicknames dos 5 jogadores foram preenchidos
        const hasInvalidPlayer = players.some(p => !p.nickname.trim());
        if (hasInvalidPlayer) {
            setErrors('Por favor, preencha o Nickname de todos os 5 jogadores da line-up.');
            return;
        }

        // Se passar na validação, dispara o evento de sucesso
        onSubmit({
            teamName,
            captainName,
            captainEmail,
            players,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800">
                    <div>
                        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-500" /> Inscrição de Equipe
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 truncate max-w-[320px] md:max-w-[400px]">
                            Torneio: <span className="text-blue-400 font-medium">{tournamentName}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-300 p-1 rounded-md hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

                    {errors && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg font-medium">
                            {errors}
                        </div>
                    )}

                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">1. Informações da Organização</h4>

                        <div>
                            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nome da Equipe *</label>
                            <input
                                type="text"
                                required
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Ex: LOUD, FURIA, Team Liquid"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-slate-700 transition-colors placeholder-slate-600"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Nome do Capitão *</label>
                                <input
                                    type="text"
                                    required
                                    value={captainName}
                                    onChange={(e) => setCaptainName(e.target.value)}
                                    placeholder="Seu nome real"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-slate-700 transition-colors placeholder-slate-600"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5 font-medium">E-mail de Contato *</label>
                                <input
                                    type="email"
                                    required
                                    value={captainEmail}
                                    onChange={(e) => setCaptainEmail(e.target.value)}
                                    placeholder="capitao@email.com"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 outline-none focus:border-slate-700 transition-colors placeholder-slate-600"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-800/60" />

                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-emerald-500" /> 2. Line-up Titular (5 Jogadores)
                        </h4>

                        <div className="space-y-3">
                            {players.map((player, index) => (
                                <div key={index} className="flex items-center gap-3 bg-slate-950/40 border border-slate-800/40 p-3 rounded-lg">
                                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                        #{index + 1}
                                    </span>

                                    <div className="grid grid-cols-2 gap-3 flex-1">
                                        <input
                                            type="text"
                                            required
                                            value={player.nickname}
                                            onChange={(e) => handlePlayerChange(index, 'nickname', e.target.value)}
                                            placeholder={`Nickname ${index === 0 ? '(Capitão)' : ''} *`}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-slate-700 transition-colors placeholder-slate-600"
                                        />
                                        <input
                                            type="text"
                                            value={player.gameId || ''}
                                            onChange={(e) => handlePlayerChange(index, 'gameId', e.target.value)}
                                            placeholder="Riot ID / Steam ID (Opcional)"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-slate-700 transition-colors placeholder-slate-600"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-900 sticky bottom-0">
                        <Button type="button" variant="secondary" size="md" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary" size="md">
                            Confirmar Inscrição
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}