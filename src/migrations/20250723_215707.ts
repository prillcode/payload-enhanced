import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`accommodations\` RENAME COLUMN "description" TO "page_content";`)
  await db.run(sql`ALTER TABLE \`activities\` RENAME COLUMN "description" TO "page_content";`)
  await db.run(sql`ALTER TABLE \`accommodations\` ADD \`short_description\` text;`)
  await db.run(sql`ALTER TABLE \`activities\` ADD \`short_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`accommodations\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`accommodations\` DROP COLUMN \`short_description\`;`)
  await db.run(sql`ALTER TABLE \`accommodations\` DROP COLUMN \`page_content\`;`)
  await db.run(sql`ALTER TABLE \`activities\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`activities\` DROP COLUMN \`short_description\`;`)
  await db.run(sql`ALTER TABLE \`activities\` DROP COLUMN \`page_content\`;`)
}
