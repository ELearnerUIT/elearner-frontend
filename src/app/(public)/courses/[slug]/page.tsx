"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { coursePreviewService } from "@/services/courses/course-preview.service";
import { enrollmentService } from "@/services/learning/enrollment.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Image from "next/image";
import {
  Star, Clock, Users, BookOpen, Loader2, Award, Calendar, TrendingUp,
  PlayCircle, FileText, HelpCircle, CheckCircle2, Globe, Smartphone, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import PreviewVideoPlayer from "@/core/components/course/PreviewVideoPlayer";

type TabType = "overview" | "curriculum" | "instructor" | "reviews";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [previewLessonId, setPreviewLessonId] = useState<number | null>(null);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course-preview", slug],
    queryFn: () => coursePreviewService.getCoursePreview(slug),
    enabled: !!slug,
  });

  // Get rating summary
  const { data: ratingSummary } = useQuery({
    queryKey: ["course-rating", course?.id],
    queryFn: () => coursePreviewService.getCourseRatingSummary(course!.id),
    enabled: !!course?.id,
  });

  // Get reviews
  const { data: reviewsData } = useQuery({
    queryKey: ["course-reviews", course?.id],
    queryFn: () => coursePreviewService.getPublicCourseReviews(course!.id, "createdAt,desc", 0, 10),
    enabled: !!course?.id,
  });

  // Get teacher profile
  const { data: teacherProfile } = useQuery({
    queryKey: ["teacher-profile", course?.teacher?.id],
    queryFn: () => coursePreviewService.getTeacherPublicProfile(course!.teacher!.id),
    enabled: !!course?.teacher?.id,
  });

  // Get related courses
  const { data: relatedCourses } = useQuery({
    queryKey: ["related-courses", course?.id],
    queryFn: () => coursePreviewService.getRelatedCourses(course!.id, 4),
    enabled: !!course?.id,
  });

  // Check if user is already enrolled
  const { data: enrollments } = useQuery({
    queryKey: ["student-enrollments", user?.profile?.studentId],
    queryFn: async () => {
      if (!user?.profile?.studentId) return null;
      return enrollmentService.getStudentEnrollments(user.profile.studentId);
    },
    enabled: !!user?.profile?.studentId && isAuthenticated,
  });

  console.log("Course Detail Page - enrollments:", enrollments);
  // Update enrollment status when enrollments data changes
  useEffect(() => {
    if (enrollments && course?.id) {
      const enrolled = enrollments.items?.some(
        (enrollment: { courseId: number; status: string }) =>
          enrollment.courseId === course.id && enrollment.status === "ACTIVE"
      );
      setIsEnrolled(!!enrolled);
    }
  }, [enrollments, course?.id]);

  const handleEnroll = async () => {
    // Check authentication
    if (!isAuthenticated || !user) {
      toast.error("Please log in to enroll in this course");
      router.push(`/login?redirect=/courses/${slug}`);
      return;
    }

    // Check if already enrolled
    if (isEnrolled) {
      router.push(`/learner/learn/${slug}`);
      return;
    }

    if (!course?.id || !course?.publishedVersion?.id) {
      toast.error("Course information is incomplete");
      return;
    }

    // Only students can enroll
    if (user.role !== "STUDENT") {
      toast.error("Only students can enroll in courses");
      return;
    }

    // Check if course is free or paid
    const isFree = !course.publishedVersion.price || course.publishedVersion.price === 0;

    if (isFree) {
      // Auto-enroll for free courses
      setIsEnrolling(true);
      try {
        await enrollmentService.enrollCourse(course.id, {
          notes: "Enrolled in free course",
        });
        toast.success("Successfully enrolled! Redirecting to course...");
        setTimeout(() => {
          router.push(`/learner/learn/${slug}`);
        }, 1000);
      } catch (error: unknown) {
        console.error("Enrollment error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to enroll in course";
        toast.error(errorMessage);
      } finally {
        setIsEnrolling(false);
      }
    } else {
      // Redirect to checkout for paid courses
      router.push(`/learner/checkout/${slug}`);
    }
  };

  const handlePreviewLesson = (lessonId: number) => {
    setPreviewLessonId(lessonId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-10 xl:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded w-3/4 mb-4" />
            <div className="h-6 bg-white/10 rounded w-1/2 mb-8" />
            <div className="aspect-video bg-white/10 rounded-2xl mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-white/10 rounded w-1/3" />
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
              </div>
              <div className="h-96 bg-white/10 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen px-4 sm:px-6 md:px-10 xl:px-16 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/explore"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section - Udemy Style */}
      <section className="bg-slate-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 xl:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/explore" className="hover:text-primary transition">
                  Courses
                </Link>
                <span>/</span>
                {course.category && (
                  <>
                    <Link href={`/explore?category=${course.category.id}`} className="hover:text-primary transition">
                      {course.category.name}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <span className="text-foreground">{course.title}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                {course.title}
              </h1>

              {course.shortDescription && (
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  {course.shortDescription}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Rating */}
                {ratingSummary && ratingSummary.totalReviews > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-yellow-400">{ratingSummary.averageRating.toFixed(1)}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= Math.round(ratingSummary.averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({ratingSummary.totalReviews} ratings)
                    </span>
                  </div>
                )}

                {/* Students Count */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>1,234 students</span>
                </div>

                {/* Difficulty */}
                {course.difficulty && (
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                    {course.difficulty}
                  </span>
                )}
              </div>

              {/* Teacher Info */}
              {course.teacher && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={course.teacher.avatarUrl || "/images/avatars/default-avatar.png"}
                      alt={course.teacher.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created by</p>
                    <p className="font-semibold">{course.teacher.name}</p>
                  </div>
                </div>
              )}

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {course.publishedVersion?.totalLessons && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.publishedVersion.totalLessons} lessons</span>
                  </div>
                )}
                {course.publishedVersion?.totalChapters && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.publishedVersion.totalChapters} chapters</span>
                  </div>
                )}
                {course.publishedVersion?.totalDurationSeconds && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(course.publishedVersion.totalDurationSeconds / 3600)}h {Math.floor((course.publishedVersion.totalDurationSeconds % 3600) / 60)}m</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Only visible on mobile in hero */}
            <div className="lg:hidden">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={course.thumbnailUrl || "/images/lesson_thum.png"}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sticky Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 xl:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Content - будет добавлена ​​в следующем изменении */}
          <div className="lg:col-span-2">
            {/* Placeholder - Main content tabs будут здесь */}
          </div>

          {/* Right Sidebar - Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl border border-white/20 bg-white/[0.06] p-6 shadow-xl">
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2">
                    {course.publishedVersion?.price ? `${Math.floor(course.publishedVersion.price).toLocaleString('vi-VN')} ₫` : "Free"}
                  </div>
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition mb-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-600/50 hover:shadow-xl hover:shadow-green-600/60 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isEnrolling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : isEnrolled ? (
                    "Go to Course"
                  ) : (
                    "Enroll Now"
                  )}
                </button>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="font-semibold mb-3">This course includes:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {course.publishedVersion?.chapters && (
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {course.publishedVersion.chapters.length} chapters
                      </li>
                    )}
                    {course.publishedVersion?.totalLessons && (
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {course.publishedVersion.totalLessons} lessons
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content - Details */}
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* Course Description */}
              {course.publishedVersion?.description && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    About This Course
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {course.publishedVersion.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Course Curriculum */}
              {course.publishedVersion?.chapters && course.publishedVersion.chapters.length > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Course Content
                  </h2>
                  <div className="space-y-4">
                    {course.publishedVersion.chapters.map((chapter: any, index: number) => (
                      <div
                        key={chapter.id}
                        className="rounded-xl border border-white/20 bg-white/[0.03] overflow-hidden"
                      >
                        <div className="p-4 bg-white/[0.05]">
                          <h3 className="font-semibold">
                            Chapter {index + 1}: {chapter.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {chapter.lessons.length} lessons • {chapter.formattedTotalDuration || "N/A"}
                          </p>
                        </div>
                        <div className="divide-y divide-white/10">
                          {chapter.lessons.map((lesson: any) => (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-sm flex-shrink-0">
                                  {lesson.isPreview ? "▶️" : "🔒"}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{lesson.title}</div>
                                  {lesson.durationSeconds && (
                                    <div className="text-sm text-muted-foreground">
                                      {lesson.formattedDuration || `${Math.floor(lesson.durationSeconds / 60)} min`}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.isPreview && lesson.isVideoReady && (
                                  <button
                                    onClick={() => handlePreviewLesson(lesson.id)}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    Preview
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Teacher Profile Section */}
              {course.teacher && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    About the Instructor
                  </h2>
                  <div className="rounded-xl border border-white/20 bg-white/[0.03] p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={course.teacher.avatarUrl || "/images/avatars/default-avatar.png"}
                          alt={course.teacher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.teacher.name}</h3>
                        {course.teacher.email && (
                          <p className="text-sm text-muted-foreground mb-3">{course.teacher.email}</p>
                        )}
                        {course.teacher.bio && (
                          <p className="text-muted-foreground">{course.teacher.bio}</p>
                        )}
                        {teacherProfile && (
                          <div className="mt-4 flex flex-wrap gap-4 text-sm">
                            {teacherProfile.totalCourses > 0 && (
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span>{teacherProfile.totalCourses} courses</span>
                              </div>
                            )}
                            {teacherProfile.totalStudents > 0 && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{teacherProfile.totalStudents} students</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews & Ratings Section */}
              {ratingSummary && ratingSummary.totalReviews > 0 && (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Student Reviews
                  </h2>

                  {/* Rating Summary */}
                  <div className="rounded-xl border border-white/20 bg-white/[0.03] p-6 mb-6">
                    <div className="flex items-start gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">
                          {ratingSummary.averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= Math.round(ratingSummary.averageRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                                }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ratingSummary.totalReviews} reviews
                        </div>
                      </div>

                      {/* Rating Distribution */}
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = ratingSummary.ratingDistribution[rating] || 0;
                          const percentage = ratingSummary.totalReviews > 0
                            ? (count / ratingSummary.totalReviews) * 100
                            : 0;
                          return (
                            <div key={rating} className="flex items-center gap-3">
                              <div className="flex items-center gap-1 w-16">
                                <span className="text-sm">{rating}</span>
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              </div>
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <div className="text-sm text-muted-foreground w-12 text-right">
                                {count}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  {reviewsData && reviewsData.items && reviewsData.items.length > 0 && (
                    <div className="space-y-4">
                      {reviewsData.items.map((review: any) => (
                        <div
                          key={review.id}
                          className="rounded-xl border border-white/20 bg-white/[0.03] p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={review.avatarUrl || "/images/avatars/default-avatar.png"}
                                alt={review.username || "Student"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">{review.username || "Anonymous"}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`h-4 w-4 ${star <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-400"
                                            }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {review.title && (
                                <h5 className="font-semibold mb-2">{review.title}</h5>
                              )}
                              {review.content && (
                                <p className="text-muted-foreground">{review.content}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Related Courses */}
              {relatedCourses && relatedCourses.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Related Courses</h3>
                  <div className="space-y-4">
                    {relatedCourses.map((relatedCourse: any) => (
                      <Link
                        key={relatedCourse.id}
                        href={`/courses/${relatedCourse.slug}`}
                        className="block rounded-xl border border-white/20 bg-white/[0.03] overflow-hidden hover:border-white/40 transition group"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={relatedCourse.thumbnailUrl || "/images/lesson_thum.png"}
                            alt={relatedCourse.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition">
                            {relatedCourse.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{relatedCourse.averageRating.toFixed(1)}</span>
                              {relatedCourse.totalReviews && (
                                <span className="text-muted-foreground">
                                  ({relatedCourse.totalReviews})
                                </span>
                              )}
                            </div>
                            {relatedCourse.price !== undefined && (
                              <span className="font-semibold">
                                {relatedCourse.price > 0
                                  ? `${Math.floor(relatedCourse.price).toLocaleString('vi-VN')} ₫`
                                  : "Free"}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Preview Video Modal */}
      {previewLessonId && (
        <PreviewVideoPlayer
          lessonId={previewLessonId}
          onClose={() => setPreviewLessonId(null)}
        />
      )}
    </div>
  );
}
