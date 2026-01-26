"use client";

import CourseCarousel from "./CourseCarousel";
import { usePopularCourses } from "@/hooks/public/usePublicCourses";

export default function ExplorePopular() {
  const { courses, loading, error } = usePopularCourses(12);

  return (
    <section className="px-4 sm:px-6 md:px-10 xl:px-16 mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[28px] md:text-[36px] font-extrabold">
          Popular Courses
        </h2>
        <a className="text-sm font-semibold text-lime-300 hover:text-lime-200" href="/explore">
          View all →
        </a>
      </div>

      <CourseCarousel courses={courses} loading={loading} error={error} />
    </section>
  );
}
