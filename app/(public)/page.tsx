"use client";

import Image from "next/image";
import { Star, BookOpen } from "lucide-react";
import CustomButton, { ButtonColor } from "@/components/shared/CustomButton";
import { useState } from "react";

export default function Home() {
    const [averageRating, setAverageRating] = useState(3.5);
    const categories = [
        { name: "Web Development", tone: "indigo" },
        { name: "Data Science", tone: "purple" },
        { name: "Business", tone: "emerald" },
        { name: "Design", tone: "amber" },
        { name: "Marketing", tone: "pink" },
        { name: "Photography", tone: "cyan" },
    ];
    const toneClasses: Record<string, { bg: string; text: string }> = {
        indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
        purple: { bg: "bg-purple-100", text: "text-purple-600" },
        emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
        amber: { bg: "bg-amber-100", text: "text-amber-600" },
        pink: { bg: "bg-pink-100", text: "text-pink-600" },
        cyan: { bg: "bg-cyan-100", text: "text-cyan-600" },
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[rgba(99,102,241,0.1)] via-[rgba(139,92,246,0.1)] to-[rgba(255,255,255,1)]">
            {/* Hero Section */}
            <div className="mx-auto max-w-5/6 px-6 py-20 lg:py-32">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Left Column */}
                    <div className="flex flex-col justify-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex w-52 h-10 items-center gap-2 bg-[rgba(99,102,241,0.1)]">
                            <span className="text-sm font-medium w-full text-center text-[rgb(99,102,241)]">
                                🎓 Welcome to ELearner
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mb-6 text-5xl font-medium leading-tight text-gray-900">
                            Learn Anything,{" "}
                            <br />
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                Anytime,
                                <br />
                                Anywhere
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mb-8 max-w-lg text-lg font-normal text-[rgba(107,114,128,1)]">
                            Join millions of learners worldwide and advance your career with expert-led courses. Start your
                            learning journey today.
                        </p>

                        {/* CTAs */}
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <CustomButton
                                text="Explore Courses"
                                enabled={true}
                                color={ButtonColor.PURPLE}
                                onClick={(event) => { }}
                            />
                            <CustomButton
                                text="Become an Instructor"
                                enabled={true}
                                color={ButtonColor.WHITE}
                                onClick={(event) => { }}
                            />
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">10M+</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Active Learners</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">50K+</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Expert Instructors</p>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">100K+</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Online Courses</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative h-[500px] lg:h-[600px]">
                        {/* Main Hero Image */}
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-400 to-purple-600 shadow-2xl overflow-hidden">
                            <Image
                                src="/hero.svg"
                                alt="Learning illustration"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Average Rating Card */}
                        <div className="absolute -right-6 top-12 rounded-2xl bg-white px-6 py-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1 bg-[rgba(139,92,246,0.1)] p-5 rounded-2xl">
                                    {[...Array(Math.round(averageRating))].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-10 w-10 fill-[rgba(139,92,246,1)] text-[rgba(139,92,246,0.1)]"
                                        />
                                    ))
                                    }
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-[rgba(107,114,128,1)]">
                                        Average Rating
                                    </p>
                                    <p className="text-2xl font-medium text-gray-900">{averageRating.toFixed(1)}/5.0</p>
                                </div>
                            </div>
                        </div>

                        {/* Certificates Card */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-xl max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <span className="text-xl">📜</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-[rgba(107,114,128,1)]">
                                        Certificates
                                    </p>
                                    <p className="text-2xl font-medium text-gray-900">100K+ Issued</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold text-gray-900">Explore Top Categories</h2>
                        <p className="mt-2 text-gray-500">Discover courses across diverse fields and start learning today</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                        {categories.map((cat) => {
                            const cls = toneClasses[cat.tone] || toneClasses.indigo;
                            return (
                                <div key={cat.name} className="w-40 rounded-xl bg-white p-4 shadow-md flex flex-col items-center">
                                    <div className={`${cls.bg} p-3 rounded-lg`}>
                                        <BookOpen className={`h-6 w-6 ${cls.text}`} />
                                    </div>
                                    <p className="mt-3 text-sm text-center text-gray-800">{cat.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Popular Courses Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-900">Popular Courses</h2>
                            <p className="mt-2 text-gray-500">Trending courses chosen by learners like you</p>
                        </div>
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
                            View All Courses <span>→</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Course 1: Web Development */}
                        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600">
                                <Image
                                    src="/course-1.jpg"
                                    alt="Web Development"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    Beginner
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-indigo-600 font-semibold">Web Development</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2">Complete Web Development Bootcamp 2025</h3>
                                <p className="text-sm text-gray-600 mt-1">by Sarah Johnson</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">4.8</span>
                                        <span className="text-xs text-gray-500">(12,453)</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                                    <span className="text-gray-400">⏱️</span> 52 hours
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-indigo-600">$89.99</span>
                                    <CustomButton
                                        text="Add to Cart"
                                        enabled={true}
                                        color={ButtonColor.WHITE}
                                        onClick={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course 2: Data Science */}
                        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gradient-to-br from-purple-400 to-purple-600">
                                <Image
                                    src="/course-2.jpg"
                                    alt="Data Science"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    Intermediate
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-purple-600 font-semibold">Data Science</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2">Data Science & Machine Learning Masterclass</h3>
                                <p className="text-sm text-gray-600 mt-1">by Dr. Michael Chen</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">4.9</span>
                                        <span className="text-xs text-gray-500">(8,921)</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                                    <span className="text-gray-400">⏱️</span> 48 hours
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-indigo-600">$89.99</span>
                                    <CustomButton
                                        text="Add to Cart"
                                        enabled={true}
                                        color={ButtonColor.WHITE}
                                        onClick={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course 3: Marketing */}
                        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gradient-to-br from-pink-400 to-pink-600">
                                <Image
                                    src="/course-3.jpg"
                                    alt="Marketing"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    Beginner
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-pink-600 font-semibold">Marketing</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2">Digital Marketing Complete Course</h3>
                                <p className="text-sm text-gray-600 mt-1">by Emma Williams</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">4.7</span>
                                        <span className="text-xs text-gray-500">(543)</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                                    <span className="text-gray-400">⏱️</span> 38 hours
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-indigo-600">$79.99</span>
                                    <CustomButton
                                        text="Add to Cart"
                                        enabled={true}
                                        color={ButtonColor.WHITE}
                                        onClick={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course 4: Design */}
                        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gradient-to-br from-amber-400 to-amber-600">
                                <Image
                                    src="/course-4.jpg"
                                    alt="Design"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    Beginner
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-amber-600 font-semibold">Design</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2">UI/UX Design Fundamentals</h3>
                                <p className="text-sm text-gray-600 mt-1">by Alex Thompson</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">4.8</span>
                                        <span className="text-xs text-gray-500">(5,234)</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                                    <span className="text-gray-400">⏱️</span> 32 hours
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-indigo-600">$84.99</span>
                                    <CustomButton
                                        text="Add to Cart"
                                        enabled={true}
                                        color={ButtonColor.WHITE}
                                        onClick={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course 5: Photography */}
                        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gradient-to-br from-orange-400 to-orange-600">
                                <Image
                                    src="/course-5.jpg"
                                    alt="Photography"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    Intermediate
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-orange-600 font-semibold">Photography</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2">Professional Photography Masterclass</h3>
                                <p className="text-sm text-gray-600 mt-1">by James Rodriguez</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">4.9</span>
                                        <span className="text-xs text-gray-500">(4,123)</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                                    <span className="text-gray-400">⏱️</span> 28 hours
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-indigo-600">$69.99</span>
                                    <CustomButton
                                        text="Add to Cart"
                                        enabled={true}
                                        color={ButtonColor.WHITE}
                                        onClick={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course 6: Business */}
                        <div className="rounded-xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48 bg-gradient-to-br from-emerald-400 to-emerald-600">
                                <Image
                                    src="/course-6.jpg"
                                    alt="Business"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    Intermediate
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-emerald-600 font-semibold">Business</p>
                                <h3 className="text-lg font-semibold text-gray-900 mt-2">Business Strategy & Entrepreneurship</h3>
                                <p className="text-sm text-gray-600 mt-1">by Linda Martinez</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">4.7</span>
                                        <span className="text-xs text-gray-500">(7,054)</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 flex items-center gap-1">
                                    <span className="text-gray-400">⏱️</span> 35 hours
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-2xl font-semibold text-indigo-600">$74.99</span>
                                    <CustomButton
                                        text="Add to Cart"
                                        enabled={true}
                                        color={ButtonColor.WHITE}
                                        onClick={(event) => { }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose ELearner Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white">Why Choose ELearner?</h2>
                        <p className="mt-4 text-lg text-indigo-100">Join millions of learners and experience education reimagined</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1: Expert Instructors */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Expert Instructors</h3>
                            <p className="text-indigo-100">Learn from industry professionals and renowned experts</p>
                        </div>

                        {/* Feature 2: Flexible Learning */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15h-2v-2h2v2zm0-4h-2V5h2v8z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Flexible Learning</h3>
                            <p className="text-indigo-100">Study at your own pace with lifetime access to courses</p>
                        </div>

                        {/* Feature 3: Earn Certificates */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54-2.16 2.16c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l.75-.75 1.34 1.71c.39.51 1.23.51 1.62 0l2.04-2.71c.39-.51.39-1.23-.12-1.62-.51-.39-1.23-.39-1.62.12l-.51.68z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Earn Certificates</h3>
                            <p className="text-indigo-100">Get recognized with professional certificates</p>
                        </div>

                        {/* Feature 4: Career Growth */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 6l2.29 2.29-4.58 4.58-4-4L2 16.86V21h4.14L16 9.29 19.71 13H23V6z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Career Growth</h3>
                            <p className="text-indigo-100">Advance your career with in-demand skills</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">What Our Students Say</h2>
                        <p className="mt-4 text-lg text-gray-600">Join thousands of satisfied learners worldwide</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex gap-1 mb-4">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                "This course completely changed my career! The instructor explains everything clearly and
                                the content is structured perfectly."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                                    <Image
                                        src="/student-1.jpg"
                                        alt="John Davis"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">John Davis</p>
                                    <p className="text-xs text-gray-500">Verified Student</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex gap-1 mb-4">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                "Best web development course I have taken. The content is up-to-date and well-structured.
                                Highly recommended for beginners!"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                                    <Image
                                        src="/student-2.jpg"
                                        alt="Maria Garcia"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Maria Garcia</p>
                                    <p className="text-xs text-gray-500">Verified Student</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex gap-1 mb-4">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 text-gray-300" />
                            </div>
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                "Great course overall. Very comprehensive content and well-organized. My only suggestion
                                would be to include more practical projects."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                                    <Image
                                        src="/student-3.jpg"
                                        alt="Robert Kim"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Robert Kim</p>
                                    <p className="text-xs text-gray-500">Verified Student</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 4 */}
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex gap-1 mb-4">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                "I went from zero programming knowledge to building my own websites. The instructor is
                                patient and explains complex concepts simply."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                                    <Image
                                        src="/student-4.jpg"
                                        alt="Sophie Anderson"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Sophie Anderson</p>
                                    <p className="text-xs text-gray-500">Verified Student</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-b from-purple-100 via-purple-50 to-white py-20">
                <div className="mx-auto max-w-2xl px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Learning?</h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Join ELearner today and get access to thousands of courses taught by expert instructors
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <CustomButton
                            text="Browse Courses"
                            enabled={true}
                            color={ButtonColor.PURPLE}
                            onClick={(event) => { }}
                        />
                        <CustomButton
                            text="Sign Up for Free"
                            enabled={true}
                            color={ButtonColor.WHITE}
                            onClick={(event) => { }}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">30-Day Money Back</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Lifetime Access</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Expert Support</span>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
