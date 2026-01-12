'use client';

import { Star, Share2, Clock, Users, Globe, Calendar, CheckCircle, Award } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CourseCard from '@/components/Home/CourseCard';
import ChapterDropdown from '@/components/CourseDetail/ChapterDropdown';

export default function CourseDetail({ params }: {
    params: Promise<{ courseName: string }>
}) {
    // Use for breadcrumb
    const path = usePathname();
    const breadCrumbs = path.split('/').filter(breadCrumb => breadCrumb !== "")
    const convertBreadCrump = (breadCrumb: string) => {
        return breadCrumb.split('-').join(' ')
    }
    let accumulatedPath = ""

    // Use for curriculum dropdown
    const [expandedChapter, setExpandedChapter] = useState<number>(0);

    // Use for course detail
    const courseDetail = {
        title: "A Web Development course for beginner",
        category: "Web Development",
        description: "This is a demo description of the course",
        difficulty: "Beginner",
        rating: 4.5,
        ratingCount: 1000,
        enrollment: 2000,
        duration: 52,
        author: "John Williams",
        language: "English",
        lastUpdate: new Date(),
        achievements: [
            "Build 20+ web applications and websites",
            "Master HTML5, CSS3, JavaScript ES6+",
            "Learn React, Node.js, and MongoDB",
            "Understand responsive design principles",
            "Deploy applications to production"
        ],
        chapters: [
            {
                id: 0,
                title: "Getting Started",
                lectures: [
                    { title: "What is HTML", duration: 36000 },
                    { title: "What is CSS", duration: 30000 },
                    { title: "What is JavaScript", duration: 40000 }
                ]
            },
            {
                id: 1,
                title: "HTML Fundamentals",
                lectures: [
                    { title: "HTML Basics", duration: 20000 },
                    { title: "HTML Tags", duration: 50000 },
                    { title: "HTML Attributes", duration: 40000 },
                    { title: "HTML Elements", duration: 32000 }
                ]
            },
            {
                id: 2,
                title: "CSS Styling",
                lectures: [
                    { title: "CSS Basics", duration: 50000 },
                    { title: "CSS Selectors", duration: 40000 },
                    { title: "CSS Properties", duration: 40000 },
                    { title: "CSS Media Queries", duration: 40000 }
                ]
            },
            {
                id: 3,
                title: "JavaScript Fundamentals",
                lectures: [
                    { title: "JavaScript Basics", duration: 40000 },
                    { title: "Variables and Data Types", duration: 40000 },
                    { title: "Functions", duration: 40000 },
                    { title: "Objects and Arrays", duration: 40000 }
                ]
            }
        ]
    }

    return (
        <>
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Breadcrumb */}
                <div className="bg-gray-800 px-4 py-3 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <nav className="flex text-sm text-gray-400">
                            <Link href={"/"} className="hover:text-white cursor-pointer">Home</Link>
                            {
                                breadCrumbs.map((breadCrumb, index) => {
                                    accumulatedPath += "/" + breadCrumb
                                    const breadCrumbName = convertBreadCrump(breadCrumb)
                                    return (
                                        <div key={index}>
                                            <span className="mx-2">/</span>
                                            <Link href={accumulatedPath} className="hover:text-white cursor-pointer capitalize">{breadCrumbName}</Link>
                                        </div>
                                    )
                                })
                            }
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Course Info */}
                        <div className="lg:col-span-2">
                            {/* Category Badge */}
                            <div className="mb-4">
                                <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded text-sm font-medium">
                                    {courseDetail.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                                {courseDetail.title}
                            </h1>

                            {/* Description */}
                            <p className="text-gray-300 text-2xl mb-8 leading-relaxed">
                                {courseDetail.description}
                            </p>

                            {/* Rating */}
                            <div className="mb-8 pb-8 border-b">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className="text-2xl font-bold">{courseDetail.rating}</span>
                                    <div className="flex items-center gap-2">
                                        {
                                            [...Array(Math.round(courseDetail.rating))].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                                />
                                            ))
                                        }
                                        {
                                            Math.round(courseDetail.rating) < 5 &&
                                            [...Array(5 - Math.round(courseDetail.rating))].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 text-gray-300"
                                                />
                                            ))
                                        }
                                    </div>
                                    <span className="text-gray-400">({courseDetail.ratingCount.toLocaleString()} reviews)</span>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Users size={18} />
                                        <span>{courseDetail.enrollment.toLocaleString()} students enrolled</span>
                                    </div>
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="mb-8 pb-8 border-b border-gray-700">
                                <p className="text-gray-400 text-sm mb-3">Created by</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-700 shrink-0">
                                        <img
                                            src="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg"
                                            className='object-cover object-center w-full h-full overflow-hidden' />
                                    </div>
                                    <span className="font-semibold">{courseDetail.author}</span>
                                </div>
                            </div>

                            {/* Meta Information */}
                            <div className="flex flex-wrap gap-8 text-gray-400 mb-8">
                                <div className="flex items-center gap-2">
                                    <Globe size={18} />
                                    <span>{courseDetail.language}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>Last updated {courseDetail.lastUpdate.toISOString().split('T')[0]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Pricing Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg overflow-hidden sticky top-4">
                                {/* Course Image */}
                                <div className="relative w-full h-48 bg-linear-to-br from-indigo-600 to-purple-800 flex items-center justify-center">
                                    <div className="bg-indigo-600 rounded-full p-4">
                                        <span className="text-white text-3xl">▶</span>
                                    </div>
                                </div>

                                {/* Price Section */}
                                <div className="p-6">
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="text-3xl font-bold">$89.99</span>
                                            <span className="text-lg text-gray-400 line-through">$199.99</span>
                                        </div>
                                        <div className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                                            55% OFF
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition mb-3">
                                        Enroll Now
                                    </button>
                                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition mb-4">
                                        Add to Cart
                                    </button>

                                    {/* Wishlist and Share */}
                                    <div className="flex gap-3 pb-6 border-b border-gray-700">
                                        <button
                                            className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-300 hover:text-white transition"
                                        >
                                            {/* <Heart
                                            size={20}
                                            fill={isWishlisted ? 'currentColor' : 'none'}
                                            color={isWishlisted ? '#ef4444' : 'currentColor'}
                                        /> */}
                                            <span>Wishlist</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-300 hover:text-white transition">
                                            <Share2 size={20} />
                                            <span>Share</span>
                                        </button>
                                    </div>

                                    {/* Course Features */}
                                    <div className="pt-6 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <span className="text-indigo-400 text-xl">✓</span>
                                            <span className="text-gray-300">Certificate of completion</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                                            <span className="text-gray-300">52 hours on-demand video</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-indigo-400 text-xl">✓</span>
                                            <span className="text-gray-300">Full lifetime access</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-indigo-400 text-xl">✓</span>
                                            <span className="text-gray-300">Access on mobile and desktop</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* Bottom Section - Course Details and Related Courses */}
            <div className="flex items-center justify-center" >
                <div className="max-w-7xl grid lg:grid-cols-3 gap-8 mt-12 items-start justify-center">
                    {/* Left Column - Course Sections */}
                    <div className="flex flex-col justify-between lg:col-span-2 space-y-8">
                        {/* What you'll learn */}
                        <div className="p-4 border-2 border-gray-200 rounded-2xl">
                            <h2 className="text-2xl font-medium mb-6">What you'll learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    courseDetail.achievements.map((achievement, index) => {
                                        return (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="text-[rgb(99,102,241)]" />
                                                <span className="text-black">{achievement}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Course Curriculum */}
                        <div className="p-4 border-2 border-gray-200 rounded-2xl">
                            <h2 className="text-2xl font-medium mb-6">Course Curriculum</h2>
                            <div className="text-gray-400 mb-6">
                                <div className="mb-3">{courseDetail.chapters.length} chapters • 14 lectures • {courseDetail.duration} hours total length</div>
                            </div>
                            <div className="space-y-3">
                                {
                                    courseDetail.chapters.map((chapter, index) => {
                                        return (
                                            <ChapterDropdown
                                                key={index}
                                                title={chapter.title}
                                                lectures={chapter.lectures}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="rounded-2xl border-2 border-gray-200 p-4">
                            <h2 className="text-2xl font-medium mb-6">Requirements</h2>
                            <ul className="space-y-3 text-black">
                                <li className="flex items-start gap-3">
                                    <span>•</span>
                                    <span>No programming experience needed</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span>•</span>
                                    <span>A computer with internet connection</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span>•</span>
                                    <span>Willingness to learn</span>
                                </li>
                            </ul>
                        </div>

                        {/* Description */}
                        <div className="rounded-2xl border-2 border-gray-200 p-4 mb-5">
                            <h2 className="text-2xl font-medium mb-6">Description</h2>
                            <p className="text-black leading-relaxed">
                                {courseDetail.description}
                            </p>
                        </div>

                        {/* Instructor Card (inserted) */}
                        <div className="p-4 border-2 border-gray-200 rounded-2xl bg-white">
                            <h3 className="text-gray-600 text-sm mb-4">Your Instructor</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                                    <img src="https://i.pravatar.cc/300?img=47" alt="Instructor" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-lg font-semibold text-gray-900">Sarah Johnson</div>
                                    <p className="text-gray-500 text-sm mt-2">Expert instructor with over 10 years of experience in the field. Passionate about teaching and helping students succeed.</p>
                                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Star className="text-yellow-400" />
                                            <span className="font-medium">4.8 Instructor Rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Award size={16} />
                                            <span>15,234 Reviews</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>97,444 Students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student Reviews (inserted) */}
                        <div className="p-4 border-2 border-gray-200 rounded-2xl bg-white">
                            <h3 className="text-gray-700 text-sm mb-4">Student Reviews</h3>
                            <div className="md:flex md:items-start md:gap-8">
                                <div className="md:w-1/3 text-center md:text-left">
                                    <div className="text-4xl font-semibold text-indigo-600">4.8</div>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                                </div>

                                <div className="md:flex-1 mt-6 md:mt-0">
                                    <div className="space-y-3">
                                        {[5, 4, 3, 2, 1].map((n, idx) => (
                                            <div key={n} className="flex items-center gap-3">
                                                <div className="w-12 text-sm text-yellow-400">{n} ★</div>
                                                <div className="flex-1 bg-gray-100 h-3 rounded overflow-hidden">
                                                    <div className={`h-3 bg-indigo-400`} style={{ width: idx === 0 ? '75%' : idx === 1 ? '15%' : idx === 2 ? '6%' : idx === 3 ? '3%' : '1%' }} />
                                                </div>
                                                <div className="w-10 text-right text-sm text-gray-500">{idx === 0 ? '75%' : idx === 1 ? '15%' : idx === 2 ? '6%' : idx === 3 ? '3%' : '1%'}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 border-t pt-6 space-y-6">
                                        {/* Review 1 */}
                                        <div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img src="https://i.pravatar.cc/80?img=5" alt="John Davis" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-medium text-gray-800">John Davis</div>
                                                            <div className="text-xs text-gray-400">2024-10-28</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-yellow-400 mt-2">
                                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2">This course completely changed my career! The instructor explains everything clearly and the projects are very practical.</p>
                                                    <div className="text-xs text-gray-500 mt-2">Helpful (234)</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review 2 */}
                                        <div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img src="https://i.pravatar.cc/80?img=47" alt="Maria Garcia" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-medium text-gray-800">Maria Garcia</div>
                                                            <div className="text-xs text-gray-400">2024-10-25</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-yellow-400 mt-2">
                                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2">Best web development course I have taken. The content is up-to-date and well-structured. Worth every penny!</p>
                                                    <div className="text-xs text-gray-500 mt-2">Helpful (187)</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Review 3 */}
                                        <div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <img src="https://i.pravatar.cc/80?img=10" alt="Robert Kim" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-medium text-gray-800">Robert Kim</div>
                                                            <div className="text-xs text-gray-400">2024-10-20</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-yellow-400 mt-2">
                                                        {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
                                                        <Star className="h-4 w-4 text-gray-300" />
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-2">Great course overall. Very comprehensive. My only suggestion would be to include more advanced React topics.</p>
                                                    <div className="text-xs text-gray-500 mt-2">Helpful (98)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Related Courses */}
                    <div className="lg:col-span-1">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
                            <div className="space-y-6">
                                {/* Related Course Card 1 */}
                                {/* <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition">
                                    <div className="relative w-full h-32 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                                        <div className="text-white text-4xl">📊</div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm text-gray-400 mb-2">Data Science</p>
                                        <h3 className="font-semibold text-white mb-2">Data Science & Machine Learning Masterclass</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                                            <span className="text-sm text-gray-400">Dr. Michael Chen</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-yellow-400">★</span>
                                            <span className="text-sm font-semibold">4.9</span>
                                            <span className="text-sm text-gray-400">(3,921)</span>
                                            <span className="text-sm text-gray-400">32,140</span>
                                        </div>
                                        <div className="text-sm text-gray-400 mb-4">48 hours</div>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-xl font-bold text-indigo-400">$94.99</span>
                                            <span className="text-sm text-gray-400 line-through">$179.99</span>
                                        </div>
                                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition text-sm">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div> */}
                                <CourseCard
                                    imgSource="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" />
                                <CourseCard
                                    imgSource="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" />
                                <CourseCard
                                    imgSource="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" />
                                {/* Related Course Card 2 */}
                                {/* <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition">
                                    <div className="relative w-full h-32 bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                                        <div className="text-white text-4xl">📱</div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm text-gray-400 mb-2">Marketing</p>
                                        <h3 className="font-semibold text-white mb-2">Digital Marketing Complete Course</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                                            <span className="text-sm text-gray-400">Emma Williams</span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-yellow-400">★</span>
                                            <span className="text-sm font-semibold">4.7</span>
                                            <span className="text-sm text-gray-400">(6,543)</span>
                                            <span className="text-sm text-gray-400">28,675</span>
                                        </div>
                                        <div className="text-sm text-gray-400 mb-4">38 hours</div>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-xl font-bold text-indigo-400">$79.99</span>
                                            <span className="text-sm text-gray-400 line-through">$159.99</span>
                                        </div>
                                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition text-sm">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>

    )
}