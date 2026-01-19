"use client";
import Image from "next/image";
import {
    Star,
    CheckCircle,
    User,
    BookOpen,
    Award,
    TrendingUp,
} from "lucide-react";
import {
    CustomButton,
    ButtonColor,
    CustomLinkButton,
} from "@/components/shared/CustomButton";
import CategoryButton from "@/components/Home/CategoryButton";
import CourseCard from "@/components/Home/CourseCard";
import ReviewCard from "@/components/Home/ReviewCard";

export default function Home() {
    const averageRating = 3.5;
    const issueCount = "100K+";
    const activeLearnerCount = "10M+";
    const expertInstructorCount = "50K+";
    const onlineCoursesCount = "100K+";

    const categories = [
        "Web Development",
        "Data Science",
        "Business",
        "Design",
        "Marketing",
        "Photography",
    ];

    const demoPopularCourses = [
        {
            imgSource: "https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg",
            level: "Beginner",
            category: "Web Development",
            courseName: "Complete Web Development Bootcamp 2025",
            author: "Sarah Johnson",
            rating: 3.5,
            ratingCount: 1000,
            duration: 35,
            oldPrice: 99,
            price: 89.99,
        },
        {
            imgSource: "https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg",
            level: "Intermediate",
            category: "Data Science",
            courseName: "Data Science & Machine Learning Masterclass",
            author: "Dr. Michael Chen",
            rating: 4.9,
            ratingCount: 1200,
            duration: 50,
            oldPrice: 80,
            price: 59.99,
        },
        {
            imgSource: "https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg",
            level: "Advance",
            category: "Marketing",
            courseName: "Digital Marketing Complete Course",
            author: "Dr. Emma Williams",
            rating: 4.7,
            ratingCount: 1400,
            duration: 50,
            oldPrice: 80,
            price: 59.99,
        },
        {
            imgSource: "https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg",
            level: "Intermediate",
            category: "Data Science",
            courseName: "Data Science & Machine Learning Masterclass",
            author: "Dr. Michael Chen",
            rating: 4.9,
            ratingCount: 1200,
            duration: 50,
            oldPrice: 80,
            price: 59.99,
        },
        {
            imgSource: "https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg",
            level: "Intermediate",
            category: "Data Science",
            courseName: "Data Science & Machine Learning Masterclass",
            author: "Dr. Michael Chen",
            rating: 4.9,
            ratingCount: 1200,
            duration: 50,
            price: 59.99,
        },
        {
            imgSource: "https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg",
            level: "Advance",
            category: "Marketing",
            courseName: "Digital Marketing Complete Course",
            author: "Dr. Emma Williams",
            rating: 4.7,
            ratingCount: 1400,
            duration: 50,
            oldPrice: 80,
            price: 59.99,
        },
    ];

    const demoReviewCards = [
        {
            name: "Travis",
            avatar: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png",
            role: "Verified Student",
            rating: 4,
            review: "This course completely changed my career! The instructor explains everything clearly and the content is structured perfectly.",
        },
        {
            name: "Alan",
            avatar: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png",
            role: "Verified Teacher",
            rating: 3,
            review: "This course completely changed my career! The instructor explains everything clearly and the content is structured perfectly.",
        },
        {
            name: "Josh",
            avatar: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png",
            role: "Verified Student",
            rating: 5,
            review: "This course completely changed my career! The instructor explains everything clearly and the content is structured perfectly.",
        },
        {
            name: "Lois",
            avatar: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png",
            role: "Verified Student",
            rating: 2,
            review: "This course completely changed my career! The instructor explains everything clearly and the content is structured perfectly.",
        },
        {
            name: "Linda",
            avatar: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png",
            role: "Verified Student",
            rating: 3.2,
            review: "This course completely changed my career! The instructor explains everything clearly and the content is structured perfectly.",
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-[rgba(99,102,241,0.1)] via-[rgba(139,92,246,0.1)] to-[rgba(255,255,255,1)]">
            {/* Hero Section */}
            <div className="mx-auto max-w-5/6 px-6 py-20 lg:py-16">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Left Column */}
                    <div className="flex flex-col justify-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex w-fit px-5 h-fit py-2 items-center gap-2 bg-[rgba(99,102,241,0.1)]">
                            <span className="text-xl font-normal w-full text-center text-[rgb(99,102,241)]">
                                🎓 Welcome to ELearner
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="mb-6 text-5xl font-medium leading-tight text-gray-900">
                            Learn Anything, <br />
                            <span className="font-semibold text-[rgb(99,102,241)]">
                                Anytime,
                                <br />
                                Anywhere
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mb-8 max-w-lg text-lg font-normal text-[rgba(107,114,128,1)]">
                            Join millions of learners worldwide and advance your
                            career with expert-led courses. Start your learning
                            journey today.
                        </p>

                        {/* CTAs */}
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <CustomLinkButton
                                text="Explore Courses →"
                                enabled={true}
                                color={ButtonColor.PURPLE}
                                href=""
                            />
                            <CustomLinkButton
                                text="Become an Instructor"
                                enabled={true}
                                color={ButtonColor.WHITE}
                                href=""
                            />
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl font-medium text-[rgb(99,102,241)]">
                                    {activeLearnerCount}
                                </div>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    Active Learners
                                </p>
                            </div>
                            <div>
                                <div className="text-4xl font-medium text-[rgb(99,102,241)]">
                                    {expertInstructorCount}
                                </div>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    Expert Instructors
                                </p>
                            </div>
                            <div>
                                <div className="text-4xl font-medium text-[rgb(99,102,241)]">
                                    {onlineCoursesCount}
                                </div>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    Online Courses
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative h-[500px] lg:h-[600px]">
                        {/* Main Hero Image */}
                        <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden">
                            <img
                                className="object-cover w-full h-full object-center"
                                src="https://i.ytimg.com/vi/O8ivm7403rk/hq720.jpg"
                            />
                        </div>

                        {/* Average Rating Card */}
                        <div className="absolute -right-6 top-12 rounded-2xl bg-white px-6 py-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1 bg-[rgba(139,92,246,0.1)] p-5 rounded-2xl">
                                    {[...Array(Math.round(averageRating))].map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                className="h-10 w-10 fill-[rgba(139,92,246,1)] text-[rgba(139,92,246,0.1)]"
                                            />
                                        ),
                                    )}
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-[rgba(107,114,128,1)]">
                                        Average Rating
                                    </p>
                                    <p className="text-2xl font-medium text-gray-900">
                                        {averageRating.toFixed(1)}/5.0
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Certificates Card */}
                        <div className="absolute -bottom-6 left-25 -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-xl max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <span className="text-xl">📜</span>
                                </div>
                                <div>
                                    <p className="text-2xl font-semibold text-[rgba(107,114,128,1)]">
                                        Certificates
                                    </p>
                                    <p className="text-2xl font-medium text-gray-900">
                                        {issueCount} Issued
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white h-96 py-16">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Explore Top Categories
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Discover courses across diverse fields and start
                            learning today
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-items-center justify-evenly">
                        {categories.map((category) => {
                            return (
                                <CategoryButton
                                    key={category}
                                    name={category}
                                />
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
                            <h2 className="text-3xl font-semibold text-gray-900">
                                Popular Courses
                            </h2>
                            <p className="mt-2 text-gray-500">
                                Trending courses chosen by learners like you
                            </p>
                        </div>
                        <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
                        >
                            View All Courses <span>→</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {demoPopularCourses.map((course) => {
                            return (
                                <CourseCard
                                    key={Math.random()}
                                    imgSource={course.imgSource}
                                    level={course.level}
                                    category={course.category}
                                    courseTitle={course.courseName}
                                    author={course.author}
                                    rating={course.rating}
                                    ratingCount={course.ratingCount}
                                    duration={course.duration}
                                    oldPrice={course.oldPrice}
                                    price={course.price}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Why Choose ELearner Section */}
            <div className="bg-[rgb(99,102,241)] py-20">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white">
                            Why Choose ELearner?
                        </h2>
                        <p className="mt-4 text-lg text-indigo-100">
                            Join millions of learners and experience education
                            reimagined
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1: Expert Instructors */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <User className="text-white" size={48} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                Expert Instructors
                            </h3>
                            <p className="text-indigo-100">
                                Learn from industry professionals and renowned
                                experts
                            </p>
                        </div>

                        {/* Feature 2: Flexible Learning */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <BookOpen
                                        className="text-white"
                                        size={48}
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                Flexible Learning
                            </h3>
                            <p className="text-indigo-100">
                                Study at your own pace with lifetime access to
                                courses
                            </p>
                        </div>

                        {/* Feature 3: Earn Certificates */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <Award className="text-white" size={48} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                Earn Certificates
                            </h3>
                            <p className="text-indigo-100">
                                Get recognized with professional certificates
                            </p>
                        </div>

                        {/* Feature 4: Career Growth */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="bg-white/20 p-6 rounded-full">
                                    <TrendingUp
                                        className="text-white"
                                        size={48}
                                    />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                Career Growth
                            </h3>
                            <p className="text-indigo-100">
                                Advance your career with in-demand skills
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-5/6 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900">
                            What Our Students Say
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Join thousands of satisfied learners worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {demoReviewCards.map((card, index) => {
                            return (
                                <ReviewCard
                                    key={index}
                                    name={card.name}
                                    avatar={card.avatar}
                                    role={card.role}
                                    rating={card.rating}
                                    review={card.review}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-b from-purple-100 via-purple-50 to-white py-20">
                <div className="mx-auto max-w-2xl px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Join ELearner today and get access to thousands of
                        courses taught by expert instructors
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <CustomLinkButton
                            text="Browse Courses"
                            enabled={true}
                            color={ButtonColor.PURPLE}
                            href="/courses"
                        />
                        <CustomLinkButton
                            text="Sign Up for Free"
                            enabled={true}
                            color={ButtonColor.WHITE}
                            href="/register"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-[rgb(99,102,241)]" />
                            <span className="font-medium">
                                30-Day Money Back
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-[rgb(99,102,241)]" />
                            <span className="font-medium">Lifetime Access</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-[rgb(99,102,241)]" />
                            <span className="font-medium">Expert Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
