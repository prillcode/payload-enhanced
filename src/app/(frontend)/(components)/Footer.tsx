import React from 'react'
import Link from 'next/link'

interface FooterProps {
  siteTitle: string
  siteDescription?: string
  navLinks: { name: string; path: string }[]
  socialLinks?: { platform: string; url: string }[]
}

const Footer = ({ siteTitle, siteDescription = '', navLinks, socialLinks }: FooterProps) => {
  return (
    <footer className="bg-earth-400 text-white">
      <div className="w-full p-4 bg-earth-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">{siteTitle}</h3>
            <p className="text-earth-200 mb-4">{siteDescription}</p>
          </div>

          {/* Nav Links - center the content horizontally */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Go To</h3>
            <ul className="space-y-2 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-earth-200 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {/* socialLinks */}
              {socialLinks && socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth-200 hover:text-white"
                  >
                    {link.platform}
                  </a>
                ))
              ) : (
                <span className="text-earth-400 text-sm italic">
                  Set Social Links in Admin Panel
                </span>
              )}
            </div>

            {/* Payload Admin Panel Link */}
            <Link
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-earth-700 hover:bg-earth-600 rounded text-white text-sm"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-earth-700 py-4 text-center bg-earth-400 text-earth-100 text-sm">
        <div className="container mx-auto flex flex-col items-center">
          <span>
            &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
          </span>
          <span className="text-xs text-earth-200">
            Powered by{' '}
            <a
              href="https://payloadcms.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Payload CMS, NextJS, and React.
            </a>{' '}
            Built and maintained by{' '}
            <a
              href="https://apdev.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-earth-100 hover:text-white"
            >
              AP Dev Solutions LLC
            </a>{' '}
            - Bangor, Maine
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
