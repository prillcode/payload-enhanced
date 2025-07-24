#!/usr/bin/env node

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Import collections from parent directory
const collectionsPath = path.resolve(__dirname, '../src/collections')

// Dynamic imports for collections
const Users = (await import(`${collectionsPath}/Users.js`)).default
const Media = (await import(`${collectionsPath}/Media.js`)).default  
const Accommodations = (await import(`${collectionsPath}/Accommodations.js`)).default
const Activities = (await import(`${collectionsPath}/Activities.js`)).default
const Pages = (await import(`${collectionsPath}/Pages.js`)).Pages

// Import globals
const SiteSettings = (await import(path.resolve(__dirname, '../src/globals/SiteSettings.js'))).default

// PostgreSQL adapter for production
const databaseAdapter = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
  },
})

// Build Payload config for migration service
const config = buildConfig({
  admin: {
    user: Users.slug,
  },
  globals: [SiteSettings],
  collections: [Users, Accommodations, Activities, Media, Pages],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(__dirname, '../src/payload-types.ts'),
  },
  db: databaseAdapter,
  sharp,
})

async function runMigrationAndSeed() {
  console.log('🚀 Starting PostgreSQL migration and seeding for production...')
  console.log('Database URI:', process.env.DATABASE_URI?.replace(/:[^:@]+@/, ':***@')) // Hide password in logs

  try {
    // Step 1: Run migrations
    console.log('📝 Running PostgreSQL migrations...')
    const { getPayload } = await import('payload')
    const payload = await getPayload({ config })
    
    // This will run any pending migrations
    await payload.db.migrate()
    console.log('✅ Migrations completed successfully')

    // Step 2: Run seeding (using the existing seed script)
    console.log('🌱 Running database seeding...')
    const seedPath = path.resolve(__dirname, '../sample-data/seed.js')
    
    // Execute the seed script
    const { stdout, stderr } = await execAsync(`node "${seedPath}"`, {
      env: { ...process.env },
      cwd: path.resolve(__dirname, '..')
    })
    
    if (stdout) console.log('Seed output:', stdout)
    if (stderr) console.warn('Seed warnings:', stderr)
    
    console.log('✅ Database seeding completed successfully')
    console.log('🎉 Production database is ready for deployment!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration service failed:', error)
    process.exit(1)
  }
}

runMigrationAndSeed()