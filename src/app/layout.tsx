import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'GharSetu - PG & Room Finder for Outstation Students',
  description: 'Proof, not promises. The verified student room platform with live camera verification, Fair Rent Meter, senior video walkthroughs, and Parent Mode.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col font-sans antialiased">
        <AppProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-6 text-xs text-zinc-500 text-center">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>© 2026 GharSetu • Empowering Outstation Students with Proof, Not Promises.</p>
              <div className="flex gap-4">
                <span>SVNIT Surat</span>
                <span>Anti-Broker Shield</span>
                <span>Parent Safety Mode</span>
              </div>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
