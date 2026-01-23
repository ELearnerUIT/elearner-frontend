/**
 * Example: Course Management with Complete Error/Success Handling
 * Demonstrates best practices for using React Query hooks with UX feedback
 * 
 * NOTE: This is a DOCUMENTATION EXAMPLE showing the patterns to use.
 * In real code, import individual hooks from @/lib/hooks
 * 
 * CORRECT USAGE:
 * ```tsx
 * import { useCourseList, useCreateCourse, useDeleteCourse } from '@/lib/hooks';
 * 
 * const { data, isLoading, error } = useCourseList({ page: 0, size: 10 });
 * const { mutate, isPending } = useCreateCourse();
 * ```
 */

'use client';

import { useState } from 'react';
import { useToast } from '@/lib/ui/toast';
import { ErrorDisplay } from '@/lib/ui/error-display';
import { LoadingState, LoadingButton } from '@/lib/ui/loading';
import { getFieldErrors } from '@/lib/hooks/use-mutation-state';

/**
 * Example 1: List with loading/error/empty states
 * Shows centralized state handling with LoadingState component
 */
export function CourseListExample() {
  // Placeholder - in real code: const { data, isLoading, error } = useCourseList({ page: 0, size: 10 });
  const data = undefined as any;
  const isLoading = false;
  const error = null;
  const refetch = () => {};

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Courses</h2>

      <LoadingState
        isLoading={isLoading}
        error={error}
        isEmpty={!data?.items?.length}
        emptyMessage="No courses found"
        loadingMessage="Loading courses..."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.items?.map((course: any) => (
            <div key={course.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-gray-600 text-sm">{course.description}</p>
            </div>
          ))}
        </div>
      </LoadingState>

      {error && (
        <div className="mt-4">
          <ErrorDisplay error={error} />
          <button onClick={() => refetch()} className="mt-2 text-blue-600 hover:underline">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Example 2: Create form with field validation error mapping
 * Shows how to map backend validation errors to form fields
 */
export function CourseCreateFormExample() {
  // Placeholder - in real code: const { mutate, isPending, isSuccess, error } = useCreateCourse();
  const mutate = (data: any, options: any) => {};
  const isPending = false;
  const isSuccess = false;
  const error = null;
  
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
  });

  const fieldErrors = getFieldErrors(error as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data: any) => {
        showToast('success', 'Course created successfully!');
        setFormData({ title: '', description: '', price: 0 });
      },
      onError: (error: any) => {
        showToast('error', error.message || 'Failed to create course');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <h2 className="text-2xl font-bold">Create Course</h2>

      {error && !fieldErrors.title && <ErrorDisplay error={error} />}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`mt-1 block w-full rounded-md border ${
            fieldErrors.title ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2`}
        />
        {fieldErrors.title && <p className="text-sm text-red-600 mt-1">{fieldErrors.title}</p>}
      </div>

      <LoadingButton
        type="submit"
        isLoading={isPending}
        loadingText="Creating..."
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        Create Course
      </LoadingButton>

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700">Course created successfully!</p>
        </div>
      )}
    </form>
  );
}

/**
 * Example 3: Delete with confirmation dialog
 * Shows confirmation pattern with loading state
 */
export function CourseDeleteButtonExample({ courseId }: { courseId: number }) {
  // Placeholder - in real code: const { mutate, isPending } = useDeleteCourse();
  const mutate = (id: number, options: any) => {};
  const isPending = false;
  
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    mutate(courseId, {
      onSuccess: () => {
        showToast('success', 'Course deleted successfully');
        setShowConfirm(false);
      },
      onError: (error: any) => {
        showToast('error', error.message || 'Failed to delete course');
      },
    });
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)} className="text-red-600 hover:text-red-700" disabled={isPending}>
        Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-gray-600" disabled={isPending}>
                Cancel
              </button>
              <LoadingButton
                onClick={handleDelete}
                isLoading={isPending}
                loadingText="Deleting..."
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
