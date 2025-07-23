import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ClockIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import config from '@/payload.config'
import Hero from '../../(components)/Hero'
import LexicalRenderer from '../../(components)/LexicalRenderer'

interface ActivityPageProps {
  params: Promise<{ slug: string }>
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const activityResponse = await payload.find({
    collection: 'activities',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const activity = activityResponse.docs[0]

  if (!activity) {
    notFound()
  }

  // Build details array for hero
  const heroDetails = [
    ...(activity.duration
      ? [
          {
            icon: <ClockIcon className="w-5 h-5" />,
            text: activity.duration,
          },
        ]
      : []),
    ...(activity.maxParticipants
      ? [
          {
            icon: <UserGroupIcon className="w-5 h-5" />,
            text: `Up to ${activity.maxParticipants} people`,
          },
        ]
      : []),
    ...(activity.pricePerPerson
      ? [
          {
            icon: <CurrencyDollarIcon className="w-5 h-5" />,
            text: `$${activity.pricePerPerson} per person`,
          },
        ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title={activity.name}
        gradient="from-forest-400 to-forest-800"
        height="tall"
        variant="detailed"
        showBackButton={true}
        backButtonText="Back to Activities"
        backButtonHref="/activities"
        details={heroDetails}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">About This Activity</h2>
              
              {/* Short Description */}
              <div className="prose prose-lg max-w-none text-earth-700 mb-6">
                <p>
                  {activity.shortDescription 
                    ? activity.shortDescription
                    : 'Join us for an exciting outdoor adventure experience that will create lasting memories.'}
                </p>
              </div>

              {/* Additional Page Content (if provided) */}
              {activity.pageContent && (
                <LexicalRenderer content={activity.pageContent} />
              )}
            </section>

            {/* Location */}
            {activity.location && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-forest-800 mb-6">Location</h2>
                <div className="bg-earth-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-forest-700 mb-2">{activity.location.name}</h3>
                  <p className="text-earth-600">
                    {activity.location.city}, {activity.location.state}
                  </p>
                </div>
              </section>
            )}

            {/* Additional Details */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-forest-800 mb-6">Activity Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activity.difficulty && (
                  <div className="bg-white border border-earth-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-700 mb-2">Difficulty Level</h4>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        activity.difficulty === 'easy'
                          ? 'bg-green-100 text-green-800'
                          : activity.difficulty === 'moderate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : activity.difficulty === 'challenging'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-earth-100 text-earth-800'
                      }`}
                    >
                      {activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1)}
                    </span>
                  </div>
                )}

                {activity.minAge && (
                  <div className="bg-white border border-earth-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-700 mb-2">Minimum Age</h4>
                    <p className="text-earth-600">{activity.minAge} years old</p>
                  </div>
                )}

                {activity.season && (
                  <div className="bg-white border border-earth-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-700 mb-2">Best Season</h4>
                    <p className="text-earth-600 capitalize">{activity.season}</p>
                  </div>
                )}

                {activity.activityType && (
                  <div className="bg-white border border-earth-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-forest-700 mb-2">Activity Type</h4>
                    <p className="text-earth-600 capitalize">{activity.activityType}</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white border border-earth-200 rounded-lg p-6 shadow-lg sticky top-6">
              <h3 className="text-xl font-bold text-forest-800 mb-4">Book This Activity</h3>

              {activity.pricePerPerson && (
                <div className="mb-4">
                  <span className="text-3xl font-bold text-forest-800">
                    ${activity.pricePerPerson}
                  </span>
                  <span className="text-earth-600 ml-2">per person</span>
                </div>
              )}

              <div className="space-y-3 mb-6 text-sm text-earth-600">
                {activity.duration && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{activity.duration}</span>
                  </div>
                )}
                {activity.maxParticipants && (
                  <div className="flex justify-between">
                    <span>Max Group Size:</span>
                    <span>{activity.maxParticipants} people</span>
                  </div>
                )}
                {activity.minAge && (
                  <div className="flex justify-between">
                    <span>Minimum Age:</span>
                    <span>{activity.minAge} years</span>
                  </div>
                )}
              </div>

              {activity.available ? (
                <Link
                  href="/pages/contact"
                  className="w-full btn-primary text-center py-3 px-6 text-lg block"
                >
                  Get More Info
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
                Contact us for availability and custom bookings
              </p>
            </div>

            {/* Quick Facts */}
            <div className="bg-earth-50 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-forest-800 mb-4">Quick Facts</h3>
              <ul className="space-y-2 text-sm text-earth-700">
                <li>• All equipment provided</li>
                <li>• Experienced guides</li>
                <li>• Small group sizes</li>
                <li>• Weather contingency plans</li>
                <li>• Safety briefing included</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Activities */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-forest-800 mb-8">
            Other Activities You Might Like
          </h2>
          <div className="text-center">
            <Link href="/activities" className="btn-accent inline-block">
              View All Activities
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

  const activities = await payload.find({
    collection: 'activities',
    limit: 1000,
  })

  return activities.docs.map((activity) => ({
    slug: activity.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ActivityPageProps) {
  const payload = await getPayload({ config: await config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const SITE_TITLE = siteSettings.siteTitle?.trim() || 'Custom Site Title'

  const activityResponse = await payload.find({
    collection: 'activities',
    where: {
      slug: {
        equals: (await params).slug,
      },
    },
    limit: 1,
  })

  const activity = activityResponse.docs[0]

  if (!activity) {
    return {
      title: 'Activity Not Found',
    }
  }

  const description =
    activity.shortDescription
      ? activity.shortDescription
      : `${activity.name} - ${activity.activityType} at ${SITE_TITLE}.`

  return {
    title: `${activity.name} | Great Outdoors`,
    description,
    keywords: [activity.name, activity.activityType].filter(
      (kw): kw is string => typeof kw === 'string' && !!kw,
    ),
    openGraph: {
      title: `${activity.name} - ${activity.activityType} | ${SITE_TITLE}`,
      description,
      type: 'website',
    },
  }
}
