import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://elearner.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/explore',
          '/courses/',
          '/privacy',
          '/terms',
        ],
        disallow: [
          '/admin/',
          '/teacher/',
          '/learner/',
          '/login',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/verify-email',
          '/*/dashboard',
          '/403',
          '/500',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
