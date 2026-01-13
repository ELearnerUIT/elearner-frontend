'use client';

import { Star, Share2, Clock, Users, Globe, Calendar, CheckCircle, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import CourseCard from '@/components/Home/CourseCard';
import ChapterDropdown from '@/components/CourseDetail/ChapterDropdown';
import PriceCard from '@/components/CourseDetail/PriceCard';
import { ButtonColor, CustomButton } from '@/components/shared/CustomButton';
import PaginationBar from '@/components/shared/PaginationBar';
import ReviewCard from '@/components/CourseDetail/ReviewCard';

export default function CourseDetail({ params }: {
    params: Promise<{ courseName: string }>
}) {
    if (!params) {
        return
    }

    // Use for breadcrumb
    const path = usePathname();
    const breadCrumbs = path.split('/').filter(breadCrumb => breadCrumb !== "")
    const convertBreadCrump = (breadCrumb: string) => {
        return breadCrumb.split('-').join(' ')
    }
    let accumulatedPath = ""

    // Use for course detail
    const courseDetail = {
        title: "A Web Development course for beginner",
        category: "Web Development",
        description: "This is a demo description of the course",
        difficulty: "Beginner",
        price: 89,
        oldPrice: 99,
        rating: 4.25,
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
        ],
        requirements: [
            "No programming experience needed",
            "A computer with internet connection",
            "Willingness to learn"
        ]
    }

    const instructorDetail = {
        avatar: "https://i.pravatar.cc/300?img=47",
        name: "Sara Johnson",
        description: "Expert instructor with over 10 years of experience in the field. Passionate about teaching and helping students succeed.",
        rating: 4.8,
        ratingCount: 15234,
        studentsEnrolled: 97444
    }

    const ratingDetail = [
        1298,
        28,
        30,
        4,
        0
    ]

    let totalRating = 0;
    const countTotalRating = () => {
        for (let i = 0; i < ratingDetail.length; i++) {
            totalRating += ratingDetail[i];
        }
        return totalRating;
    }

    const allReviewDetails = [
        {
            name: "John Doe1",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe2",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe3",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 3,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe4",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 2,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe5",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 2.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe6",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        },
        {
            name: "John Doe7",
            avatar: "https://i.pravatar.cc/300?img=47",
            rating: 4.5,
            date: new Date(),
            content: "This course completely changed my career! The instructor explains everything clearly and the projects are very practical.",
            helpful: 234
        }
    ]

    const numberOfReviewPerPage = 2;
    const [pageIndex, setPageIndex] = useState(0);
    const getCurrentPageReviewDetails = () => {
        const startIndex = pageIndex * numberOfReviewPerPage;
        const endIndex = startIndex + numberOfReviewPerPage;
        let result = []
        for (let i = startIndex; i < endIndex; i++) {
            if (i < allReviewDetails.length) {
                result.push(allReviewDetails[i]);
            }
        }
        return result;
    }
    const currentPageReviewDetails = getCurrentPageReviewDetails();

    return (
        <>
            <div className="min-h-screen bg-[rgb(16,24,40)] text-white">
                {/* Breadcrumb */}
                <div className="px-4 py-3 sm:px-6 lg:px-8">
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
                            <PriceCard
                                price={courseDetail.price}
                                oldPrice={courseDetail.oldPrice}
                            />
                        </div>
                    </div>
                </div>
            </div >
            {/* Bottom Section - Course Details and Related Courses */}
            <div className="flex items-center justify-center mb-5" >
                <div className="max-w-7xl grid lg:grid-cols-3 gap-8 mt-12 items-start justify-center">
                    {/* Left Column - Course Sections */}
                    <div className="flex flex-col justify-between lg:col-span-2 space-y-8">
                        {/* What you'll learn */}
                        <div className="p-4 border border-gray-200 rounded-2xl">
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
                        <div className="p-4 border border-gray-200 rounded-2xl">
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
                        <div className="rounded-2xl border border-gray-200 p-4">
                            <h2 className="text-2xl font-medium mb-6">Requirements</h2>
                            <ul className="space-y-3 text-black">
                                {
                                    courseDetail.requirements.map((requirement, index) => {
                                        return (
                                            <li key={index} className="flex items-start gap-3">
                                                <span>•</span>
                                                <span>{requirement}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        {/* Description */}
                        <div className="rounded-2xl border border-gray-200 p-4 mb-5">
                            <h2 className="text-2xl font-medium mb-6">Description</h2>
                            <p className="text-black leading-relaxed">
                                {courseDetail.description}
                            </p>
                        </div>

                        {/* Instructor Card (inserted) */}
                        <div className="p-4 border-2 border-gray-200 rounded-2xl bg-white">
                            <h3 className="text-black font-medium text-2xl mb-4">Your Instructor</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                                    <img src={instructorDetail.avatar} alt="Instructor" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <Link href="/" className="text-lg font-semibold text-[rgb(99,102,241)] hover:text-[rgb(73,76,218)]">{instructorDetail.name}</Link>
                                    <p className="text-gray-500 text-sm mt-2">{instructorDetail.description}</p>
                                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Star className="text-yellow-400 fill-yellow-400" />
                                            <span className="font-medium">{instructorDetail.rating.toFixed(1)} Instructor Rating</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Award size={16} />
                                            <span>{instructorDetail.ratingCount.toLocaleString()} Reviews</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>{instructorDetail.studentsEnrolled.toLocaleString()} Students</span>
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
                                    <div className="text-4xl font-semibold text-indigo-600">{courseDetail.rating.toFixed(1)}</div>
                                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            {[...Array(Math.round(courseDetail.rating))].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            {Math.round(courseDetail.rating) < 5 && [...Array(Math.round(5 - courseDetail.rating))].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-gray-300" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                                </div>

                                <div className="md:flex-1 mt-6 md:mt-0">
                                    <div className="space-y-3">
                                        {
                                            [...Array(5)].map((_, i) => {
                                                const rating = (ratingDetail.length > i) ? ratingDetail[i] : 0;
                                                const ratingPercentage = (rating / countTotalRating()) * 100;
                                                return (
                                                    <div key={i} className="flex flex-row items-center gap-3">
                                                        <div className="w-12 flex flex-row items-center text-sm "><Star className='text-yellow-400 fill-yellow-400' />{5 - i}</div>
                                                        <div className="flex-1 bg-gray-100 h-3 rounded overflow-hidden">
                                                            <div className={`h-3 bg-indigo-400`} style={{ width: `${ratingPercentage}%` }} />
                                                        </div>
                                                        <div className="w-10 text-right text-sm text-gray-500">{ratingPercentage.toFixed(1)}%</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </div>

                            </div>
                            <div className=" flex flex-col mt-6 border-t pt-6 space-y-6 mb-0">
                                <div className="flex h-3/4 flex-col">
                                    {
                                        currentPageReviewDetails.map((reviewDetail, index) => {
                                            return (
                                                <ReviewCard
                                                    key={index}
                                                    name={reviewDetail.name}
                                                    avatar={reviewDetail.avatar}
                                                    rating={reviewDetail.rating}
                                                    date={reviewDetail.date}
                                                    content={reviewDetail.content}
                                                    helpful={reviewDetail.helpful}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                <div className='flex h-1/4 justify-end items-end'>
                                    <PaginationBar
                                        pageIndex={pageIndex}
                                        totalPageCount={Math.ceil(allReviewDetails.length / numberOfReviewPerPage)}
                                        maxPageShown={6}
                                        onSelectedPageChanged={(index) => setPageIndex(index)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Related Courses */}
                    <div className="lg:col-span-1">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
                            <div className="space-y-6">
                                <CourseCard
                                    imgSource="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" />
                                <CourseCard
                                    imgSource="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" />
                                <CourseCard
                                    imgSource="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>

    )
}