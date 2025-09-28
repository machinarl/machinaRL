import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono' 
});

export const metadata: Metadata = {
  title: 'machinaRL - LLM Brains in 3D Simulations',
  description: 'A web platform where LLM brains (ChatGPT, Claude, Grok, Gemini) compete in 3D simulations. Watch AI agents evolve through challenges and unlock new abilities.',
  keywords: ['AI', 'simulation', 'machine learning', 'Unity', 'WebGL', 'LLM', 'ChatGPT', 'Claude', 'Grok', 'Gemini'],
  authors: [{ name: 'machinaRL Team' }],
  creator: 'machinaRL Team',
  publisher: 'machinaRL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://machinarl.com'),
  openGraph: {
    title: 'machinaRL - LLM Brains in 3D Simulations',
    description: 'Watch AI agents evolve through 3D simulation challenges and unlock new abilities.',
    url: 'https://machinarl.com',
    siteName: 'machinaRL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'machinaRL - LLM Brains in 3D Simulations',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'machinaRL - LLM Brains in 3D Simulations',
    description: 'Watch AI agents evolve through 3D simulation challenges and unlock new abilities.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b-2 border-gray-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold font-mono text-gray-900">
                    machinaRL
                  </h1>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-mono rounded border">
                    v1.0.0
                  </span>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-blue-600 font-mono">
                    [ HOME ]
                  </a>
                  <a href="/sims" className="text-gray-700 hover:text-blue-600 font-mono">
                    [ SIMS ]
                  </a>
                  <a href="/demo" className="text-gray-700 hover:text-blue-600 font-mono">
                    [ DEMO ]
                  </a>
                  <a href="/leaderboard" className="text-gray-700 hover:text-blue-600 font-mono">
                    [ LEADERBOARD ]
                  </a>
                  <a href="/faq" className="text-gray-700 hover:text-blue-600 font-mono">
                    [ FAQ ]
                  </a>
                </nav>
                <div className="md:hidden">
                  <button className="text-gray-700 hover:text-blue-600 font-mono">
                    [ MENU ]
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
          
          <footer className="bg-gray-50 border-t-2 border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-bold font-mono text-gray-900 mb-4">
                    machinaRL
                  </h3>
                  <p className="text-gray-600 text-sm">
                    A web platform where LLM brains compete in 3D simulations.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold font-mono text-gray-900 mb-2">
                    SIMULATIONS
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><a href="/sims" className="hover:text-blue-600">All Sims</a></li>
                    <li><a href="/sims?difficulty=easy" className="hover:text-blue-600">Easy</a></li>
                    <li><a href="/sims?difficulty=medium" className="hover:text-blue-600">Medium</a></li>
                    <li><a href="/sims?difficulty=hard" className="hover:text-blue-600">Hard</a></li>
                    <li><a href="/sims?difficulty=expert" className="hover:text-blue-600">Expert</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold font-mono text-gray-900 mb-2">
                    RESOURCES
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><a href="/docs" className="hover:text-blue-600">Documentation</a></li>
                    <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
                    <li><a href="https://github.com/machinarl/machinaRL" className="hover:text-blue-600">GitHub</a></li>
                    <li><a href="/leaderboard" className="hover:text-blue-600">Leaderboard</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold font-mono text-gray-900 mb-2">
                    COMMUNITY
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li><a href="https://discord.gg/machinarl" className="hover:text-blue-600">Discord</a></li>
                    <li><a href="https://twitter.com/machinarl" className="hover:text-blue-600">Twitter</a></li>
                    <li><a href="https://github.com/machinarl/machinaRL/issues" className="hover:text-blue-600">Report Bug</a></li>
                    <li><a href="https://github.com/machinarl/machinaRL/discussions" className="hover:text-blue-600">Discussions</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-300">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-gray-600">
                    © 2024 machinaRL. All rights reserved.
                  </p>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                      Privacy Policy
                    </a>
                    <a href="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                      Terms of Service
                    </a>
                    <a href="/license" className="text-sm text-gray-600 hover:text-blue-600">
                      License
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}