// Simple backup script using SQLite directly
import Database from 'better-sqlite3'
import fs from 'fs'

try {
  console.log('Reading current site-settings from database...')
  
  // Open the SQLite database
  const db = new Database('./cms.db')
  
  // Query the site_settings table
  const siteSettings = db.prepare('SELECT * FROM site_settings').all()
  
  if (siteSettings.length > 0) {
    // Create backup
    const backup = {
      timestamp: new Date().toISOString(),
      siteSettings: siteSettings[0] // Should only be one row
    }
    
    // Write to file
    const filename = `site-settings-backup-${new Date().toISOString().split('T')[0]}.json`
    fs.writeFileSync(filename, JSON.stringify(backup, null, 2))
    
    console.log(`✅ Site settings backed up to: ${filename}`)
    console.log('Current site settings:')
    console.log(JSON.stringify(siteSettings[0], null, 2))
  } else {
    console.log('No site settings found in database')
  }
  
  db.close()
} catch (error) {
  console.error('❌ Backup failed:', error.message)
  
  // If better-sqlite3 is not available, let's just note the important fields to preserve
  console.log('\n📝 Since backup failed, please note these important fields before migration:')
  console.log('- Site Title')
  console.log('- Site Description') 
  console.log('- Home Hero Title/Description')
  console.log('- Contact Email')
  console.log('- Footer Text')
  console.log('- Any uploaded logo')
}