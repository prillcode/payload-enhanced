import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { default as payloadConfig } from '@/payload.config'
import Hero from '../../(components)/Hero'
import CustomPageRenderer from '../../(components)/CustomPageRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  // Fetch the page content by slug
  const pageResponse = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
  })

  const page = pageResponse.docs[0]

  // If page not found or not published, show 404
  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero
        title={page.hero?.title || page.title}
        description={page.hero?.description || ''}
        gradient={page.hero?.gradient || 'from-forest-600 to-forest-800'}
        height="tall"
        variant="simple"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <section className="mb-16">
            <CustomPageRenderer content={page.content} className="text-earth-700" />
          </section>

          {/* Additional Sections */}
          {page.sections && page.sections.length > 0 && (
            <>
              {page.sections.map((section: any, index: number) => (
                <section
                  key={index}
                  className={`py-16 ${section.backgroundColor || 'bg-white'} ${
                    index % 2 === 1 ? '-mx-4 px-4 rounded-lg' : ''
                  }`}
                >
                  <div
                    className={`${
                      section.layout === 'centered'
                        ? 'max-w-2xl mx-auto text-center'
                        : section.layout === 'two-column'
                          ? 'grid grid-cols-1 md:grid-cols-2 gap-12'
                          : 'max-w-4xl mx-auto'
                    }`}
                  >
                    <div>
                      <h2 className="text-3xl font-bold text-forest-800 mb-8">
                        {section.sectionTitle}
                      </h2>
                      <CustomPageRenderer
                        content={section.sectionContent}
                        className="text-earth-700"
                      />
                    </div>
                    {section.layout === 'two-column' && (
                      <div className="flex items-center justify-center">
                        {/* Placeholder for additional content in two-column layout */}
                        <div className="w-full h-64 bg-earth-100 rounded-lg flex items-center justify-center">
                          <span className="text-earth-500">Image or additional content</span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Generate static params for all published pages
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: await config })

    const pages = await payload.find({
      collection: 'pages',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    })

    return pages.docs.map((page) => ({
      slug: page.slug,
    }))
  } catch (error) {
    // During build, database might not be ready yet - return empty array
    console.warn('Could not generate static params for pages:', error.message)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: await config })

  const pageResponse = await payload.find({
    collection: 'pages',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
  })

  const page = pageResponse.docs[0]

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: page.seo?.metaTitle || `${page.title} | Great Outdoors`,
    description:
      page.seo?.metaDescription || page.hero?.description || `Learn more about ${page.title}`,
    keywords: page.seo?.keywords?.split(',').map((k: string) => k.trim()) || [
      page.title.toLowerCase(),
    ],
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || page.hero?.description,
      type: 'website',
    },
  }
}
