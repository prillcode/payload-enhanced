import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
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
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./cms.db',
    },
  }),
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
