import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { chapters } from '@/lib/course-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/product`, lastModified, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${siteConfig.url}/learn`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/diagnose`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/assistant`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/glossary`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteConfig.url}/resources`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteConfig.url}/about`, lastModified, changeFrequency: 'yearly', priority: 0.5 }
  ]

  const chapterRoutes: MetadataRoute.Sitemap = chapters.map((chapter) => ({
    url: `${siteConfig.url}/learn/${chapter.id}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  return [...staticRoutes, ...chapterRoutes]
}
