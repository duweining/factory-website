import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSeo, PageType } from '@/hooks/useSeo'

interface SeoProviderProps {
  children: React.ReactNode
  pageType: PageType
  defaultTitle?: string
  defaultKeywords?: string
  defaultDescription?: string
}

export default function SeoProvider({
  children,
  pageType,
  defaultTitle = '',
  defaultKeywords = '',
  defaultDescription = '',
}: SeoProviderProps) {
  const { seoSettings, fetchSeoSettings } = useSeo()

  useEffect(() => {
    fetchSeoSettings()
  }, [])

  const setting = seoSettings[pageType]
  
  const title = setting?.title || defaultTitle
  const keywords = setting?.keywords || defaultKeywords
  const description = setting?.description || defaultDescription

  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {keywords && (
          <meta
            name="keywords"
            content={keywords}
          />
        )}
        {description && (
          <meta
            name="description"
            content={description}
          />
        )}
      </Helmet>
      {children}
    </>
  )
}
