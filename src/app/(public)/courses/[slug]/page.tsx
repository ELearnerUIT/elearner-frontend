"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { coursePreviewService } from "@/services/courses/course-preview.service";
import { enrollmentService } from "@/services/learning/enrollment.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Image from "next/image";
import { Star, Clock, Users, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ["course-preview", slug],
    queryFn: () => coursePreviewService.getCoursePreview(slug),
    enabled: !!slug,
  });

  // Check if user is already enrolled
  const { data: enrollments } = useQuery({
    queryKey: ["student-enrollments", user?.profile?.studentId],
    queryFn: async () => {
      if (!user?.profile?.studentId) return null;
      return enrollmentService.getStudentEnrollments(user.profile.studentId);
    },
    enabled: !!user?.profile?.studentId,
  });

  console.log("Course Detail Page - enrollments:", enrollments);
  // Update enrollment status when enrollments data changes
  useEffect(() => {
    if (enrollments && course?.id) {
      const enrolled = enrollments.items?.some(
        (enrollment: { courseId: number; status: string }) => enrollment.courseId === course.id
      );
      setIsEnrolled(!!enrolled);
    }
  }, [enrollments, course?.id]);

  const handleEnroll = async () => {
    // Check authentication
    if (!isAuthenticated || !user) {
      toast.error("Please log in to enroll");
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

    if (user.role !== "STUDENT") {  
      toast.error("Only students can enroll in courses");
      return;
    }

    const studentId = user.profile?.studentId;
    if (!studentId) {
      toast.error("Student profile not found");
      return;
    }

    // Check if course is free
    const isFree = !course.publishedVersion.price || course.publishedVersion.price === 0;

    if (isFree) {
      // Auto-enroll for free courses
      setIsEnrolling(true);
      try {
        await enrollmentService.enrollCourse(course.id, {
          paymentTransactionId: 123456, // Dummy transaction ID for free courses
          notes: "Auto-enrolled in free course",
        })
        toast.success("Successfully enrolled! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/learner/dashboard");
        }, 1000);
      } catch (error: unknown) {
        console.error("Enrollment error:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to enroll in course";
        toast.error(errorMessage);
      } finally {
        setIsEnrolling(false);
      }
    } else {
      // Redirect to payment flow for paid courses
      toast.info("Redirecting to payment...");
      router.push(`/learner/checkout/${course.id}`);
    }
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white/[0.08] to-transparent px-4 sm:px-6 md:px-10 xl:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                {course.title}
              </h1>

              {course.shortDescription && (
                <p className="text-lg text-muted-foreground mb-6">
                  {course.shortDescription}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {course.publishedVersion?.totalLessons && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-muted-foreground">
                      {course.publishedVersion.totalLessons} lessons
                    </span>
                  </div>
                )}

                {course.publishedVersion?.totalChapters && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span className="text-muted-foreground">
                      {course.publishedVersion.totalChapters} chapters
                    </span>
                  </div>
                )}

                {course.difficulty && (
                  <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {course.difficulty}
                  </div>
                )}
              </div>

              {/* Teacher Info */}
              {course.teacher && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-sm text-muted-foreground">
                    Created by{" "}
                    <span className="text-foreground font-semibold">
                      {course.teacher.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Course Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
                <Image
                  src={course.thumbnailUrl || "/images/lesson_thum.png"}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Sidebar - Purchase Card */}
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-600/50 hover:shadow-xl hover:shadow-green-600/60 transform hover:scale-[1.02] active:scale-[0.98]"
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

                {!isEnrolled && course.publishedVersion?.price && course.publishedVersion.price > 0 && (
                  <button className="w-full border border-white/20 hover:bg-white/5 font-semibold py-3 rounded-lg transition">
                    Add to Cart
                  </button>
                )}

                <div className="mt-6 pt-6 border-t border-white/10">
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

      {/* Course Content */}
      <section className="px-4 sm:px-6 md:px-10 xl:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Course Curriculum */}
              {course.publishedVersion?.chapters && course.publishedVersion.chapters.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Course Content
                  </h2> 
                  <div className="space-y-4">
                    {course.publishedVersion.chapters.map((chapter, index) => (
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
                          {chapter.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                                  {lesson.isPreview ? "▶️" : "🔒"}
                                </div>
                                <div>
                                  <div className="font-medium">{lesson.title}</div>
                                  {lesson.durationSeconds && (
                                    <div className="text-sm text-muted-foreground">
                                      {lesson.formattedDuration || `${Math.floor(lesson.durationSeconds / 60)} min`}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {lesson.isPreview && (
                                <span className="text-xs text-primary font-semibold">
                                  Preview
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
