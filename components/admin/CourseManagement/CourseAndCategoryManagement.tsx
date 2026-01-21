'use client';

import { useState } from 'react';
import { GraduationCap, FolderTree } from 'lucide-react';
import CourseManagement from './CourseManagement';
import CategoryManagement from '../CategoryManagement/CategoryManagement';

export default function CourseAndCategoryManagement() {
    const [activeTab, setActiveTab] = useState<'courses' | 'categories'>('courses');

    return (
        <div className="min-h-screen">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                            activeTab === 'courses'
                                ? 'text-[rgb(99,102,241)] border-b-2 border-[rgb(99,102,241)]'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <GraduationCap className="w-5 h-5" />
                        Courses
                    </button>
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`flex items-center gap-2 px-6 py-3 font-medium transition-all ${
                            activeTab === 'categories'
                                ? 'text-[rgb(99,102,241)] border-b-2 border-[rgb(99,102,241)]'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <FolderTree className="w-5 h-5" />
                        Categories
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                {activeTab === 'courses' ? <CourseManagement /> : <CategoryManagement />}
            </div>
        </div>
    );
}
