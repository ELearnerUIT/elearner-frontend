import { useState, useEffect } from "react";
import { recommendationService, RecommendationLogDto } from "@/services/recommendation/recommendation.service";

/**
 * Hook to fetch course recommendations for a student
 * Note: This requires authentication, so it will only work for logged-in users
 */
export function useRecommendations(studentId: number | null) {
  const [recommendations, setRecommendations] = useState<RecommendationLogDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!studentId) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await recommendationService.getRecommendations(studentId);
        setRecommendations(result);
      } catch (err) {
        setError(err as Error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [studentId]);

  return { recommendations, loading, error };
}
