import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import LinkedIn from '@assets/linkedin.svg'
import X from '@assets/x.svg'
import { Link } from 'wouter'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'

function Footer (): ReactElement {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const localizedPath = useLocalizedPath()

  return (
    <footer className='text-xs text-gray-500 py-4 md:sticky md:bottom-0 mt-0 md:z-10 text-center flex flex-col gap-3 bg-slate-50 w-full'>
      <div className='flex md:flex-row flex-col gap-2 justify-center items-center'>
        <span>{t('footer.createdBy')}</span>
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
        <span>{t('footer.copyright', { year })}</span>
        {/* <a className='ml-8' href='/imprint.html'>Impressum</a> */}
        {/* <Link href='/privacy'>Privacy</Link> */}
        <Link href={localizedPath('/imprint')}>{t('footer.imprint')}</Link>
        <a href='mailto:apps@sarensw.com'>{t('footer.contact')}</a>
      </p>
    </footer>
  )
}

export { Footer }
