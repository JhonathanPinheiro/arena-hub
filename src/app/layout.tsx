import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Esse layout raiz serve apenas para passar o conteúdo adiante
export default function RootLayout({ children }: Props) {
  return children;
}