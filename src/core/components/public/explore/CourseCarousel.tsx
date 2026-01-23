"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/core/components/course/CourseCard";
import type { CourseCardResponse } from "@/services/courses/course.types";

interface CourseCarouselProps {
  courses: CourseCardResponse[];
  loading?: boolean;
  error?: Error | null;
}

function usePerView() {
  const [pv, setPv] = useState(1);

  useEffect(() => {
    const md = matchMedia("(min-width: 768px)");
    const lg = matchMedia("(min-width: 1024px)");
    const xl = matchMedia("(min-width: 1280px)");

    const compute = () => {
      setPv(xl.matches ? 4 : lg.matches ? 3 : md.matches ? 2 : 1);
    };

    compute();
    [md, lg, xl].forEach((mq) => mq.addEventListener("change", compute));

    return () =>
      [md, lg, xl].forEach((mq) =>
        mq.removeEventListener("change", compute)
      );
  }, []);

  return pv;
}

export default function CourseCarousel({ courses = [], loading, error }: CourseCarouselProps) {
  const perView = usePerView();
  const [page, setPage] = useState(0);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400">Failed to load courses</p>;
  }

  if (!courses.length) {
    return <p className="text-muted-foreground">No popular courses available</p>;
  }

  useEffect(() => setPage(0), [perView]);

  const pages = Math.ceil(courses.length / perView);
  const maxPage = pages - 1;

  const go = (dir: "prev" | "next") => {
    setPage((p) =>
      Math.min(maxPage, Math.max(0, p + (dir === "next" ? 1 : -1)))
    );
  };

  const trackWidthPct = pages * 100;
  const translatePct = page * (100 / pages);
  const itemBasisPct = 100 / (perView * pages);

  return (
    <div className="relative overflow-hidden">
      {/* TRACK */}
      <div
        className="flex transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] gap-4"
        style={{
          width: `${trackWidthPct}%`,
          transform: `translateX(-${translatePct}%)`,
        }}
      >
        {courses.map((c) => (
          <div key={c.id} style={{ flex: `0 0 ${itemBasisPct}%` }}>
            <CourseCard
              id={c.id.toString()}
              title={c.title}
              teacher={c.teacherName || "Instructor"}
              image={c.thumbnailUrl || "/images/lesson_thum.png"}
              rating={c.averageRating || 0}
              ratingCount={c.totalReviews || 0}
              price={c.salePrice ? `₫${c.salePrice.toLocaleString()}` : c.price ? `₫${c.price.toLocaleString()}` : "Free"}
              originalPrice={c.salePrice && c.price ? `₫${c.price.toLocaleString()}` : undefined}
              href={`/courses/${c.slug}`}
            />
          </div>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        aria-label="Previous"
        onClick={() => go("prev")}
        disabled={page === 0}
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          h-12 w-12 grid place-content-center rounded-full
          bg-white text-lime-600
          shadow-[0_4px_15px_rgba(0,0,0,0.12)]
          hover:scale-105 hover:shadow-[0_6px_20px_rgba(101,216,48,0.4)]
          transition
          disabled:opacity-40 disabled:hover:scale-100
        "
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* RIGHT ARROW */}
      <button
        aria-label="Next"
        onClick={() => go("next")}
        disabled={page === maxPage}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          h-12 w-12 grid place-content-center rounded-full
          bg-white text-lime-600
          shadow-[0_4px_15px_rgba(0,0,0,0.12)]
          hover:scale-105 hover:shadow-[0_6px_20px_rgba(101,216,48,0.4)]
          transition
          disabled:opacity-40 disabled:hover:scale-100
        "
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* EDGE FADES */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
