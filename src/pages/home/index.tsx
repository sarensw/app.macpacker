import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import mas from '@assets/mas.svg'
import github from '@assets/github-mark.svg'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { Footer } from '@/components/Footer'
import { ArchiveFormat } from '@/components/ArchiveFormat'
import { Language } from '@/components/Language'

function Home (): ReactElement {
  const { t } = useTranslation()
  const version: string = '0.13'
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
            <span>{t('header.forkMe')}</span>
            <img className='w-6' src={github} alt='GitHub'/>
          </a>
        </div>

        <div className='mt-24 flex flex-col space-y-6 items-center'>
          {/* hero */}
          <div className='flex flex-row gap-2'>
            <img className='w-16' src='/icon_512x512@2x.png' />
            <h1 className='mt-2 text-5xl font-bold tracking-tight text-gray-950'>{t('hero.title')}</h1>
          </div>

          {/* sub header */}
          <p className=' text-center max-w-lg text-gray-800'>{t('hero.subtitle')} <span className='font-bold'>{t('hero.openSource')}</span>, {t('hero.openSourceTagline')} {t('hero.previewFeature')} <span className='italic'>({t('hero.nested')})</span> {t('hero.previewTagline')}</p>

          {/* download options */}
          <div>
            <div className='flex flex-col md:flex-row mt-6 gap-4'>
              {/* brew */}
              <div className='font-mono bg-gray-100 py-2 px-4 rounded-md flex flex-row border'>
                <div><span className='text-teal-700'>$</span> brew <span className='text-gray-600'>install</span> <span className='text-teal-700'>--cask</span> macpacker</div>
                <div className='w-px bg-gray-300 mx-4'></div>
                <div className='select-none'><ClipboardDocumentIcon className='size-6 active:opacity-50 select-none' onClick={() => {navigator.clipboard.writeText('brew install --cask macpacker')}} /></div>
              </div>

              <div className='flex flex-row gap-4'>
                {/* zip */}
                <a href={downloadUrlZip} className='font-mono bg-neutral-900 text-white py-2 px-4 rounded-md flex flex-row'>
                  <div>{t('download.downloadZip')}</div>
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
              {t('download.versionInfo', { version, size: '5', minVersion: '13.5' })}
            </div>
          </div>

          {/* main image */}
          <img className='w-auto h-auto' src='/main.png' />

          {/* translated to */}
          <div className='justify-items-center flex flex-col space-y-2 items-center max-w-xl'>
            <h3 className='text-neutral-800 text-lg'>{t('languages.title')}</h3>
            <ul className='font-mono flex flex-row flex-wrap space-x-2 space-y-2 justify-center text-sm'>
              <Language code={'zh_Hans'} name={'Chinese (Simplified'} icons={['cn']} />
              <Language code={'en'} name={'English'} icons={['us', 'gb', 'au']} />
              <Language code={'fr'} name={'French'} icons={['fr']} />
              <Language code={'de'} name={'German'} icons={['de', 'at', 'ch']} />
              <Language code={'it'} name={'Italian'} icons={['it']} />
              <Language code={'ru'} name={'Persian (Farsi)'} icons={[]} />
              <Language code={'ru'} name={'Russian'} icons={['ru']} />
              <Language code={'uk'} name={'Ukrainian'} icons={['ua']} />
              <li><a href='https://poeditor.com/join/project/J2Qq2SUzYr' className='inline-flex items-center rounded-md bg-gray-800 px-2 py-1 font-medium text-white ring-1 ring-gray-500 ring-inset'>{t('languages.helpTranslate')}</a></li>
            </ul>
          </div>

          {/* read from */}
          <div className='mt-8 justify-items-center flex flex-col space-y-2 items-center max-w-lg'>
            <h3 className='text-neutral-800 text-lg'>{t('formats.readTitle')}</h3>
            <ul className='font-mono flex flex-row flex-wrap space-x-2 space-y-2 justify-center text-sm'>
              <ArchiveFormat name={'7zip'} />
              <ArchiveFormat name={'apfs'} />
              <ArchiveFormat name={'arj'} />
              <ArchiveFormat name={'cab'} />
              <ArchiveFormat name={'chm'} />
              <ArchiveFormat name={'cpio'} />
              <ArchiveFormat name={'dmg'} />
              <ArchiveFormat name={'fat'} />
              <ArchiveFormat name={'gzip'} />
              <ArchiveFormat name={'iso'} />
              <ArchiveFormat name={'lha'} />
              <ArchiveFormat name={'lzh'} />
              <ArchiveFormat name={'lzx'} />
              <ArchiveFormat name={'ntfs'} />
              <ArchiveFormat name={'qcow2'} />
              <ArchiveFormat name={'rar'} />
              <ArchiveFormat name={'sea'} />
              <ArchiveFormat name={'sit'} />
              <ArchiveFormat name={'squashfs'} />
              <ArchiveFormat name={'tar'} />
              <ArchiveFormat name={'tar.bz2, bzip2'} />
              <ArchiveFormat name={'tar.lz4, lz4'} />
              <ArchiveFormat name={'tar.z, taz'} />
              <ArchiveFormat name={'tar.xz, xz'} />
              <ArchiveFormat name={'tar.Z, Z'} />
              <ArchiveFormat name={'vdi'} />
              <ArchiveFormat name={'vhd'} />
              <ArchiveFormat name={'vhdx'} />
              <ArchiveFormat name={'vmdk'} />
              <ArchiveFormat name={'xar'} />
              <ArchiveFormat name={'zip'} />
              <li><a href='https://github.com/sarensw/MacPacker/issues/new' className='inline-flex items-center rounded-md bg-gray-800 px-2 py-1 font-medium text-white ring-1 ring-gray-500 ring-inset'>{t('formats.requestFormat')}</a></li>
            </ul>
          </div>

          {/* write to */}
          <div className='mt-8 justify-items-center flex flex-col space-y-2 items-center'>
            <h3 className='text-neutral-800 text-lg'>{t('formats.writeTitle')}</h3>
            <div className='flex flex-row font-mono space-x-2 text-sm items-baseline'>
              <p>{t('formats.comingSoon')}</p>
              <a href='https://github.com/sarensw/MacPacker/issues/new' className='inline-flex items-center rounded-md bg-gray-800 px-2 py-1 font-medium font-mono text-white ring-1 ring-gray-500 ring-inset'>{t('formats.requestFormat')}</a>
            </div>
          </div>

          {/* testimonials */}
          {/* <div className='mt-8 justify-items-center flex flex-col space-y-2 items-center'>
            <h3 className='text-neutral-800 text-lg'>What others say</h3>
            <div className='flex flex-row space-x-2 items-baseline'>
              <WhatOthersSay name='Sandra' source='Direct Chat' text='😁 Thank You!' title='Thank You' />
              <WhatOthersSay name='Sevikha' source='App Store Reviews' text='Useful functionality. Thanks for your dev time, and good luck with moving this forward!' title='Good tool' />
            </div>
          </div> */}
        </div>
      </div>

      <Footer />
    </>
  )
}

export { Home }
