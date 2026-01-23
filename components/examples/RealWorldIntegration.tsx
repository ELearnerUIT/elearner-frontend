/**
 * Real-World Integration Example
 * Shows how to use the error/success handling system in an actual component
 * 
 * This example uses REAL hooks from the codebase (unlike the pattern examples)
 */

'use client';

import { useState } from 'react';
import { useStudentCourses } from '@/lib/hooks';
import { useToast, LoadingState, LoadingButton, ErrorDisplay } from '@/lib/ui';

/**
 * Student Dashboard: My Courses Page
 * Real integration showing all error/success patterns in action
 */
export default function MyCoursesPage() {
  const { showToast } = useToast();
  const [page, setPage] = useState(0);

  // Query: Fetch enrolled courses
  // Note: In real app, get studentId from auth context
  const studentId = 1; // Placeholder
  const {
    data: coursesData,
    isLoading,
    error,
    refetch,
  } = useStudentCourses(studentId, { page, size: 12 });

  // Handle pagination
  const handleNextPage = () => {
    if (coursesData?.hasNext) {
      setPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (coursesData?.hasPrevious) {
      setPage((p) => p - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <button
          onClick={() => refetch()}
          className="text-blue-600 hover:text-blue-700"
          title="Refresh courses"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Centralized loading/error/empty state handling */}
      <LoadingState
        isLoading={isLoading}
        error={error}
        isEmpty={!coursesData?.items?.length}
        emptyMessage="You haven't enrolled in any courses yet. Browse our catalog to get started!"
        loadingMessage="Loading your courses..."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData?.items.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onUnenroll={() => {
                refetch(); // Refresh list after unenroll
                showToast('success', 'Course removed from your library');
              }}
            />
          ))}
        </div>

        {/* Pagination */}
        {coursesData && (coursesData.hasNext || coursesData.hasPrevious) && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={!coursesData.hasPrevious}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {coursesData.page + 1} of {coursesData.totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!coursesData.hasNext}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </LoadingState>

      {/* Error display with retry (alternative to LoadingState error) */}
      {error && (
        <div className="mt-6">
          <ErrorDisplay error={error} />
          <LoadingButton
            onClick={() => refetch()}
            isLoading={isLoading}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </LoadingButton>
        </div>
      )}
    </div>
  );
}

/**
 * Course Card Component with Actions
 */
function CourseCard({
  course,
  onUnenroll,
}: {
  course: any;
  onUnenroll: () => void;
}) {
  const { showToast } = useToast();
  const [showUnenrollConfirm, setShowUnenrollConfirm] = useState(false);

  // In real app: const { mutate: unenroll, isPending } = useUnenrollFromCourse();
  const isPending = false;
  const unenroll = (courseId: number, options: any) => {
    // Placeholder mutation
    setTimeout(() => {
      options.onSuccess?.();
    }, 1000);
  };

  const handleUnenroll = () => {
    unenroll(course.id, {
      onSuccess: () => {
        setShowUnenrollConfirm(false);
        onUnenroll();
      },
      onError: (error: any) => {
        showToast('error', error.message || 'Failed to unenroll from course');
      },
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {course.thumbnailUrl && (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Progress bar */}
          {course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Continue Learning
            </button>
            <button
              onClick={() => setShowUnenrollConfirm(true)}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              disabled={isPending}
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Unenroll confirmation dialog */}
      {showUnenrollConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Unenroll from Course?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unenroll from <strong>{course.title}</strong>?
              Your progress will be saved, but you'll lose access to the course content.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUnenrollConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isPending}
              >
                Cancel
              </button>
              <LoadingButton
                onClick={handleUnenroll}
                isLoading={isPending}
                loadingText="Unenrolling..."
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Unenroll
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * KEY PATTERNS DEMONSTRATED:
 * 
 * 1. ✅ LoadingState for centralized loading/error/empty handling
 * 2. ✅ Toast notifications for user feedback
 * 3. ✅ LoadingButton for actions with loading state
 * 4. ✅ Confirmation dialogs for destructive actions
 * 5. ✅ ErrorDisplay for detailed error information
 * 6. ✅ Retry functionality for failed requests
 * 7. ✅ Pagination handling
 * 8. ✅ Mutation callbacks (onSuccess, onError)
 * 9. ✅ Optimistic UI updates (refetch after mutation)
 * 10. ✅ Accessible and responsive design
 */
