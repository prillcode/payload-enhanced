import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface AccommodationListProps {
  limit?: number
  availableOnly?: boolean
  showViewAllButton?: boolean
  className?: string
}

async function AccommodationList({
  limit = 100,
  availableOnly = true,
  showViewAllButton = false,
  className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
}: AccommodationListProps) {
  const payload = await getPayload({ config: await config })

  // Build the where clause based on props
  const whereClause = availableOnly
    ? {
        available: {
          equals: true,
        },
      }
    : undefined

  const accommodationsResponse = await payload.find({
    collection: 'accommodations',
    limit,
    where: whereClause,
  })

  const accommodations = accommodationsResponse.docs || []

  return (
    <div>
      <div className={className}>
        {accommodations.length > 0 ? (
          accommodations.map((accomm) => (
            <div key={accomm.id} className="card flex flex-col h-full">
              <div className="h-48 bg-earth-100 relative">
                {accomm.images && accomm.images.length > 0 && accomm.images[0].image ? (
                  <div className="w-full h-full flex items-center justify-center bg-earth-200">
                    <span className="text-earth-600">Rental Image</span>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-earth-200">
                    <span className="text-earth-600">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-forest-700">{accomm.name}</h3>
                  <span className="bg-sunset-100 text-sunset-800 px-2 py-1 rounded text-sm font-medium">
                    ${accomm.pricePerNight}/night
                  </span>
                </div>
                <p className="text-sm text-earth-600 mb-3">
                  {accomm.rentalType} • {accomm.bedrooms} BR • {accomm.bathrooms} BA • Up to{' '}
                  {accomm.maxGuests} guests
                </p>
                {accomm.location && (
                  <p className="text-sm text-earth-500 mb-4">
                    {accomm.location.city}, {accomm.location.state}
                  </p>
                )}
                <Link
                  href={`/accommodations/${accomm.slug}`}
                  className="text-sunset-600 hover:text-sunset-700 font-medium mt-auto"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-earth-500">
            No accommodations available at the moment.
          </div>
        )}
      </div>

      {showViewAllButton && (
        <div className="text-center mt-12">
          <Link href="/accommodations" className="btn-primary inline-block">
            Browse All Accommodations
          </Link>
        </div>
      )}
    </div>
  )
}

export default AccommodationList
