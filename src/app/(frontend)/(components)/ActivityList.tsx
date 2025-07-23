import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface ActivityListProps {
  limit?: number
  featuredOnly?: boolean
  showViewAllButton?: boolean
  className?: string
}

async function ActivityList({
  limit = 100,
  featuredOnly = false,
  showViewAllButton = false,
  className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
}: ActivityListProps) {
  const payload = await getPayload({ config: await config })

  // Build the where clause based on props
  const whereClause = featuredOnly
    ? {
        featuredActivity: {
          equals: true,
        },
      }
    : undefined

  const activitiesResponse = await payload.find({
    collection: 'activities',
    limit,
    where: whereClause,
  })

  const activities = activitiesResponse.docs || []

  return (
    <div>
      <div className={className}>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="card flex flex-col h-full">
              <div className="h-48 bg-earth-200 relative">
                {activity.images && activity.images.length > 0 && activity.images[0].image ? (
                  <div className="w-full h-full flex items-center justify-center bg-earth-200">
                    <span className="text-earth-600">Activity Image</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-earth-300">
                    <span className="text-earth-600">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-forest-700 mb-2">{activity.name}</h3>
                <div className="text-sm text-earth-600 mb-2">
                  {activity.duration && <span>Duration: {activity.duration}</span>}
                  {activity.difficulty && <span> • {activity.difficulty}</span>}
                  {activity.pricePerPerson && <span> • ${activity.pricePerPerson}/person</span>}
                </div>
                <p className="text-earth-700 mb-4 flex-grow">
                  {activity.shortDescription 
                    ? activity.shortDescription
                    : 'Join us for an exciting outdoor adventure experience.'}
                </p>
                <Link
                  href={`/activities/${activity.slug}`}
                  className="text-sunset-600 hover:text-sunset-700 font-medium"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-earth-500">
            <p className="mb-4">
              {featuredOnly
                ? 'No featured activities available at the moment.'
                : 'No activities available at the moment.'}
            </p>
            {featuredOnly && (
              <Link
                href="/activities"
                className="text-sunset-600 hover:text-sunset-700 font-medium"
              >
                View all activities →
              </Link>
            )}
          </div>
        )}
      </div>

      {showViewAllButton && (
        <div className="text-center mt-12">
          <Link href="/activities" className="btn-accent inline-block">
            View All Activities
          </Link>
        </div>
      )}
    </div>
  )
}

export default ActivityList
