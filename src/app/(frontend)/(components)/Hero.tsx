import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface HeroAction {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'accent'
}

interface HeroDetail {
  icon: React.ReactNode
  text: string
}

interface HeroProps {
  title: string
  description?: string
  backgroundImage?: string
  gradient?: string
  showBackButton?: boolean
  backButtonText?: string
  backButtonHref?: string
  actions?: HeroAction[]
  details?: HeroDetail[]
  variant?: 'simple' | 'detailed'
  height?: 'normal' | 'tall'
}

export default function Hero({
  title,
  description,
  backgroundImage,
  gradient = 'from-forest-600 to-earth-600',
  showBackButton = false,
  backButtonText = 'Back',
  backButtonHref = '/',
  actions = [],
  details = [],
  variant = 'simple',
  height = 'normal',
}: HeroProps) {
  const heightClass = height === 'tall' ? 'h-96' : 'py-20 md:py-32'
  const containerClass = height === 'tall' ? 'h-full flex items-center' : ''

  return (
    <>
      {/* Back Button - only show if requested */}
      {showBackButton && (
        <div className="container mx-auto px-4 py-6">
          <Link
            href={backButtonHref}
            className="inline-flex items-center text-forest-600 hover:text-forest-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {backButtonText}
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <div className={`relative ${heightClass} bg-gradient-to-r ${gradient} text-white`}>
        {/* Background Image */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className={`relative container mx-auto px-4 ${containerClass}`}>
          <div className={variant === 'simple' ? 'max-w-4xl mx-auto text-center' : ''}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">{title}</h1>

            {description && <p className="text-xl md:text-2xl mb-8">{description}</p>}

            {/* Details - for detailed variant */}
            {details.length > 0 && (
              <div className="flex flex-wrap gap-4 text-lg mb-8">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center">
                    {detail.icon}
                    <span className="ml-2">{detail.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {actions.length > 0 && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {actions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`text-center py-3 px-6 text-lg ${
                      action.variant === 'primary'
                        ? 'btn-primary'
                        : action.variant === 'secondary'
                          ? 'btn-secondary'
                          : action.variant === 'accent'
                            ? 'btn-accent'
                            : 'btn-primary'
                    }`}
                  >
                    {action.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
