import React from 'react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Resource HUD */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#0066CC]/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-4">
              <div className="flex gap-6">
                <div className="text-[#006600]">
                  [██████████] DOCS SYSTEM ONLINE
                </div>
                <div className="text-[#006600]">
                  [████████░░] API LOADING
                </div>
                <div className="text-[#006600]">
                  [███████░░░] GUIDES READY
                </div>
              </div>
            </div>
            <div className="text-[#0066CC]">
              SYSTEM STATUS: ACTIVE
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-32">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tight">
              machinaRL // DOCS
            </h1>
            <p className="text-xl text-gray-700">Coming soon - API documentation and guides</p>
          </div>
        </div>
      </div>
    </div>
  );
}