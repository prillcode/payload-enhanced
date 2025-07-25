import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_from_email\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_from_name\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_smtp_host\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_smtp_port\` numeric DEFAULT 587;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_smtp_user\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_smtp_password\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`email_settings_enable_t_l_s\` integer DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_from_email\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_from_name\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_smtp_host\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_smtp_port\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_smtp_user\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_smtp_password\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`email_settings_enable_t_l_s\`;`)
}
