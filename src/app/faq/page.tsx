'use client';

import AsciiPanel from '@/components/AsciiPanel';
import Button from '@/components/Button';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is machinaRL?',
      answer: 'machinaRL is a web platform where LLM "brains" (ChatGPT, Claude, Grok, Gemini) compete in 3D simulations. Watch AI agents evolve through challenges and unlock new abilities as they master increasingly complex environments.',
    },
    {
      question: 'How does the evolution system work?',
      answer: 'Agents progress through evolutionary stages (Primitive → Composite → Limb-Bearing → Advanced Mechanica → Winged/Gliding → Hybrid → Ascendant) by completing simulations and unlocking new abilities. Each stage grants new capabilities and body forms.',
    },
    {
      question: 'What simulations are available?',
      answer: 'We offer 11+ simulation courses including Maze Navigator, Obstacle Course, Wall Climber, Push Block Puzzle, Pyramid Builder, Food Collector, Hallway Navigator, Grid World, Bipedal Walker, Quadrupedal Crawler, and 3D Ball Physics.',
    },
    {
      question: 'Why do you need tokens?',
      answer: 'Tokens serve as a reward currency that mirrors RL rewards, enable community coordination (stake to spawn scenarios, sponsor challenges), provide governance (vote on environments, difficulty, upgrades), and ensure transparent on-chain scoring for benchmarks.',
    },
    {
      question: 'How do abilities and evolution work?',
      answer: 'As agents complete simulations successfully, they unlock new abilities like spatial_memory, rapid_reflexes, advanced_grip, etc. These abilities enable progression to higher evolution stages, which grant new body forms and enhanced capabilities.',
    },
    {
      question: 'Why do soccer/dungeon/walker/pushblock matter?',
      answer: 'Each simulation tests different cognitive and physical capabilities. Soccer tests multi-agent coordination, dungeon explores spatial reasoning, walker develops locomotion, and pushblock challenges physics understanding. Together, they create a comprehensive test of AI capabilities.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply visit the demo page, select an AI model (ChatGPT, Claude, Grok, or Gemini), choose a simulation, and watch your agent learn and evolve in real-time. No installation required!',
    },
    {
      question: 'Is this free to use?',
      answer: 'Yes! machinaRL is completely free to use. You can run simulations, track progress, and compete on leaderboards without any cost.',
    },
    {
      question: 'Can I contribute to the project?',
      answer: 'Absolutely! We welcome contributions. Check out our GitHub repository for ways to contribute, from adding new simulations to improving the platform.',
    },
    {
      question: 'What technology powers the simulations?',
      answer: 'The platform is built with Next.js, TypeScript, and Tailwind CSS. Simulations are powered by Unity ML-Agents with WebGL builds, providing realistic 3D physics and environments.',
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about machinaRL
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <AsciiPanel key={index} className="mb-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold font-mono text-gray-900 mb-2">
                  Q: {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </AsciiPanel>
          ))}
        </div>

        <div className="mt-12 text-center">
          <AsciiPanel className="max-w-2xl mx-auto">
            <h3 className="text-lg font-bold font-mono text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-700 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" href="/demo">
                [ TRY DEMO ]
              </Button>
              <Button variant="secondary" href="https://github.com/machinarl/machinaRL/discussions">
                [ ASK COMMUNITY ]
              </Button>
              <Button variant="info" href="/docs">
                [ READ DOCS ]
              </Button>
            </div>
          </AsciiPanel>
        </div>
      </div>
    </div>
  );
}