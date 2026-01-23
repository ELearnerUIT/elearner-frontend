import { useState, useEffect } from "react";
import { learnerCourseService } from "@/services/learner/courseService";
import { coursePreviewService } from "@/services/courses/course-preview.service";
import type { CourseListResponse } from "@/lib/learner/course/courses";
import type { CourseCardResponse } from "@/services/courses/course.types";

interface UsePublicCoursesOptions {
  page?: number;
  size?: number;
  categoryId?: number;
  level?: string;
  tags?: string[];
  search?: string;
}

export function usePublicCourses(options: UsePublicCoursesOptions = {}) {
  const [data, setData] = useState<CourseListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const params: Record<string, any> = {
          page: options.page || 0,
          size: options.size || 12,
        };

        if (options.categoryId) params.categoryId = options.categoryId;
        if (options.level) params.level = options.level;
        if (options.tags?.length) params.tags = options.tags.join(",");
        if (options.search) params.search = options.search;

        const result = options.search
          ? await learnerCourseService.searchCourses(params)
          : await learnerCourseService.getCourses(params);

        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [
    options.page,
    options.size,
    options.categoryId,
    options.level,
    options.tags?.join(","),
    options.search,
  ]);

  return { data, loading, error };
}

export function usePopularCourses(limit: number = 8) {
  const [courses, setCourses] = useState<CourseCardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await coursePreviewService.getPopularCourses(limit);
        setCourses(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [limit]);

  return { courses, loading, error };
}

export function useRelatedCourses(courseId: number, limit: number = 4) {
  const [courses, setCourses] = useState<CourseCardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchRelated = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await coursePreviewService.getRelatedCourses(
          courseId,
          limit,
        );
        setCourses(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [courseId, limit]);

  return { courses, loading, error };
}
