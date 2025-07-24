import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import React from 'react'
import ActivityList from './(components)/ActivityList'
import AccommodationList from './(components)/AccommodationList'
import '../globals.css'

export default async function HomePage() {
  let siteSettings: any = {}
  
  try {
    // Initialize Payload with the config
    const payload = await getPayload({ config: await config })
    // Fetch the site settings global
    siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  } catch (error) {
    console.warn('Could not load site settings for homepage:', error.message)
  }

  const {
    homeHeroTitle = 'Welcome to Our Site',
    homeHeroDescription = 'Discover amazing experiences',
    homeHeroIntroText = 'Explore our offerings and find what you\'re looking for.',
    homeActivitiesSection,
    homeAccommodationsSection,
    homeCallToActionSection,
    homePageSlider,
  } = siteSettings

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-forest-600 to-forest-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="homeHeroTitle" className="text-4xl md:text-6xl font-bold mb-6">
              {homeHeroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              <span id="homeHeroDescription">{homeHeroDescription}</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/accommodations" className="btn-primary text-center py-3 px-6 text-lg">
                Lodging Options
              </Link>
              <Link href="/activities" className="btn-secondary text-center py-3 px-6 text-lg">
                Browse Activities
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Introduction Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 border-forest-900/20">
          <p className="text-lg md:text-xl text-forest-600/90 max-w-4xl mx-auto leading-relaxed">
            <span id="homeHeroIntroText">{homeHeroIntroText}</span>
          </p>
        </div>
      </section>
      {homePageSlider?.slides && homePageSlider.slides.length > 0 && (
        <section className="my-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto">
              {homePageSlider.slides.map((slide, idx) => {
                // Type guard to check if image is a Media object
                const imageObj = typeof slide.image === 'object' ? slide.image : null
                return (
                  <div key={imageObj?.id || idx} className="min-w-[300px] max-w-md flex-shrink-0">
                    <div className="aspect-[16/9] bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                      {imageObj?.url && (
                        <img
                          src={imageObj.url}
                          alt={slide.caption || `Slide ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    {slide.caption && (
                      <div className="text-center text-sm mt-2 text-gray-700">{slide.caption}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Activities Section (dynamic) */}
      {homeActivitiesSection?.displaySection && (
        <section className="py-16 bg-earth-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-earth-800 mb-12">
              {homeActivitiesSection.title}
            </h3>
            {homeActivitiesSection.description && (
              <p className="text-lg text-earth-600 text-center max-w-3xl mx-auto mb-12">
                {homeActivitiesSection.description}
              </p>
            )}
            <ActivityList
              limit={homeActivitiesSection.numberOfItems ?? 3}
              featuredOnly={true}
              showViewAllButton={true}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            />
          </div>
        </section>
      )}
      {/* Accommodations Section (dynamic) */}
      {homeAccommodationsSection?.displaySection && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-earth-800 mb-12">
              {homeAccommodationsSection.title}
            </h2>
            {homeAccommodationsSection.description && (
              <p className="text-lg text-earth-600 text-center max-w-3xl mx-auto mb-12">
                {homeAccommodationsSection.description}
              </p>
            )}
            <AccommodationList
              limit={homeAccommodationsSection.numberOfItems ?? 3}
              availableOnly={true}
              showViewAllButton={true}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            />
          </div>
        </section>
      )}
      {/* Call to Action */}
      {homeCallToActionSection?.displaySection && (
        <section className="py-16 bg-gradient-to-r from-forest-600 to-forest-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{homeCallToActionSection.title}</h2>
            {homeCallToActionSection.description && (
              <p className="text-xl max-w-2xl mx-auto mb-8">
                {homeCallToActionSection.description}
              </p>
            )}
            {homeCallToActionSection.buttonLink && homeCallToActionSection.buttonText && (
              <Link
                href={homeCallToActionSection.buttonLink}
                className="btn-accent text-center py-3 px-6 text-lg"
              >
                {homeCallToActionSection.buttonText}
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
