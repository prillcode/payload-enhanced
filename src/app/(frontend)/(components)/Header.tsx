'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  siteLogo?: { url: string } | string | null
  siteTitle: string
  siteDescription: string
  showSiteDescription?: boolean
  hideSiteTitleIfLogo?: boolean
  navLinks: { name: string; path: string }[]
}

const Header = ({
  siteLogo,
  siteTitle,
  siteDescription,
  showSiteDescription = true,
  hideSiteTitleIfLogo = false,
  navLinks,
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Render the header with logo, title, and description and dynamic navLinks
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo, Title, and Description - Desktop View (hidden if viewport under "md") */}
          <Link href="/" className="hidden md:flex flex-col items-start w-full">
            {siteLogo && typeof siteLogo === 'object' && siteLogo.url ? (
              <span className="flex flex-col items-start w-full md:flex-row md:items-center">
                {/* Logo */}
                <Image
                  src={siteLogo.url}
                  alt={siteTitle}
                  width={75}
                  height={75}
                  className="max-h-[75px] h-auto w-auto mr-0 md:mr-4 object-contain"
                  priority
                />
                {/* Title + Description */}
                <span className="flex flex-col items-start mt-2 md:mt-0">
                  {(!hideSiteTitleIfLogo || !siteLogo) && (
                    <span className="text-forest-800 font-semibold text-xl">{siteTitle}</span>
                  )}
                  {showSiteDescription && (
                    <span className="text-earth-600 text-sm mt-1">{siteDescription}</span>
                  )}
                </span>
              </span>
            ) : (
              // No logo: just stack title and description
              <span className="flex flex-col items-start">
                <span className="text-forest-800 font-semibold text-xl">{siteTitle}</span>
                {showSiteDescription && (
                  <span className="text-earth-600 text-sm mt-1">{siteDescription}</span>
                )}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-earth-800 hover:text-forest-600 font-semibold text-base whitespace-nowrap transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile: Centered logo/title/description */}
          <div className="flex flex-col items-center w-full md:hidden">
            {siteLogo && typeof siteLogo === 'object' && siteLogo.url && (
              <Image
                src={siteLogo.url}
                alt={siteTitle}
                width={75}
                height={75}
                className="max-h-[75px] h-auto w-auto mb-2 object-contain"
                priority
              />
            )}
            {(!hideSiteTitleIfLogo || !siteLogo) && (
              <span className="text-forest-800 font-semibold text-xl text-center">{siteTitle}</span>
            )}
            {showSiteDescription && (
              <span className="text-earth-600 text-sm mt-1 text-center">{siteDescription}</span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-earth-800 hover:text-forest-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-3">
            {/* Mobile Logo */}
            {siteLogo && typeof siteLogo === 'object' && siteLogo.url ? (
              <div className="w-full flex justify-center mb-4">
                <Image
                  src={siteLogo.url}
                  alt={siteTitle}
                  width={150}
                  height={150}
                  className="w-full max-h-32 h-auto object-contain"
                  priority
                />
              </div>
            ) : null}
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="block py-2 px-4 text-earth-800 hover:bg-earth-50 rounded-md hover:text-forest-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
