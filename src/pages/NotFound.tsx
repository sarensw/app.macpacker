import type { ReactElement } from 'react'
import { Link } from 'wouter'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

function NotFound (): ReactElement {
  return (
    <>
      <Header />
      <div className='w-full max-w-3xl mx-auto px-4 mt-24 mb-20 text-center'>
        <h1 className='text-4xl font-bold text-gray-950 mb-4'>404</h1>
        <p className='text-lg text-gray-600 mb-8'>The page you are looking for does not exist.</p>
        <Link
          href='~/'
          className='text-sm text-teal-700 hover:text-teal-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded'
        >
          &larr; Back to Home
        </Link>
      </div>
      <Footer />
    </>
  )
}

export { NotFound }
