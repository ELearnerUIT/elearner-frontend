// Hooks cho enrollment APIs của learner

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { enrollmentService } from '../../services/learning/enrollment.service';
import { learnerCourseService } from '../../services/learner/courseService';
import type { MyCourse } from '@/lib/learner/dashboard/types';
import type { EnrollmentDetailResponse } from '../../services/learning/enrollment.types';


/** Lấy danh sách enrollment của student, kèm chi tiết khoá học */
export function useEnrollments(page: number, size: number) {
  const { user } = useAuth();
  const [courses, setCourses] = useState<MyCourse[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const studentId = user?.profile?.studentId;
      console.log("StudentId: ", studentId);
      if (!studentId) return;
      setIsLoading(true);
      try {
        // Lấy danh sách enrollment (có phân trang)
        const enrollmentsRes = await enrollmentService.getStudentEnrollments(studentId);
        const items = enrollmentsRes.items || [];
        setTotal(enrollmentsRes.totalItems || items.length);
        // Lấy chi tiết khoá học cho từng courseSlug (ưu tiên slug)
        const coursePromises = items.map((enrollment: any) => {
          // Ưu tiên dùng slug, nếu không có thì dùng courseId
          const identifier = enrollment.courseSlug || enrollment.courseId;
          return learnerCourseService.getCourseBySlug(String(identifier));
        });
        const courseDetails = await Promise.all(coursePromises);
        // Map sang MyCourse, có thể lấy thêm thông tin enrollment nếu cần
        const mapped = courseDetails.map((course: any, idx: number) => {
          const enrollment = items[idx];
          return {
            id: String(course.id),
            courseId: enrollment.courseId, // thêm trường này để so sánh chuẩn
            slug: String(course.slug || course.id),
            title: course.title,
            instructor: String(enrollment.instructorName || "Unknown"),
            thumbColor: "from-emerald-500 via-sky-500 to-indigo-500",
            thumbnailUrl: course.thumbnailUrl,
            progress: enrollment.completionPercentage ?? 0,
            lastViewed: enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : "-",
            level: (course.difficulty === 'BEGINNER' ? 'Beginner' : course.difficulty === 'INTERMEDIATE' ? 'Intermediate' : 'Advanced') as 'Beginner' | 'Intermediate' | 'Advanced',
            category: String(course.categoryName || ""),
            rating: course.rating ?? 0,
          };
        });
        setCourses(mapped);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user?.profile?.studentId, page, size]);

  return { courses, total, isLoading };
}

/** Lấy chi tiết enrollment */
export function useEnrollmentDetail(enrollmentId: number) {
  return useQuery<EnrollmentDetailResponse>({
    queryKey: ['learner-enrollment-detail', enrollmentId],
    queryFn: () => enrollmentService.getEnrollmentDetail(enrollmentId),
    enabled: !!enrollmentId,
  });
}

/** Đăng ký khoá học */
export function useEnrollCourse() {
  return useMutation({
    mutationFn: ({ courseId, notes }: { courseId: number; notes: string; paymentTransactionId?: number }) =>
      enrollmentService.enrollCourse(courseId, { notes, paymentTransactionId: undefined }),
  });
}

/** Huỷ đăng ký khoá học */
export function useCancelEnrollment() {
  return useMutation({
    mutationFn: ({ enrollmentId, reason }: { enrollmentId: number; reason: string }) => 
      enrollmentService.cancelEnrollment(enrollmentId, { reason }),
  });
}
