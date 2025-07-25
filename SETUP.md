# PostgreSQL Development Setup

This project now uses PostgreSQL for both local development and production to ensure migration compatibility.

## Quick Start

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Start PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Run initial migration and seed:**
   ```bash
   pnpm payload migrate:fresh
   pnpm seed
   ```

5. **Start development server:**
   ```bash
   pnpm dev
   ```

## Database Management

### Fresh Database Setup
```bash
# Stop and remove existing containers/volumes
docker-compose down -v

# Start fresh database
docker-compose up -d

# Create schema and seed data
pnpm payload migrate:fresh
pnpm seed
```

### Schema Changes
When you modify collections or globals:

1. **Create migration:**
   ```bash
   pnpm payload migrate:create
   ```

2. **Apply migration:**
   ```bash
   pnpm payload migrate
   ```

3. **Generate new types:**
   ```bash
   pnpm payload generate:types
   ```

## Production Deployment

### Coolify (Recommended)

This template includes `nixpacks.toml` configuration for seamless Coolify deployments:

**Before First Deployment:**
```bash
# Generate initial migration (CRITICAL STEP)
pnpm payload migrate:create

# Commit the migration files
git add src/migrations/
git commit -m "Add initial database migration"
git push
```

**Coolify Configuration:**
1. **Connect repository** to Coolify
2. **Set environment variables**: `DATABASE_URI`, `PAYLOAD_SECRET`, etc.
3. **Leave "Start Command" blank** - `nixpacks.toml` handles everything
4. **Deploy** - Coolify automatically:
   - Installs pnpm v9+ (resolves compatibility issues)
   - Builds Next.js application
   - Runs `pnpm payload migrate` before starting server
   - Starts application on port 3000

**Adding Sample Data (Optional):**
After successful deployment, populate with sample content via Coolify Terminal:
```bash
pnpm seed
```
This adds sample accommodations, activities, pages, and site settings from `/sample-data` directory.

### Other Platforms

The `package.json` start script automatically runs migrations before starting:
```json
"start": "payload migrate && next start"
```

**Critical**: Always run `pnpm payload migrate:create` locally and commit migration files before deploying.

This ensures:
- ✅ Fresh deployments create all tables
- ✅ Existing deployments apply new migrations
- ✅ No data loss on schema updates

## Database Credentials

**Local Development:**
- Host: localhost:5432
- Database: payload_dev
- User: payload_user
- Password: dev_password_123

**Production:**
Set `DATABASE_URI` environment variable to your PostgreSQL connection string.

## Troubleshooting

**Database connection issues:**
```bash
# Check if PostgreSQL is running
docker-compose ps

# View database logs
docker-compose logs postgres

# Reset database completely
docker-compose down -v && docker-compose up -d
```

**Migration issues:**
```bash
# Reset to clean state
pnpm payload migrate:fresh
pnpm seed
```