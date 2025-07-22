import React from 'react'
import Hero from '../_components/Hero'
import AccommodationList from '../_components/AccommodationList'

export default async function AccommodationsPage() {
  return (
    <div>
      <Hero
        title="Lodging Accommodations"
        description="Find the perfect place to stay during your time with us."
        backgroundImage="/images/placeholder-hero.jpg"
        gradient="from-earth-400 to-earth-700"
        height="tall"
        variant="simple"
      />

      <div className="container mx-auto px-4 py-16">
        <AccommodationList limit={100} availableOnly={false} showViewAllButton={false} />
      </div>
    </div>
  )
}
