import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import AIAssistant from '@/components/AIAssistant';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import KonamiWrapper from '@/components/KonamiWrapper';
import LoadingScreen from '@/components/LoadingScreen';

export const metadata: Metadata = {
  title: 'Portfolio Quest',
  description: 'A gamified portfolio experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <KonamiWrapper>
             <LoadingScreen />
            <div className="relative flex min-h-screen w-full flex-col">
              <Header />
              <main className="flex-1">
                <PageTransitionWrapper>{children}</PageTransitionWrapper>
              </main>
              <Footer />
              <AIAssistant />
              <Toaster />
            </div>
          </KonamiWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
