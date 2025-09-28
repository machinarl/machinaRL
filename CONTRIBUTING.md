# Contributing to machinaRL

Thank you for your interest in contributing to machinaRL! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Coding Standards](#coding-standards)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/machinaRL.git
cd machinaRL

# Install dependencies
pnpm install

# Copy environment file
cp env/.env.example .env.local

# Start development server
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript checks
- `pnpm test` - Run tests
- `pnpm format` - Format code with Prettier

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── demo/              # Live simulation demo
│   ├── sims/              # Simulations gallery
│   ├── leaderboard/       # Leaderboard page
│   └── faq/               # FAQ page
├── components/            # React components
│   ├── AsciiPanel.tsx    # ASCII-styled panels
│   ├── Terminal.tsx       # Terminal component
│   ├── Button.tsx         # Button component
│   └── ...
├── data/                  # Static data
│   ├── sims.ts           # Simulation definitions
│   ├── leaderboard.json  # Leaderboard data
│   └── evolution.ts      # Evolution ladder data
├── lib/                   # Utility functions
│   ├── ascii.ts          # ASCII art utilities
│   ├── evolution.ts      # Evolution logic
│   └── storage.ts        # Data storage utilities
├── types/                 # TypeScript definitions
│   ├── sim.ts            # Simulation types
│   └── leaderboard.ts    # Leaderboard types
└── utils/                 # Helper functions
    └── guards.ts         # Type guards
```

## Contributing Guidelines

### Types of Contributions

- **Bug fixes** - Fix issues in existing code
- **Features** - Add new functionality
- **Documentation** - Improve or add documentation
- **Tests** - Add or improve test coverage
- **Performance** - Optimize existing code
- **UI/UX** - Improve user interface and experience

### Before You Start

1. Check existing issues and pull requests
2. Discuss major changes in an issue first
3. Ensure your changes align with the project's goals
4. Follow the existing code style and patterns

## Pull Request Process

### Creating a Pull Request

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Pull Request Guidelines

- Use clear, descriptive titles
- Provide a detailed description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all checks pass
- Request reviews from maintainers

### Commit Message Format

We use conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or auxiliary tool changes

Examples:
- `feat(sims): add new simulation course`
- `fix(api): resolve leaderboard sorting issue`
- `docs(readme): update installation instructions`

## Issue Guidelines

### Before Creating an Issue

1. Search existing issues to avoid duplicates
2. Check if the issue is already fixed in `main`
3. Gather relevant information

### Issue Types

- **Bug Report** - Use the bug report template
- **Feature Request** - Use the feature request template
- **Question** - For general questions
- **Documentation** - For documentation improvements

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use strict type checking

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement proper error boundaries

### Styling

- Use Tailwind CSS for styling
- Follow the ASCII/terminal aesthetic
- Maintain white background theme
- Use consistent spacing and typography

### Code Style

- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Write self-documenting code
- Add comments for complex logic

### File Organization

- Group related files together
- Use descriptive file names
- Follow the established directory structure
- Keep components small and focused

## Testing

### Writing Tests

- Write tests for new features
- Test edge cases and error conditions
- Maintain good test coverage
- Use descriptive test names

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Documentation

### Code Documentation

- Document complex functions and classes
- Use JSDoc for function documentation
- Keep README files up to date
- Update API documentation for changes

### User Documentation

- Write clear, concise documentation
- Include examples and code snippets
- Use proper markdown formatting
- Keep documentation current

## Release Process

1. All changes go through pull requests
2. Maintainers review and approve changes
3. Changes are merged to `main`
4. Releases are tagged and published
5. Release notes are generated

## Getting Help

- Check the [FAQ](docs/guide/troubleshooting.md)
- Search existing issues
- Join our community discussions
- Contact maintainers directly

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

Thank you for contributing to machinaRL! 🚀
