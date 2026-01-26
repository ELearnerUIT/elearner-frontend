import { useState, useEffect } from "react";
import { coursePreviewService } from "@/services/courses/course-preview.service";
import type {
  CoursePreviewResponse,
  CourseReviewResponse,
  RatingSummaryResponse,
} from "@/services/courses/course.types";
import type { PageResponse, SpringPage } from "@/lib/api/api.types";

export function useCoursePreview(slug: string) {
  const [course, setCourse] = useState<CoursePreviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await coursePreviewService.getCoursePreview(slug);
        setCourse(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  return { course, loading, error };
}

export function useCourseReviews(
  courseId: number,
  sort: string = "createdAt,desc",
  page: number = 0,
  size: number = 10,
) {
  const [data, setData] = useState<PageResponse<CourseReviewResponse> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await coursePreviewService.getPublicCourseReviews(
          courseId,
          sort,
          page,
          size,
        );
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId, sort, page, size]);

  return { data, loading, error, reviews: data?.items || [] };
}

export function useRatingSummary(courseId: number) {
  const [summary, setSummary] = useState<RatingSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        const result =
          await coursePreviewService.getCourseRatingSummary(courseId);
        setSummary(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [courseId]);

  return { summary, loading, error };
}
