"use client";

import CourseCard, { type Course } from "./CourseCard";
import CourseHoverCard from "@/core/components/course/CourseHoverCard";
import { previewFromCourse } from "@/core/components/infra/PreviewAdapters";
import { usePopularCourses } from "@/hooks/public/usePublicCourses";

export default function CourseGrid() {
  const { courses, loading, error } = usePopularCourses(8);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 mt-10">Failed to load courses</p>;
  }

  if (!courses.length) {
    return <p className="text-muted-foreground mt-10">No courses available</p>;
  }

  // Map API data to Course interface
  const mappedCourses: Course[] = courses.map(c => ({
    id: c.id.toString(),
    title: c.title,
    teacher: c.teacherName || "Instructor",
    price: c.salePrice ? `₫${c.salePrice.toLocaleString()}` : c.price ? `₫${c.price.toLocaleString()}` : "Free",
    rating: c.averageRating || 0,
    image: c.thumbnailUrl || "/images/lesson_thum.png",
    originalPrice: c.salePrice && c.price ? `₫${c.price.toLocaleString()}` : undefined,
    ratingCount: c.totalReviews,
    href: `/courses/${c.slug}`,
  }));

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
      {mappedCourses.map((course) => (
        <CourseHoverCard
          key={course.id ?? course.title}
          preview={previewFromCourse(course)}
          anchorClassName="h-full block"
        >
          <CourseCard {...course} />
        </CourseHoverCard>
      ))}
    </div>
  );
}
