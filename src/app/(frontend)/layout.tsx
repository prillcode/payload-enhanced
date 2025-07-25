import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import '../globals.css'
import Link from 'next/link'
import Header from './(components)/Header'
import Footer from './(components)/Footer'
import { getSafeMetadata, getSafeSettings } from '@/lib/siteSettings'

export async function generateMetadata() {
  const metadata = await getSafeMetadata()
  return {
    title: metadata.title,
    description: metadata.description,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let activities: any = { totalDocs: 0 }
  let accommodations: any = { totalDocs: 0 }
  let pages: any = { docs: [] }

  // Get site settings with safe fallbacks
  const siteSettings = await getSafeSettings()

  try {
    const payload = await getPayload({ config: await config })

    // Fetch counts for Activities, Accommodations, and published Pages
    const results = await Promise.all([
      payload.find({ collection: 'activities', limit: 1 }).catch(() => ({ totalDocs: 0 })),
      payload.find({ collection: 'accommodations', limit: 1 }).catch(() => ({ totalDocs: 0 })),
      payload.find({
        collection: 'pages',
        where: { status: { equals: 'published' } },
        limit: 10,
      }).catch(() => ({ docs: [] })),
    ])
    
    activities = results[0]
    accommodations = results[1]
    pages = results[2]
  } catch (error) {
    console.warn('Could not load collection data for layout:', error instanceof Error ? error.message : String(error))
  }

  const siteTitle = siteSettings.siteTitle?.trim() || 'Custom Site Title'
  const siteDescription =
    siteSettings.siteDescription?.trim() || 'Set Site Title and Description in Admin Panel'
  const showSiteDescription = siteSettings.showSiteDescriptionInHeader ?? true
  const hideSiteTitleIfLogo = siteSettings.hideSiteTitleIfLogo ?? false
  const socialLinks = siteSettings.socialLinks || []

  // Build navLinks - only include if there are items in the collection
  const navLinks = [
    { name: 'Home', path: '/' },
    ...(activities.totalDocs > 0 ? [{ name: 'Activities', path: '/activities' }] : []),
    ...(accommodations.totalDocs > 0 ? [{ name: 'Lodging', path: '/accommodations' }] : []),
    ...pages.docs
      .filter((page: any) => page.showInNavigation) // Filter out pages not marked to show in navigation
      .map((page: any) => ({
        name: page.title,
        path: `/pages/${page.slug}`,
      })),
  ]

  // Handle siteLogo which can be an object or a string, or not set at all
  const rawLogo = siteSettings.siteLogo
  let siteLogo: { url: string } | string | null = null
  // ensure that if rawLogo.url is undefined or null, then null is passed to Header (not an object with an undefined url).
  if (
    rawLogo &&
    typeof rawLogo === 'object' &&
    'url' in rawLogo &&
    typeof rawLogo.url === 'string' &&
    rawLogo.url
  ) {
    siteLogo = { url: rawLogo.url }
  } else if (typeof rawLogo === 'string') {
    siteLogo = rawLogo
  } else {
    siteLogo = null
  }

  // Render the Layout with Header and Footer
  return (
    <html lang="en">
      <body>
        <Header
          siteLogo={siteLogo}
          siteTitle={siteTitle}
          siteDescription={siteDescription}
          showSiteDescription={showSiteDescription}
          hideSiteTitleIfLogo={hideSiteTitleIfLogo}
          navLinks={navLinks} // Pass navLinks as a prop
        />
        <main>{children}</main>
        <Footer
          siteTitle={siteTitle}
          siteDescription={siteDescription}
          navLinks={navLinks}
          socialLinks={socialLinks}
        />
      </body>
    </html>
  )
}
