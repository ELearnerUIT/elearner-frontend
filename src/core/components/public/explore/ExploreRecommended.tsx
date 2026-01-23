"use client";

import CourseCard from "@/core/components/course/CourseCard";
import { usePopularCourses } from "@/hooks/public/usePublicCourses";

export default function ExploreRecommended() {
  const { courses, loading, error } = usePopularCourses(8);

  console.log("Recommended Courses:", courses);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-16">
        <h2 className="text-[28px] md:text-[36px] font-extrabold mb-6">
          Recommended For You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] h-96 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (error || courses.length === 0) {
    return null; // Don't show section if no courses available
  }

  console.log("Rendering Recommended Courses Section with courses:", courses);

  return (
    <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-16">
      <h2 className="text-[28px] md:text-[36px] font-extrabold mb-6">
        Recommended For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            teacher={course.teacherName || "Unknown"}
            image={course.thumbnailUrl || "/placeholder-course.jpg"}
            rating={course.averageRating}
            price={course.price ? `${Math.floor(course.price).toLocaleString('vi-VN')} ₫` : "Free"}
            description={course.shortDescription}
            href={`/courses/${course.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
