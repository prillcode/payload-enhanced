import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
//import { uploadthingStorage } from '@payloadcms/storage-uploadthing'
//import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

// Create __dirname equivalent for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

import Users from './collections/Users'
import Media from './collections/Media'
import Accommodations from './collections/Accommodations'
import Activities from './collections/Activities'
import { Pages } from './collections/Pages'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
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
    'http://localhost:3000', // Your TanStack Start dev server
    'http://localhost:3001', // Alternative port
    'http://localhost:5173', // Vite dev server
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173', // Vite dev server
  ],
  plugins: [
    // For file uploads - choose one based on your needs
    // uploadthingStorage({
    //   collections: {
    //     media: true,
    //   },
    // }),
  ],
})
