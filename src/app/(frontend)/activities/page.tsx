import React from 'react'
import Hero from '../_components/Hero'
import ActivityList from '../_components/ActivityList'

export default async function ActivitiesPage() {
  return (
    <div>
      <Hero
        title="Activities & Adventures"
        description="Discover exciting adventures and experiences in the heart of nature."
        backgroundImage="/images/placeholder-activities-hero.jpg"
        gradient="from-forest-600 to-forest-800"
        height="tall"
        variant="simple"
      />

      <div className="container mx-auto px-4 py-16">
        <ActivityList limit={100} featuredOnly={false} showViewAllButton={false} />
      </div>
    </div>
  )
}
