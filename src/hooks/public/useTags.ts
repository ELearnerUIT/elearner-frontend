import { useState, useEffect } from "react";
import { tagService } from "@/services/courses/tag.service";
import type {
  TagResponse,
  TagStatsResponse,
} from "@/services/courses/course.types";
import type { PageResponse } from "@/lib/api/api.types";

export function useAllTags(page: number = 0, size: number = 100) {
  const [data, setData] = useState<PageResponse<TagResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await tagService.getTags(page, size);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [page, size]);

  return { data, loading, error, tags: data?.items || [] };
}

export function usePopularTags(limit: number = 20) {
  const [tags, setTags] = useState<TagStatsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await tagService.getPopularTags(limit);
        setTags(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [limit]);

  return { tags, loading, error };
}
