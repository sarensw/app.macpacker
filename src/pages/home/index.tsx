import { useState, type ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'wouter'
import mas from '@assets/mas.svg'
import { ClipboardDocumentIcon, CheckIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArchiveFormat } from '@/components/ArchiveFormat'
import { Language } from '@/components/Language'
import { FeatureCard } from '@/components/FeatureCard'
import { WhatOthersSay } from '@/components/WhatOthersSay'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'

interface FormatCategory {
  labelKey: string
  initial: string[]
  expanded: string[]
}

const formatCategories: FormatCategory[] = [
  {
    labelKey: 'formats.categories.compression',
    initial: ['zip', 'rar', '7zip', 'gzip', 'lz4'],
    expanded: ['lzx', 'sea', 'xar'],
  },
  {
    labelKey: 'formats.categories.diskImages',
    initial: ['dmg', 'iso', 'vdi', 'vmdk', 'vhdx', 'qcow2'],
    expanded: ['apfs', 'fat', 'ntfs', 'vhd'],
  },
  {
    labelKey: 'formats.categories.archives',
    initial: ['tar', 'tar.bz2, bzip2', 'tar.lz4, lz4', 'tar.xz, xz'],
    expanded: ['tar.z, taz', 'tar.Z, Z', 'cpio', 'squashfs'],
  },
  {
    labelKey: 'formats.categories.other',
    initial: [],
    expanded: ['arj', 'cab', 'chm', 'lha', 'lzh', 'sit'],
  },
]

const totalHiddenFormats = formatCategories.reduce((sum, cat) => sum + cat.expanded.length, 0)

function Home (): ReactElement {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [showAllFormats, setShowAllFormats] = useState(false)
  const localizedPath = useLocalizedPath()
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
      <Header />
      <div className='w-full max-w-3xl mx-auto px-4 mb-20'>
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

          {/* features */}
          <section aria-labelledby='features-heading' className='mt-16 mb-12 flex flex-col space-y-8 items-center w-full'>
            <h2 id='features-heading' className='text-neutral-800 text-lg'>{t('features.title')}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full'>
              <FeatureCard
                icon={MagnifyingGlassIcon}
                title={t('features.nestedPreview.title')}
                description={t('features.nestedPreview.description')}
              />
              <FeatureCard
                icon={ArrowDownTrayIcon}
                title={t('features.extractSingle.title')}
                description={t('features.extractSingle.description')}
              />
              <FeatureCard
                icon={SquaresPlusIcon}
                title={t('features.formats.title')}
                description={t('features.formats.description')}
              />
            </div>
          </section>

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

            <div className='w-full flex flex-col space-y-6 items-start'>
              {formatCategories.map((category) => {
                if (category.initial.length === 0 && !showAllFormats) return null

                return (
                  <div key={category.labelKey} className='w-full'>
                    <h3 className='text-sm font-medium text-gray-700 mb-3'>
                      {t(category.labelKey)}
                    </h3>
                    <ul className='font-mono flex flex-row flex-wrap gap-2 text-sm'>
                      {category.initial.map((format) => (
                        <ArchiveFormat key={format} name={format} />
                      ))}
                      {showAllFormats && category.expanded.map((format) => (
                        <ArchiveFormat key={format} name={format} />
                      ))}
                    </ul>
                  </div>
                )
              })}

              {!showAllFormats && (
                <button
                  type='button'
                  onClick={() => setShowAllFormats(true)}
                  aria-expanded={false}
                  aria-label={t('formats.showMoreAriaLabel')}
                  className='inline-flex items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-500 ring-inset hover:bg-gray-100 transition-colors active:scale-95 self-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                >
                  {t('formats.showMore', { count: totalHiddenFormats })}
                </button>
              )}

              <div className='w-full flex justify-center'>
                <a href='https://github.com/sarensw/MacPacker/issues/new' className='inline-flex items-center rounded-md bg-gray-800 px-2 py-1 font-medium text-white ring-1 ring-gray-500 ring-inset'>{t('formats.requestFormat')}</a>
              </div>

              <Link
                href={localizedPath('/docs/format-comparison')}
                className='text-sm text-gray-600 hover:text-gray-900 transition-colors self-center flex items-center gap-1 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded'
              >
                {t('formats.comparisonLink')}
                <span aria-hidden='true'>&rarr;</span>
              </Link>
            </div>
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
          <section aria-labelledby='testimonials-heading' className='mt-8 flex flex-col space-y-4 items-center w-full'>
            <h2 id='testimonials-heading' className='text-neutral-800 text-lg'>{t('testimonials.title')}</h2>
            <a
              href='https://github.com/sarensw/MacPacker'
              className='inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded'
            >
              <span aria-hidden='true'>&#11088;</span>
              <span>{t('testimonials.githubStars', { count: 369 })}</span>
            </a>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
              <WhatOthersSay
                source='App Store'
                title='Improved a lot'
                text='Great modern/native app for archive preview. It has improved a lot compared to early days. Quick Look integration is nice too.'
                name='hi362846'
              />
              <WhatOthersSay
                source='App Store'
                title='Good tool'
                text='Useful functionality. Thanks for your dev time, and good luck with moving this forward!'
                name='Sevikha'
              />
              <WhatOthersSay
                source='App Store'
                title="Not perfect, but it's the best open source implementation currently"
                text='I hope this becomes the 7zip GUI of macOS'
                name='Jae_gone'
              />
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  )
}

export { Home }
