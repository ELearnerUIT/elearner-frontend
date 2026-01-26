import { axiosClient } from "@/lib/api/axios";
import { unwrapResponse } from "@/lib/api/unwrap";
import { ApiResponse } from "@/lib/api/api.types";

export interface RecommendationLogDto {
  id: number;
  courseId: number;
  studentId: number;
  score: number;
  reason: string;
  feedback?: "LIKED" | "IGNORED" | "DISMISSED" | "ENROLLED";
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationFeedbackRequest {
  feedback: "LIKED" | "IGNORED" | "DISMISSED" | "ENROLLED";
}

export const recommendationService = {
  /**
   * Get course recommendations for a student (requires authentication)
   */
  getRecommendations: async (
    studentId: number,
  ): Promise<RecommendationLogDto[]> => {
    const response = await axiosClient.get<
      ApiResponse<RecommendationLogDto[]>
    >(`/students/${studentId}/recommendations`);

    return unwrapResponse(response);
  },

  /**
   * Submit feedback on a recommendation
   */
  giveFeedback: async (
    id: number,
    feedback: RecommendationFeedbackRequest,
  ): Promise<void> => {
    await axiosClient.post<void>(`/recommendations/${id}/feedback`, feedback);
  },
};
