'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Eye, Check, X } from 'lucide-react';
import { ButtonColor, CustomButton } from '@/components/shared/CustomButton';
import CustomInputField, { InputFieldIcon } from '@/components/shared/CustomInputField';

interface Course {
    id: number;
    title: string;
    teacher: string;
    category: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    dateCreated: string;
    lessons: number;
}

const courses: Course[] = [
    {
        id: 1,
        title: 'Complete Web Development Bootcamp 2025',
        teacher: 'Sarah Johnson',
        category: 'Web Development',
        status: 'Approved',
        dateCreated: 'Nov 1, 2024',
        lessons: 42,
    },
    {
        id: 2,
        title: 'Advanced React Patterns',
        teacher: 'Michael Chen',
        category: 'Frontend Development',
        status: 'Approved',
        dateCreated: 'Oct 28, 2024',
        lessons: 28,
    },
    {
        id: 3,
        title: 'Python for Data Science',
        teacher: 'Emily Rodriguez',
        category: 'Data Science',
        status: 'Pending',
        dateCreated: 'Nov 10, 2024',
        lessons: 35,
    },
    {
        id: 4,
        title: 'UI/UX Design Masterclass',
        teacher: 'David Kim',
        category: 'Design',
        status: 'Pending',
        dateCreated: 'Nov 9, 2024',
        lessons: 30,
    },
    {
        id: 5,
        title: 'Mobile App Development with Flutter',
        teacher: 'Lisa Wang',
        category: 'Mobile Development',
        status: 'Rejected',
        dateCreated: 'Nov 5, 2024',
        lessons: 25,
    },
];

export default function CourseManagement() {
    const [searchInput, setSearchInput] = useState('');

    // const filteredCourses = useMemo(() => {
    //     return mockCourses.filter(
    //         (course) =>
    //             course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // }, [searchTerm]);

    const getStatusStyles = (status: Course['status']) => {
        switch (status) {
            case 'Approved':
                return 'bg-gray-900 text-white';
            case 'Pending':
                return 'bg-gray-200 text-gray-700';
            case 'Rejected':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-200';
        }
    };

    const handleViewCourse = (courseId: number) => {
        console.log('View course:', courseId);
    };

    const handleApproveCourse = (courseId: number) => {
        console.log('Approve course:', courseId);
    };

    const handleRejectCourse = (courseId: number) => {
        console.log('Reject course:', courseId);
    };

    const handleSearch = () => {
        alert("Search for: " + searchInput)
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-gray-900 mb-2">Course Management</h1>
                <p className="text-gray-600">Review and manage all courses on the platform</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow ">
                {/* Search and Filter Section */}
                <div className="mb-8 flex gap-4 items-center justify-center w-full">
                    <div className="flex-1 justify-center">
                        <div
                            onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
                        >
                            <CustomInputField
                                icon={InputFieldIcon.SEARCH}
                                placeholder="Search courses by title or teacher..."
                                initValue={searchInput}
                                onValueChange={(e) => setSearchInput(e.target.value)}
                            />
                        </div>

                    </div>
                    <CustomButton
                        color={ButtonColor.PURPLE}
                        width="w-15"
                        onClick={() => handleSearch()}
                    >
                        <Search />
                    </CustomButton>
                </div>

                {/* Courses Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Course Title</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Teacher</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Category</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Date Created</th>
                                <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="py-4 px-4">
                                        <div className="font-medium text-gray-900">{course.title}</div>
                                        <div className="text-sm text-gray-500">{course.lessons} lessons</div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-700">{course.teacher}</td>
                                    <td className="py-4 px-4 text-gray-700">{course.category}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(course.status)}`}>
                                            {course.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-700">{course.dateCreated}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleViewCourse(course.id)}
                                                className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                                                title="View course"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            {course.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApproveCourse(course.id)}
                                                        className="p-2 hover:bg-green-100 rounded-lg transition text-green-600"
                                                        title="Approve course"
                                                    >
                                                        <Check className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectCourse(course.id)}
                                                        className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                                        title="Reject course"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {courses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No courses found matching your search.
                    </div>
                )}
            </div>

        </div>
    );
}