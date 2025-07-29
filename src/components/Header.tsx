import type { ReactElement } from 'react'

function Header (): ReactElement {
  return (
    <>
      <div className='flex flex-row w-full mx-auto  justify-center space-x-2'>
        <a className='flex flex-row items-center' href='/'>
          <img src='/icon_512x512@2x.png' className='w-12' />
          <p className='font-bold text-lg'>MacPacker</p>
        </a>
      </div>
    </>
  )
}

export { Header }
