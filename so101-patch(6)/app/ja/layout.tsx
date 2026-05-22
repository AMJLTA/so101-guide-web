import type { Metadata } from 'next'
import { siteConfigJa } from '@/lib/site-config-ja'

export const metadata: Metadata = {
  metadataBase: new URL('https://so101.greenjin.tech'),
  title: {
    default: siteConfigJa.name,
    template: `%s | ${siteConfigJa.shortName}`
  },
  description: siteConfigJa.description,
  keywords: siteConfigJa.keywords,
  authors: siteConfigJa.authors,
  creator: siteConfigJa.creator,
  applicationName: siteConfigJa.name,
  category: 'education',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['zh_CN'],
    url: siteConfigJa.url,
    title: siteConfigJa.name,
    description: siteConfigJa.description,
    siteName: siteConfigJa.name
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfigJa.name,
    description: siteConfigJa.description
  },
  alternates: {
    canonical: '/ja',
    languages: {
      'zh-CN': '/',
      'ja-JP': '/ja'
    }
  }
}

export default function JaLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // The root <html> tag is set by app/layout.tsx with lang="zh-CN".
  // We can't change it at the segment level in Next.js App Router, but we
  // override the page-level metadata (locale=ja_JP) and rely on the language
  // switcher in the header for navigation. Search engines pick up the JP
  // version via the alternates.languages above and the openGraph locale.
  return <>{children}</>
}
