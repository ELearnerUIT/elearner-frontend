/**
 * Example: Authentication with Error Handling
 * Demonstrates auth-specific error patterns (401, token expiry, auto-logout)
 * 
 * NOTE: This is a DOCUMENTATION EXAMPLE showing the patterns to use.
 * The axios interceptor in lib/api/interceptors.ts already handles 401 auto-refresh.
 * 
 * CORRECT USAGE:
 * ```tsx
 * import { useLogin, useLogout } from '@/lib/hooks';
 * 
 * const { mutate, isPending, error } = useLogin();
 * ```
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/ui/toast';
import { LoadingButton } from '@/lib/ui/loading';
import { ErrorDisplay, FieldError } from '@/lib/ui/error-display';
import { getFieldErrors } from '@/lib/hooks/use-mutation-state';

/**
 * Example: Login form with error handling
 * Shows field validation and auth-specific error messages
 */
export function LoginFormExample() {
  // Placeholder - in real code: const { mutate, isPending, error } = useLogin();
  const mutate = (data: any, options: any) => {};
  const isPending = false;
  const error = null;
  
  const { showToast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const fieldErrors = getFieldErrors(error as any);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (response: any) => {
        showToast('success', 'Login successful!');
        router.push('/student/my-courses');
      },
      onError: (error: any) => {
        if (error.status === 401) {
          showToast('error', 'Invalid credentials');
        } else if (error.status === 403) {
          showToast('error', 'Account disabled');
        } else {
          showToast('error', error.message || 'Login failed');
        }
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && !fieldErrors.username && !fieldErrors.password && <ErrorDisplay error={error} />}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg ${
              fieldErrors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isPending}
          />
          <FieldError error={fieldErrors.username} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg ${
              fieldErrors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isPending}
          />
          <FieldError error={fieldErrors.password} />
        </div>

        <LoadingButton
          type="submit"
          isLoading={isPending}
          loadingText="Logging in..."
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
}

/**
 * Example: Protected route with session monitoring
 * Shows cross-tab logout detection
 */
export function ProtectedRouteExample({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' && !e.newValue) {
        showToast('warning', 'Session expired. Please login again.');
        router.push('/login');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router, showToast]);

  return <>{children}</>;
}

/**
 * Example: Logout with confirmation
 * Shows graceful logout with error handling
 */
export function LogoutButtonExample() {
  // Placeholder - in real code: const { mutate, isPending } = useLogout();
  const mutate = (data: any, options: any) => {};
  const isPending = false;
  
  const { showToast } = useToast();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        showToast('success', 'Logged out successfully');
        router.push('/login');
      },
      onError: (error: any) => {
        showToast('warning', 'Logged out locally');
        router.push('/login');
      },
    });
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)} className="text-gray-700 hover:text-gray-900" disabled={isPending}>
        Logout
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-gray-600" disabled={isPending}>
                Cancel
              </button>
              <LoadingButton
                onClick={handleLogout}
                isLoading={isPending}
                loadingText="Logging out..."
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Logout
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
