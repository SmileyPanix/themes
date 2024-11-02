import {Inter} from 'next/font/google';

import {ColorSchemesProvider} from '@/components/ColorSchemeContext/ColorSchemeContext';
import CopyColorSchemeProvider from '@/components/CopyColorSchemeContext/CopyColorSchemeProvider';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import Header from '@/components/Header';
import BackgroundColor from '@/components/BackgroundColor/BackgroundColor';
import getColorSchemes from '@/requests/getColorSchemes';

import './globals.css';
import {PreviewTypeProvider} from '@/components/PreviewTypeContext/PreviewTypeContext';

export const metadata = {
  title: 'Windows Terminal Colors',
  description: 'Browse and copy color schemes and themes for Windows Terminal',
};

const inter = Inter({subsets: ['latin'], variable: '--font-inter'});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const colorSchemes = await getColorSchemes();
  return (
    <html lang="en" data-lightness="dark">
      <body className={inter.variable}>
        <CopyColorSchemeProvider>
          <ColorSchemesProvider colorSchemes={colorSchemes}>
            <PreviewTypeProvider>
              <LayoutWrapper>
                <Header />
                <BackgroundColor>{children}</BackgroundColor>
              </LayoutWrapper>
            </PreviewTypeProvider>
          </ColorSchemesProvider>
        </CopyColorSchemeProvider>
      </body>
    </html>
  );
}
