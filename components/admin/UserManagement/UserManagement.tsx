'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Eye, Check, X } from 'lucide-react';
import { ButtonColor, CustomButton } from '@/components/shared/CustomButton';
import CustomInputField, { InputFieldIcon } from '@/components/shared/CustomInputField';

interface Student {
    id: number;
    name: string;
    email: string;
    registrationDate: string;
    status: "Active" | "Suspended";
    enrolledCourses: number
}

interface Teacher {
    id: number;
    name: string;
    email: string;
    registrationDate: string;
    status: 'Active' | 'Suspended'
}
interface Admin {
    id: number;
    name: string;
    email: string;
    registrationDate: string;
    status: 'Active' | 'Suspended'
}

const students: Student[] = [
    {
        id: 1,
        name: "Nguyen Van A",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Active",
        enrolledCourses: 2
    },
    {
        id: 2,
        name: "Nguyen Van B",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Suspended",
        enrolledCourses: 5
    },
    {
        id: 3,
        name: "Nguyen Van C",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Active",
        enrolledCourses: 3
    }
]

const teachers: Teacher[] = [
    {
        id: 1,
        name: "Tran Van A",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Active"
    },
    {
        id: 2,
        name: "Tran Van B",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Suspended"
    },
    {
        id: 3,
        name: "Tran Van C",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Active"
    }
]
const admins: Admin[] = [
    {
        id: 1,
        name: "Dang Van A",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Active"
    },
    {
        id: 2,
        name: "Dang Van B",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Suspended"
    },
    {
        id: 3,
        name: "Dang Van C",
        email: "demo@gmail.com",
        registrationDate: "Oct 24",
        status: "Active"
    }
]

export default function UserManagement() {
    const [searchInput, setSearchInput] = useState('');

    const Tabs: string[] = ["Students", "Teachers", "Admins"];

    const [selectedTab, setSelectedTab] = useState<string>("Students");

    const getStatusStyles = (status: "Active" | "Suspended") => {
        switch (status) {
            case 'Active':
                return 'bg-gray-900 text-white';
            case 'Suspended':
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
                <h1 className="text-3xl font-medium text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">Manage all users on the platform</p>
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
                                placeholder="Search users by name or email..."
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

                <div className="bg-[rgb(236,236,240)] rounded-full h-10 w-fit flex flex-row justify-center items-center gap-4 p-2">
                    {
                        Tabs.map((tab, index) => {
                            return (
                                <button
                                    key={index}
                                    className={
                                        ((selectedTab === tab) ? "bg-white" : "hover: bg-[rgba(255,255,255,0.1)]") +
                                        " h-8 w-20 rounded-full"
                                    }
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {tab}
                                </button>
                            )
                        })
                    }
                </div>

                {/* Students Table */}
                {
                    selectedTab === "Students" &&
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Name</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Email</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Registration Date</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Enrolled Courses</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-4 px-4 text-gray-700">{student.name}</td>
                                        <td className="py-4 px-4 text-gray-700">{student.email}</td>
                                        <td className="py-4 px-4 text-gray-700">{student.registrationDate}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(student.status)}`}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-700">{student.enrolledCourses}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleViewCourse(student.id)}
                                                    className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                                                    title="View course"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                {/* {course.status === 'Pending' && (
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
                                        )} */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {students.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No students found.
                            </div>
                        )}
                    </div>
                }

                {/* Teachers Table */}
                {
                    selectedTab === "Teachers" &&
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Name</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Email</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Registration Date</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher) => (
                                    <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-4 px-4 text-gray-700">{teacher.name}</td>
                                        <td className="py-4 px-4 text-gray-700">{teacher.email}</td>
                                        <td className="py-4 px-4 text-gray-700">{teacher.registrationDate}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(teacher.status)}`}>
                                                {teacher.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleViewCourse(teacher.id)}
                                                    className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                                                    title="View course"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                {/* {course.status === 'Pending' && (
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
                                        )} */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {teachers.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No teachers found.
                            </div>
                        )}
                    </div>
                }

                {/* Admins Table */}
                {
                    selectedTab === "Admins" &&
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Name</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Email</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Registration Date</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-4 px-4 text-gray-700">{admin.name}</td>
                                        <td className="py-4 px-4 text-gray-700">{admin.email}</td>
                                        <td className="py-4 px-4 text-gray-700">{admin.registrationDate}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(admin.status)}`}>
                                                {admin.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleViewCourse(admin.id)}
                                                    className="p-2 hover:bg-gray-200 rounded-lg transition text-gray-600"
                                                    title="View course"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                {/* {course.status === 'Pending' && (
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
                                        )} */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {teachers.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No teachers found.
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}