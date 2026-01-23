/**
 * Example: Automatic Toast Notifications
 * Shows how to use enhanced hooks with automatic toast handling
 */

'use client';

import { useState } from 'react';
import { useToastMutation, createToastMutation } from '@/lib/hooks/use-toast-mutation';
import { LoadingButton, LoadingState } from '@/lib/ui';

/**
 * Example 1: Using useToastMutation directly
 * Toasts show automatically on success/error
 */
export function DirectToastExample() {
  const [formData, setFormData] = useState({ title: '', description: '' });

  // Mutation with automatic toasts
  const createCourseMutation = useToastMutation({
    mutationFn: async (data: typeof formData) => {
      // Your API call here
      // return await createCourse(data);
      return { id: 1, ...data }; // Placeholder
    },
    successMessage: 'Course created successfully!',
    errorMessage: 'Failed to create course',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just call mutate - toasts show automatically!
    createCourseMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h2 className="text-xl font-bold">Create Course (Auto Toast)</h2>
      
      <input
        type="text"
        placeholder="Course title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg"
      />

      <LoadingButton
        type="submit"
        isLoading={createCourseMutation.isPending}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Create Course
      </LoadingButton>

      {createCourseMutation.isSuccess && (
        <p className="text-green-600">✓ Course created!</p>
      )}
    </form>
  );
}

/**
 * Example 2: Using createToastMutation factory
 * Create reusable hooks with default toast messages
 */

// Define the hook once with default messages
const useCreateCourse = createToastMutation({
  mutationFn: async (data: { title: string; description: string }) => {
    // return await createCourse(data);
    return { id: 1, ...data }; // Placeholder
  },
  successMessage: (data) => `Course "${data.title}" created!`, // Dynamic message
  errorMessage: 'Failed to create course',
});

const useDeleteCourse = createToastMutation({
  mutationFn: async (courseId: number) => {
    // return await deleteCourse(courseId);
    return { success: true }; // Placeholder
  },
  successMessage: 'Course deleted successfully!',
  errorMessage: 'Failed to delete course',
});

export function FactoryToastExample() {
  const [formData, setFormData] = useState({ title: '', description: '' });

  // Use the pre-configured hooks - toasts are automatic!
  const createMutation = useCreateCourse();
  const deleteMutation = useDeleteCourse();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData); // Toasts show automatically!
  };

  const handleDelete = () => {
    deleteMutation.mutate(123); // Toasts show automatically!
  };

  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-xl font-bold">Factory Pattern (Auto Toast)</h2>
      
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Course title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        />

        <LoadingButton
          type="submit"
          isLoading={createMutation.isPending}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Course
        </LoadingButton>
      </form>

      <LoadingButton
        onClick={handleDelete}
        isLoading={deleteMutation.isPending}
        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Delete Course
      </LoadingButton>
    </div>
  );
}

/**
 * Example 3: Override default messages per usage
 */
export function OverrideToastExample() {
  const createMutation = useCreateCourse({
    // Override the default success message for this specific usage
    successMessage: 'Custom success message!',
    // Add custom callbacks alongside automatic toasts
    onSuccess: (data) => {
      console.log('Created course:', data);
      // Navigate, update cache, etc.
    },
  });

  return (
    <LoadingButton
      onClick={() => createMutation.mutate({ title: 'Test', description: 'Test' })}
      isLoading={createMutation.isPending}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    >
      Create with Custom Message
    </LoadingButton>
  );
}

/**
 * Example 4: Disable automatic toasts when needed
 */
export function ManualToastExample() {
  const createMutation = useToastMutation({
    mutationFn: async (data: { title: string }) => {
      return { id: 1, ...data };
    },
    showSuccessToast: false, // Disable automatic success toast
    showErrorToast: true,     // Keep error toast
    onSuccess: (data) => {
      // Handle success manually
      console.log('Success without toast:', data);
    },
  });

  return (
    <LoadingButton
      onClick={() => createMutation.mutate({ title: 'Silent Success' })}
      isLoading={createMutation.isPending}
      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
    >
      Create (No Success Toast)
    </LoadingButton>
  );
}

/**
 * COMPARISON:
 * 
 * ❌ Without useToastMutation:
 * ```tsx
 * const { mutate } = useCreateCourse();
 * mutate(data, {
 *   onSuccess: () => showToast('success', 'Created!'),
 *   onError: (err) => showToast('error', err.message),
 * });
 * ```
 * 
 * ✅ With useToastMutation:
 * ```tsx
 * const { mutate } = useToastMutation({
 *   mutationFn: createCourse,
 *   successMessage: 'Created!',
 * });
 * mutate(data); // Toasts automatically!
 * ```
 */
