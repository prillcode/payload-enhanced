# Manual Backup - Site Settings

If you want to preserve your current site settings before running `migrate:fresh`, please manually copy these values from your admin panel at `http://localhost:3000/admin/globals/site-settings`:

## Basic Settings
- **Site Title**: ________________
- **Site Description**: ________________
- **Contact Email**: ________________
- **Footer Text**: ________________

## Home Page Settings
- **Home Hero Title**: ________________
- **Home Hero Description**: ________________
- **Home Hero Intro Text**: ________________

## Section Settings
- **Activities Section Title**: ________________
- **Activities Section Description**: ________________
- **Accommodations Section Title**: ________________
- **Accommodations Section Description**: ________________
- **Call to Action Title**: ________________
- **Call to Action Description**: ________________
- **Call to Action Button Text**: ________________

## Media
- **Site Logo**: (if uploaded, note the filename/description)

---

**After migration**, these values will be restored automatically when you run `pnpm seed` thanks to the updated seed script that now includes site-settings!

The default values in `sample-data/site-settings.json` are good starting points, but you can customize them in the admin panel afterward.