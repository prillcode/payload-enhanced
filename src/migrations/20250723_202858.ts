import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_home_page_slider_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_home_page_slider_slides_order_idx\` ON \`site_settings_home_page_slider_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_home_page_slider_slides_parent_id_idx\` ON \`site_settings_home_page_slider_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_home_page_slider_slides_image_idx\` ON \`site_settings_home_page_slider_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_social_links_order_idx\` ON \`site_settings_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_social_links_parent_id_idx\` ON \`site_settings_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_title\` text DEFAULT 'Custom Site Title' NOT NULL,
  	\`site_description\` text DEFAULT 'Set Site Title and Description in Admin Panel' NOT NULL,
  	\`show_site_description_in_header\` integer DEFAULT true,
  	\`site_logo_id\` integer,
  	\`hide_site_title_if_logo\` integer DEFAULT true,
  	\`primary_color\` text,
  	\`home_hero_title\` text DEFAULT 'Explore the Great Outdoors' NOT NULL,
  	\`home_hero_description\` text DEFAULT 'Discover peaceful retreats and thrilling adventures in the heart of nature.',
  	\`home_hero_intro_text\` text DEFAULT 'NOTE: Customize the Hero content in the Admin Panel. Ex: Welcome to Great Outdoors, where adventure meets comfort in the heart of nature. We connect people with unforgettable outdoor experiences...',
  	\`home_activities_section_display_section\` integer DEFAULT true,
  	\`home_activities_section_title\` text DEFAULT 'Popular Activities' NOT NULL,
  	\`home_activities_section_description\` text DEFAULT 'Experience the thrill of outdoor adventures with our carefully curated selection of activities. From heart-pumping adventures to peaceful nature experiences, there is something for everyone.',
  	\`home_activities_section_number_of_items\` numeric DEFAULT 3 NOT NULL,
  	\`home_accommodations_section_display_section\` integer DEFAULT true,
  	\`home_accommodations_section_title\` text DEFAULT 'Available Lodging' NOT NULL,
  	\`home_accommodations_section_description\` text DEFAULT 'Explore our range of comfortable and scenic accommodations, perfect for your next getaway.',
  	\`home_accommodations_section_number_of_items\` numeric DEFAULT 3 NOT NULL,
  	\`home_call_to_action_section_display_section\` integer DEFAULT true,
  	\`home_call_to_action_section_title\` text DEFAULT 'Ready for Your Next Adventure?' NOT NULL,
  	\`home_call_to_action_section_description\` text DEFAULT 'Book your stay now and experience the beauty of nature with comfortable accommodations.',
  	\`home_call_to_action_section_button_text\` text DEFAULT 'Contact Us Today' NOT NULL,
  	\`home_call_to_action_section_button_link\` text DEFAULT '/pages/contact' NOT NULL,
  	\`contact_email\` text,
  	\`footer_text\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`site_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_site_logo_idx\` ON \`site_settings\` (\`site_logo_id\`);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`show_in_navigation\` integer DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_home_page_slider_slides\`;`)
  await db.run(sql`DROP TABLE \`site_settings_social_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`show_in_navigation\`;`)
}
