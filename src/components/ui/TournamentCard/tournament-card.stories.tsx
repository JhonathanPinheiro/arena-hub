import type { Meta, StoryObj } from '@storybook/react';
import { TournamentCard } from './tournament-card';

const meta: Meta<typeof TournamentCard> = {
  title: 'UI/TournamentCard',
  component: TournamentCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TournamentCard>;

export const OpenRegistration: Story = {
  args: {
    title: 'Copa ArenaHub Valorant #1',
    date: '28 de Junho, 19:00',
    spots: { current: 12, total: 32 },
    status: 'open',
    actionLabel: 'Inscrever-se',
  },
};

export const OngoingTournament: Story = {
  args: {
    title: 'Liga Principal League of Legends',
    date: 'Hoje, 20:30',
    spots: { current: 16, total: 16 },
    status: 'ongoing',
    actionLabel: 'Assistir Partidas',
  },
};