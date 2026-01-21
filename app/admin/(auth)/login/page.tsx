'use client';

import { useState } from 'react';
import AdminLoginForm from '@/components/LoginRegister/AdminLoginForm';

export default function Login() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[rgba(99,102,241,0.05)] via-[rgba(139,92,246,0.05)] to-[rgba(16,185,129,0.05)] flex items-center justify-center p-5">
            <AdminLoginForm />
        </div>
        // <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

        // </div>
    );
}