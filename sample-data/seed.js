import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// Get the directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Helper to read JSON files from the same directory
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, filename)
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message)
    return { collections: {} }
  }
}

console.log('Seed script starting...')

const runSeed = async () => {
  console.log('Getting payload instance...')

  try {
    const payload = await getPayload({ config })
    console.log('Starting data import process...')

    // ----- ACCOMMODATIONS -----
    console.log('\nProcessing accommodations...')

    const existingAccommodations = await payload.find({
      collection: 'accommodations',
      limit: 1000,
    })

    const existingAccommodationNames = existingAccommodations.docs.map((acc) => acc.name)
    console.log(`Found ${existingAccommodationNames.length} existing accommodations`)

    const accommodationsData = readJsonFile('accommodations.json')

    const accommodationsToImport =
      accommodationsData.collections.accommodations?.filter(
        (acc) => !existingAccommodationNames.includes(acc.name),
      ) || []

    console.log(`Found ${accommodationsToImport.length} new accommodations to import`)

    let accommodationsInserted = 0
    for (const accommodation of accommodationsToImport) {
      try {
        const result = await payload.create({
          collection: 'accommodations',
          data: accommodation,
        })
        console.log(`Created: ${result.name}`)
        accommodationsInserted++
      } catch (error) {
        console.error(`Error creating ${accommodation.name}:`, error.message)
      }
    }

    // ----- ACTIVITIES -----
    console.log('\nProcessing activities...')

    const existingActivities = await payload.find({
      collection: 'activities',
      limit: 1000,
    })

    const existingActivityNames = existingActivities.docs.map((act) => act.name)
    console.log(`Found ${existingActivityNames.length} existing activities`)

    const activitiesData = readJsonFile('activities.json')

    const activitiesToImport =
      activitiesData.collections.activities?.filter(
        (act) => !existingActivityNames.includes(act.name),
      ) || []

    console.log(`Found ${activitiesToImport.length} new activities to import`)

    let activitiesInserted = 0
    for (const activity of activitiesToImport) {
      try {
        const result = await payload.create({
          collection: 'activities',
          data: activity,
        })
        console.log(`Created: ${activity.name}`)
        activitiesInserted++
      } catch (error) {
        console.error(`Error creating ${activity.name}:`, error.message)
      }
    }

    // ----- PAGES -----
    console.log('\nProcessing pages...')

    const existingPages = await payload.find({
      collection: 'pages',
      limit: 1000,
    })

    const existingPageSlugs = existingPages.docs.map((page) => page.slug)
    console.log(`Found ${existingPageSlugs.length} existing pages`)

    const pagesData = readJsonFile('pages.json')

    // Handle direct array format for pages.json
    const pagesToImport = Array.isArray(pagesData)
      ? pagesData.filter((page) => !existingPageSlugs.includes(page.slug))
      : pagesData.collections?.pages?.filter((page) => !existingPageSlugs.includes(page.slug)) || []

    console.log(`Found ${pagesToImport.length} new pages to import`)

    let pagesInserted = 0
    for (const page of pagesToImport) {
      try {
        const result = await payload.create({
          collection: 'pages',
          data: page,
        })
        console.log(`Created: ${result.title}`)
        pagesInserted++
      } catch (error) {
        console.error(`Error creating ${page.title}:`, error.message)
      }
    }

    // ----- SUMMARY -----
    console.log('\n===== IMPORT SUMMARY =====')
    console.log(`Accommodations: ${accommodationsInserted} inserted`)
    console.log(`Activities: ${activitiesInserted} inserted`)
    console.log('Import complete!')

    process.exit(0)
  } catch (error) {
    console.error('Error in seed script:', error)
    process.exit(1)
  }
}

// Execute the script
runSeed()
