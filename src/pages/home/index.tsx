import type { ReactElement } from 'react'
import mainApp from '@assets/main.png'
import mas from '@assets/mas.svg'
import logo from '@assets/icon_512x512@2x.png'
import github from '@assets/github-mark.svg'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { Footer } from '@/components/Footer'

function Home (): ReactElement {
  const version: string = '0.6'
  const downloadUrlZip: string = `https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v${version}.zip`
  // const downloadUrlDmg: string = `https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker ${version}.dmg`
  const masUrl: string = 'https://apps.apple.com/us/app/macpacker/id6473273874'

  return (
    <>
      <div className='w-full max-w-3xl mx-auto px-4 mb-20'>
        {/* header */}
        <div className='flex flex-row mt-2'>
          <div className='flex-grow'></div>
          <a href='https://github.com/sarensw/macpacker' className='flex flex-row items-center space-x-2'>
            <span>Fork me on</span>
            <img className='w-6' src={github} alt='GitHub'/>
          </a>
        </div>

        <div className='mt-24 flex flex-col space-y-6 items-center'>
          {/* hero */}
          <div className='flex flex-row gap-2'>
            <img className='w-16' src={logo} />
            <h1 className='mt-2 text-5xl font-bold tracking-tight text-gray-950 dark:text-white'>MacPacker</h1>
          </div>

          {/* sub header */}
          <p className=' text-center max-w-lg text-gray-800'>Archive manager for macOS. <span className='font-bold'>Open source</span>, because essential tools should be free. Preview <span className='italic'>(nested)</span> archives without extracting them.</p>

          {/* download options */}
          <div>
            <div className='flex flex-col md:flex-row mt-6 gap-4'>
              {/* brew */}
              <div className='font-mono bg-gray-100 py-2 px-4 rounded-md flex flex-row border relative'>
                <div><span className='text-teal-700'>$</span> brew <span className='text-gray-600'>install</span> macpacker</div>
                <div className='w-px bg-gray-300 mx-4'></div>
                <div><ClipboardDocumentIcon className='size-6 active:opacity-50' onClick={() => {navigator.clipboard.writeText('brew install macpacker')}} /></div>
                <div className='absolute top-0 rotate-20 p-1 bg-orange-500 rounded-md left-1/4 text-sm'>coming soon ...</div>
              </div>

              <div className='flex flex-row gap-4'>
                {/* zip */}
                <a href={downloadUrlZip} className='font-mono bg-neutral-900 text-white py-2 px-4 rounded-md flex flex-row'>
                  <div>.zip</div>
                </a>

                {/* dmg */}
                {/* <a href={downloadUrlDmg} className='font-mono bg-neutral-900 text-white py-2 px-4 rounded-md flex flex-row'>
                  <div>.dmg</div>
                </a> */}

                {/* mas */}
                <a href={masUrl}>
                  <img className='w-auto h-auto' src={mas} />
                </a>
              </div>
            </div>

            <div className='mb-12 mt-2 text-sm text-neutral-500 justify-self-center'>
              v{version} | 2 MB | macOS 15 or newer
            </div>
          </div>

          {/* main image */}
          <img className='w-auto h-auto' src={mainApp} />

          {/* read from */}
          <div className='justify-items-center flex flex-col space-y-2 items-center'>
            <h3 className='text-neutral-800 text-lg'>Read / Extract from</h3>
            <ul className='font-mono flex flex-row space-x-2 justify-center text-sm'>
              <li className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500 ring-inset'>zip</li>
              <li className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500 ring-inset'>tar</li>
              <li className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500 ring-inset'>7zip</li>
              <li className='inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500 ring-inset'>lz4</li>
              <li><a href='https://github.com/sarensw/MacPacker/issues/new' className='inline-flex items-center rounded-md bg-gray-800 px-2 py-1 font-medium text-white ring-1 ring-gray-500 ring-inset'>Please add ...</a></li>
            </ul>
          </div>

          {/* write to */}
          <div className='mt-8 justify-items-center flex flex-col space-y-2 items-center'>
            <h3 className='text-neutral-800 text-lg'>Create / Write to</h3>
            <div className='flex flex-row font-mono space-x-2 text-sm items-baseline
'>
              <p>... coming soon ...</p>
              <a href='https://github.com/sarensw/MacPacker/issues/new' className='inline-flex items-center rounded-md bg-gray-800 px-2 py-1 font-medium font-mono text-white ring-1 ring-gray-500 ring-inset'>Please add ...</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export { Home }
