import { useState, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import mas from '@assets/mas.svg'
import github from '@assets/github-mark.svg'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Footer } from '@/components/Footer'
import { ArchiveFormat } from '@/components/ArchiveFormat'
import { Language } from '@/components/Language'

function Home (): ReactElement {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const version: string = '0.13'
  const downloadUrlZip: string = `https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v${version}.zip`
  const masUrl: string = 'https://apps.apple.com/us/app/macpacker/id6473273874'

  const handleCopy = (): void => {
    navigator.clipboard.writeText('brew install --cask macpacker')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

        <div className='mt-24 flex flex-col space-y-8 items-center'>
          {/* hero */}
          <img className='w-12 md:w-16' src='/icon_512x512@2x.png' alt='MacPacker app icon' />
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-950 text-center'>{t('hero.headline')}</h1>

          {/* sub header */}
          <p className='text-lg text-center max-w-2xl text-gray-700'>
            {t('hero.subheadline')} <strong>{t('hero.freeAndOpenSource')}</strong>
          </p>

          {/* download options */}
          <div className='flex flex-col items-center gap-4 w-full max-w-2xl'>
            {/* brew */}
            <div className='w-full font-mono bg-gray-50 py-3 px-5 rounded-lg flex flex-row items-center border-2 border-gray-300 shadow-md overflow-x-auto' role='region' aria-label={t('hero.installWith')}>
              <code className='flex-grow whitespace-nowrap'>
                <span aria-hidden='true' className='text-teal-700'>$</span> brew <span className='text-gray-600'>install</span> <span className='text-teal-700'>--cask</span> macpacker
              </code>
              <button
                type='button'
                className='ml-4 p-2 hover:bg-gray-200 rounded transition-colors active:scale-95 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                onClick={handleCopy}
                aria-label={t('hero.copyCommand')}
              >
                {copied ? (
                  <CheckIcon className='size-6 text-teal-600' />
                ) : (
                  <ClipboardDocumentIcon className='size-6' />
                )}
              </button>
            </div>

            {/* secondary downloads */}
            <div className='flex flex-col items-center gap-2'>
              <span className='text-xs text-gray-500'>{t('download.alternativeLabel')}</span>
              <div className='flex flex-col md:flex-row gap-3 items-center'>
                {/* zip */}
                <a
                  href={downloadUrlZip}
                  className='text-sm bg-white text-gray-900 border-2 border-gray-300 py-2 px-4 md:py-1.5 md:px-3 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                >
                  {t('download.downloadZip')}
                </a>

                {/* mas */}
                <a href={masUrl} className='hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded'>
                  <img className='h-10 w-auto' src={mas} alt={t('download.appStore')} />
                </a>
              </div>
            </div>
          </div>

          {/* main image */}
          <img className='w-auto h-auto' src='/main.png' alt='MacPacker application window showing nested archive preview' loading='lazy' />

          {/* version info */}
          <div className='text-sm text-neutral-500 text-center'>
            {t('download.versionInfo', { version, size: '5', minVersion: '13.5' })}
          </div>

          {/* translated to */}
          <div className='justify-items-center flex flex-col space-y-2 items-center max-w-xl'>
            <h2 className='text-neutral-800 text-lg'>{t('languages.title')}</h2>
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
          <div id='formats' className='mt-8 justify-items-center flex flex-col space-y-2 items-center max-w-lg'>
            <h2 className='text-neutral-800 text-lg'>{t('formats.readTitle')}</h2>
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
            <h2 className='text-neutral-800 text-lg'>{t('formats.writeTitle')}</h2>
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
