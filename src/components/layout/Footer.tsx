'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import { LEGAL_LINKS } from '@/lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#0066CC]/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              href="/" 
              className="text-2xl font-black text-black hover:text-[#0066CC] hover:shadow-[0_0_10px_#0066CC] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0066CC] rounded"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              machinaRL
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              A 3D reinforcement learning sandbox where AI models learn to navigate challenges as geometric shapes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://github.com/machinarl"
                className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded p-1"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </Link>
              <Link
                href="https://twitter.com/machinarl"
                className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded p-1"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/demo"
                  className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  Live Sim
                </Link>
              </li>
              <li>
                <Link
                  href="/sims"
                  className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  Simulations
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-black font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 machinaRL. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-4 md:mt-0">
            Built with Next.js, Three.js, and ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;