import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-earth-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Great Outdoors</h3>
            <p className="text-earth-200 mb-4">
              Your gateway to unforgettable outdoor adventures and peaceful accommodations.
            </p>
          </div>

          {/* Quick Links - center the content horizontally */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="/" className="text-earth-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/accommodations" className="text-earth-200 hover:text-white">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-earth-200 hover:text-white">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/pages/about" className="text-earth-200 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="text-earth-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {/* Social icons - placeholders */}
              <a href="#" className="text-earth-200 hover:text-white">
                FB
              </a>
              <a href="#" className="text-earth-200 hover:text-white">
                IG
              </a>
              <a href="#" className="text-earth-200 hover:text-white">
                TW
              </a>
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

        <div className="border-t border-earth-700 mt-8 pt-8 text-center text-earth-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Great Outdoors Theme - Powered by Payload CMS, React
            and NextJS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
