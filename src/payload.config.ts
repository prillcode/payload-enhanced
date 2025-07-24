import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite' //used in local development
import { postgresAdapter } from '@payloadcms/db-postgres' //used in production
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'
import SiteSettings from './globals/SiteSettings'
import { s3Storage } from '@payloadcms/storage-s3'

// Create __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Default Payload Collections
import Users from './collections/Users'
import Media from './collections/Media'
// Custom Collections of this Template
import Accommodations from './collections/Accommodations'
import Activities from './collections/Activities'
import { Pages } from './collections/Pages'

// Determine database type based on DATABASE_URI format
// This allows builds to work in development with SQLite
const isPostgres = process.env.DATABASE_URI?.startsWith('postgres')

// Configure database adapter based on database URI format
const databaseAdapter = isPostgres
  ? postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI,
      },
    })
  : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URI || 'file:./cms.db',
      },
    })

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  globals: [SiteSettings],
  collections: [Users, Accommodations, Activities, Media, Pages],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: databaseAdapter,
  cors: [
    'http://localhost:3000', // Your Dev server
    'http://localhost:3001', // Dev server - Alternative port
    'http://localhost:5173', // Vite dev server (if custom front-end app)
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173', // Vite dev server
  ],
  sharp, // Add sharp for image processing
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET_NAME || 'your-default-bucket',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION || 'us-east-1',
      },
    }),
  ],
})
