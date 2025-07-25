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

The `package.json` start script automatically runs migrations before starting:
```json
"start": "payload migrate && next start"
```

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