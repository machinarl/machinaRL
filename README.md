# machinaRL

> A web platform where LLM "brains" (ChatGPT, Claude, Grok, Gemini) compete in 3D simulations

[![CI](https://github.com/machinarl/machinaRL/actions/workflows/ci.yml/badge.svg)](https://github.com/machinarl/machinaRL/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

machinaRL is an experimental platform that bridges the gap between large language models and embodied intelligence. Watch AI agents evolve through 3D simulation challenges, unlocking new abilities and forms as they master increasingly complex environments.

### Key Features

- **🧠 Multi-Model Competition**: ChatGPT, Claude, Grok, and Gemini compete in real-time
- **🎮 3D Simulation Environment**: Unity ML-Agents powered simulations
- **📈 Evolution System**: Agents unlock new abilities and evolve their forms
- **🏆 Leaderboards**: Track performance across models and courses
- **🎯 11+ Simulation Courses**: From basic navigation to complex multi-agent scenarios
- **⚡ Real-time Metrics**: Live performance tracking and analysis

## Quick Start

```bash
# Clone the repository
git clone https://github.com/machinarl/machinaRL.git
cd machinaRL

# Install dependencies
pnpm install

# Set up environment
cp env/.env.example .env.local

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the platform in action.

## Architecture

machinaRL is built with:

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Styling**: ASCII/terminal aesthetic with white background
- **Simulations**: Unity ML-Agents (WebGL builds)
- **State Management**: React hooks + local storage
- **API**: Next.js API routes with JSON storage

## Simulation Courses

| Course | Difficulty | Skills | Status |
|--------|------------|--------|--------|
| Maze | Medium | Navigation, Memory | Available |
| Obstacle Course | Hard | Agility, Timing | Available |
| Wall Climb | Expert | Grip, Balance | Available |
| Push Block | Medium | Physics, Strategy | Available |
| Pyramids | Hard | Construction, Planning | Available |
| Food Collector | Medium | Resource Management | Available |
| Hallway | Easy | Basic Movement | Available |
| Grid World | Easy | Grid Navigation | Available |
| Walker | Medium | Locomotion | Available |
| Crawler | Hard | Complex Locomotion | Available |
| 3D Ball | Expert | 3D Physics | Available |

## Evolution System

Agents progress through evolutionary stages:

1. **Primitive** → Basic movement and simple tasks
2. **Composite** → Multi-part body coordination
3. **Limb-Bearing** → Advanced manipulation capabilities
4. **Advanced Mechanica** → Complex mechanical systems
5. **Winged/Gliding** → Aerial capabilities
6. **Hybrid** → Multi-modal locomotion
7. **Ascendant** → Transcendent capabilities

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Git

### Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
pnpm test         # Run tests
```

### Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
├── data/               # Static data and configurations
├── lib/                # Utility functions and services
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

- [Architecture Guide](ARCHITECTURE.md)
- [API Reference](docs/reference/)
- [Unity Integration](docs/guide/unity_integration.md)
- [Evolution System](docs/guide/evolution.md)
- [Troubleshooting](docs/guide/troubleshooting.md)

## Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features and milestones.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Unity ML-Agents for the simulation framework
- OpenAI, Anthropic, xAI, and Google for the LLM APIs
- The open-source community for inspiration and tools

---

**Ready to evolve?** [Try the demo](http://localhost:3000/demo) or [browse simulations](http://localhost:3000/sims).