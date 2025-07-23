import { getPayload } from 'payload'
import config from './src/payload.config.ts'
import fs from 'fs'

async function backupSiteSettings() {
  try {
    console.log('Starting site-settings backup...')
    
    const payload = await getPayload({ config: await config })
    
    // Fetch the site-settings global
    const siteSettings = await payload.findGlobal({
      slug: 'site-settings'
    })
    
    // Create backup object
    const backup = {
      timestamp: new Date().toISOString(),
      globals: {
        'site-settings': siteSettings
      }
    }
    
    // Write to file
    const filename = `site-settings-backup-${new Date().toISOString().split('T')[0]}.json`
    fs.writeFileSync(filename, JSON.stringify(backup, null, 2))
    
    console.log(`✅ Site settings backed up to: ${filename}`)
    console.log('Site settings data:')
    console.log(JSON.stringify(siteSettings, null, 2))
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Backup failed:', error)
    process.exit(1)
  }
}

backupSiteSettings()