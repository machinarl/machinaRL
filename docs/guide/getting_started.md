# Getting Started with machinaRL

This guide will help you set up your development environment and get machinaRL running locally.

## Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git
- Unity 2022.3+ (for simulation development)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/machinarl/machinaRL.git
   cd machinaRL
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env/.env.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
machinaRL/
├── src/                    # Source code
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── data/             # Static data and configurations
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── public/               # Static assets
│   └── unity/           # Unity WebGL builds
├── docs/                 # Documentation
├── scripts/              # Development scripts
├── docker/               # Docker configuration
└── .github/              # GitHub Actions workflows
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run setup` - Initial project setup
- `npm run seed` - Seed demo data

## Next Steps

- [Unity Integration](unity_integration.md) - Learn how to integrate Unity simulations
- [API Reference](../reference/api.md) - Explore the API endpoints
- [Simulation Guide](simulations.md) - Understand the simulation system
