import './global.css';
import 'nprogress/nprogress.css';

import { IBM_Plex_Sans, Inter } from 'next/font/google';
import Script from 'next/script';
import { AxiomWebVitals } from 'next-axiom';
import { type PropsWithChildren } from 'react';

import { loadI18n } from '@/lib/i18n';

import { I18nProvider } from './components/i18n-provider';
import { Main } from './components/main';

const inter = Inter({
  subsets: ['latin'],
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: '700',
  subsets: ['latin'],
  display: 'block',
  variable: '--font-plex',
});

interface LanguageLayoutProps extends PropsWithChildren {
  params: {
    locale: string;
  };
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const i18n = await loadI18n(params.locale);

  return (
    <html lang={params.locale}>
      <body className={`${inter.variable} ${ibmPlexSans.variable}`}>
        <I18nProvider locale={i18n.locale} messages={i18n.messages}>
          <Main>{children}</Main>
        </I18nProvider>

        <AxiomWebVitals />

        <Script
          async
          src={'/stats/script.js'}
          data-domains={'uo.zone'}
          data-website-id={'fddef98b-d861-4a60-a798-f74bb07995cc'}
        />
      </body>
    </html>
  );
}
