/**
 * Error Display Component
 * Displays normalized API errors in a user-friendly format
 */

'use client';

import type { ApiException } from '@/lib/api/error-handler';

interface ErrorDisplayProps {
  error: Error | ApiException | null;
  className?: string;
}

export function ErrorDisplay({ error, className = '' }: ErrorDisplayProps) {
  if (!error) return null;

  const isApiException = error instanceof Error && 'status' in error;
  const apiError = isApiException ? (error as ApiException) : null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`} role="alert">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {apiError?.status ? `Error ${apiError.status}` : 'Error'}
            {apiError?.code && <span className="ml-2 text-xs">({apiError.code})</span>}
          </h3>
          <p className="mt-1 text-sm text-red-700">{error.message}</p>
          
          {/* Field validation errors */}
          {apiError?.errors && apiError.errors.length > 0 && (
            <ul className="mt-2 space-y-1">
              {apiError.errors.map((err, index) => (
                <li key={index} className="text-sm text-red-600">
                  <span className="font-medium">{err.field}:</span> {err.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface FieldErrorProps {
  error?: string;
  className?: string;
}

/**
 * Field-level error display for forms
 */
export function FieldError({ error, className = '' }: FieldErrorProps) {
  if (!error) return null;

  return (
    <p className={`text-sm text-red-600 mt-1 ${className}`} role="alert">
      {error}
    </p>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary for catching React errors
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full">
            <ErrorDisplay error={this.state.error} />
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Fix React import
import React from 'react';
