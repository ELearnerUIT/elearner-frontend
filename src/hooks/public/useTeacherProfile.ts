import { useState, useEffect } from "react";
import { coursePreviewService } from "@/services/courses/course-preview.service";

export function useTeacherPublicProfile(teacherId: number | null) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const result =
          await coursePreviewService.getTeacherPublicProfile(teacherId);
        setProfile(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [teacherId]);

  return { profile, loading, error };
}
