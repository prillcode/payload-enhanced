'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Activities', path: '/activities' },
    { name: 'Lodging', path: '/accommodations' },
    { name: 'About Us', path: '/pages/about' },
    { name: 'Contact', path: '/pages/contact' },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="h-10 w-10 bg-forest-600 rounded-md flex items-center justify-center text-white font-bold mr-2">
              GO
            </div>
            <span className="text-forest-800 font-semibold text-xl">Great Outdoor Adventures</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-earth-800 hover:text-forest-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

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
