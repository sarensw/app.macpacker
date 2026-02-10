import type { ReactElement, ReactNode } from 'react'
import { Link } from 'wouter'

interface HeaderNavLinkProps {
  href: string
  children: ReactNode
  onClick?: () => void
}

function HeaderNavLink ({ href, children, onClick }: HeaderNavLinkProps): ReactElement {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='text-gray-900 font-medium text-sm md:text-base hover:opacity-80 transition-opacity duration-150 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400'
    >
      {children}
    </Link>
  )
}

export { HeaderNavLink }
export type { HeaderNavLinkProps }
