# Database Migration Service

This service handles PostgreSQL database migrations and seeding for the Payload CMS application in production environments.

## Purpose

- Runs before the main application deployment
- Creates database tables via Payload migrations
- Seeds the database with sample data
- Ensures the database is ready before the app starts building

## Environment Variables Required

```bash
DATABASE_URI=postgresql://user:password@host:port/database
PAYLOAD_SECRET=your-secret-key
```

## Deployment in Coolify

1. **Create New Service**
   - Type: "Docker Image"
   - Name: `payload-db-migration`

2. **Repository Settings**
   - Same repo as main app
   - Dockerfile path: `db-migration-service/Dockerfile`

3. **Environment Variables**
   - Set `DATABASE_URI` to your PostgreSQL connection string
   - Set `PAYLOAD_SECRET` to match your main app

4. **Deployment Order**
   - Deploy this service FIRST
   - Wait for it to complete successfully
   - Then deploy your main application

## Local Testing

```bash
cd db-migration-service
npm install
export DATABASE_URI="postgresql://..."
export PAYLOAD_SECRET="your-secret"
npm start
```

## Notes

- This service runs once and exits
- It should complete successfully before deploying the main app
- Logs will show migration and seeding progress
- If it fails, check database connection and credentials