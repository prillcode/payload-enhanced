# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

**Note for Windows:** Use PowerShell for all commands: `powershell -Command "command here"`

### Development
- `pnpm dev` - Start development server (Next.js + Payload CMS)
- `pnpm devsafe` - Clean start (removes .next directory first)
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks
- `pnpm seed` - Seed database with sample data

### Database & Types
- `pnpm payload generate:types` - Generate TypeScript types from collections (run after schema changes)
- `pnpm payload migrate:create` - Create new migration
- `pnpm payload migrate` - Apply pending migrations
- `pnpm payload migrate:fresh` - Reset database (destroys all data)
- `pnpm payload export --output=./backup.json` - Export collection data
- `pnpm payload import --file=./backup.json` - Import collection data

### Testing
- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests (Vitest)
- `pnpm test:e2e` - Run end-to-end tests (Playwright)

## Architecture Overview

This is a **Next.js 15 + Payload CMS 3** application with the following structure:

### App Router Structure
```
src/app/
├── (frontend)/           # Public-facing website
│   ├── (components)/     # Reusable UI components
│   ├── accommodations/   # Lodging listings and details
│   ├── activities/       # Activity listings and details
│   ├── pages/[slug]/     # Dynamic CMS-managed pages
│   ├── layout.tsx        # Frontend layout with Header/Footer
│   └── page.tsx          # Homepage
└── (payload)/            # Payload CMS admin panel
    ├── admin/            # Admin UI routes
    └── api/              # Payload API endpoints
```

### Collections (CMS Content Types)
- **Users** - Admin authentication
- **Media** - File uploads with S3 cloud storage
- **Accommodations** - Lodging rentals with `shortDescription` (for listings/metadata) and optional `pageContent` (richText)
- **Activities** - Outdoor activities with `shortDescription` (for listings/metadata) and optional `pageContent` (richText)
- **Pages** - Custom CMS pages with rich content editor

### RichText Handling
- Activities and Accommodations use **two-tier content structure**:
  - `shortDescription` (required text) - Used in lists, cards, and metadata
  - `pageContent` (optional richText) - Additional content rendered below shortDescription on detail pages
- Use `LexicalRenderer` component to display richText `pageContent` with formatting
- Sample data only includes `shortDescription` - `pageContent` starts blank for admin users to populate

### Key Configuration Files
- `src/payload.config.ts` - Payload CMS configuration
- `src/collections/` - Collection schema definitions
- `src/globals/SiteSettings.ts` - Global site settings

## Development Workflow

### Making Schema Changes
1. Modify collection files in `src/collections/`
2. Run `pnpm payload generate:types` to update TypeScript definitions
3. Restart dev server to apply changes
4. If conflicts occur, use `pnpm payload migrate:fresh` (destroys data)
5. Re-seed with `pnpm seed` if needed

### Frontend Development
- Components use **Tailwind CSS** for styling
- **Server Components** by default (Next.js 15 App Router)
- Site settings are fetched globally in `layout.tsx`
- Navigation is dynamically built based on collection content

### CMS Admin Access
- Access admin panel at `http://localhost:3000/admin`
- First run requires creating an admin user
- Collections are immediately available to frontend after creation

## Database Configuration

### Local Development
- Uses **SQLite** (`cms.db` file)
- No additional database setup required

### Production
- Configure `DATABASE_URI` environment variable
- Supports PostgreSQL, MySQL, or MongoDB
- Use migration commands for schema changes

## Important Notes

- **Always run type generation** after collection schema changes
- **ESLint configuration** allows warnings for TypeScript issues but enforces code quality
- **Media uploads** are configured for S3 cloud storage in production
- **CORS and CSRF** are configured for local development ports
- **Sample data** is available via `pnpm seed` command