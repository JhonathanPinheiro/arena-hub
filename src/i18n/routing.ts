import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt',
  // Se você tiver um objeto "pathnames: { ... }" aqui dentro, 
  // garanta que ele não está bloqueando ou renomeando a rota de torneios.
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);