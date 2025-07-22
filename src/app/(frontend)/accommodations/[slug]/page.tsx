import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Link from 'next/link'
import {
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import config from '@/payload.config'
import Hero from '../../_components/Hero'

type AccommodationDetailPageProps = {
  params: {
    slug: string
  }
}

export default async function AccommodationDetailPage({ params }: AccommodationDetailPageProps) {
  const { slug } = params
  const payload = await getPayload({ config: await config })

  const accommodationResponse = await payload.find({
    collection: 'accommodations',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const accommodation = accommodationResponse.docs[0]

  // If accommodation not found, show 404
  if (!accommodation) {
    notFound()
  }

  // Build details array for hero
  const heroDetails = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      text: accommodation.rentalType,
    },
    ...(accommodation.maxGuests
      ? [
          {
            icon: <UserGroupIcon className="w-5 h-5" />,
            text: `Up to ${accommodation.maxGuests} guests`,
          },
        ]
      : []),
    ...(accommodation.pricePerNight
      ? [
          {
            icon: <CurrencyDollarIcon className="w-5 h-5" />,
            text: `$${accommodation.pricePerNight} per night`,
          },
        ]
      : []),
    ...(accommodation.location
      ? [
          {
            icon: <MapPinIcon className="w-5 h-5" />,
            text: `${accommodation.location.city}, ${accommodation.location.state}`,
          },
        ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title={accommodation.name}
        gradient="from-earth-300 to-earth-600"
        height="tall"
        variant="detailed"
        showBackButton={true}
        backButtonText="Back to Accommodations"
        backButtonHref="/accommodations"
        details={heroDetails}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <section className="mb-12">
              <div className="bg-earth-100 rounded-lg overflow-hidden">
                {accommodation.images && accommodation.images.length > 0 ? (
                  <div className="h-96 bg-earth-200 flex items-center justify-center">
                    <span className="text-earth-600">Accommodation Image Gallery</span>
                  </div>
                ) : (
                  <div className="h-96 bg-earth-200 flex items-center justify-center">
                    <span className="text-earth-600">No Images Available</span>
                  </div>
                )}
              </div>
            </section>

            {/* Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">About This Place</h2>
              <div className="prose prose-lg max-w-none text-earth-700">
                <p>
                  {accommodation.description && typeof accommodation.description === 'string'
                    ? accommodation.description
                    : 'Experience comfort and tranquility in this beautiful accommodation nestled in nature.'}
                </p>
              </div>
            </section>

            {/* Property Details */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-earth-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-forest-700 mb-2">Property Type</h4>
                  <p className="text-earth-600 capitalize">{accommodation.rentalType}</p>
                </div>

                <div className="bg-white border border-earth-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-forest-700 mb-2">Maximum Guests</h4>
                  <p className="text-earth-600">{accommodation.maxGuests} people</p>
                </div>

                <div className="bg-white border border-earth-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-forest-700 mb-2">Bedrooms</h4>
                  <p className="text-earth-600">
                    {accommodation.bedrooms} bedroom{accommodation.bedrooms !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="bg-white border border-earth-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-forest-700 mb-2">Bathrooms</h4>
                  <p className="text-earth-600">
                    {accommodation.bathrooms} bathroom{accommodation.bathrooms !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">Amenities</h2>
              {accommodation.amenities && accommodation.amenities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {accommodation.amenities.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center text-earth-700 bg-earth-50 p-3 rounded-lg"
                    >
                      <span className="mr-3 text-forest-600">✓</span>
                      {item.amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-earth-500">No amenities listed.</p>
              )}
            </section>

            {/* Location */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">Location</h2>
              <div className="bg-earth-50 p-6 rounded-lg">
                {accommodation.location && (
                  <div className="text-earth-700">
                    {accommodation.location.address && (
                      <p className="font-medium mb-2">{accommodation.location.address}</p>
                    )}
                    {accommodation.location.city && accommodation.location.state && (
                      <p>
                        {accommodation.location.city}, {accommodation.location.state}{' '}
                        {accommodation.location.zipCode}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white border border-earth-200 rounded-lg p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-forest-800 mb-4">Book This Stay</h3>

              {accommodation.pricePerNight && (
                <div className="mb-4">
                  <span className="text-3xl font-bold text-forest-800">
                    ${accommodation.pricePerNight}
                  </span>
                  <span className="text-earth-600 ml-2">per night</span>
                </div>
              )}

              <div className="space-y-3 mb-6 text-sm text-earth-600">
                <div className="flex justify-between">
                  <span>Property Type:</span>
                  <span className="font-medium capitalize">{accommodation.rentalType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Guests:</span>
                  <span className="font-medium">{accommodation.maxGuests} people</span>
                </div>
                <div className="flex justify-between">
                  <span>Bedrooms:</span>
                  <span className="font-medium">{accommodation.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bathrooms:</span>
                  <span className="font-medium">{accommodation.bathrooms}</span>
                </div>
              </div>

              {accommodation.available ? (
                <Link
                  href="/pages/contact"
                  className="w-full btn-primary text-center py-3 px-6 text-lg block"
                >
                  Inquire Now
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full bg-earth-300 text-earth-500 py-3 px-6 text-lg rounded cursor-not-allowed"
                >
                  Currently Unavailable
                </button>
              )}

              <p className="text-xs text-earth-500 mt-4 text-center">
                Contact us for special rates and availability
              </p>
            </div>

            {/* Property Highlights */}
            <div className="bg-earth-50 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-forest-800 mb-4">Property Highlights</h3>
              <ul className="space-y-2 text-sm text-earth-700">
                <li>• Peaceful natural setting</li>
                <li>• Clean and well-maintained</li>
                <li>• Easy check-in process</li>
                <li>• Local area recommendations</li>
                <li>• 24/7 emergency contact</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Accommodations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-forest-800 mb-8">
            Other Accommodations You Might Like
          </h2>
          <div className="text-center">
            <Link href="/accommodations" className="btn-accent inline-block">
              View All Accommodations
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

// Generate static params for build optimization
export async function generateStaticParams() {
  const payload = await getPayload({ config: await config })

  const accommodations = await payload.find({
    collection: 'accommodations',
    limit: 1000,
  })

  return accommodations.docs.map((accommodation) => ({
    slug: accommodation.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: AccommodationDetailPageProps) {
  const payload = await getPayload({ config: await config })

  const accommodationResponse = await payload.find({
    collection: 'accommodations',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
  })

  const accommodation = accommodationResponse.docs[0]

  if (!accommodation) {
    return {
      title: 'Accommodation Not Found',
    }
  }

  const description =
    accommodation.description && typeof accommodation.description === 'string'
      ? accommodation.description
      : `Stay at ${accommodation.name} - a beautiful ${accommodation.rentalType} in ${accommodation.location?.city || 'nature'}. Perfect for your outdoor adventure.`

  const location = accommodation.location
    ? `${accommodation.location.city}, ${accommodation.location.state}`
    : 'Great Outdoors'

  return {
    title: `${accommodation.name} | ${location} | Great Outdoors`,
    description,
    keywords: [
      accommodation.name,
      accommodation.rentalType,
      accommodation.location?.city,
      accommodation.location?.state,
      'accommodations',
      'vacation rental',
      'outdoor lodging',
      'nature retreat',
    ].filter(Boolean),
    openGraph: {
      title: `${accommodation.name} - ${accommodation.rentalType}`,
      description,
      type: 'website',
    },
  }
}
