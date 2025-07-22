import Link from 'next/link'
import React from 'react'
import ActivityList from './_components/ActivityList'
import AccommodationList from './_components/AccommodationList'
import '../globals.css'

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-forest-600 to-forest-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Explore Nature's Beauty</h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover peaceful retreats and thrilling adventures in the heart of nature.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/accommodations" className="btn-primary text-center py-3 px-6 text-lg">
                Lodging Options
              </Link>
              <Link href="/activities" className="btn-secondary text-center py-3 px-6 text-lg">
                Browse Activities
              </Link>
            </div>
            {/* Business Introduction */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Welcome to Great Outdoors, where adventure meets comfort in the heart of nature. We
                connect people with unforgettable outdoor experiences, offering everything from cozy
                mountain cabins to thrilling guided adventures. Whether you're seeking a peaceful
                retreat or an adrenaline-pumping escapade, we provide the perfect blend of natural
                beauty and modern comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-earth-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-earth-800 mb-12">
            Popular Activities
          </h2>
          <p className="text-lg text-earth-600 text-center max-w-3xl mx-auto mb-12">
            Experience the thrill of outdoor adventures with our carefully curated selection of
            activities. From heart-pumping adventures to peaceful nature experiences, there's
            something for everyone.
          </p>
          <ActivityList
            limit={3}
            featuredOnly={true}
            showViewAllButton={true}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          />
        </div>
      </section>

      {/* Available Accommodations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-earth-800 mb-12">
            Available Lodging
          </h2>
          <p className="text-lg text-earth-600 text-center max-w-3xl mx-auto mb-12">
            Relax and unwind in our comfortable accommodations, ranging from cozy cabins to luxury
            lodges. Each stay is designed to bring you closer to nature while providing modern
            comforts.
          </p>
          <AccommodationList
            limit={3}
            availableOnly={true}
            showViewAllButton={true}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-forest-600 to-forest-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Book your stay now and experience the beauty of nature with comfortable accommodations.
          </p>
          <Link href="/pages/contact" className="btn-accent text-center py-3 px-6 text-lg">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}
