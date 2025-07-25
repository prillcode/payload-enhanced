import { getPayload } from 'payload'
import config from '@/payload.config'

// Default fallback values that match the SiteSettings schema defaults
const DEFAULT_SITE_SETTINGS = {
  siteTitle: 'Custom Site Title',
  siteDescription: 'Set Site Title and Description in Admin Panel',
  showSiteDescriptionInHeader: true,
  hideSiteTitleIfLogo: true,
  primaryColor: null,
  homeHeroTitle: 'Explore the Great Outdoors',
  homeHeroDescription: 'Discover peaceful retreats and thrilling adventures in the heart of nature.',
  homeHeroIntroText: 'NOTE: Customize the Hero content in the Admin Panel. Ex: Welcome to Great Outdoors, where adventure meets comfort in the heart of nature. We connect people with unforgettable outdoor experiences...',
  homePageSlider: { slides: [] },
  homeActivitiesSection: {
    displaySection: true,
    title: 'Popular Activities',
    description: 'Experience the thrill of outdoor adventures with our carefully curated selection of activities. From heart-pumping adventures to peaceful nature experiences, there is something for everyone.',
    numberOfItems: 3,
  },
  homeAccommodationsSection: {
    displaySection: true,
    title: 'Available Lodging',
    description: 'Explore our range of comfortable and scenic accommodations, perfect for your next getaway.',
    numberOfItems: 3,
  },
  homeCallToActionSection: {
    displaySection: true,
    title: 'Ready for Your Next Adventure?',
    description: 'Book your stay now and experience the beauty of nature with comfortable accommodations.',
    buttonText: 'Contact Us Today',
    buttonLink: '/pages/contact',
  },
  contactEmail: null,
  emailSettings: {
    fromEmail: null,
    fromName: null,
    smtpHost: null,
    smtpPort: 587,
    smtpUser: null,
    smtpPassword: null,
    enableTLS: true,
  },
  socialLinks: [],
  footerText: null,
  siteLogo: null,
}

/**
 * Safely fetches site settings with fallback to default values
 * This prevents build failures when the database or SiteSettings table doesn't exist yet
 */
export async function getSafeSettings() {
  try {
    const payload = await getPayload({ config: await config })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    return { ...DEFAULT_SITE_SETTINGS, ...siteSettings }
  } catch (error) {
    console.warn('Could not load site settings, using defaults:', error instanceof Error ? error.message : String(error))
    return DEFAULT_SITE_SETTINGS
  }
}

/**
 * Safely fetches only the basic site settings needed for metadata
 * This is optimized for generateMetadata functions that only need title/description
 */
export async function getSafeMetadata() {
  try {
    const payload = await getPayload({ config: await config })
    const siteSettings = await payload.findGlobal({ 
      slug: 'site-settings',
      // Only fetch the fields we need for metadata to reduce load
      select: {
        siteTitle: true,
        siteDescription: true,
      }
    })
    return {
      title: siteSettings.siteTitle?.trim() || DEFAULT_SITE_SETTINGS.siteTitle,
      description: siteSettings.siteDescription?.trim() || DEFAULT_SITE_SETTINGS.siteDescription,
    }
  } catch (error) {
    console.warn('Could not load site settings for metadata, using defaults:', error instanceof Error ? error.message : String(error))
    return {
      title: DEFAULT_SITE_SETTINGS.siteTitle,
      description: DEFAULT_SITE_SETTINGS.siteDescription,
    }
  }
}