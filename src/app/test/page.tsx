import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Resource HUD */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#0066CC]/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <div className="flex items-center gap-4">
              <div className="flex gap-6">
                <div className="text-[#006600]">
                  [██████████] TEST SYSTEM ONLINE
                </div>
                <div className="text-[#006600]">
                  [████████░░] COMPONENTS LOADING
                </div>
                <div className="text-[#006600]">
                  [███████░░░] MODULES READY
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tight">
              machinaRL // TEST
            </h1>
          </div>
      
          <div className="space-y-8">
            <section className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
              <h2 className="text-2xl font-bold mb-4 text-black">Abilities Section Test</h2>
              <p className="text-gray-700">This should be visible</p>
            </section>
            
            <section className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
              <h2 className="text-2xl font-bold mb-4 text-black">Leaderboard Section Test</h2>
              <p className="text-gray-700">This should also be visible</p>
            </section>
            
            <section className="bg-gray-100 border-2 border-[#0066CC] p-6 font-mono">
              <h2 className="text-2xl font-bold mb-4 text-black">FAQ Section Test</h2>
              <p className="text-gray-700">And this too</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}