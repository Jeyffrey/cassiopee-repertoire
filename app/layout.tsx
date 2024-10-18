import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Répertoire Cassiopée 2024',
  description: 'Chorale amateur de Lyon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-screen bg-dark text-white">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
