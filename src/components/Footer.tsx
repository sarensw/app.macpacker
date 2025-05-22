import type { ReactElement } from 'react'
import LinkedIn from '@assets/linkedin.svg'
import X from '@assets/x.svg'
import { Link } from 'wouter'

function Footer (): ReactElement {
  const year = new Date().getFullYear()

  return (
    <footer className='text-xs text-gray-500 py-4 md:sticky md:bottom-0 mt-0 md:z-10 text-center flex flex-col gap-3 bg-white w-full'>
      <div className='flex md:flex-row flex-col gap-2 justify-center items-center'>
        <span>Created with <span className='text-lg'>☕</span> by:</span>
        <div className='flex flex-row gap-2 justify-center'>
          <a href='https://twitter.com/sarensw'>
            <img src={X} className='w-4' />
          </a>
          <a href='https://linkedin.com/in/stephanarenswald'>
            <img src={LinkedIn} className='w-4' />
          </a>
          <span>Stephan Arenswald</span>
        </div>
      </div>
      <p className='flex flex-row gap-4 justify-center'>
        <span>&copy; {year} Stephan Arenswald</span>
        {/* <a className='ml-8' href='/imprint.html'>Impressum</a> */}
        {/* <Link href='/privacy'>Privacy</Link> */}
        <Link href='/imprint'>Imprint</Link>
        <a href='mailto:apps@sarensw.com'>Contact</a>
      </p>
    </footer>
  )
}

export { Footer }
