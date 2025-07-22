import { getPayload } from 'payload'
import config from '../src/payload.config.js'

console.log('Test script starting...')

const runScript = async () => {
  console.log('Getting payload instance...')

  try {
    const payload = await getPayload({ config })
    console.log('Payload instance obtained:', !!payload)

    const users = await payload.find({
      collection: 'users',
      limit: 1,
    })
    console.log('Found users:', users.docs.length)

    const accommodations = await payload.find({
      collection: 'accommodations',
      limit: 5,
    })
    console.log('Found accommodations:', accommodations.docs.length)

    console.log('Test completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error in test script:', error)
    process.exit(1)
  }
}

// Execute the script
runScript()
