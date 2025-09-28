# Secrets Template

This file documents the required secrets and environment variables for the machinaRL platform.

## Required Secrets

### Application Secrets
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js authentication
- `NEXTAUTH_URL`: Base URL for the application

### Database
- `DATABASE_URL`: Database connection string (if using external database)

### External APIs (Optional)
- `OPENAI_API_KEY`: OpenAI API key for ChatGPT integration
- `ANTHROPIC_API_KEY`: Anthropic API key for Claude integration
- `GOOGLE_API_KEY`: Google API key for Gemini integration

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in the required values
3. Never commit `.env.local` to version control

## Production Secrets

For production deployment, set these as environment variables in your hosting platform:

- Vercel: Use the Vercel dashboard
- Netlify: Use Netlify environment variables
- Docker: Use Docker secrets or environment files

## Security Notes

- Keep all secrets secure and never expose them in client-side code
- Use different secrets for development, staging, and production
- Rotate secrets regularly
- Monitor for unauthorized access
