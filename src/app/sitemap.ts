import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://elearner.com'

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // TODO: Add dynamic course routes
  // To improve SEO further, fetch published courses from your API and add them:
  // const courses = await fetchPublishedCourses()
  // const courseRoutes = courses.map(course => ({
  //   url: `${baseUrl}/courses/${course.slug}`,
  //   lastModified: course.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.8,
  // }))
  // return [...staticRoutes, ...courseRoutes]

  return staticRoutes
}
