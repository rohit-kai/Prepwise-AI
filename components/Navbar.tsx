'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PrepWise AI
          </Link>
          <div className="space-x-4">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg transition ${
                pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/plans" 
              className={`px-4 py-2 rounded-lg transition ${
                pathname === '/plans' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📚 Saved Plans
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}